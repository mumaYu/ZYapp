// npm install express --savs-dev
const express = require("express");
const app = express();
// 引用 config.js
const conf = require("./config");
//  npm install request --save 命令行安装方法
const request = require("request");
//  npm install cheerio --save 命令行安装方法
const cheerio = require("cheerio");
//  express  request  cheerio  用法，百度可查，express官网，npm官网

const bodyParser = require("body-parser");
//转码
const iconv = require('iconv-lite');



// 头部文件，引用依赖包
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
  else next();
});
app.use(express.static("img"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * 获取乐读网页面数据
 * 访问地址：http://127.0.0.1:8088/wzlist
 */

 app.get("/wzlist", function (req, res) {
  // var pageid = req.query.page;
  request(`${conf.wz1}`, {encoding:'binary'},function (error, response, body) {
    var info =  iconv.decode(body, 'gb2312');
    const $ = cheerio.load(info);
    let List = $(".e2 li");
    //console.log(List)
    // 定义 topdzlist 数组
    let wzlist = [];
    // cheerio 提供的 .each 方法
    List.each(function (ele) {
      // topdzlist 数组存放循环数据，并且定义 key 值， index 数组下标
      wzlist.push({
        // $(this) 指向 function 里的 ele， .find 查找指定位置， .text 获取指定位置数据
        img: $(this)
          .find("a:nth-of-type(1) img")
          .attr('src'),
        userid: $(this)
          .find("a:nth-of-type(2)")
          .text(),
        cont: $(this)
          .find("p")
          .text(),
        infourl:$(this)
        .find("a:nth-of-type(1)")
        .attr('href')
      });
    });
    // 将 dzlist 里的数据以 json 格式发送到前端，res.json experss 语法
    res.json(wzlist);
  })
})

/**
 * 获取乐读网单页面数据
 * 访问地址：http://127.0.0.1:8088/wzInfo?infoUrl=a/rensheng/53659.html
 * 'a/rensheng/53659.html'
 */
app.get("/wzInfo", function (req, res) {

  var infoUrl = req.query.infoUrl

  request(`${conf.wzInfo}${infoUrl}`, {encoding:'binary'},function (error, response, body) {
    var info =  iconv.decode(body, 'gb2312');
    const $ = cheerio.load(info);
    let infoList = $(".content td p")
    let infoListArr = []
    infoList.each(function (ele){
        infoListArr.push({
          p: $(this).text()
        })
    })
    console.log(infoList)
    res.json(infoListArr);
    // let infoList = $(".content td p")
    // let infoListArr = []
    // for(var i=0;i<20;i++){
    //   infoListArr.push({
    //     p:$(infoList[i]).text()
    //     // imgurl:$(infoList[i]).find("div img").attr('src')
    //   })
    // }
    // // let infoListImg = $(".content td div")
    // // let infoListImgArr = []
    // // infoListImgArr.push({
    // //   img:$(infoListImg).find("img").attr('src')
    // // })
    
    // res.json(infoListImgArr);
  })
})


// app.get("/wz", function (req, res) {
//   request(`${conf.wz}`, function (error, response, body) {
//     const $ = cheerio.load(body);
//     let List = $(".list_title");
//     //console.log(List)
//     // 定义 topdzlist 数组
//     let wzlist = [];
//     // cheerio 提供的 .each 方法
//     List.each(function (index, ele) {
//       // topdzlist 数组存放循环数据，并且定义 key 值， index 数组下标
//       wzlist.push({
//         // $(this) 指向 function 里的 ele， .find 查找指定位置， .text 获取指定位置数据
//         posid: $(this)
//           .find("ul li b a")
//           .text(),
//       });
//     });
//     // 将 dzlist 里的数据以 json 格式发送到前端，res.json experss 语法
//     res.json(wzlist);
//   })
// })

/**
 * 获取煎蛋网，段子内容
 * 访问地址：http://127.0.0.1:8088/index?page=65
 */
app.get("/index", function (req, res) {
  // pageid 在后端要手动在地址栏中输入 例： http://127.0.0.1:8088/index?page=65  使用  GET 传值方法  ？page=
  // req.query 接收 GET 的传值，值是一个数组形式
  var pageid = req.query.page;
  //console.log(req.query);

  // request 发送数据请求，抓取整个 HTML 页面
  request(`${conf.url}${pageid}`, function (error, response, body) {
    // 定义 ' $ ' 用来将抓取的 HTML 页面，转换格式
    const $ = cheerio.load(body);

    // express 写法，定义 List 接收数据里面指定位置数据  .commentlist li 意思是指，类 commentlist 下面 li 位置
    let List = $(".commentlist li");
    // console.log(List);
    // 定义 dzlist 数组
    let dzlist = [];
    // cheerio 提供的 .each 方法
    List.each(function (index, ele) {
      // dzlist 数组存放循环数据，并且定义 key 值， index 数组下标
      dzlist.push({
        id: index + 1,
        // $(this) 指向 function 里的 ele， .find 查找指定位置， .text 获取指定位置数据
        posid: $(this)
          .find(".text a")
          .text(),
        author: $(this)
          .find(".author strong")
          .text(),
        content: $(this)
          .find(".text p")
          .text(),
        headimg: `${conf.headurl}${index + 1}.jpg`,
        pubtime: $(this)
          .find(".author small a")
          .text(),
        like: $(this)
          .find(".tucao-like-container span")
          .text(),
        unlike: $(this)
          .find(".tucao-unlike-container span")
          .text()
      });
    });
    // 将 dzlist 里的数据以 json 格式发送到前端，res.json experss 语法
    //res.json(dzlist);
    res.json({
      status: 200,
      maxPage: (($(".cp-pagenavi .current-comment-page").text()).replace(/[^0-9]/ig, "")).substring(0, 2),
      datas: dzlist
    });
  });
});

/**
 * 获取对应段子的评论
 * 访问地址：http://127.0.0.1:8088/tucao?postid=3990367
 */
app.get("/tucao", function (req, res) {
  let postid = req.query.postid;
  // console.log(res)
  request(`${conf.TuCaourl}${postid}`, function (error, response, body) {
    res.json(JSON.parse(body));
  });
});

/**
 * 热门段子内容
 * 访问地址：http://127.0.0.1:8088/topduan
 */
app.get("/topduan", function (req, res) {
  request(`${conf.topduanurl}`, function (error, response, body) {
    const $ = cheerio.load(body);
    let List = $(".commentlist li");
    //console.log(List)
    // 定义 topdzlist 数组
    let topduanlist = [];
    // cheerio 提供的 .each 方法
    List.each(function (index, ele) {
      // topdzlist 数组存放循环数据，并且定义 key 值， index 数组下标
      topduanlist.push({
        id: index + 1,
        // $(this) 指向 function 里的 ele， .find 查找指定位置， .text 获取指定位置数据
        posid: $(this)
          .find(".text span")
          .text(),
        author: $(this)
          .find(".author strong")
          .text(),
        content: $(this)
          .find(".text p")
          .text(),
        headimg: `${conf.headurl}${index + 1}.jpg`,
        like: $(this)
          .find(".jandan-vote span:nth-of-type(1)")
          .text(),
        unlike: $(this)
          .find(".jandan-vote span:nth-of-type(2)")
          .text()
      });
    });
    // 将 dzlist 里的数据以 json 格式发送到前端，res.json experss 语法
    res.json(topduanlist);
  })
})


/**
 * 实现发布新的段子内容
 * 访问地址：http://127.0.0.1:8088/comment
 */
app.post("/comment", function (req, res) {
  var formData = {
    author: req.body.author,
    email: req.body.email,
    comment: req.body.comment,
    comment_post_ID: "55592"
  };

  request.post(
    { url: `${conf.Commenturl}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      res.json({
        status: "200",
        postid: body
      });
    }
  );
});





app.post("/SetPostcomment", function (req, res) {
  var formData = {
    author: req.body.author,
    email: req.body.email,
    content: req.body.comment,
    comment_id: req.body.postid
  };


  request.post(
    { url: `${conf.TuCaoComment}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      res.json({
        status: "200",
        postid: JSON.parse(body)
      });
    }
  );
});

/**
 * 实现对段子文章的点赞
 * 访问地址：http://127.0.0.1/like
 */
app.post("/like", function (req, res) {
  // 前端传过来的操作类型，like 表示喜欢，其他都是不喜欢
  let type = req.body.type
  var formData = {
    comment_id: req.body.postid,
    data_type: "comment"
  };

  if (type == "like") {
    formData.like_type = "pos"
  } else {
    formData.like_type = "neg"
  }

  request.post(
    { url: `${conf.Likeurl}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        console.log(err)
        return console.error("upload failed:", err);
      }
      res.json({
        status: "200",
        postid: body
      });
    }
  );
});


/**
 * 获取快手主播主页的视频数据
 * https://live.kuaishou.com/profile/
 * http://127.0.0.1:8088/profile
 */
app.get("/profile", function (req, res) {
  var userid = req.query.userid;

  request(`${conf.kuaiShou}${userid}`, function (error, response, body) {
    var data = body.match(/VUE_MODEL_INIT_STATE\[\'profileGallery\'\]=([\s\S]*?);/)[1]
    res.json(JSON.parse(data))
  })
})

/**
 * 获取花瓣网图片数据
 * https://live.kuaishou.com/profile/
 * http://127.0.0.1:8088/huaban
 */

app.get("/huabangaoxiao", function(req, res) {
  var options = {
    url:`${conf.gaoxiao}`,
    headers: {
      // 'User-Agent': 'request',
      'Accept': 'application/json',
      // 'Accept-Language': 'zh-CN,zh;q=0.9',
      'Host': 'huaban.com',
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)',
      // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
      'X-Request': 'JSON',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
   // request 发送数据请求，抓取整个 HTML 页面
   request(options, function(error, response, body) {
    // 定义 ' $ ' 用来将抓取的 HTML 页面，转换格式
    const $ = JSON.parse(body);
    // let huaList = [];
    // for(var i=0;i<$.pins.length;i++){
    //   huaList.push($.pins[i].user)
    // }
    res.json($)
  });
});

app.get("/huabanhaizei", function(req, res) {
  var options = {
    url:`${conf.haizei}`,
    headers: {
      // 'User-Agent': 'request',
      'Accept': 'application/json',
      // 'Accept-Language': 'zh-CN,zh;q=0.9',
      'Host': 'huaban.com',
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)',
      // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
      'X-Request': 'JSON',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
   // request 发送数据请求，抓取整个 HTML 页面
   request(options, function(error, response, body) {
    // 定义 ' $ ' 用来将抓取的 HTML 页面，转换格式
    const $ = JSON.parse(body);
    // let huaList = [];
    // for(var i=0;i<$.pins.length;i++){
    //   huaList.push($.pins[i].user)
    // }
    res.json($)
  });
});

app.get("/huaban", function(req, res) {
  // let q = encodeURI(req.query.q);
  // console.log(q)
  var options = {
    // url: `http://huaban.com/search/?q=${q}&jnddp7px&page=4&per_page=30&wfl=1`,
    url: `${conf.Huabanurl}`,
    headers: {
      // 'User-Agent': 'request',
      'Accept': 'application/json',
      // 'Accept-Language': 'zh-CN,zh;q=0.9',
      'Host': 'huaban.com',
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)',
      // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
      'X-Request': 'JSON',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
  // req.query.page >= 0 ? URL = `${conf.IndexUrl}/page-${pageid}` :  URL =  `${conf.IndexUrl}`
  //console.log(req.query.page);

  // request 发送数据请求，抓取整个 HTML 页面
  request(options, function(error, response, body) {
    // 定义 ' $ ' 用来将抓取的 HTML 页面，转换格式
    const $ = JSON.parse(body);
    // let huaList = [];
    // for(var i=0;i<$.pins.length;i++){
    //   huaList.push($.pins[i].user)
    // }
    res.json($)
  });
});

























// 将程序运行在本地服务器 8088 的端口
app.listen(8088, function () {
  console.log("Example app listening on port 8088!");
});

// console.log(conf);