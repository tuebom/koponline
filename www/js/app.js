// Dom7
var $$ = Dom7;

var AdMob = null;

// localStorage.setItem('lastOpened', new Date().getTime());
// localStorage.setItem('RegId', 'eOenpw_K57w:APA91bHAZ3jLdLrR0O556hn00oAtrzstv4hxI3kGvo96ARZ5lcr7PCgobbNH2PNG749hHF2IYvN7-eWlIqZ6LAZOWv9z7Uo9hZ7bYA3cZt4hGGNlwqXipxw5SEIbkAGzsmi5fS_9PYXY');

// var la = localStorage.getItem('lastOpened');
// console.log('la: ', la)

// var ca = new Date().getTime();
// console.log('ca: ', ca)

// var msec = ca - la;
// var mins = Math.floor(msec / 60000);
// var hrs = Math.floor(mins / 60);

// console.log('hrs: ', hrs)

// Framework7.use(Framework7Keypad);

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.pw.koponline', // App bundle ID
  name: 'Koperasi', // App name
  theme: 'auto', // Automatic theme detection
  init: true,
  initOnDeviceReady: true,
  
  touch: {
    disableContextMenu: false,
  },
  
  // App root data
  data: function () {
    return {
      db: null,
      nonsb: '',
      nohp: '',
      pin: '',
      saldo: 0,
      bonus: 0,
      bLogedIn: false,
      bUpdated: false,
      currentDate: null,
      token: null,
      push: null,
      // admobid: {}
    };
  },
  // App root methods
  methods: {
    // helloWorld: function () {
      // app.dialog.alert('Hello World!');
    // },

    getData: function () {

      app.request.get('http://212.24.111.23/koponline/sistem/last_update', function (res) {
            
        var data = JSON.parse(res);
        // console.log(res)
      
        if (data.status) {
            $$('.lupdate').text(data.data);
        } else {
          app.dialog.alert(data.message, 'Koperasi');
        }
      });
      
        
      app.request.get('http://212.24.111.23/koponline/nasabah/'+app.data.nonsb, function (res) {
        
        var data = JSON.parse(res);
      
        if (data.status) {
          var html = '<div class="card">'
          html += '  <div class="card-content">'
          html += '    <div class="card-content-inner"><b>DATA NASABAH</b><br>Nama: ' + data.nama
          html += '    <br>Alamat: ' + data.alamat + '</div>'
          html += '  </div>'
          html += '</div>'
          $$('.page-content.main').append(html)
      
          if (data.noang) {
            var html = '<div class="card">'
            html += '  <div class="card-content">'
            html += '    <div class="card-content-inner"><b>SIMPANAN POKOK</b><br>Rp' + data.pokok +'</div>'
            html += '  </div>'
            html += '</div>'
            $$('.page-content.main').append(html)
          }
        } else {
          app.dialog.alert(data.message, 'Koperasi');
        }

        app.request.get('http://212.24.111.23/koponline/nasabah/info_rek/'+app.data.nonsb, function (res) {
        
          var data = JSON.parse(res);
        
          if (data.sk) {
            var sk = data.sk;
            var html = '<div class="card">'
            html += '  <div class="card-content">'
            html += '    <div class="card-content-inner"><b>SIMPANAN KHUSUS</b><br>No. Rekening: ' + sk.norek
            html += '    <br>Saldo: ' + sk.saldo + '</div>'
            html += '  </div>'
            html += '</div>'
            $$('.page-content.main').append(html)
          }

          if (data.sw) {
            var sw = data.sw;
            var html = '<div class="card">'
            html += '  <div class="card-content">'
            html += '    <div class="card-content-inner"><b>SIMPANAN WAJIB</b><br>No. Rekening: ' + sw.norek
            html += '    <br>Saldo: ' + sw.saldo
            html += '    <br>Nominal setoran: 100.000'
            
            if (sw.stbayar == '') {
                
              var t = parseFloat(sw.tunggak),
              a = parseFloat(sw.nominal)

              // if (sw.tunggak > sw.nominal) {
              if (t > a) {
                html += '    <br>Status: BELUM BAYAR<br>Tunggakan: <b>'+sw.tunggakf+'</b></div>'
              } else {
                html += '    <br>Status: BELUM BAYAR</div>'
              }
            } else {
              html += '    <br>Status: SUDAH BAYAR</div>'
            }
            html += '  </div>'
            html += '</div>'
            $$('.page-content.main').append(html)
          }
        
          if (data.pds) {
            var pds = data.pds;
            var html = '<div class="card">'
            html += '  <div class="card-content">'
            html += '    <div class="card-content-inner"><b>TABUNGAN PDS</b><br>No. Rekening: ' + pds.norek
            html += '    <br>Saldo: ' + pds.saldo + '</div>'
            html += '  </div>'
            html += '</div>'
            $$('.page-content.main').append(html)
          }
      
          if (data.pnj) {
            var krd = data.pnj;  
            var html = '<div class="card">'
            html += '  <div class="card-content">'
            html += '    <div class="card-content-inner"><b>PINJAMAN</b><br>No. Rekening: ' + krd.norek
            html += '    <br>Sisa pokok: ' + krd.sisa
            html += '    <br>Nominal angsuran: '+ krd.angspkx
            html += '    <br>Angsuran '+ krd.angsur+' / '+ krd.jwaktu

            // var tgl = new Date(krd.tglbyr);
            // var tglbyr = tgl.getDate()+'/'+(tgl.getMonth()+1)+'/'+tgl.getFullYear();
            // html += '    <br>Tanggal bayar terakhir: '+ tglbyr
            
            if (krd.stbayar == '') {
              
              var t = parseFloat(krd.tunggak),
                  a = parseFloat(krd.angspk)
              
              if (t - a > 100) {
                html += '    <br>Status: BELUM BAYAR<br>Tunggakan: <b>'+krd.tunggakf+'</b>'
              } else {
                html += '    <br>Status: BELUM BAYAR'
              }
            } else {
              html += '    <br>Status: SUDAH BAYAR'
            }
            
            var tgl = new Date(krd.tglbyr);
            var tglbyr = tgl.getDate()+'/'+(tgl.getMonth()+1)+'/'+tgl.getFullYear();
            // html += '    <br>Tanggal bayar terakhir: '+ tglbyr + '</div>'
            html += '    <br>Your last payment: '+ tglbyr + '</div>'

            html += '  </div>'
            html += '</div>'
            $$('.page-content.main').append(html)
          }
        });

        /*app.request.get('http://212.24.111.23/koponline/sistem/antrian', function (res) {
        
          var data = JSON.parse(res);
        
          if (data.status) {

            var mohon = data.data;

            if (mohon.length > 0) {

              var html = '<div class="card">'
              html += '  <div class="card-content">'
              html += '    <div class="card-content-inner"><b>ANTRIAN PINJAMAN</b></div>'
              html += '  </div>'
              html += '</div>'
              html += '<div class="card data-table">'
              html += '<table class="preview-table">'
              html += '  <thead>'
              html += '    <tr>'
              html += '      <th class="label-cell">Nomor</th>'
              html += '      <th class="label-cell">Tgl. Input</th>'
              html += '      <th class="label-cell">Nama</th>'
              // html += '      <th class="label-cell">Alamat</th>'
              html += '      <th class="numeric-cell">Nominal</th>'
              html += '    </tr>'
              html += '  </thead>'
              html += '  <tbody>'

              for (var i = 0; i < mohon.length; i++) {
                html += '    <tr>'
                html += '      <td class="label-cell">'+mohon[i].nomhn+'</th>'
                html += '      <td class="label-cell">'+mohon[i].tglinput+'</th>'
                html += '      <td class="label-cell">'+mohon[i].nama+'</th>'
                // html += '      <td class="label-cell">'+mohon[i].alamat+'</th>'
                html += '      <td class="numeric-cell">'+mohon[i].pokok+'</th>'
                html += '    </tr>'
              }
              
              html += '  </tbody>'
              // html += '  <tfoot>'
              // html += '    <tr>'
              // html += '      <td class="label-cell"></td>'
              // html += '      <td class="label-cell"></td>'
              // html += '      <td class="label-cell"></td>'
              // html += '      <td class="label-cell"><b>TOTAL</b></td>'
              // html += '      <td class="numeric-cell total">0</td>'
              // html += '      <td></td>'
              // html += '    </tr>'
              // html += '  </tfoot>'
              html += '</table>'
              html += '</div>'

              $$('.page-content.main').append(html)
            }
          }
        });*/

      });
    },
    addRow: function (item) {
       
      var row = $$('<tr class="input-detail"></tr>');
      
      $$('<td class="label-cell input-kdrek"></td>').html(item.nomhn).appendTo(row);
      $$('<td class="label-cell input-nama"></td>').html(item.tglinput).appendTo(row);
      $$('<td class="label-cell input-nama"></td>').html(item.nama).appendTo(row);
      $$('<td class="label-cell input-nama"></td>').html(item.alamat).appendTo(row);
      $$('<td class="numeric-cell align="right"></td>').html(item.pokok).appendTo(row);
      // $$('<td class="label-cell input-nama"></td>').html(jw).appendTo(row);
      $$('.preview-table').append(row); // > tbody:last
    },
  },
  on: {

    init: function () { // sama dengan onDeviceReady

      /*
      function copyDatabaseFile(dbName) {

        var sourceFileName = cordova.file.applicationDirectory + 'www/' + dbName;
        var targetDirName = cordova.file.dataDirectory;

        return Promise.all([
          new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(sourceFileName, resolve, reject);
          }),
          new Promise(function (resolve, reject) {
            resolveLocalFileSystemURL(targetDirName, resolve, reject);
          })
        ]).then(function (files) {
          var sourceFile = files[0];
          var targetDir = files[1];
          return new Promise(function (resolve, reject) {
            targetDir.getFile(dbName, {}, resolve, reject);
          }).then(function () {
            console.log("file already copied");
          }).catch(function () {
            console.log("file doesn't exist, copying it");
            return new Promise(function (resolve, reject) {
              sourceFile.copyTo(targetDir, dbName, resolve, reject);
            }).then(function () {
              console.log("database file copied");
            });
          });
        });
      }

      copyDatabaseFile('data.db').then(function () {
        // success! :)
        app.data.db = window.sqlitePlugin.openDatabase({name: 'data.db'});

        var db = app.data.db;
            
        // if (db) {
  
          var now = new Date();
          var date = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
  
          app.data.db.transaction(function(tx) {
            tx.executeSql('delete from notifikasi where tgl < ?;', [date]);
          }, function(error) {
            app.dialog.alert('delete error: ' + error.message);
          });
        // }
  
      }).catch(function (err) {
        // error! :(
        console.log(err);
      }); //*/
    
      // if (mins > 5) {

        // jika lebih 8 jam, setup info login terakhir kali
        // $$('#my-login-screen [name="mbrid"]').val(localStorage.getItem('mbrid'));
        $$('#my-login-screen [name="nonsb"]').val(localStorage.getItem('nonsb'));

      // } else {

      //   // var mbrid = localStorage.getItem('mbrid');
      //   var nohp  = localStorage.getItem('nohp');
      //   var pin   = localStorage.getItem('pin');
      //   var gcmid = localStorage.getItem('RegId');

      //   // this.data.mbrid = mbrid;
      //   this.data.nohp = nohp;
      //   this.data.pin = pin;

      //   var formData = {};
      //   // formData.mbrid = mbrid;
      //   formData.nohp  = nohp;
      //   formData.pin   = pin;
      //   formData.gcmid = gcmid;
  
      //   this.preloader.show();

      //   this.request.post('http://212.24.111.23/koponline/auth/login', formData, function (res) {
    
      //     app.preloader.hide();
      //     var data = JSON.parse(res);
      
      //     if (data.status) {

      //       // set data token
      //       app.data.bLogedIn = true;
      //       app.data.nonsb = data.mbrid;
      //       app.data.token = data.token;
            
      //       // ambil informasi saldo member
      //       app.request.get('http://212.24.111.23/koponline/nasabah/saldo/'+data.mbrid, function (res) {
                
      //         var data = JSON.parse(res);
          
      //         if (data.status) {
      //           $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
      //           app.data.saldo = parseInt(data.saldo);
      //           $$('.bonus').text(parseInt(data.bonus).toLocaleString('ID'));
      //           app.data.bonus = parseInt(data.bonus);
      //         } else {
      //           app.dialog.alert(data.message);
      //         }
      //       });

      //     } else {
      //       // delete histori
      //       localStorage.removeItem('lastOpened');
      //       localStorage.removeItem('nohp');
      //       localStorage.removeItem('pin');
      //       navigator.app.exitApp();
      //     }
      //   });
      // }
    
      /*
      this.data.push = PushNotification.init({
        "android": {
            "senderID": "597497239727"
        },
        "ios": {
            "sound": true,
            "vibration": true,
            "badge": true
        },
        "windows": {}
      });

      var push = this.data.push;

      push.on('registration', function(data) {

        var oldRegId = localStorage.getItem('RegId');
        if (oldRegId !== data.registrationId) {
            // Save new registration ID
            localStorage.setItem('RegId', data.registrationId);
            // Post registrationId to your app server as the value has changed
            // app.dialog.alert('Registrasi Id berhasil!');
        }

      });

      push.on('notification', function(data) {
        
        var db = app.data.db;
    
        if (db) {
          
          var now = new Date();
          var date = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
          var time = now.getHours() + ":" + now.getMinutes()
          
          db.transaction(function(tx) {
              db.transaction(function(tx) {
                tx.executeSql('insert into notifikasi (tgl, jam, info) values (?, ?, ?);', [date, time, data.message]);
              }, function(error) {
                app.dialog.alert('insert error: ' + error.message);
              });
          });
        }
      
        // show message
        app.dialog.alert(data.message, 'ABC');
        
        // update info saldo
        setTimeout(function () {

          // http://212.24.111.23/
          app.request.get('http://212.24.111.23/koponline/nasabah/saldo/'+ app.data.nonsb, function (res) {
          
            var data = JSON.parse(res);
        
            if (data.status) {
              $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
              app.data.saldo = parseInt(data.saldo);
              $$('.bonus').text(parseInt(data.bonus).toLocaleString('ID'));
              app.data.bonus = parseInt(data.bonus);
            } else {
              app.dialog.alert(data.message, 'ABC');
            }
          });
        }, 1000);
      }); //*/
    },     
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});


// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

var swiper = app.swiper.create('.swiper-container', {
    speed: 400,
    //slidesPerView: auto,
    loop: true,
    //autoHeight: true,
    shortSwipes: false,
    longSwipes: false,
    //effect:'fade'
    //spaceBetween: 100
});

// swiper.autoplay.start();

// cek selisih waktu, jika lebih tampilkan form login
// if (mins > 5) {

//   var ls = app.loginScreen.create({ el: '#my-login-screen' });
//   ls.open(false);
// }

var ac_share = app.actions.create({
  buttons: [
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/whatsapp.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Whatsapp</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo berbagi cepek dan dapatkan berbagai keuntungan lewat aplikasi ini!\n\n' +
        'https://play.google.com/store/apps/details?id=com.app.pw.koponline';
        window.plugins.socialsharing.shareViaWhatsApp(msg, null, null, null, function(e){
          app.dialog.alert("Sharing failed with message: " + e, "ABC");
        })
      }
    },
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/telegram.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Telegram</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo berbagi cepek dan dapatkan berbagai keuntungan lewat aplikasi ini!\n\n' +
        'https://play.google.com/store/apps/details?id=com.app.pw.koponline';
        window.plugins.socialsharing.shareVia('org.telegram.messenger', msg, null, null, null, null, function(e){
          app.dialog.alert('Sharing failed with message: ' + e, 'ABC');
        })
      }
    },
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/facebook.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Facebook</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo berbagi cepek dan dapatkan berbagai keuntungan lewat aplikasi ini!\n\n' +
        'https://play.google.com/store/apps/details?id=com.app.pw.koponline';
        window.plugins.socialsharing.shareViaFacebook(msg, null, null, null, function(e){
          app.dialog.alert("Sharing failed with message: " + e, "ABC");
        })
      }
    },
    /*{
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"><img class="material-icons" src="img/twitter.png" /></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Twitter</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      onClick: function () {
        var msg = 'Ayo berbagi cepek dan dapatkan berbagai keuntungan lewat aplikasi ini!' +
        'https://play.google.com/store/apps/details?id=com.app.pw.koponline';
        window.plugins.socialsharing.shareViaTwitter(msg, null, 'https://twitter.com/', null, function(e){
          app.dialog.alert("Sharing failed with message: " + e, "ABC");
        })
      }
    },*/
    {
      text: '<div class="list"><ul><li><div class="item-content">'+
      '<div class="item-media"></div>'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">Cancel</div>'+
        '</div>'+
        '<div class="item-text"></div>'+
      '</div>'+
    '</div></li></ul></div>',
      color: 'red',
    },
  ]
});

$$('.ac-share').on('click', function () {
  ac_share.open();
});

// Login Screen
$$('#my-login-screen .login-button').on('click', function () {
  
  // var nohpx = $$('#my-login-screen [name="nohp"]').val();
  // if (nohpx === '') {
  //     app.dialog.alert('Masukkan nomor handphone anda.', 'Login Member');
  //     return;
  // }

  // var rgx_nohp = /[08][0-9]{9,}/;
  // var nohp = nohpx.trim().match(rgx_nohp);
  var nonsb = $$('#my-login-screen [name="nonsb"]').val();
  if (nonsb === '') {
    app.dialog.alert('Masukkan nomor handphone anda.', 'Login Member');
    return;
  }

  var pin = $$('#my-login-screen [name="pin"]').val();
  if (pin === '') {
    app.dialog.alert('Masukkan nomor PIN anda.', 'Login Member');
    return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.login-form');

  var regId = localStorage.getItem('RegId');
  formData.gcmid = regId;

  // console.log(formData)

  // http://212.24.111.23/
  app.request.post('http://212.24.111.23/koponline/auth/login', formData, function (res) {
    
    app.preloader.hide();
    
    var data = JSON.parse(res);

    if (data.status) {

      localStorage.setItem('nonsb', data.nonsb);
      localStorage.setItem('pin', pin);

      app.loginScreen.close('#my-login-screen');
      
      app.data.bLogedIn = true;
      app.data.nonsb = data.nonsb;
      app.data.pin = pin;
      app.data.token = data.token;
      
      // kosongkan isian nomor pin
      $$('#my-login-screen [name="pin"]').val('');
      
      app.methods.getData();
      // app.request.get('http://212.24.111.23/koponline/nasabah/saldo/'+data.nonsb, function (res) {
          
      //   var data = JSON.parse(res);
    
      //   if (data.status) {
      //     $$('.saldo').text(parseInt(data.saldo).toLocaleString('ID'));
      //     app.data.saldo = parseInt(data.saldo);
      //     $$('.bonus').text(parseInt(data.bonus).toLocaleString('ID'));
      //     app.data.bonus = parseInt(data.bonus);
      //   } else {
      //     app.dialog.alert(data.message, 'Akun Saya');
      //   }
      // });

    } else {
      app.dialog.alert(data.message, 'Login Member');
    }
  });
});

$$('a.label-register').on('click', function () {
  // Close login screen
  app.loginScreen.close('#my-login-screen');
  app.loginScreen.open('#my-reg-screen');
});


// Registrasi member
$$('#my-reg-screen .register-button').on('click', function () {
  
  var nama = $$('#my-reg-screen [name="nama"]').val();
  if (nama === '') {
      app.dialog.alert('Masukkan nama lengkap anda.', 'Registrasi Member');
      return;
  }
  
  var rgx_nama = /^[a-zA-Z]'?([a-zA-Z]|\,|\.| |-)+$/;
  var namax = nama.trim().match(rgx_nama);
  if (!namax) {
    app.dialog.alert('Input data nama belum benar.', 'Registrasi Member');
    return;
  }

  var nohpx = $$('#my-reg-screen [name="nohp"]').val();
  if (nohpx === '') {
      app.dialog.alert('Masukkan nomor handphone.', 'Registrasi Member');
      return;
  }

  var rgx_nohp = /[08][0-9]{9,}/;
  var nohp = nohpx.trim().match(rgx_nohp);
  if (!nohp) {
    app.dialog.alert('Input data nomor handphone belum benar.', 'Registrasi Member');
    return;
  }

  app.preloader.show();
  
  var regId = localStorage.getItem('RegId');
  var formData = app.form.convertToData('.register-form');

  // formData.mbrid = 1; cause wrong result
  formData.gcmid = regId;

  app.request.post('http://212.24.111.23/koponline/nasabah', formData, function (res) {
    
    app.preloader.hide();
    
    var data = JSON.parse(res);

    if (data.status) {
      
      // simpan data nomor handphone
      localStorage.setItem('nonsb', data.nonsb);
      localStorage.setItem('pin', '1234');

      app.data.nonsb = data.nonsb;
      app.data.pin = '1234';

      // set data ke form login
      $$('#my-login-screen [name="nonsb"]').val(data.nonsb);

      app.loginScreen.close('#my-reg-screen');
      app.loginScreen.open('#my-login-screen');
    
      // setTimeout(function () {
        app.dialog.alert(data.message, 'Registrasi Member');
      // }, 2000);

    } else {
      app.dialog.alert(data.message, 'Registrasi Member');
    }
  });
});

$$('a.label-login').on('click', function () {
  // Close register screen
  app.loginScreen.close('#my-reg-screen');
  app.loginScreen.open('#my-login-screen');
});

$$('#my-login-screen').on('loginscreen:opened', function (e, loginScreen) {
  // set data ke form login
  // $$('#my-login-screen [name="mbrid"]').val(localStorage.getItem('mbrid'));
  $$('#my-login-screen [name="nohp"]').val(localStorage.getItem('nohp'));
});


// ganti pin
$$('#ganti-pin .btnGanti').on('click', function () {
  
  var pinlama = $$('#ganti-pin [name="pinlama"]').val();
  var pinbaru = $$('#ganti-pin [name="pinbaru"]').val();
  
  if (pinlama === '') {
      app.dialog.alert('Masukkan nomor pin yang lama.', 'Ganti PIN');
      return;
  } else
  if (pinlama !== app.data.pin) {
    app.dialog.alert('Input nomor pin yang lama belum benar.', 'Ganti PIN');
    return;
  } else
  if (pinbaru === '') {
      app.dialog.alert('Masukkan nomor pin yang baru.', 'Ganti PIN');
      return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.ganti-pin');
  formData.Authorization = app.data.token;
  
  app.request.post('http://212.24.111.23/koponline/nasabah/gantipin', formData, function (res) {
    
    app.preloader.hide();
    
    var data = JSON.parse(res);

    if (data.status) {

      app.data.pin = pinbaru;
      app.data.token = data.token;

      localStorage.setItem('pin', pinbaru);

      $$('#ganti-pin [name="pinlama"]').val('');
      $$('#ganti-pin [name="pinbaru"]').val('');
      
      app.popup.close($$('.page[data-name="ganti-pin"]').parents(".popup"));
      app.dialog.alert('Data nomor PIN anda telah kami update.', 'Ganti PIN');
    } else {
      app.dialog.alert(data.message, 'Ganti PIN');
    }
  });
});

$$('#ganti-pin').on('popup:closed', function (e, popup) {
  $$('#ganti-pin [name="pinlama"]').val('');
  $$('#ganti-pin [name="pinbaru"]').val('');
});

$$(document).on('backbutton', function (e) {

  e.preventDefault();

  // for example, based on what and where view you have
  var leftp  = app.panel.left && app.panel.left.opened;
  var rightp = app.panel.right && app.panel.right.opened;
  
  if (leftp || rightp) {

      app.panel.close();
      return false;
  } else
  if ($$('.modal-in').length > 0) {

      navigator.app.exitApp();
      return false;
  } else
  if (app.views.main.router.url === '/') {
    
    // if (app.data.bLogedIn) {
    //   // catat waktu terakhir pemakaian
    //   var dateEnd = new Date().getTime();
    //   localStorage.setItem('lastOpened', dateEnd);
    // }

    navigator.app.exitApp();
  } else {
    mainView.router.back();
  }
});

$$('#my-login-screen').on('loginscreen:close', function (e, loginScreen) {

  $$('#my-login-screen [name="pin"]').val('');
});

app.on('pageInit', function (page) {

  $$('input').on('focus', function () {
    
    $$('.kb').css('height', '280px');
    //var limit = $$(window).height() - 280;

    if ($$(this).offset().top > 280) {
      $$('.page-content').scrollTop($$(this).offset().top-168);
    }
  });

  $$('input').on('blur', function () {
    $$('.kb').css('height', '0px');
  });
});
