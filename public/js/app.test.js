let ajax = require("./all.js");

test("GetAjax Function", done => {
  function callback(response) {
    expect(response.XML_Head.Infos.Info.length).toBeGreaterThan(0);
    expect(response.XML_Head.Listname).toBe("2");
    expect(response.XML_Head.Language).toBe("C");
    expect(response.XML_Head.Orgname).toBe("315080000H");
    expect(response).not.toBeNull();
    done();
  }
  ajax(
    "https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",
    function(response) {
      callback(response);
    }
  );
}, 12000);


