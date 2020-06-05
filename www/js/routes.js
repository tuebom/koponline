routes = [
  {
    path: '/',
    url: './index.html',
    on: {
      pageInit: function (event, page) {
        
        // app.request.get('http://212.24.111.23/koponline/sistem/last_update', function (res) {
            
        //   var data = JSON.parse(res);
        //   // console.log(res)
        
        //   if (data.status) {
        //       $$('.lupdate').text(data.data);
        //   } else {
        //     app.dialog.alert(data.message, 'Koperasi');
        //   }
        // });
        
        // if (!app.data.bUpdated) {

        //   app.data.bUpdated = true;
          
        //   app.request.get('http://212.24.111.23/koponline/nasabah/'+app.data.nonsb, function (res) { // + app.data.nonsb
            
        //     var data = JSON.parse(res);
          
        //     if (data.status) {
        //         var html = '<div class="card">'
        //         html += '  <div class="card-content">'
        //         html += '    <div class="card-content-inner"><b>DATA NASABAH</b><br>Nama: ' + data.nama
        //         html += '    <br>Alamat: ' + data.alamat + '</div>'
        //         html += '  </div>'
        //         html += '</div>'
        //         $$('.page-content').append(html)
        //     } else {
        //       app.dialog.alert(data.message, 'Koperasi');
        //     }
        //   });
  
          // app.request.get('http://212.24.111.23/koponline/sistem/is_anggota/'+app.data.nonsb, function (res) {
            
          //   var data = JSON.parse(res);

          //   if (data.status) {

          //     var data = JSON.parse(res);

          //     var html = '<div class="card">'
          //     html += '  <div class="card-content">'
          //     html += '    <div class="card-content-inner"><b>SIMPANAN POKOK</b><br>Rp' + data.pokok +'</div>'
          //     html += '  </div>'
          //     html += '</div>'
          //     $$('.page-content').append(html)
          //   // } else {
          //   //   app.dialog.alert(data.message, 'Koperasi');
          //   }
          // });
          
          // app.request.get('http://212.24.111.23/koponline/nasabah/infosw/'+app.data.nonsb, function (res) { // + app.data.nonsb
            
          //   var data = JSON.parse(res);
          
          //   if (data.status) {
          //       var html = '<div class="card">'
          //       html += '  <div class="card-content">'
          //       html += '    <div class="card-content-inner"><b>SIMPANAN WAJIB</b><br>Saldo: ' + data.saldo
          //       html += '    <br>Nominal setoran: 100.000'
          //       html += '    <br>Status: ' + (data.stbayar == '') ? 'BELUM BAYAR':'SUDAH BAYAR'; +'</div>'
          //       html += '  </div>'
          //       html += '</div>'
          //       $$('.page-content').append(html)
          //   } else {
          //     app.dialog.alert(data.message, 'Koperasi');
          //   }
          // });
          
          /*app.request.get('http://212.24.111.23/koponline/nasabah/infotab/'+app.data.nonsb, function (res) { // + app.data.nonsb
            
            var data = JSON.parse(res);
          
            if (data.status) {
                var html = '<div class="card">'
                html += '  <div class="card-content">'
                html += '    <div class="card-content-inner"><b>' + data.nama + '</b><br>Saldo: ' + data.saldo
                html += '    <br>Nominal setoran: 100.000'
                html += '    <br>Status: BELUM BAYAR</div>'
                html += '  </div>'
                html += '</div>'
                $$('.page-content').append(html)
            } else {
              app.dialog.alert(data.message, 'Koperasi');
            }
          });*/
          
          // app.request.get('http://212.24.111.23/koponline/nasabah/infokrd/'+app.data.nonsb, function (res) { // + app.data.nonsb
            
          //   var data = JSON.parse(res);
          
          //   if (data.status) {
          //       var html = '<div class="card">'
          //       html += '  <div class="card-content">'
          //       html += '    <div class="card-content-inner"><b>PINJAMAN</b><br>Sisa angsuran: ' + data.sisa
          //       html += '    <br>Nominal angsuran: '+data.angspk
          //       html += '    <br>Angsuran '+data.angsur+'/'+data.jwaktu+'</div>'
          //       html += '    <br>Status: ' + (data.stbayar == '') ? 'BELUM BAYAR':'SUDAH BAYAR'; +'</div>'
          //       html += '  </div>'
          //       html += '</div>'
          //       $$('.page-content').append(html)
          //   } else {
          //     app.dialog.alert(data.message, 'Koperasi');
          //   }
          // });
          
          /*app.request.get('http://212.24.111.23/koponline/sistem/antrian', function (res) { // + app.data.nonsb
            
            var data = JSON.parse(res);
          
            if (data.status) {
                var html = '<div class="card">'
                html += '  <div class="card-content">'
                html += '    <div class="card-content-inner"><b>ANTRIAN PERMOHONAN KREDIT</b>'
                html += '    <br>Nominal setoran: 100.000'
                html += '    <br>Status: BELUM BAYAR</div>'
                html += '  </div>'
                html += '</div>'
                $$('.page-content').append(html)
            } else {
              app.dialog.alert(data.message, 'Koperasi');
            }
          });*/
        // }

      },
      pageBeforeIn: function (event, page) {
        
        // call ajax request to update
        // setTimeout(function () {

        //   // http://212.24.111.23/
        app.request.get('http://212.24.111.23/koponline/sistem/last_update', function (res) {
            
          var data = JSON.parse(res);
          console.log(res)
        
          if (data.status) {
              $$('.lupdate').text(data.data);
          } else {
            app.dialog.alert(data.message, 'Koperasi');
          }
        });
        // }, 1000);

        // var html = '<div class="card">'
        // html += '  <div class="card-content">'
        // html += '    <div class="card-content-inner"><b>SIMPANAN POKOK</b><br>Rp100.000</div>'
        // html += '  </div>'
        // html += '</div>'
        // $$('.page-content').append(html)
      }
    }
        
  },
  {
    path: '/inbox/',
    componentUrl: './pages/inbox.html',
  },
  {
    path: '/akun/',
    url: './pages/akun.html',
    on: {
      pageInit: function (event, page) {
        
        var nonsb = app.data.nonsb;
        
        // app.request.get('http://212.24.111.23/koponline/sistem/last_update', function (res) {
            
        //   var data = JSON.parse(res);
        
        //   if (data.status) {
        //     $$('#saldo').text(parseInt(data.saldo).toLocaleString('ID'));
        //     app.data.saldo = parseInt(data.saldo);

        //     // $$('#poin').text(parseInt(data.poin).toLocaleString('ID'));
        //     // app.data.poin = parseInt(data.poin);

        //     $$('#bonus').text(parseInt(data.bonus).toLocaleString('ID'));
        //     app.data.bonus = parseInt(data.bonus);

        //   } else {
        //     app.dialog.alert(data.message, 'Akun Saya');
        //   }
        // });
        
        $$('.cek-id').on('click', function(e){
          
          app.request.get('http://212.24.111.23/koponline/nasabah/cek_id/'+ app.data.nonsb, function (res) {
            
            var data = JSON.parse(res);
    
            // if (data.status) {
              app.dialog.alert(data.message, 'Akun Saya');
            // } else {
              // app.dialog.alert(data.message, 'Akun Saya');
            // }
          });
        });
      }
    }
  },
  {
    path: '/mhn-kredit/',
    url: './pages/permohonan.html',
    on: {
      pageInit: function (event, page) {
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var pokok = $$('#pokok').val();
          
          if (pokok == '') {
              app.dialog.alert('Masukkan jumlah pokok pinjaman.', 'Permohonan Kredit');
              return;
          }
          
          var jwaktu = $$('#jwaktu').val();
          
          if (jwaktu == '') {
              app.dialog.alert('Masukkan jangka waktu pinjaman.', 'Permohonan Kredit');
              return;
          }

          app.preloader.show();

          var formData = app.form.convertToData('.mohon');
          formData.nonsb = app.data.nonsb;
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/koponline/kredit/input', formData, function (res) {
            
            app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              app.router.back();
            } else {
              app.dialog.alert(data.message, 'Permohonan Kredit');
            }
          });
        });
      
      },
    }
  },
  {
    path: '/komplain/',
    url: './pages/komplain.html',
    on: {
      pageInit: function (event, page) {
      
        $$('.btnKirim').on('click', function(e){
          //e.preventDefault();
          
          var info = $$('#info').val();
          
          if (info == '') {
              app.dialog.alert('Masukkan pesan info/komplain.', 'Info / Komplain');
              return;
          }
          
          app.preloader.show();

          var formData = app.form.convertToData('.komplain');
          formData.Authorization = app.data.token;
          
          app.request.post('http://212.24.111.23/koponline/nasabah/komplain', formData, function (res) {
            
            app.preloader.hide();
            
            var data = JSON.parse(res);
        
            if (data.status) {
              app.router.back();
            } else {
              app.dialog.alert(data.message, 'Info / Komplain');
            }
          });
        });
      
        // if ( AdMob ) {
          // AdMob.hideBanner();
        // }
      },
      // pageAfterOut: function (event, page) {
      
        // if ( AdMob ) {
          // AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        // }
      // }
    }
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
