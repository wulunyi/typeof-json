export default `
const RootName = { // 广点通
  "channelName": "广点通", // 渠道名
  "channelTag": "第三方adx标示", // 渠道标签
  "adPos": [
      {
          "games": {
              "showName": "游戏",
              "pathName": "firstCategory",
              "value": {
                  "shoot": {
                      "showName": "射击",
                      "pathName": "secondeCategory",
                      "value": {
                          "stimulate": {
                              "showName": "刺激战场",
                              "pathName": "media",
                              "value": {
                                  "113232": {
                                      "pathName": "slotId",
                                      "showName": "底部小图"
                                  },
                                  "123232": {
                                      "pathName": "slotId",
                                      "showName": "中部小图"
                                  }
                              }
                          },
                          "red": {
                              "showName": "红色战场",
                              "pathName": "media",
                              "value": {
                                  "123232": {
                                      "showName": "中部小图"
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  ]
}
`;
