/* =========================================================
   FIREBASE + FIREBASE AUTHENTICATION
   ========================================================= */

/*
  VERSI INI:
  1. Menggunakan Firebase Authentication untuk login guru.
  2. Menggunakan Firestore untuk data siswa.
  3. Listener Firestore baru dijalankan SETELAH guru berhasil login.
  4. Tidak lagi menggunakan password hash lokal.
  5. Tetap menggunakan collection "siswa".
*/

const loadFirebaseAuth=()=>new Promise((resolve,reject)=>{

  if(
    window.firebase &&
    typeof firebase.auth==='function'
  ){
    resolve();
    return;
  }

  const old=
    document.querySelector(
      'script[data-firebase-auth="1"]'
    );

  if(old){

    old.addEventListener(
      'load',
      ()=>resolve(),
      {once:true}
    );

    old.addEventListener(
      'error',
      ()=>reject(
        new Error(
          'Firebase Authentication gagal dimuat.'
        )
      ),
      {once:true}
    );

    return;
  }

  const s=
    document.createElement('script');

  s.src=
    'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js';

  s.dataset.firebaseAuth='1';

  s.onload=()=>resolve();

  s.onerror=()=>reject(
    new Error(
      'Tidak dapat memuat Firebase Authentication.'
    )
  );

  document.head.appendChild(s);

});


let Store=null;
let auth=null;
let unsubscribeStudents=null;


/* =========================================================
   INISIALISASI FIREBASE
   ========================================================= */

const initFirebase=async()=>{

  await loadFirebaseAuth();

  if(
    !window.firebase
  )
    throw new Error(
      'Firebase SDK tidak tersedia.'
    );

  if(
    typeof firebaseConfig==='undefined' ||
    !firebaseConfig ||
    !firebaseConfig.apiKey
  )
    throw new Error(
      'firebaseConfig tidak ditemukan.'
    );

  if(
    !firebase.apps.length
  ){

    firebase.initializeApp(
      firebaseConfig
    );

  }

  auth=
    firebase.auth();

  /*
    Session Firebase hanya berlaku pada tab/browser
    ini. Saat browser/tab ditutup, login berakhir.
  */

  await auth.setPersistence(
    firebase.auth.Auth.Persistence.SESSION
  );

  const f=
    firebase
      .firestore()
      .collection('siswa');

  Store={

    mode:'cloud',

    col:{

      doc:id=>({

        set:o=>
          f.doc(id).set(
            o,
            {merge:false}
          ),

        delete:()=>
          f.doc(id).delete()

      }),

      onSnapshot:(next,error)=>
        f.onSnapshot(
          snapshot=>
            next({
              docs:
                snapshot.docs.map(
                  d=>({
                    id:d.id,
                    data:()=>d.data()
                  })
                )
            }),
          error
        )

    }

  };

  col=Store.col;

  console.log(
    'Firebase aktif:',
    firebase.app().options.projectId
  );

};


/* =========================================================
   MEMUAT DATA SISWA
   HANYA SETELAH LOGIN FIREBASE BERHASIL
   ========================================================= */

const startStudentListener=()=>{

  if(
    unsubscribeStudents
  )
    return;

  if(
    !auth ||
    !auth.currentUser
  ){
    console.warn(
      'Data siswa belum dimuat karena pengguna belum login.'
    );
    return;
  }

  if(!col)
    return;

  unsubscribeStudents=
    col.onSnapshot(

      sn=>{

        list=
          sn.docs
            .map(
              d=>({
                ...d.data(),
                id:d.id
              })
            )
            .sort(
              (a,b)=>
                (a.A_nama||'')
                  .localeCompare(
                    b.A_nama||''
                  )
            );

        console.log(
          'Data siswa diterima dari Firestore:',
          list.length
        );

        if(
          !cur &&
          !$('#shell').hidden
        )
          home();

      },

      e=>{

        console.error(
          'Firestore listener error:',
          e
        );

        unsubscribeStudents=null;

        if(
          e.code=='permission-denied'
        ){

          alert(
            'Firestore menolak akses.\n\n'+
            'Pastikan:\n'+
            '1. Firebase Authentication Email/Password aktif.\n'+
            '2. Akun guru sudah dibuat di Firebase Authentication.\n'+
            '3. Firestore Rules mengizinkan request.auth != null.'
          );

        }else{

          alert(
            'Tidak dapat mengambil data dari Firebase.\n\n'+
            (e.message||e.code||e)
          );

        }

      }

    );

};


/* =========================================================
   LOGIN
   ========================================================= */

const ENTER=()=>{

  $('#cover').hidden=true;

  $('#shell').hidden=false;

  go('dash');

  scrollTo(0,0);

};


/*
  Username pendek "guru" akan diubah menjadi:

  guru@sdn12badau.sch.id

  Jika ingin memakai email Firebase langsung,
  pengguna juga dapat mengetik alamat email lengkap.
*/

const usernameToEmail=username=>{

  const u=
    String(username||'')
      .trim()
      .toLowerCase();

  if(
    u.includes('@')
  )
    return u;

  return u+
    '@sdn12badau.sch.id';

};


let fails=0;
let lock=0;


/* Tombol mulai/login */

$('#enter').onclick=()=>{

  $('#enter').hidden=true;

  $('#lg').hidden=false;

  $('#lu').focus();

};


/* Tampilkan/sembunyikan password */

$('#ls').onchange=
  e=>
    $('#lp').type=
      e.target.checked
        ? 'text'
        : 'password';


/* =========================================================
   PROSES LOGIN FIREBASE
   ========================================================= */

$('#lg').onsubmit=async e=>{

  e.preventDefault();

  const m=$('#le');

  if(Date.now()<lock){

    m.textContent=
      'Terlalu banyak percobaan. Tunggu beberapa detik.';

    return;

  }

  if(!auth){

    m.textContent=
      'Firebase Authentication belum siap. Silakan muat ulang halaman.';

    return;

  }

  const username=
    $('#lu')
      .value
      .trim();

  const password=
    $('#lp')
      .value;

  if(!username||!password){

    m.textContent=
      'Username dan password wajib diisi.';

    return;

  }

  m.textContent=
    'Memeriksa akun...';

  try{

    const email=
      usernameToEmail(
        username
      );

    await auth.signInWithEmailAndPassword(
      email,
      password
    );

    fails=0;

    sessionStorage.setItem(
      'bi_login',
      '1'
    );

    $('#lp').value='';

    m.textContent='';

    startStudentListener();

    ENTER();

  }catch(e){

    console.error(
      'Firebase login error:',
      e
    );

    fails++;

    let msg=
      'Username atau password salah.';

    if(
      e.code=='auth/user-not-found'
    ){

      msg=
        'Akun guru belum dibuat di Firebase Authentication.';

    }else if(
      e.code=='auth/wrong-password'
    ){

      msg=
        'Password salah.';

    }else if(
      e.code=='auth/invalid-credential'
    ){

      msg=
        'Email/username atau password salah.';

    }else if(
      e.code=='auth/invalid-email'
    ){

      msg=
        'Format username/email tidak valid.';

    }else if(
      e.code=='auth/too-many-requests'
    ){

      msg=
        'Terlalu banyak percobaan. Silakan tunggu beberapa saat.';

    }else if(
      e.code=='auth/network-request-failed'
    ){

      msg=
        'Koneksi internet bermasalah.';

    }else if(
      e.code=='auth/operation-not-allowed'
    ){

      msg=
        'Login Email/Password belum diaktifkan di Firebase Authentication.';

    }else if(
      e.message
    ){

      msg=
        e.message;

    }

    m.textContent=msg;

    if(fails>=5){

      lock=
        Date.now()+15000;

      fails=0;

    }

  }

};


/* =========================================================
   STATUS LOGIN FIREBASE
   ========================================================= */

const watchAuth=()=>{

  if(!auth)
    return;

  auth.onAuthStateChanged(
    user=>{

      if(user){

        console.log(
          'Firebase user aktif:',
          user.email
        );

        if(
          sessionStorage.getItem(
            'bi_login'
          )=='1'
        ){

          startStudentListener();

          if(
            $('#cover').hidden===false
          )
            ENTER();

        }

      }else{

        console.log(
          'Tidak ada Firebase user yang login.'
        );

        sessionStorage.removeItem(
          'bi_login'
        );

        if(
          unsubscribeStudents
        ){

          unsubscribeStudents();

          unsubscribeStudents=null;

        }

        list=[];

        if(
          $('#shell')
        ){

          $('#shell').hidden=true;

          $('#cover').hidden=false;

          $('#lg').hidden=true;

          $('#enter').hidden=false;

        }

      }

    }
  );

};


/* =========================================================
   LOGOUT
   ========================================================= */

$('#out').onclick=async()=>{

  try{

    if(auth)
      await auth.signOut();

  }catch(e){

    console.error(
      'Logout Firebase error:',
      e
    );

  }

  sessionStorage.removeItem(
    'bi_login'
  );

  if(
    unsubscribeStudents
  ){

    unsubscribeStudents();

    unsubscribeStudents=null;

  }

  list=[];

  cur=null;

  $('#shell').hidden=true;

  $('#cover').hidden=false;

  $('#lg').hidden=true;

  $('#enter').hidden=false;

  $('#lu').value='';

  $('#lp').value='';

  $('#le').textContent='';

};


/* =========================================================
   MENU
   ========================================================= */

document
  .querySelectorAll(
    '#menu button[data-v]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>go(
          b.dataset.v
        )
  );


/* =========================================================
   START APLIKASI
   ========================================================= */

(async()=>{

  try{

    /*
      Firebase Authentication harus siap
      sebelum aplikasi dapat membaca Firestore.
    */

    await initFirebase();

    watchAuth();

  }catch(e){

    console.error(
      'Gagal memulai Firebase:',
      e
    );

    alert(
      'Firebase tidak dapat dijalankan.\n\n'+
      (e.message||e)
    );

  }

})();
