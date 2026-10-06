const L=(k,l,t)=>({k,l,t});

const AG=[
  'Islam',
  'Kristen',
  'Katolik',
  'Hindu',
  'Buddha',
  'Konghucu'
];

const idf=(p)=>[
  L(p+'nama','Nama lengkap'),
  L(p+'nik','NIK'),
  L(p+'ttl','Tempat/tanggal lahir'),
  L(p+'pend','Pendidikan terakhir'),
  L(p+'kerja','Pekerjaan'),
  L(p+'gaji','Penghasilan'),
  L(p+'alamat','Alamat'),
  L(p+'hp','Nomor HP')
];

const SM=[];

for(let k=1;k<=6;k++)
  for(let s=1;s<=2;s++)
    SM.push('Kls '+k+' Smt '+s);

const blank=n=>
  Array.from(
    {length:n},
    (_,i)=>'Baris '+(i+1)
  );

const S=[

  {
    id:'A',
    t:'A. Identitas Peserta Didik',
    f:[
      L('nis','Nomor Induk Siswa (NIS)'),
      L('nisn','NISN'),
      L('nama','Nama lengkap siswa'),
      L('panggilan','Nama panggilan'),
      L('jk','Jenis kelamin',['Laki-laki','Perempuan']),
      L('ttl','Tempat, tanggal lahir'),
      L('agama','Agama',AG),
      L('status','Status dalam keluarga',['Anak kandung','Anak tiri','Anak angkat']),
      L('anakke','Anak ke-'),
      L('kandung','Jumlah saudara kandung'),
      L('tiri','Jumlah saudara tiri/angkat'),
      L('wn','Kewarganegaraan',['WNI','WNA']),
      L('nik','NIK'),
      L('kk','Nomor Kartu Keluarga'),
      L('akta','Nomor Akta Kelahiran'),
      L('alamat','Alamat lengkap'),
      L('desa','Desa/Kelurahan'),
      L('kec','Kecamatan'),
      L('kab','Kabupaten/Kota'),
      L('prov','Provinsi'),
      L('pos','Kode pos'),
      L('hp','Nomor telepon/HP'),
      L('email','Email'),
      L('tinggal','Tinggal bersama',['Orang tua','Wali','Asrama','Lainnya']),
      L('jarak','Jarak ke sekolah (km)'),
      L('trans','Moda transportasi',['Jalan kaki','Sepeda','Sepeda motor','Mobil/antar jemput','Perahu','Lainnya'])
    ]
  },

  {
    id:'B',
    t:'B. Data Orang Tua/Wali',
    g:[
      ['Ayah',idf('ay_')],
      ['Ibu',idf('ib_')],
      [
        'Wali (jika ada)',
        [
          L('wl_nama','Nama'),
          L('wl_nik','NIK'),
          L('wl_hub','Hubungan dengan siswa'),
          ...idf('wl_').slice(3)
        ]
      ]
    ]
  },

  {
    id:'C',
    t:'C. Data Perkembangan Peserta Didik',
    f:[
      L('tb','Tinggi badan (cm)'),
      L('bb','Berat badan (kg)'),
      L('lk','Lingkar kepala (cm)'),
      L('sehat','Kondisi kesehatan'),
      L('gol','Golongan darah',['A','B','AB','O','Belum tahu']),
      L('imun','Imunisasi'),
      L('penyakit','Riwayat penyakit'),
      L('abk','Kebutuhan khusus/disabilitas'),
      L('fisik','Perkembangan fisik lainnya')
    ]
  },

  {
    id:'D',
    t:'D. Riwayat Pendidikan',
    g:[
      [
        'Saat masuk SD',
        [
          L('tk','Asal TK/RA/PAUD'),
          L('nopd','No. peserta didik sekolah asal'),
          L('stt','No. ijazah/STTB sebelumnya'),
          L('tglterima','Tanggal diterima'),
          L('kls_terima','Diterima di kelas'),
          L('stsmasuk','Status saat masuk',['Siswa baru','Pindahan'])
        ]
      ],
      [
        'Perpindahan siswa',
        [
          L('pasal','Asal sekolah'),
          L('psurat','Nomor surat pindah'),
          L('ptgl','Tanggal pindah'),
          L('palasan','Alasan pindah'),
          L('ptuju','Sekolah tujuan')
        ]
      ]
    ]
  },

  {
    id:'E',
    t:'E. Perkembangan Hasil Belajar',
    tb:{
      p:'E',
      rows:[
        'Pendidikan Agama',
        'Pendidikan Pancasila',
        'Bahasa Indonesia',
        'Matematika',
        'IPAS',
        'PJOK',
        'Seni/Bahasa Daerah',
        'Bahasa Inggris'
      ],
      cols:SM,
      h:'Mata Pelajaran'
    }
  },

  {
    id:'F',
    t:'F. Kokurikuler/Ekstrakurikuler',
    tb:{
      p:'F',
      rows:[
        'Pramuka',
        'Olahraga',
        'Seni',
        'Keagamaan',
        'Lainnya'
      ],
      cols:[
        'Kelas/Semester',
        'Prestasi/Keikutsertaan',
        'Keterangan'
      ],
      h:'Kegiatan'
    }
  },

  {
    id:'G',
    t:'G. Prestasi Peserta Didik',
    tb:{
      p:'G',
      rows:[
        'Akademik',
        'Olahraga',
        'Seni',
        'Keagamaan',
        'Lainnya'
      ],
      cols:[
        'Tingkat',
        'Juara/Prestasi',
        'Tahun',
        'Keterangan'
      ],
      h:'Jenis'
    }
  },

  {
    id:'H',
    t:'H. Kehadiran Siswa',
    tb:{
      p:'H',
      rows:SM,
      cols:[
        'Sakit',
        'Izin',
        'Tanpa Keterangan',
        'Jumlah Hari Sekolah'
      ],
      h:'Kelas/Semester'
    }
  },

  {
    id:'I',
    t:'I. Perkembangan Karakter/Sikap',
    tb:{
      p:'I',
      rows:[
        'Sikap spiritual',
        'Sikap sosial',
        'Kedisiplinan',
        'Tanggung jawab',
        'Kerja sama',
        'Kemandirian',
        'Kejujuran'
      ],
      cols:[
        'Kelas 1–2',
        'Kelas 3–4',
        'Kelas 5–6'
      ],
      h:'Aspek'
    }
  },

  {
    id:'J',
    t:'J. Catatan Perkembangan Peserta Didik',
    ta:[
      L('j_akad','Perkembangan akademik'),
      L('j_sos','Perkembangan sosial'),
      L('j_kar','Perkembangan karakter'),
      L('j_mas','Permasalahan yang perlu perhatian'),
      L('j_tl','Tindak lanjut/bimbingan'),
      L('j_ortu','Komunikasi dengan orang tua')
    ]
  },

  {
    id:'K',
    t:'K. Data Penerimaan Program/Bantuan',
    f:[
      L('pip','Penerima PIP',['Ya','Tidak']),
      L('kip','Penerima KIP',['Ya','Tidak']),
      L('kks','KKS',['Ya','Tidak']),
      L('pkh','PKH',['Ya','Tidak']),
      L('nokip','Nomor KIP/KKS'),
      L('norek','Nomor rekening'),
      L('lain','Bantuan lainnya'),
      L('stsb','Status penerimaan')
    ]
  },

  {
    id:'L',
    t:'L. Data Kelulusan',
    f:[
      L('nopeserta','Nomor peserta ujian/asesmen'),
      L('thlulus','Tahun lulus'),
      L('noijazah','Nomor ijazah'),
      L('tglijazah','Tanggal ijazah'),
      L('lanjut','Sekolah lanjutan'),
      L('ketlulus','Keterangan')
    ]
  },

  {
    id:'M',
    t:'M. Data Mutasi Keluar',
    tb:{
      p:'M',
      rows:blank(3),
      cols:[
        'Tanggal',
        'Kelas',
        'Sekolah Tujuan',
        'Alasan',
        'No. Surat Pindah',
        'Keterangan'
      ],
      h:'No'
    }
  },

  {
    id:'N',
    t:'N. Data Mutasi Masuk',
    tb:{
      p:'N',
      rows:blank(3),
      cols:[
        'Tanggal Masuk',
        'Asal Sekolah',
        'Kelas',
        'No. Surat Pindah',
        'Keterangan'
      ],
      h:'No'
    }
  },

  {
    id:'O',
    t:'O. Lampiran Dokumen',
    ck:[
      'Akta kelahiran',
      'Kartu Keluarga',
      'KTP orang tua/wali',
      'KIP/KKS (jika ada)',
      'Dokumen NISN',
      'Ijazah/STTB sebelumnya',
      'Surat pindah (jika ada)',
      'Dokumen pendukung lainnya'
    ]
  }

];

const KELAS=[
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'Lulus'
];

const $=(s,r=document)=>r.querySelector(s);

const esc=s=>
  String(s??'').replace(
    /[&<>"]/g,
    c=>({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;'
    }[c])
  );

let col=null,
    view='dash',
    list=[],
    cur=null,
    q='',
    fk='',
    timer=null,
    saved='';

const inp=(k,l,t,v)=>
  `<label>${l}${
    Array.isArray(t)
      ? `<select data-k="${k}">
          <option></option>
          ${t.map(o=>
            `<option${v==o?' selected':''}>${o}</option>`
          ).join('')}
        </select>`
      : `<input data-k="${k}" value="${esc(v)}">`
  }</label>`;

function fields(a,d,pre=''){
  return `<div class="grid">${
    a.map(f=>
      inp(
        pre+f.k,
        f.l,
        f.t,
        d[pre+f.k]
      )
    ).join('')
  }</div>`;
}

function sec(s,d){

  let h='';

  if(s.f)
    h=fields(s.f,d,s.id+'_');

  if(s.g)
    h=s.g.map(
      ([n,a])=>
        `<div class="sub">${n}</div>`+
        fields(a,d,s.id+'_')
    ).join('');

  if(s.ta)
    h=s.ta.map(
      f=>
        `<label>${f.l}
          <textarea data-k="${s.id}_${f.k}">
            ${esc(d[s.id+'_'+f.k])}
          </textarea>
        </label>`
    ).join('');

  if(s.ck)
    h=
      '<div class="chk">'+
      s.ck.map(
        (c,i)=>
          `<label>
            <input
              type="checkbox"
              data-k="O_${i}"
              ${d['O_'+i]?' checked':''}
            >
            ${c}
          </label>`
      ).join('')+
      '</div>';

  if(s.tb){

    const t=s.tb;

    h=
      `<div class="tw">
        <table>
          <tr>
            <th>${t.h}</th>
            ${t.cols.map(c=>`<th>${c}</th>`).join('')}
          </tr>

          ${t.rows.map(
            (r,i)=>
              `<tr>
                <td>${r}</td>
                ${t.cols.map(
                  (c,j)=>
                    `<td>
                      <input
                        data-k="${t.p}_${i}_${j}"
                        value="${esc(d[t.p+'_'+i+'_'+j])}"
                      >
                    </td>`
                ).join('')}
              </tr>`
          ).join('')}

        </table>
      </div>`;
  }

  return `
    <div class="sec" id="s${s.id}">
      <h3>${s.t}</h3>
      <div class="b">${h}</div>
    </div>`;
}

function students(){

  cur=null;

  const f=list.filter(
    s=>
      (!fk||s.kelas==fk)&&
      (
        !q||
        (
          (s.A_nama||'')+
          (s.A_nisn||'')+
          (s.A_nis||'')
        )
        .toLowerCase()
        .includes(q.toLowerCase())
      )
  );

  $('#app').innerHTML=`
    <div class="bar">

      <input
        type="search"
        id="q"
        placeholder="Cari nama / NIS / NISN…"
        value="${esc(q)}"
      >

      <select id="fk">
        <option value="">Semua kelas</option>
        ${
          KELAS.map(k=>
            `<option${fk==k?' selected':''}>${k}</option>`
          ).join('')
        }
      </select>

      <button class="p" id="add">
        + Tambah Siswa
      </button>

    </div>

    <div class="tw">
      <table>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>NIS</th>
          <th>NISN</th>
          <th>L/P</th>
          <th>Kelas</th>
        </tr>

        ${
          f.map(
            (s,i)=>
              `<tr class="s" data-id="${s.id}">
                <td>${i+1}</td>
                <td>${esc(s.A_nama)}</td>
                <td>${esc(s.A_nis)}</td>
                <td>${esc(s.A_nisn)}</td>
                <td>${esc((s.A_jk||'')[0]||'')}</td>
                <td>${esc(s.kelas)}</td>
              </tr>`
          ).join('')
          ||
          '<tr><td colspan="6">Belum ada data siswa.</td></tr>'
        }

      </table>
    </div>

    <p style="color:var(--mu)">
      Total: ${f.length} siswa
    </p>
  `;

  $('#q').oninput=e=>{
    q=e.target.value;
    const p=e.target.selectionStart;
    home();
    const n=$('#q');
    n.focus();
    n.setSelectionRange(p,p);
  };

  $('#fk').onchange=e=>{
    fk=e.target.value;
    home();
  };

  $('#add').onclick=()=>
    open({
      id:'s'+Date.now().toString(36),
      kelas:'I',
      _new:1
    });

  document.querySelectorAll('tr.s')
    .forEach(
      r=>
        r.onclick=()=>
          open(
            list.find(
              s=>s.id==r.dataset.id
            )
          )
    );
}

function open(s){

  cur=s;

  const d=s;

  $('#app').innerHTML=`

    <div class="bar noprint">

      <button id="bk">
        ← Daftar
      </button>

      <label style="display:flex;align-items:center;gap:6px">
        Kelas saat ini

        <select id="kl">
          ${
            KELAS.map(
              k=>
                `<option${s.kelas==k?' selected':''}>
                  ${k}
                </option>`
            ).join('')
          }
        </select>
      </label>

      <button class="p" id="sv">
        Simpan
      </button>

      <span
        id="st"
        style="align-self:center;color:var(--mu)"
      ></span>

      <button id="pr">
        Cetak
      </button>

      <button
        class="d"
        id="dl"
        style="margin-left:auto"
      >
        Hapus
      </button>

    </div>

    <div class="nav">
      ${
        S.map(
          x=>
            `<a
              href="#s${x.id}"
              onclick="
                document
                  .getElementById('s${x.id}')
                  .scrollIntoView();
                return false
              "
            >
              ${x.id}
            </a>`
        ).join('')
      }
    </div>

    <div
      class="ph"
      style="
        text-align:center;
        font-weight:700;
        font-size:15px;
        margin:6px
      "
    >
      BUKU INDUK SISWA — SD NEGERI 12 BADAU

      <br>

      <span
        style="
          font-weight:400;
          font-size:11px
        "
      >
        Jl. Membalong KM 15, Dusun Mempiu,
        Desa Cerucuk, Kec. Badau,
        Kab. Belitung,
        Kepulauan Bangka Belitung
      </span>
    </div>

    ${S.map(x=>sec(x,d)).join('')}

    <div class="sig">

      <div>
        Mengetahui,<br>
        Kepala Sekolah
        <br><br><br><br>
        Nama: ..............................<br>
        NIP: ...............................
      </div>

      <div>
        Tempat/Tanggal: ....................<br>
        Wali Kelas
        <br><br><br><br>
        Nama: ..............................<br>
        NIP: ...............................
      </div>

    </div>
  `;

  $('#app').oninput=e=>{
    const k=e.target.dataset.k;

    if(k){
      cur[k]=
        e.target.type=='checkbox'
          ? e.target.checked
          : e.target.value;

      mark();
    }
  };

  $('#app').onchange=e=>{
    if(e.target.id=='kl'){
      cur.kelas=e.target.value;
      mark();
    }
  };

  $('#bk').onclick=()=>{
    save();
    home();
  };

  $('#sv').onclick=()=>save(1);

  $('#pr').onclick=()=>print();

  $('#dl').onclick=async()=>{

    if(
      confirm(
        'Hapus data siswa ini secara permanen?'
      )
    ){

      try{

        if(col&&!cur._new)
          await col.doc(cur.id).delete();

        list=list.filter(
          x=>x.id!=cur.id
        );

        home();

      }catch(e){

        alert(
          'Gagal menghapus data: '+
          (e.message||e.code||e)
        );

      }

    }

  };
}

function mark(){

  $('#st')&&(
    $('#st').textContent='Menyimpan…'
  );

  clearTimeout(timer);

  timer=setTimeout(
    ()=>save(),
    1200
  );
}

async function save(m){

  clearTimeout(timer);

  if(!cur)return;

  if(!cur.A_nama&&!m&&cur._new)
    return;

  const o={...cur};

  delete o._new;

  if(!list.find(x=>x.id==cur.id))
    list.push(cur);

  try{

    if(col)
      await col.doc(cur.id).set(o);

    cur._new=0;

    const t=$('#st');

    if(t)
      t.textContent=
        Store.mode=='cloud'
          ? 'Tersimpan di Firebase ✓'
          : 'Tersimpan (lokal)';

  }catch(e){

    const t=$('#st');

    if(t)
      t.textContent=
        'Gagal menyimpan: '+
        (e.message||e.code);

    console.error(
      'Firebase save error:',
      e
    );
  }
}

function cols(){

  const c=[
    {
      k:'kelas',
      h:'Kelas'
    }
  ];

  S.forEach(s=>{

    if(s.f)
      s.f.forEach(
        f=>
          c.push({
            k:s.id+'_'+f.k,
            h:`[${s.id}] ${f.l}`
          })
      );

    if(s.g&&s.id!='E')
      s.g.forEach(
        ([n,a])=>
          a.forEach(
            f=>
              c.push({
                k:s.id+'_'+f.k,
                h:`[${s.id}-${n}] ${f.l}`
              })
          )
      );

    if(s.ta)
      s.ta.forEach(
        f=>
          c.push({
            k:s.id+'_'+f.k,
            h:`[${s.id}] ${f.l}`
          })
      );

  });

  return c;
}

async function xport(withData){

  if(!window.XLSX)
    return alert(
      'Library Excel belum termuat, coba lagi.'
    );

  const c=cols();

  const rows=
    withData
      ? list.map(
          s=>c.map(
            x=>s[x.k]??''
          )
        )
      : [c.map(x=>'')];

  const ws=
    XLSX.utils.aoa_to_sheet([
      c.map(x=>x.h),
      ...rows
    ]);

  ws['!cols']=
    c.map(
      x=>({
        wch:Math.max(
          14,
          Math.min(30,x.h.length)
        )
      })
    );

  ws['!freeze']={
    ySplit:1
  };

  const opt=[
    ['PETUNJUK PENGISIAN'],
    [
      '1. Isi data siswa pada sheet "Siswa", satu siswa per baris, mulai baris ke-2. Jangan ubah/hapus judul kolom di baris 1.'
    ],
    [
      '2. Kolom NIK, KK, NIS, NISN, No. HP: format sel sebagai Teks agar angka nol di depan tidak hilang.'
    ],
    [
      '3. Kolom Nama lengkap siswa wajib diisi. Baris tanpa nama diabaikan.'
    ],
    [
      '4. Saat impor, siswa dengan NISN/NIS/nama yang sama akan diperbarui; selain itu ditambahkan sebagai siswa baru.'
    ],
    [
      '5. Nilai, kehadiran, prestasi, mutasi dan checklist dokumen diisi langsung di aplikasi.'
    ],
    [''],
    ['PILIHAN YANG DIIZINKAN'],
    [
      'Kelas: '+KELAS.join(', ')
    ]
  ];

  S.forEach(
    s=>
      (s.f||[])
        .concat(
          ...(s.g||[]).map(
            g=>g[1]
          )
        )
        .forEach(
          f=>
            Array.isArray(f.t)&&
            opt.push([
              f.l+': '+f.t.join(', ')
            ])
        )
  );

  const wb=
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    ws,
    'Siswa'
  );

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.aoa_to_sheet(opt),
    'Petunjuk'
  );

  const buf=
    XLSX.write(
      wb,
      {
        type:'array',
        bookType:'xlsx'
      }
    );

  const fn=
    withData
      ? 'buku-induk-data-sdn12badau.xlsx'
      : 'template-buku-induk-sdn12badau.xlsx';

  try{

    const d=
      await claude.use('downloads');

    if(!d)throw 0;

    await d.save({
      filename:fn,
      data:buf
    });

  }catch(e){

    if(
      e&&
      e.code=='declined'
    )
      return;

    const a=
      document.createElement('a');

    a.href=
      URL.createObjectURL(
        new Blob([buf])
      );

    a.download=fn;

    a.click();
  }
}

async function xin(file){

  try{

    const wb=
      XLSX.read(
        await file.arrayBuffer(),
        {
          type:'array',
          raw:false,
          defval:''
        }
      );

    const r=
      XLSX.utils.sheet_to_json(
        wb.Sheets[wb.SheetNames[0]],
        {
          header:1,
          raw:false,
          defval:''
        }
      );

    const c=cols();

    const idx={};

    (r[0]||[]).forEach(
      (h,i)=>{
        const m=
          c.find(
            x=>
              x.h==
              String(h).trim()
          );

        if(m)
          idx[i]=m.k;
      }
    );

    if(!Object.keys(idx).length)
      return alert(
        'Judul kolom tidak dikenali. Gunakan Template Excel dari aplikasi ini.'
      );

    let add=0,
        upd=0;

    for(
      const row of r.slice(1)
    ){

      const v={};

      for(
        const i in idx
      ){

        const x=
          String(
            row[i]??''
          ).trim();

        if(x)
          v[idx[i]]=x;
      }

      if(!v.A_nama)
        continue;

      const n=
        s=>
          (s||'')
            .toLowerCase()
            .trim();

      const ex=
        list.find(
          s=>
            (
              v.A_nisn&&
              s.A_nisn==
              v.A_nisn
            )||
            (
              v.A_nis&&
              s.A_nis==
              v.A_nis
            )||
            n(s.A_nama)==
            n(v.A_nama)
        );

      if(v.kelas){

        v.kelas=
          v.kelas.toUpperCase();

        if(v.kelas=='LULUS')
          v.kelas='Lulus';

        if(!KELAS.includes(v.kelas))
          delete v.kelas;
      }

      const o={
        ...(ex||{
          id:
            's'+
            Date.now().toString(36)+
            Math.random()
              .toString(36)
              .slice(2,5),
          kelas:'I'
        }),
        ...v
      };

      delete o._new;

      if(col)
        await col.doc(o.id).set(o);
      else{

        list=
          list.filter(
            s=>s.id!=o.id
          );

        list.push(o);
      }

      ex?upd++:add++;
    }

    alert(
      'Impor selesai: '+
      add+
      ' siswa baru, '+
      upd+
      ' diperbarui.'
    );

    home();

  }catch(e){

    alert(
      'Gagal impor: '+
      (e.message||e.code||e)
    );
  }
}

function go(v){

  view=v;
  cur=null;

  document
    .querySelectorAll(
      '#menu button[data-v]'
    )
    .forEach(
      b=>
        b.classList.toggle(
          'on',
          b.dataset.v==v
        )
    );

  home();
}

function home(){

  cur=null;

  if(view=='siswa')
    students();
  else if(view=='xl')
    xlpage();
  else
    dash();
}

function dash(){

  const n=list.length;

  const c=
    f=>
      list.filter(f).length;

  const pip=
    c(
      s=>
        s.K_pip=='Ya'||
        s.K_kip=='Ya'
    );

  const pc=
    k=>
      n
        ? Math.round(
            c(s=>s[k])*
            100/n
          )
        :0;

  const mx=
    Math.max(
      1,
      ...KELAS.map(
        k=>
          c(
            s=>s.kelas==k
          )
      )
    );

  const bar=
    (a,w,v)=>
      `<div class="br">
        <span>${a}</span>
        <i style="width:${w}%"></i>
        <em>${v}</em>
      </div>`;

  $('#app').innerHTML=`

    <div class="cards">

      ${
        [
          ['Total Siswa',n],
          [
            'Laki-laki',
            c(
              s=>
                (s.A_jk||'')[0]=='L'
            )
          ],
          [
            'Perempuan',
            c(
              s=>
                (s.A_jk||'')[0]=='P'
            )
          ],
          [
            'Penerima PIP/KIP',
            pip
          ]
        ]
        .map(
          ([a,b])=>
            `<div class="card">
              <small>${a}</small>
              <b>${b}</b>
            </div>`
        )
        .join('')
      }

    </div>

    <div class="bar">

      <button
        class="p"
        id="g1"
      >
        + Tambah / Kelola Data Siswa
      </button>

      <button id="g2">
        Impor / Ekspor Excel
      </button>

    </div>

    <div class="sec">

      <h3>
        Jumlah Siswa per Kelas
      </h3>

      <div class="b">

        ${
          KELAS.map(
            k=>{
              const v=
                c(
                  s=>s.kelas==k
                );

              return bar(
                k=='Lulus'
                  ? k
                  : 'Kelas '+k,
                v*100/mx,
                v
              );
            }
          ).join('')
        }

      </div>

    </div>

    <div class="sec">

      <h3>
        Kelengkapan Data
      </h3>

      <div class="b">

        ${
          [
            ['NISN','A_nisn'],
            ['NIK','A_nik'],
            ['Nomor KK','A_kk'],
            ['Akta kelahiran','A_akta'],
            ['Data ayah','B_ay_nama'],
            ['Data ibu','B_ib_nama']
          ]
          .map(
            ([a,k])=>
              bar(
                a,
                pc(k),
                pc(k)+'%'
              )
          )
          .join('')
        }

      </div>

    </div>
  `;

  $('#g1').onclick=
    ()=>go('siswa');

  $('#g2').onclick=
    ()=>go('xl');
}

function xlpage(){

  $('#app').innerHTML=`

    <div class="sec">

      <h3>
        Impor / Ekspor Excel
      </h3>

      <div class="b">

        <p>
          Unduh template, isi banyak siswa sekaligus,
          lalu impor kembali. Ekspor data dapat dipakai
          sebagai cadangan.
        </p>

        <div class="bar">

          <button id="xt">
            ⬇ Unduh Template Excel
          </button>

          <button id="xe">
            ⬇ Ekspor Data (Excel)
          </button>

          <button
            class="p"
            id="xi"
          >
            ⬆ Impor dari Excel
          </button>

          <input
            type="file"
            id="xf"
            accept=".xlsx,.xls,.csv"
            hidden
          >

        </div>

        <p style="color:var(--mu)">
          Judul kolom di baris 1 jangan diubah.
          Format kolom NIK/KK/NISN/HP sebagai Teks di Excel.
        </p>

      </div>

    </div>
  `;

  $('#xt').onclick=
    ()=>xport(0);

  $('#xe').onclick=
    ()=>xport(1);

  $('#xi').onclick=
    ()=>$('#xf').click();

  $('#xf').onchange=
    e=>
      e.target.files[0]&&
      xin(e.target.files[0]);
}


/* =========================================================
   FIREBASE
   ========================================================= */

const Store=(()=>{

  /*
    Gunakan Firebase jika firebase-config.js
    sudah dimuat dengan benar.
  */

  if(
    window.firebase &&
    typeof firebaseConfig!=='undefined' &&
    firebaseConfig &&
    firebaseConfig.apiKey
  ){

    try{

      /*
        Cegah Firebase diinisialisasi dua kali.
      */

      if(!firebase.apps.length){
        firebase.initializeApp(
          firebaseConfig
        );
      }

      const f=
        firebase
          .firestore()
          .collection('siswa');

      console.log(
        'Firebase aktif. Collection: siswa'
      );

      return {

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

          onSnapshot:(n,e)=>
            f.onSnapshot(
              s=>
                n({
                  docs:
                    s.docs.map(
                      d=>({
                        id:d.id,
                        data:()=>d.data()
                      })
                    )
                }),
              e
            )
        }

      };

    }catch(error){

      console.error(
        'Firebase gagal diinisialisasi:',
        error
      );

    }
  }

  /*
    Cadangan jika Firebase belum tersedia.
    Data hanya tersimpan di browser ini.
  */

  console.warn(
    'Firebase tidak aktif. Menggunakan penyimpanan lokal.'
  );

  const K='bi_sdn12_badau';

  const rd=()=>{

    try{

      return JSON.parse(
        localStorage.getItem(K)||'{}'
      );

    }catch(e){

      return{};

    }

  };

  const wr=d=>
    localStorage.setItem(
      K,
      JSON.stringify(d)
    );

  const subs=[];

  const emit=()=>{

    const o=rd();

    subs.forEach(
      n=>
        n({
          docs:
            Object.keys(o)
              .map(
                id=>({
                  id,
                  data:()=>o[id]
                })
              )
        })
    );

  };

  return {

    mode:'local',

    col:{

      doc:id=>({

        set:async o=>{

          const d=rd();

          d[id]=o;

          wr(d);

          emit();

        },

        delete:async()=>{

          const d=rd();

          delete d[id];

          wr(d);

          emit();

        }

      }),

      onSnapshot:n=>{

        subs.push(n);

        emit();

      }

    }

  };

})();


/* =========================================================
   MEMUAT DATA SISWA
   ========================================================= */

col=Store.col;

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
      'Data siswa diterima:',
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
      'Firebase listener error:',
      e
    );

    alert(
      'Tidak dapat mengambil data dari Firebase.\n\n'+
      (e.message||e.code||e)
    );

  }

);


/* =========================================================
   LOGIN
   ========================================================= */

const ENTER=()=>{

  $('#cover').hidden=true;

  $('#shell').hidden=false;

  go('dash');

  scrollTo(0,0);

};

const AUTH=
  'c58afbbc13059bc32465e47ae2600fc7011facd715fe2a6cce7bb34f119a9207';

const sha=async s=>
  [
    ...new Uint8Array(
      await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(s)
      )
    )
  ]
  .map(
    b=>
      b.toString(16).padStart(2,'0')
  )
  .join('');

let fails=0,
    lock=0;

$('#enter').onclick=()=>{

  $('#enter').hidden=true;

  $('#lg').hidden=false;

  $('#lu').focus();

};

$('#ls').onchange=
  e=>
    $('#lp').type=
      e.target.checked
        ? 'text'
        : 'password';

$('#lg').onsubmit=async e=>{

  e.preventDefault();

  const m=$('#le');

  if(Date.now()<lock)
    return m.textContent=
      'Terlalu banyak percobaan. Tunggu beberapa detik.';

  if(
    !(window.crypto&&crypto.subtle)
  )
    return m.textContent=
      'Browser tidak mendukung login aman. Buka lewat https.';

  if(
    await sha(
      'sdn12badau:'+
      $('#lu')
        .value
        .trim()
        .toLowerCase()+
      ':'+
      $('#lp').value
    )==AUTH
  ){

    fails=0;

    m.textContent='';

    sessionStorage.setItem(
      'bi_login',
      '1'
    );

    $('#lp').value='';

    ENTER();

  }else{

    fails++;

    m.textContent=
      'Username atau password salah.';

    if(fails>=5){

      lock=
        Date.now()+15000;

      fails=0;

    }

  }

};

if(
  sessionStorage.getItem(
    'bi_login'
  )=='1'
)
  ENTER();

document
  .querySelectorAll(
    '#menu button[data-v]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>go(b.dataset.v)
  );

$('#out').onclick=()=>{

  sessionStorage.removeItem(
    'bi_login'
  );

  $('#shell').hidden=true;

  $('#cover').hidden=false;

  $('#lg').hidden=true;

  $('#enter').hidden=false;

};
