import {EmojiInferface} from './interface'
let emojiList: Array<EmojiInferface> = [
  {
    id: 0,
    className: 'emoji-01',
    imgName: 'emoji_01',
    title: '[可爱]'
  },
  {
    id: 1,
    className: 'emoji-00',
    imgName: 'emoji_00',
    title: '[大笑]'
  },
  {
    id: 2,
    className: 'emoji-02',
    imgName: 'emoji_02',
    title: '[色]'
  },
  {
    id: 3,
    className: 'emoji-03',
    imgName: 'emoji_03',
    title: '[嘘]'
  },
  {
    id: 4,
    className: 'emoji-04',
    imgName: 'emoji_04',
    title: '[亲]'
  },
  {
    id: 5,
    className: 'emoji-05',
    imgName: 'emoji_05',
    title: '[呆]'
  },
  {
    id: 6,
    className: 'emoji-06',
    imgName: 'emoji_06',
    title: '[口水]'
  },
  {
    id: 7,
    className: 'emoji-145',
    imgName: 'emoji_145',
    title: '[汗]'
  },
  {
    id: 8,
    className: 'emoji-07',
    imgName: 'emoji_07',
    title: '[呲牙]'
  },
  {
    id: 9,
    className: 'emoji-08',
    imgName: 'emoji_08',
    title: '[鬼脸]'
  },
  {
    id: 10,
    className: 'emoji-09',
    imgName: 'emoji_09',
    title: '[害羞]'
  },
  {
    id: 11,
    className: 'emoji-10',
    imgName: 'emoji_10',
    title: '[偷笑]'
  },
  {
    id: 12,
    className: 'emoji-11',
    imgName: 'emoji_11',
    title: '[调皮]'
  },
  {
    id: 13,
    className: 'emoji-12',
    imgName: 'emoji_12',
    title: '[可怜]'
  },
  {
    id: 14,
    className: 'emoji-13',
    imgName: 'emoji_13',
    title: '[敲]'
  },
  {
    id: 15,
    className: 'emoji-14',
    imgName: 'emoji_14',
    title: '[惊讶]'
  },
  {
    id: 16,
    className: 'emoji-15',
    imgName: 'emoji_15',
    title: '[流感]'
  },
  {
    id: 17,
    className: 'emoji-16',
    imgName: 'emoji_16',
    title: '[委屈]'
  },
  {
    id: 18,
    className: 'emoji-17',
    imgName: 'emoji_17',
    title: '[流泪]'
  },
  {
    id: 19,
    className: 'emoji-18',
    imgName: 'emoji_18',
    title: '[嚎哭]'
  },
  {
    id: 20,
    className: 'emoji-19',
    imgName: 'emoji_19',
    title: '[惊恐]'
  },
  {
    id: 21,
    className: 'emoji-20',
    imgName: 'emoji_20',
    title: '[怒]'
  },
  {
    id: 22,
    className: 'emoji-21',
    imgName: 'emoji_21',
    title: '[酷]'
  },
  {
    id: 23,
    className: 'emoji-22',
    imgName: 'emoji_22',
    title: '[不说]'
  },
  {
    id: 24,
    className: 'emoji-23',
    imgName: 'emoji_23',
    title: '[鄙视]'
  },
  {
    id: 25,
    className: 'emoji-24',
    imgName: 'emoji_24',
    title: '[阿弥陀佛]'
  },
  {
    id: 26,
    className: 'emoji-25',
    imgName: 'emoji_25',
    title: '[奸笑]'
  },
  {
    id: 27,
    className: 'emoji-26',
    imgName: 'emoji_26',
    title: '[睡着]'
  },
  {
    id: 28,
    className: 'emoji-27',
    imgName: 'emoji_27',
    title: '[口罩]'
  },
  {
    id: 29,
    className: 'emoji-28',
    imgName: 'emoji_28',
    title: '[生气]'
  },
  {
    id: 30,
    className: 'emoji-29',
    imgName: 'emoji_29',
    title: '[抠鼻孔]'
  },
  {
    id: 31,
    className: 'emoji-30',
    imgName: 'emoji_30',
    title: '[疑问]'
  },
  {
    id: 32,
    className: 'emoji-31',
    imgName: 'emoji_31',
    title: '[怒骂]'
  },
  {
    id: 33,
    className: 'emoji-32',
    imgName: 'emoji_32',
    title: '[晕]'
  },
  {
    id: 34,
    className: 'emoji-33',
    imgName: 'emoji_33',
    title: '[呕吐]'
  },
  {
    id: 35,
    className: 'emoji-160',
    imgName: 'emoji_160',
    title: '[拜一拜]'
  },
  {
    id: 36,
    className: 'emoji-161',
    imgName: 'emoji_161',
    title: '[惊喜]'
  },
  {
    id: 37,
    className: 'emoji-162',
    imgName: 'emoji_162',
    title: '[流汗]'
  },
  {
    id: 38,
    className: 'emoji-163',
    imgName: 'emoji_163',
    title: '[卖萌]'
  },
  {
    id: 39,
    className: 'emoji-164',
    imgName: 'emoji_164',
    title: '[默契眨眼]'
  },
  {
    id: 40,
    className: 'emoji-165',
    imgName: 'emoji_165',
    title: '[烧香拜佛]'
  },
  {
    id: 41,
    className: 'emoji-166',
    imgName: 'emoji_166',
    title: '[晚安]'
  },
  {
    id: 42,
    className: 'emoji-116',
    imgName: 'new_emoji_01',
    title: '[撇嘴]'
  },
  {
    id: 43,
    className: 'emoji-117',
    imgName: '1f641',
    title: '[难过]'
  },
  {
    id: 44,
    className: 'emoji-118',
    imgName: '1f628',
    title: '[冷汗]'
  },
  {
    id: 45,
    className: 'emoji-119',
    imgName: '1f629',
    title: '[抓狂]'
  },
  {
    id: 46,
    className: 'emoji-120',
    imgName: '1f615',
    title: '[傲慢]'
  },
  {
    id: 47,
    className: 'emoji-121',
    imgName: '1f62a',
    title: '[困]'
  },
  {
    id: 48,
    className: 'emoji-123',
    imgName: '1f616',
    title: '[疯了]'
  },
  {
    id: 49,
    className: 'emoji-124',
    imgName: 'new_emoji_02',
    title: '[白眼]'
  },
  {
    id: 50,
    className: 'emoji-125',
    imgName: 'new_emoji_05',
    title: '[衰]'
  },
  {
    id: 51,
    className: 'emoji-126',
    imgName: 'new_emoji_06',
    title: '[再见]'
  },
  {
    id: 52,
    className: 'emoji-127',
    imgName: '1f63e',
    title: '[哼哼]'
  },
  {
    id: 53,
    className: 'emoji-129',
    imgName: 'new_emoji_03',
    title: '[饥饿]'
  },
  {
    id: 54,
    className: 'emoji-143',
    imgName: 'new_emoji_10',
    title: '[飞吻]'
  },
  {
    id: 55,
    className: 'emoji-144',
    imgName: '1f642',
    title: '[微笑]'
  },
  {
    id: 56,
    className: 'emoji-168',
    imgName: 'new_emoji_13',
    title: '[泪中带笑]'
  },
  {
    id: 57,
    className: 'emoji-146',
    imgName: '1f61d',
    title: '[吐舌头]'
  },
  {
    id: 58,
    className: 'emoji-147',
    imgName: 'new_emoji_11',
    title: '[忧郁]'
  },
  {
    id: 59,
    className: 'emoji-148',
    imgName: '1f630',
    title: '[尴尬]'
  },
  {
    id: 60,
    className: 'emoji-149',
    imgName: '1f60c',
    title: '[舒适]'
  },
  {
    id: 61,
    className: 'emoji-150',
    imgName: '1f612',
    title: '[不悦]'
  },
  {
    id: 62,
    className: 'emoji-155',
    imgName: 'new_emoji_09',
    title: '[拍掌]'
  },
  {
    id: 63,
    className: 'emoji-156',
    imgName: 'new_emoji_07',
    title: '[糗大了]'
  },
  {
    id: 64,
    className: 'emoji-122',
    imgName: '1f4aa-1f3fc',
    title: '[奋斗]'
  },
  {
    id: 65,
    className: 'emoji-130',
    imgName: 'new_emoji_23',
    title: '[乒乓]'
  },
  {
    id: 66,
    className: 'emoji-131',
    imgName: '1f437',
    title: '[猪头]'
  },
  {
    id: 67,
    className: 'emoji-132',
    imgName: 'new_emoji_25',
    title: '[玫瑰]'
  },
  {
    id: 68,
    className: 'emoji-133',
    imgName: 'new_emoji_24',
    title: '[凋谢]'
  },
  {
    id: 69,
    className: 'emoji-134',
    imgName: '1f41e',
    title: '[瓢虫]'
  },
  {
    id: 70,
    className: 'emoji-135',
    imgName: 'new_emoji_30',
    title: '[月亮]'
  },
  {
    id: 71,
    className: 'emoji-136',
    imgName: 'new_emoji_28',
    title: '[礼物]'
  },
  {
    id: 72,
    className: 'emoji-137',
    imgName: 'new_emoji_08',
    title: '[拥抱]'
  },
  {
    id: 73,
    className: 'emoji-138',
    imgName: 'new_emoji_18',
    title: '[抱拳]'
  },
  {
    id: 74,
    className: 'emoji-139',
    imgName: 'new_emoji_19',
    title: '[勾引]'
  },
  {
    id: 75,
    className: 'emoji-140',
    imgName: 'new_emoji_20',
    title: '[差劲]'
  },
  {
    id: 76,
    className: 'emoji-141',
    imgName: 'new_emoji_21',
    title: '[爱你]'
  },
  {
    id: 77,
    className: 'emoji-142',
    imgName: 'new_emoji_22',
    title: '[NO]'
  },
  {
    id: 78,
    className: 'emoji-151',
    imgName: '1f47b',
    title: '[幽灵]'
  },
  {
    id: 79,
    className: 'emoji-152',
    imgName: '1f49d',
    title: '[礼盒]'
  },
  {
    id: 80,
    className: 'emoji-153',
    imgName: '1f64f-1f3fc',
    title: '[拜托]'
  },
  {
    id: 81,
    className: 'emoji-154',
    imgName: '1f388',
    title: '[气球]'
  },
  {
    id: 82,
    className: 'emoji-34',
    imgName: 'emoji_34',
    title: '[强]'
  },
  {
    id: 83,
    className: 'emoji-35',
    imgName: 'emoji_35',
    title: '[弱]'
  },
  {
    id: 84,
    className: 'emoji-36',
    imgName: 'emoji_36',
    title: '[OK]'
  },
  {
    id: 85,
    className: 'emoji-37',
    imgName: 'emoji_37',
    title: '[拳头]'
  },
  {
    id: 86,
    className: 'emoji-38',
    imgName: 'emoji_38',
    title: '[胜利]'
  },
  {
    id: 87,
    className: 'emoji-39',
    imgName: 'emoji_39',
    title: '[鼓掌]'
  },
  {
    id: 88,
    className: 'emoji-167',
    imgName: 'emoji_167',
    title: '[握手]'
  },
  {
    id: 89,
    className: 'emoji-40',
    imgName: 'emoji_40',
    title: '[发怒]'
  },
  {
    id: 90,
    className: 'emoji-41',
    imgName: 'emoji_41',
    title: '[骷髅]'
  },
  {
    id: 91,
    className: 'emoji-42',
    imgName: 'emoji_42',
    title: '[便便]'
  },
  {
    id: 92,
    className: 'emoji-43',
    imgName: 'emoji_43',
    title: '[火]'
  },
  {
    id: 93,
    className: 'emoji-44',
    imgName: 'emoji_44',
    title: '[溜]'
  },
  {
    id: 94,
    className: 'emoji-45',
    imgName: 'emoji_45',
    title: '[爱心]'
  },
  {
    id: 95,
    className: 'emoji-46',
    imgName: 'emoji_46',
    title: '[心碎]'
  },
  {
    id: 96,
    className: 'emoji-47',
    imgName: 'emoji_47',
    title: '[钟情]'
  },
  {
    id: 97,
    className: 'emoji-48',
    imgName: 'emoji_48',
    title: '[唇]'
  },
  {
    id: 98,
    className: 'emoji-49',
    imgName: 'emoji_49',
    title: '[戒指]'
  },
  {
    id: 99,
    className: 'emoji-50',
    imgName: 'emoji_50',
    title: '[钻石]'
  },
  {
    id: 100,
    className: 'emoji-51',
    imgName: 'emoji_51',
    title: '[太阳]'
  },
  {
    id: 101,
    className: 'emoji-52',
    imgName: 'emoji_52',
    title: '[有时晴]'
  },
  {
    id: 102,
    className: 'emoji-53',
    imgName: 'emoji_53',
    title: '[多云]'
  },
  {
    id: 103,
    className: 'emoji-54',
    imgName: 'emoji_54',
    title: '[雷]'
  },
  {
    id: 104,
    className: 'emoji-55',
    imgName: 'emoji_55',
    title: '[雨]'
  },
  {
    id: 105,
    className: 'emoji-56',
    imgName: 'emoji_56',
    title: '[雪花]'
  },
  {
    id: 106,
    className: 'emoji-57',
    imgName: 'emoji_57',
    title: '[爱人]'
  },
  {
    id: 107,
    className: 'emoji-58',
    imgName: 'emoji_58',
    title: '[帽子]'
  },
  {
    id: 108,
    className: 'emoji-59',
    imgName: 'emoji_59',
    title: '[皇冠]'
  },
  {
    id: 109,
    className: 'emoji-60',
    imgName: 'emoji_60',
    title: '[篮球]'
  },
  {
    id: 110,
    className: 'emoji-61',
    imgName: 'emoji_61',
    title: '[足球]'
  },
  {
    id: 111,
    className: 'emoji-62',
    imgName: 'emoji_62',
    title: '[垒球]'
  },
  {
    id: 112,
    className: 'emoji-63',
    imgName: 'emoji_63',
    title: '[网球]'
  },
  {
    id: 113,
    className: 'emoji-64',
    imgName: 'emoji_64',
    title: '[台球]'
  },
  {
    id: 114,
    className: 'emoji-65',
    imgName: 'emoji_65',
    title: '[咖啡]'
  },
  {
    id: 115,
    className: 'emoji-66',
    imgName: 'emoji_66',
    title: '[啤酒]'
  },
  {
    id: 116,
    className: 'emoji-67',
    imgName: 'emoji_67',
    title: '[干杯]'
  },
  {
    id: 117,
    className: 'emoji-68',
    imgName: 'emoji_68',
    title: '[柠檬汁]'
  },
  {
    id: 118,
    className: 'emoji-69',
    imgName: 'emoji_69',
    title: '[餐具]'
  },
  {
    id: 119,
    className: 'emoji-70',
    imgName: 'emoji_70',
    title: '[汉堡]'
  },
  {
    id: 120,
    className: 'emoji-71',
    imgName: 'emoji_71',
    title: '[鸡腿]'
  },
  {
    id: 121,
    className: 'emoji-72',
    imgName: 'emoji_72',
    title: '[面条]'
  },
  {
    id: 122,
    className: 'emoji-73',
    imgName: 'emoji_73',
    title: '[冰淇淋]'
  },
  {
    id: 123,
    className: 'emoji-74',
    imgName: 'emoji_74',
    title: '[沙冰]'
  },
  {
    id: 124,
    className: 'emoji-75',
    imgName: 'emoji_75',
    title: '[生日蛋糕]'
  },
  {
    id: 125,
    className: 'emoji-76',
    imgName: 'emoji_76',
    title: '[蛋糕]'
  },
  {
    id: 126,
    className: 'emoji-77',
    imgName: 'emoji_77',
    title: '[糖果]'
  },
  {
    id: 127,
    className: 'emoji-78',
    imgName: 'emoji_78',
    title: '[葡萄]'
  },
  {
    id: 128,
    className: 'emoji-79',
    imgName: 'emoji_79',
    title: '[西瓜]'
  },
  {
    id: 129,
    className: 'emoji-80',
    imgName: 'emoji_80',
    title: '[光碟]'
  },
  {
    id: 130,
    className: 'emoji-81',
    imgName: 'emoji_81',
    title: '[手机]'
  },
  {
    id: 131,
    className: 'emoji-82',
    imgName: 'emoji_82',
    title: '[电话]'
  },
  {
    id: 132,
    className: 'emoji-83',
    imgName: 'emoji_83',
    title: '[电视]'
  },
  {
    id: 133,
    className: 'emoji-84',
    imgName: 'emoji_84',
    title: '[声音开启]'
  },
  {
    id: 134,
    className: 'emoji-85',
    imgName: 'emoji_85',
    title: '[声音关闭]'
  },
  {
    id: 135,
    className: 'emoji-86',
    imgName: 'emoji_86',
    title: '[铃铛]'
  },
  {
    id: 136,
    className: 'emoji-87',
    imgName: 'emoji_87',
    title: '[锁头]'
  },
  {
    id: 137,
    className: 'emoji-88',
    imgName: 'emoji_88',
    title: '[放大镜]'
  },
  {
    id: 138,
    className: 'emoji-89',
    imgName: 'emoji_89',
    title: '[灯泡]'
  },
  {
    id: 139,
    className: 'emoji-90',
    imgName: 'emoji_90',
    title: '[锤头]'
  },
  {
    id: 140,
    className: 'emoji-91',
    imgName: 'emoji_91',
    title: '[烟]'
  },
  {
    id: 141,
    className: 'emoji-92',
    imgName: 'emoji_92',
    title: '[炸弹]'
  },
  {
    id: 142,
    className: 'emoji-93',
    imgName: 'emoji_93',
    title: '[枪]'
  },
  {
    id: 143,
    className: 'emoji-94',
    imgName: 'emoji_94',
    title: '[刀]'
  },
  {
    id: 144,
    className: 'emoji-95',
    imgName: 'emoji_95',
    title: '[药]'
  },
  {
    id: 145,
    className: 'emoji-96',
    imgName: 'emoji_96',
    title: '[打针]'
  },
  {
    id: 146,
    className: 'emoji-97',
    imgName: 'emoji_97',
    title: '[钱袋]'
  },
  {
    id: 147,
    className: 'emoji-98',
    imgName: 'emoji_98',
    title: '[钞票]'
  },
  {
    id: 148,
    className: 'emoji-99',
    imgName: 'emoji_99',
    title: '[银行卡]'
  },
  {
    id: 149,
    className: 'emoji-100',
    imgName: 'emoji_100',
    title: '[手柄]'
  },
  {
    id: 150,
    className: 'emoji-101',
    imgName: 'emoji_101',
    title: '[麻将]'
  },
  {
    id: 151,
    className: 'emoji-102',
    imgName: 'emoji_102',
    title: '[调色板]'
  },
  {
    id: 152,
    className: 'emoji-103',
    imgName: 'emoji_103',
    title: '[电影]'
  },
  {
    id: 153,
    className: 'emoji-104',
    imgName: 'emoji_104',
    title: '[麦克风]'
  },
  {
    id: 154,
    className: 'emoji-105',
    imgName: 'emoji_105',
    title: '[耳机]'
  },
  {
    id: 155,
    className: 'emoji-106',
    imgName: 'emoji_106',
    title: '[音乐]'
  },
  {
    id: 156,
    className: 'emoji-107',
    imgName: 'emoji_107',
    title: '[吉他]'
  },
  {
    id: 157,
    className: 'emoji-108',
    imgName: 'emoji_108',
    title: '[火箭]'
  },
  {
    id: 158,
    className: 'emoji-109',
    imgName: 'emoji_109',
    title: '[飞机]'
  },
  {
    id: 159,
    className: 'emoji-110',
    imgName: 'emoji_110',
    title: '[火车]'
  },
  {
    id: 160,
    className: 'emoji-111',
    imgName: 'emoji_111',
    title: '[公交]'
  },
  {
    id: 161,
    className: 'emoji-112',
    imgName: 'emoji_112',
    title: '[轿车]'
  },
  {
    id: 162,
    className: 'emoji-113',
    imgName: 'emoji_113',
    title: '[出租车]'
  },
  {
    id: 163,
    className: 'emoji-114',
    imgName: 'emoji_114',
    title: '[警车]'
  },
  {
    id: 164,
    className: 'emoji-115',
    imgName: 'emoji_115',
    title: '[自行车]'
  }
];

export default emojiList;
