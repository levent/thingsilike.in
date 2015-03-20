if(!!document.getElementById('instafeed')){
  var feed = new Instafeed({
    get: 'user',
    userId: 1049440,
    accessToken: '1049440.467ede5.9359d166205645c48e4eec075239cb66'
  });
  feed.run();
}
