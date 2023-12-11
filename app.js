const express = require('express');  //Express JS'i dahil ediyoruz.
const data = require('./menu.json'); //menu.json adından JSON dosyamızı dahil ediyoruz.
const port = 3000;
  
// App oluşturuyoruz.
const app = express();
  
// localhost:{port}/menu adresinde "GET" isteği ile istek atıldığında, 
// isteğe karşılık gelecek cevap için oluşan alan
app.get('/menu', (req, res, next) => {
  
  //-----Varsayılan değerler-----//
  // GET:localhost:{port}/menu yaptığımız zaman istek parametleri girmediğimiz zaman
  // (örnek:/menu?sayfa=3) json dosyasından varsayalın değerlere göre cevaplar gelir
  
  let sayfa = 1; //sayfa değişkeni, aslında indexte diyebiliriz
  let limit = 4; // Kaç adet içerik göstereceğini belirtir (içerik: sayfa, index)
  s = ""; // s değişkeni, sorgulanacak kelime değişkeni ifade eder.
  
  let sonucDondur = {}; // Request Context özelliği ile bize
  // JSON formatında dönecek cevapların tutulacağı değişken
  
  
  ///menu?sayfa'da değer varsa sayfa değişkenine eklenir
  if(req.query.sayfa)
  {
   
    sayfa = parseInt(req.query.sayfa);
  }
  ///menu?limit'de değer varsa limit değişkenine eklenir
  if(req.query.limit)
  {
    
    limit = parseInt(req.query.limit);
  }
  //Limit ve sayfa değişkenine göre atlama değişkeni ayarlanır.
  let atlama = ((sayfa-1)*limit);

  // /menu?s (sorgulanacak kelime varsa) s değişkenine atanır ve buna göre de cevaplar döndürülür
  if(req.query.s)
  {
    
    for(var i = atlama; i<atlama+limit;i++)
    {    
        //Düzenli ifadeler ile büyük, küçük harf duyarlılığını kaldırıp, 
        //Türkçe kurallarına da uymasını sağlıyoruz 
        if(data[i].isim.search(new RegExp(req.query.s,'ui','g')) != -1 )
      {
        //sağlıyorsa sonucDondur dizisine aktarılıyor
        sonucDondur[i] = data[i];
      }
    
      
    }
  }else
  {
    // Request parametlerinde, Limit ve sayfa belirtilmiştir ama
    sonucDondur = data.slice(atlama, atlama+limit);
  }
 
  
  //İşlemlerin sonucunda sonucDondur dizisi bize cevap olarak geliyor.
  res.send(sonucDondur);
  
  
});
  
//Port 3000 portundan başlatıldı.
app.listen(port, () => {
  console.log(`${port} portu üzerinden dinleniyor`);
});


