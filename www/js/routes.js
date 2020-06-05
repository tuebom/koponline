routes = [
  {
    path: '/',
    url: './index.html',
    on: {
      pageInit: function (event, page) {
      },
      pageBeforeIn: function (event, page) {
        
        // call ajax request to update
        // setTimeout(function () {

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
      }
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
