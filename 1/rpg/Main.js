var rolling;
var timestamp;
/**
 * Powered by Lufylegend
 */
var bgSound;
var bgNoise = new buzz.sound("./sounds/tavern_wallah_loop_medium.ogg");

var soundList = new Array(5);
soundList[0] = new buzz.sound("./sounds/happybirthday.ogg");
soundList[1] = new buzz.sound("./sounds/On_a_Roll.ogg");
soundList[2] = new buzz.sound("./sounds/Naxx_Frostwyrm_Lair.ogg");
soundList[3] = new buzz.sound("./sounds/Collection_Manager.ogg");
soundList[4] = new buzz.sound("./sounds/Don_t_Let_Your_Guard_Down.ogg");


var soundIndex = 0;

var volume = 70;

function playBgSound(){
	bgSound.play();
}

function playBgNoise(){
	bgNoise.play();
}

var charaSound = {};

function addCharaSound(name){
	charaSound[name] = new buzz.sound("./rpg/charasound/" + name);
}

var playerDress = "player_pink";
/**层变量*/

//游戏底层
var backLayer;

//地图底层
var mapLayer1;
//地图顶层
var mapLayer2;
//人物层
var charaLayer;
//效果层
var effectLayer;
//对话层
var talkLayer;
//控制层
var ctrlLayer;
//方向变量
var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
var STEP = 32;
//点击状态
var isKeyDown = false;
//地图滚动
var mapmove = false;
/**int变量*/
//读取图片位置
var loadIndex = 0;
/**对象变量*/
//玩家
var player;

/**数组变量*/
//图片path数组
var imgData = new Array();
//读取完的图片数组
var imglist = {};
var imageArray;
var stage;

var soundCheckInterval;

gameMain = function(){
	//if(LGlobal.canTouch){
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	LSystem.screen(LStage.FULL_SCREEN);
	//}
	bgSound = soundList[soundIndex];
	bgSound.loop();
	bgNoise.loop();
	bgSound.setVolume(volume);
	bgNoise.setVolume(volume*8/10);
	//js
	imgData.push({type:"js",path:"./rpg/Map.js"});
	imgData.push({type:"js",path:"./rpg/Talk.js"});
	imgData.push({type:"js",path:"./rpg/Character.js"});
	imgData.push({type:"js",path:"./rpg/script.js"});
	//base info
	imgData.push({name:"map",path:"./rpg/images/Bigmap.png"});
	imgData.push({name:"player_pink",path:"./rpg/images/player_pink.png"});
	imgData.push({name:"player_yellow",path:"./rpg/images/player_yellow.png"});
	imgData.push({name:"player_orange",path:"./rpg/images/player_orange.png"});
	imgData.push({name:"player_blue",path:"./rpg/images/player_blue.png"}); 
	//talk
	imgData.push({name:"talk",path:"./rpg/images/talk.png"});
	imgData.push({name:"appendix",path:"./rpg/images/appendix.png"});
	//card picture
	imgData.push({name:"moemoe",path:"./rpg/charaimage/moemoe.png"});
	
	imgData.push({name:"Crazed_Alchemist_small",path:"./rpg/charaimage/Crazed_Alchemist_small.png"});
	imgData.push({name:"Crazed_Alchemist",path:"./rpg/charaimage/Crazed_Alchemist.png"});
	imgData.push({name:"Annoy-o-Tron",path:"./rpg/charaimage/Annoy-o-Tron.png"});
	imgData.push({name:"Annoy-o-Tron_small",path:"./rpg/charaimage/Annoy-o-Tron_small.png"});
	imgData.push({name:"Recombobulator",path:"./rpg/charaimage/Recombobulator.png"});
	imgData.push({name:"Recombobulator_small",path:"./rpg/charaimage/Recombobulator_small.png"});
	imgData.push({name:"Harvest-Golem",path:"./rpg/charaimage/Harvest-Golem.png"});
	imgData.push({name:"Harvest-Golem_small",path:"./rpg/charaimage/Harvest-Golem_small.png"});
	imgData.push({name:"sunhuaidekuilei",path:"./rpg/charaimage/sunhuaidekuilei.png"});
	imgData.push({name:"sunhuaidekuilei_small",path:"./rpg/charaimage/sunhuaidekuilei_small.png"});
	imgData.push({name:"Alarm-o-Bot",path:"./rpg/charaimage/Alarm-o-Bot.png"});
	imgData.push({name:"Alarm-o-Bot_small",path:"./rpg/charaimage/Alarm-o-Bot_small.png"});
	imgData.push({name:"Snowchugger",path:"./rpg/charaimage/Snowchugger.png"});
	imgData.push({name:"Snowchugger_small",path:"./rpg/charaimage/Snowchugger_small.png"});
	imgData.push({name:"ClockworkKnight",path:"./rpg/charaimage/ClockworkKnight.png"});
	imgData.push({name:"ClockworkKnight_small",path:"./rpg/charaimage/ClockworkKnight_small.png"});
	imgData.push({name:"Antique-Healbot",path:"./rpg/charaimage/Antique-Healbot.png"});
	imgData.push({name:"Antique-Healbot_small",path:"./rpg/charaimage/Antique-Healbot_small.png"});
	imgData.push({name:"Micro-Machine",path:"./rpg/charaimage/Micro-Machine.png"});
	imgData.push({name:"Micro-Machine_small",path:"./rpg/charaimage/Micro-Machine_small.png"});
	imgData.push({name:"Mechwarper",path:"./rpg/charaimage/Mechwarper.png"});
	imgData.push({name:"Mechwarper_small",path:"./rpg/charaimage/Mechwarper_small.png"});
	imgData.push({name:"Jeeves",path:"./rpg/charaimage/Jeeves.png"});
	imgData.push({name:"Jeeves_small",path:"./rpg/charaimage/Jeeves_small.png"});
	imgData.push({name:"Zap-o-matic",path:"./rpg/charaimage/Zap-o-matic.png"});
	imgData.push({name:"Zap-o-matic_small",path:"./rpg/charaimage/Zap-o-matic_small.png"});
	imgData.push({name:"Shielded-Minibot",path:"./rpg/charaimage/Shielded-Minibot.png"});
	imgData.push({name:"Shielded-Minibot_small",path:"./rpg/charaimage/Shielded-Minibot_small.png"});
	imgData.push({name:"Piloted-Shredder",path:"./rpg/charaimage/Piloted-Shredder.png"});
	imgData.push({name:"Piloted-Shredder_small",path:"./rpg/charaimage/Piloted-Shredder_small.png"});
	imgData.push({name:"Arcane-Nullifier-X-21",path:"./rpg/charaimage/Arcane-Nullifier-X-21.png"});
	imgData.push({name:"Arcane-Nullifier-X-21_small",path:"./rpg/charaimage/Arcane-Nullifier-X-21_small.png"});
	imgData.push({name:"Mechanical-Yeti",path:"./rpg/charaimage/Mechanical-Yeti.png"});
	imgData.push({name:"Mechanical-Yeti_small",path:"./rpg/charaimage/Mechanical-Yeti_small.png"});
	imgData.push({name:"Clockwork-Gnome",path:"./rpg/charaimage/Clockwork-Gnome.png"});
	imgData.push({name:"Clockwork-Gnome_small",path:"./rpg/charaimage/Clockwork-Gnome_small.png"});
	imgData.push({name:"Flying-Machine",path:"./rpg/charaimage/Flying-Machine.png"});
	imgData.push({name:"Flying-Machine_small",path:"./rpg/charaimage/Flying-Machine_small.png"});
	imgData.push({name:"Explosive-Sheep",path:"./rpg/charaimage/Explosive-Sheep.png"});
	imgData.push({name:"Explosive-Sheep_small",path:"./rpg/charaimage/Explosive-Sheep_small.png"});
	imgData.push({name:"Target-Dummy",path:"./rpg/charaimage/Target-Dummy.png"});
	imgData.push({name:"Target-Dummy_small",path:"./rpg/charaimage/Target-Dummy_small.png"});
	imgData.push({name:"TournamentAttendee",path:"./rpg/charaimage/TournamentAttendee.png"});
	imgData.push({name:"TournamentAttendee_small",path:"./rpg/charaimage/TournamentAttendee_small.png"});
	imgData.push({name:"Goblin-Auto-Barber",path:"./rpg/charaimage/Goblin-Auto-Barber.png"});
	imgData.push({name:"Goblin-Auto-Barber_small",path:"./rpg/charaimage/Goblin-Auto-Barber_small.png"});
	imgData.push({name:"Bomb-Lobber",path:"./rpg/charaimage/Bomb-Lobber.png"});
	imgData.push({name:"Bomb-Lobber_small",path:"./rpg/charaimage/Bomb-Lobber_small.png"});
	imgData.push({name:"Grove-Tender",path:"./rpg/charaimage/Grove-Tender.png"});
	imgData.push({name:"Grove-Tender_small",path:"./rpg/charaimage/Grove-Tender_small.png"});
	imgData.push({name:"shumiao",path:"./rpg/charaimage/shumiao.png"});
	imgData.push({name:"shumiao_small",path:"./rpg/charaimage/shumiao_small.png"});
	imgData.push({name:"Anodized-Robo-Cub",path:"./rpg/charaimage/Anodized-Robo-Cub.png"});
	imgData.push({name:"Anodized-Robo-Cub_small",path:"./rpg/charaimage/Anodized-Robo-Cub_small.png"});
	imgData.push({name:"Druid-of-the-Fang",path:"./rpg/charaimage/Druid-of-the-Fang.png"});
	imgData.push({name:"Druid-of-the-Fang_small",path:"./rpg/charaimage/Druid-of-the-Fang_small.png"});
	//龙*17
	imgData.push({name:"DragonEgg",path:"./rpg/charaimage/DragonEgg.png"});
	imgData.push({name:"DragonEgg_small",path:"./rpg/charaimage/DragonEgg_small.png"});
	imgData.push({name:"TwilightWhelp",path:"./rpg/charaimage/TwilightWhelp.png"});
	imgData.push({name:"TwilightWhelp_small",path:"./rpg/charaimage/TwilightWhelp_small.png"});
	imgData.push({name:"VolcanicDrake",path:"./rpg/charaimage/VolcanicDrake.png"});
	imgData.push({name:"VolcanicDrake_small",path:"./rpg/charaimage/VolcanicDrake_small.png"});
	imgData.push({name:"HungryDragon",path:"./rpg/charaimage/HungryDragon.png"});
	imgData.push({name:"HungryDragon_small",path:"./rpg/charaimage/HungryDragon_small.png"});
	imgData.push({name:"FaerieDragon",path:"./rpg/charaimage/FaerieDragon.png"});
	imgData.push({name:"FaerieDragon_small",path:"./rpg/charaimage/FaerieDragon_small.png"});
	imgData.push({name:"DragonkinSorcerer",path:"./rpg/charaimage/DragonkinSorcerer.png"});
	imgData.push({name:"DragonkinSorcerer_small",path:"./rpg/charaimage/DragonkinSorcerer_small.png"});
	imgData.push({name:"DrakonidCrusher",path:"./rpg/charaimage/DrakonidCrusher.png"});
	imgData.push({name:"DrakonidCrusher_small",path:"./rpg/charaimage/DrakonidCrusher_small.png"});
	imgData.push({name:"TwilightGuardian",path:"./rpg/charaimage/TwilightGuardian.png"});
	imgData.push({name:"TwilightGuardian_small",path:"./rpg/charaimage/TwilightGuardian_small.png"});
	imgData.push({name:"TwilightDrake",path:"./rpg/charaimage/TwilightDrake.png"});
	imgData.push({name:"TwilightDrake_small",path:"./rpg/charaimage/TwilightDrake_small.png"});
	imgData.push({name:"AzureDrake",path:"./rpg/charaimage/AzureDrake.png"});
	imgData.push({name:"AzureDrake_small",path:"./rpg/charaimage/AzureDrake_small.png"});
	imgData.push({name:"Chromaggus",path:"./rpg/charaimage/Chromaggus.png"});
	imgData.push({name:"Chromaggus_small",path:"./rpg/charaimage/Chromaggus_small.png"});
	imgData.push({name:"Ysera",path:"./rpg/charaimage/Ysera.png"});
	imgData.push({name:"Ysera_small",path:"./rpg/charaimage/Ysera_small.png"});
	imgData.push({name:"Onyxia",path:"./rpg/charaimage/Onyxia.png"});
	imgData.push({name:"Onyxia_small",path:"./rpg/charaimage/Onyxia_small.png"});
	imgData.push({name:"Malygos",path:"./rpg/charaimage/Malygos.png"});
	imgData.push({name:"Malygos_small",path:"./rpg/charaimage/Malygos_small.png"});
	imgData.push({name:"Nozdormu",path:"./rpg/charaimage/Nozdormu.png"});
	imgData.push({name:"Nozdormu_small",path:"./rpg/charaimage/Nozdormu_small.png"});
	imgData.push({name:"Alexstrasza",path:"./rpg/charaimage/Alexstrasza.png"});
	imgData.push({name:"Alexstrasza_small",path:"./rpg/charaimage/Alexstrasza_small.png"});
	imgData.push({name:"Deathwing",path:"./rpg/charaimage/Deathwing.png"});
	imgData.push({name:"Deathwing_small",path:"./rpg/charaimage/Deathwing_small.png"});
	//蜡烛
	imgData.push({name:"Kobold-Geomancer",path:"./rpg/charaimage/Kobold-Geomancer.png"});
	imgData.push({name:"Kobold-Geomancer_small",path:"./rpg/charaimage/Kobold-Geomancer_small.png"});
	imgData.push({name:"Mad-Bomber",path:"./rpg/charaimage/Mad-Bomber.png"});
	imgData.push({name:"Mad-Bomber_small",path:"./rpg/charaimage/Mad-Bomber_small.png"});
	imgData.push({name:"Wild-Pyromancer",path:"./rpg/charaimage/Wild-Pyromancer.png"});
	imgData.push({name:"Wild-Pyromancer_small",path:"./rpg/charaimage/Wild-Pyromancer_small.png"});
	
	imgData.push({name:"RefreshmentVendor",path:"./rpg/charaimage/RefreshmentVendor.png"});
	imgData.push({name:"RefreshmentVendor_small",path:"./rpg/charaimage/RefreshmentVendor_small.png"});
	imgData.push({name:"Armorsmith",path:"./rpg/charaimage/Armorsmith.png"});
	imgData.push({name:"Armorsmith_small",path:"./rpg/charaimage/Armorsmith_small.png"});
	imgData.push({name:"Master-Swordsmith",path:"./rpg/charaimage/Master-Swordsmith.png"});
	imgData.push({name:"Master-Swordsmith_small",path:"./rpg/charaimage/Master-Swordsmith_small.png"});
	imgData.push({name:"Mad-Scientist",path:"./rpg/charaimage/Mad-Scientist.png"});
	imgData.push({name:"Mad-Scientist_small",path:"./rpg/charaimage/Mad-Scientist_small.png"});
	//法师
	imgData.push({name:"Ogre-Magi",path:"./rpg/charaimage/Ogre-Magi.png"});
	imgData.push({name:"Ogre-Magi_small",path:"./rpg/charaimage/Ogre-Magi_small.png"});
	imgData.push({name:"Antonidas",path:"./rpg/charaimage/Antonidas.png"});
	imgData.push({name:"Antonidas_small",path:"./rpg/charaimage/Antonidas_small.png"});
	imgData.push({name:"Millhouse-Manastorm",path:"./rpg/charaimage/Millhouse-Manastorm.png"});
	imgData.push({name:"Millhouse-Manastorm_small",path:"./rpg/charaimage/Millhouse-Manastorm_small.png"});
	imgData.push({name:"Spellbreaker",path:"./rpg/charaimage/Spellbreaker.png"});
	imgData.push({name:"Spellbreaker_small",path:"./rpg/charaimage/Spellbreaker_small.png"});
	imgData.push({name:"Ancient-Mage",path:"./rpg/charaimage/Ancient-Mage.png"});
	imgData.push({name:"Ancient-Mage_small",path:"./rpg/charaimage/Ancient-Mage_small.png"});
	imgData.push({name:"ziluolanxuetu",path:"./rpg/charaimage/ziluolanxuetu.png"});
	imgData.push({name:"ziluolanxuetu_small",path:"./rpg/charaimage/ziluolanxuetu_small.png"});
	//城堡
	imgData.push({name:"Angry-Chicken",path:"./rpg/charaimage/Angry-Chicken.png"});
	imgData.push({name:"Angry-Chicken_small",path:"./rpg/charaimage/Angry-Chicken_small.png"});
	imgData.push({name:"Lorewalker-Cho",path:"./rpg/charaimage/Lorewalker-Cho.png"});
	imgData.push({name:"Lorewalker-Cho_small",path:"./rpg/charaimage/Lorewalker-Cho_small.png"});
	imgData.push({name:"Nat-Pagle",path:"./rpg/charaimage/Nat-Pagle.png"});
	imgData.push({name:"Nat-Pagle_small",path:"./rpg/charaimage/Nat-Pagle_small.png"});
	imgData.push({name:"Tirion-Fordring",path:"./rpg/charaimage/Tirion-Fordring.png"});
	imgData.push({name:"Tirion-Fordring_small",path:"./rpg/charaimage/Tirion-Fordring_small.png"});
	imgData.push({name:"Guardian-of-Kings",path:"./rpg/charaimage/Guardian-of-Kings.png"});
	imgData.push({name:"Guardian-of-Kings_small",path:"./rpg/charaimage/Guardian-of-Kings_small.png"});
	imgData.push({name:"Argent-Squire",path:"./rpg/charaimage/Argent-Squire.png"});
	imgData.push({name:"Argent-Squire_small",path:"./rpg/charaimage/Argent-Squire_small.png"});
	imgData.push({name:"Birthday-cake",path:"./rpg/charaimage/Birthday-cake.png"});
	imgData.push({name:"Birthday-cake_small",path:"./rpg/charaimage/Birthday-cake_small.png"});
	imgData.push({name:"Eaten-cake",path:"./rpg/charaimage/Eaten-cake.png"});
	//医院
	imgData.push({name:"Tinkmaster-Overspark",path:"./rpg/charaimage/Tinkmaster-Overspark.png"});
	imgData.push({name:"Tinkmaster-Overspark_small",path:"./rpg/charaimage/Tinkmaster-Overspark_small.png"});
	imgData.push({name:"Archmage",path:"./rpg/charaimage/Archmage.png"});
	imgData.push({name:"Archmage_small",path:"./rpg/charaimage/Archmage_small.png"});
	imgData.push({name:"Loatheb",path:"./rpg/charaimage/Loatheb.png"});
	imgData.push({name:"Loatheb_small",path:"./rpg/charaimage/Loatheb_small.png"});
	imgData.push({name:"Worgen-Infiltrator",path:"./rpg/charaimage/Worgen-Infiltrator.png"});
	imgData.push({name:"Worgen-Infiltrator_small",path:"./rpg/charaimage/Worgen-Infiltrator_small.png"});
	imgData.push({name:"Northshire-Cleric",path:"./rpg/charaimage/Northshire-Cleric.png"});
	imgData.push({name:"Northshire-Cleric_small",path:"./rpg/charaimage/Northshire-Cleric_small.png"});
	imgData.push({name:"Injured-Blademaster",path:"./rpg/charaimage/Injured-Blademaster.png"});
	imgData.push({name:"Injured-Blademaster_small",path:"./rpg/charaimage/Injured-Blademaster_small.png"});
	imgData.push({name:"ImpGangBoss",path:"./rpg/charaimage/ImpGangBoss.png"});
	imgData.push({name:"ImpGangBoss_small",path:"./rpg/charaimage/ImpGangBoss_small.png"});
	imgData.push({name:"Voodoo-Doctor",path:"./rpg/charaimage/Voodoo-Doctor.png"});
	imgData.push({name:"Voodoo-Doctor_small",path:"./rpg/charaimage/Voodoo-Doctor_small.png"});
	imgData.push({name:"Leper-Gnome",path:"./rpg/charaimage/Leper-Gnome.png"});
	imgData.push({name:"Leper-Gnome_small",path:"./rpg/charaimage/Leper-Gnome_small.png"});
	imgData.push({name:"Sludge-Belcher",path:"./rpg/charaimage/Sludge-Belcher.png"});
	imgData.push({name:"Sludge-Belcher_small",path:"./rpg/charaimage/Sludge-Belcher_small.png"});
	imgData.push({name:"Acolyte-of-Pain",path:"./rpg/charaimage/Acolyte-of-Pain.png"});
	imgData.push({name:"Acolyte-of-Pain_small",path:"./rpg/charaimage/Acolyte-of-Pain_small.png"});
	imgData.push({name:"Undertaker",path:"./rpg/charaimage/Undertaker.png"});
	imgData.push({name:"Undertaker_small",path:"./rpg/charaimage/Undertaker_small.png"});
	imgData.push({name:"Bloodmage-Thalnos",path:"./rpg/charaimage/Bloodmage-Thalnos.png"});
	imgData.push({name:"Bloodmage-Thalnos_small",path:"./rpg/charaimage/Bloodmage-Thalnos_small.png"});
	imgData.push({name:"Apprentice",path:"./rpg/charaimage/Apprentice.png"});
	imgData.push({name:"Apprentice_small",path:"./rpg/charaimage/Apprentice_small.png"});
	//工会
	imgData.push({name:"Silver-Hand-Knight",path:"./rpg/charaimage/Silver-Hand-Knight.png"});
	imgData.push({name:"Silver-Hand-Knight_small",path:"./rpg/charaimage/Silver-Hand-Knight_small.png"});
	imgData.push({name:"Kidnapper",path:"./rpg/charaimage/Kidnapper.png"});
	imgData.push({name:"Kidnapper_small",path:"./rpg/charaimage/Kidnapper_small.png"});
	imgData.push({name:"Cabal-Shadow-Priest",path:"./rpg/charaimage/Cabal-Shadow-Priest.png"});
	imgData.push({name:"Cabal-Shadow-Priest_small",path:"./rpg/charaimage/Cabal-Shadow-Priest_small.png"});
	imgData.push({name:"Patient-Assassin",path:"./rpg/charaimage/Patient-Assassin.png"});
	imgData.push({name:"Patient-Assassin_small",path:"./rpg/charaimage/Patient-Assassin_small.png"});
	imgData.push({name:"shicong",path:"./rpg/charaimage/shicong.png"});
	imgData.push({name:"shicong_small",path:"./rpg/charaimage/shicong_small.png"});
	imgData.push({name:"Frostwolf-Grunt",path:"./rpg/charaimage/Frostwolf-Grunt.png"});
	imgData.push({name:"Frostwolf-Grunt_small",path:"./rpg/charaimage/Frostwolf-Grunt_small.png"});
	imgData.push({name:"Cruel-Taskmaster",path:"./rpg/charaimage/Cruel-Taskmaster.png"});
	imgData.push({name:"Cruel-Taskmaster_small",path:"./rpg/charaimage/Cruel-Taskmaster_small.png"});
	imgData.push({name:"Gnomish-Inventor",path:"./rpg/charaimage/Gnomish-Inventor.png"});
	imgData.push({name:"Gnomish-Inventor_small",path:"./rpg/charaimage/Gnomish-Inventor_small.png"});
	imgData.push({name:"Flame-Imp",path:"./rpg/charaimage/Flame-Imp.png"});
	imgData.push({name:"Flame-Imp_small",path:"./rpg/charaimage/Flame-Imp_small.png"});
	imgData.push({name:"Thuzad",path:"./rpg/charaimage/Thuzad.png"});
	imgData.push({name:"Thuzad_small",path:"./rpg/charaimage/Thuzad_small.png"});
	
	imgData.push({name:"Voidwalker",path:"./rpg/charaimage/Voidwalker.png"});
	imgData.push({name:"Voidwalker_small",path:"./rpg/charaimage/Voidwalker_small.png"});
	imgData.push({name:"Doomguard",path:"./rpg/charaimage/Doomguard.png"});
	imgData.push({name:"Doomguard_small",path:"./rpg/charaimage/Doomguard_small.png"});
	imgData.push({name:"Jaraxxus",path:"./rpg/charaimage/Jaraxxus.png"});
	imgData.push({name:"Jaraxxus_small",path:"./rpg/charaimage/Jaraxxus_small.png"});
	imgData.push({name:"Imp-Master",path:"./rpg/charaimage/Imp-Master.png"});
	imgData.push({name:"Imp-Master_small",path:"./rpg/charaimage/Imp-Master_small.png"});
	imgData.push({name:"Violet-Teacher",path:"./rpg/charaimage/Violet-Teacher.png"});
	imgData.push({name:"Violet-Teacher_small",path:"./rpg/charaimage/Violet-Teacher_small.png"});
	imgData.push({name:"Knife-Juggler",path:"./rpg/charaimage/Knife-Juggler.png"});
	imgData.push({name:"Knife-Juggler_small",path:"./rpg/charaimage/Knife-Juggler_small.png"});
	imgData.push({name:"SylvanasWindrunner",path:"./rpg/charaimage/SylvanasWindrunner.png"});
	imgData.push({name:"SylvanasWindrunner_small",path:"./rpg/charaimage/SylvanasWindrunner_small.png"});
	imgData.push({name:"Pit-Lord",path:"./rpg/charaimage/Pit-Lord.png"});
	imgData.push({name:"Pit-Lord_small",path:"./rpg/charaimage/Pit-Lord_small.png"});
	imgData.push({name:"Windlord",path:"./rpg/charaimage/Windlord.png"});
	imgData.push({name:"Windlord_small",path:"./rpg/charaimage/Windlord_small.png"});
	imgData.push({name:"Ragnaros-the-Firelord",path:"./rpg/charaimage/Ragnaros-the-Firelord.png"});
	imgData.push({name:"Ragnaros-the-Firelord_small",path:"./rpg/charaimage/Ragnaros-the-Firelord_small.png"});
	//sound
	addCharaSound("VO_EX1_059_Play_01.ogg");
	addCharaSound("spell_Redemption_target_1.ogg");
	addCharaSound("chaochaojiqiren.ogg");
	addCharaSound("zhurubianxingshi.ogg");
	addCharaSound("chaochaojiqiren_attack.ogg");
	addCharaSound("maitiankuilei.ogg");
	addCharaSound("maitiankuilei_attack.ogg");
	addCharaSound("sunhuaidekuilei.ogg");
	addCharaSound("baojingjiqiren.ogg");
	addCharaSound("fatiaoqishi.ogg");
	addCharaSound("suixuejiqiren.ogg");
	addCharaSound("suixuejiqiren_attack.ogg");
	addCharaSound("laosiji.ogg");
	addCharaSound("xiaoshencai.ogg");
	addCharaSound("jixieyueqianzhe.ogg");
	addCharaSound("jiweisi.ogg");
	addCharaSound("jiweisi_attack.ogg");
	addCharaSound("kaishixuanzhuan.ogg");
	addCharaSound("kaishixuanzhuan_attack.ogg");
	addCharaSound("hudunjiqiren.ogg");
	addCharaSound("hudunjiqiren_attack.ogg");
	addCharaSound("zairenshougeji.ogg");
	addCharaSound("zibaomianyang.ogg");
	addCharaSound("shifazhekexing.ogg");
	addCharaSound("jixiexueren.ogg");
	addCharaSound("fatiaozhuru.ogg");
	addCharaSound("fatiaozhuru_attack.ogg");
	addCharaSound("feixingqi.ogg");
	addCharaSound("GVG_093_TargetDummy_EnterPlay.ogg");
	addCharaSound("saichangguanzhong.ogg");
	addCharaSound("SFX_GVG_023_EnterPlay.ogg");
	addCharaSound("SFX_GVG_023_Attack.ogg");
	addCharaSound("VO_GVG_099_Play_01.ogg");
	addCharaSound("lindishuyao.ogg");
	addCharaSound("shumiao.ogg");
	addCharaSound("SFX_GVG_030_EnterPlay.ogg");
	addCharaSound("jianyadeluyi.ogg");
	//dragons
	addCharaSound("longdan.ogg");
	addCharaSound("muguangchulong.ogg");
	addCharaSound("huoshanyoulong.ogg");
	addCharaSound("jiedejulong.ogg");
	addCharaSound("jinglinglong.ogg");
	addCharaSound("longrenwushi.ogg");
	addCharaSound("longrendajizhe.ogg");
	addCharaSound("muguangshouhuzhe.ogg");
	addCharaSound("WoW_EX1_043_TwilightDrake_EnterPlay.ogg");
	addCharaSound("keluomagusi.ogg");
	addCharaSound("VO_EX1_572_Play_01.ogg");
	addCharaSound("VO_EX1_562_Play_01.ogg");
	addCharaSound("VO_EX1_563_Play_01.ogg");
	addCharaSound("VO_EX1_560_Play_01.ogg");
	addCharaSound("VO_EX1_561_Play_01.ogg");
	addCharaSound("VO_NEW1_030_Play_01.ogg");
	
	addCharaSound("VO_CS2_142_Play_01.ogg");
	addCharaSound("VO_CS2_142_Attack_02.ogg");
	addCharaSound("VO_NEW1_020_Play_01.ogg");
	addCharaSound("VO_EX1_082_Attack_02.ogg");
	//城堡
	addCharaSound("VO_EX1_008_Play_01.ogg");
	addCharaSound("VO_CS2_088_Play_01.ogg");
	addCharaSound("SFX_Mekka4t_EnterPlay.ogg");
	addCharaSound("SFX_EX1_009_EnterPlay.ogg");
	addCharaSound("VO_EX1_557_Play_01.ogg");
	addCharaSound("VO_EX1_557_Trigger_02.ogg");
	addCharaSound("VO_EX1_383_Play_01.ogg");
	addCharaSound("VO_EX1_383_Attack_02.ogg");
	addCharaSound("VO_TUTORIAL_06_CHO_21_18_joke.ogg");
	//医院
	addCharaSound("VO_EX1_608_Attack_02.ogg");
	addCharaSound("VO_EX1_083_Play_01.ogg");
	addCharaSound("VO_CS2_155_Attack_02.ogg");
	addCharaSound("loatheb.ogg");
	addCharaSound("VO_EX1_010_Play_01.ogg");
	addCharaSound("VO_CS2_235_Play_01.ogg");
	addCharaSound("VO_CS2_181_Attack_02.ogg");
	addCharaSound("xiaoguishouling.ogg");
	addCharaSound("VO_EX1_011_Play_01.ogg");
	addCharaSound("VO_CS2_181_Play_01.ogg");
	addCharaSound("VO_EX1_029_Play_01.ogg");
	addCharaSound("VO_FP1_012_EnterPlay_01.ogg");
	addCharaSound("VO_EX1_007_Play_01.ogg");
	addCharaSound("VO_FP1_028_EnterPlay_01.ogg");
	addCharaSound("VO_EX1_012_Attack_02.ogg");
	//工会
	addCharaSound("VO_CS2_151_Play_01.ogg");
	addCharaSound("VO_CS2_152_Play_01.ogg");
	addCharaSound("VO_NEW1_005_Attack_02.ogg");
	addCharaSound("VO_CS2_152_Attack_02.ogg");
	addCharaSound("VO_EX1_091_Attack_02.ogg");
	addCharaSound("VO_EX1_522_Play_01.ogg");
	addCharaSound("VO_CS2_121_Play_01.ogg");
	addCharaSound("VO_CS2_147_Play_01.ogg");
	addCharaSound("VO_EX1_603_Play_01.ogg");
	addCharaSound("VO_EX1_319_Play_01.ogg");
	addCharaSound("VO_FP1_013_Play_02.ogg");
	addCharaSound("VO_CS2_065_Play_01.ogg");
	addCharaSound("VO_EX1_310_Play_01.ogg");
	addCharaSound("VO_EX1_323h_ERROR05_25.ogg");
	addCharaSound("VO_EX1_597_Play_01.ogg");
	addCharaSound("VO_NEW1_026_Play_01.ogg");
	addCharaSound("VO_NEW1_019_Play_01.ogg");
	addCharaSound("VO_Sylvanas_01_Play_01.ogg");
	addCharaSound("VO_EX1_313_Attack_02.ogg");
	addCharaSound("VO_NEW1_010_Attack_02.ogg");
	addCharaSound("luosi.ogg");

	addCharaSound("lingshishangfan.ogg");
	addCharaSound("lingshishangfan_attack.ogg");
	addCharaSound("VO_EX1_402_Play_01.ogg");
	addCharaSound("VO_NEW1_037_Play_01.ogg");
	addCharaSound("VO_FP1_004_EnterPlay_01.ogg");
	addCharaSound("VO_FP1_004_Attack_02.ogg");
	addCharaSound("VO_FP1_004_Death_03.ogg");
	
	addCharaSound("VO_CS2_197_Attack_02_MIX.ogg");
	addCharaSound("VO_CS2_197_Play_01_MIX.ogg");
	addCharaSound("VO_EX1_559_Play_01.ogg");
	addCharaSound("VO_NEW1_029_Play_01.ogg");
	addCharaSound("VO_EX1_048_Play_01.ogg");
	addCharaSound("VO_EX1_584_Play_01.ogg");
	addCharaSound("VO_NEW1_026_Attack_02.ogg");
	addCharaSound("VO_NEW1_026t_Play_01.ogg");
	addCharaSound("VO_EX1_608_Play_01.ogg");
	addCharaSound("VO_CS2_155_Play_01.ogg");
	
	LLoadManage.load(
		imgData,
		function(progress){
		},
		function(result){
			imglist = result;
			gameInit();
		}
	);
}

function gameInit(event){
	globalX = - Math.floor((48*STEP - screen.width/2) / STEP)*STEP;
	globalY = - Math.floor((100*STEP - screen.height) / STEP)*STEP;
	personX = 48 * 32;
	personY = 98 * 32;
	//游戏层显示初始化
	layerInit();	
	//地图图片初始化	
	initMap();		
	stage = script.stage01;	
	initScript(stage); 
	//添加贞事件，开始游戏循环
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	
	if(!LGlobal.canTouch){
		//电脑的时候，添加键盘事件 【上 下 左 右 空格】
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
	}
	else{
		//添加控制按钮
		bitmapdata = new LBitmapData(imglist["e1"]);
		bitmap = new LBitmap(bitmapdata);
		bitmap.x = 0;
		bitmap.y = 0;
		ctrlLayer.addChild(bitmap);
		bitmapdata = new LBitmapData(imglist["e2"]);
		bitmap = new LBitmap(bitmapdata);
		bitmap.x = 280;
		bitmap.y = 30;
		ctrlLayer.addChild(bitmap);
		ctrlLayer.x = 40;
		ctrlLayer.y = 160;
		LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
		LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
		//添加点击控制事件
		backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
	}
	
	rolling.fin();
	
	soundCheckInterval = setInterval(function(){
		var nowStamp = new Date().getTime();
		if(nowStamp - timestamp >= 5000 * 6){
			setTimeout(playBgSound, 500);
			setTimeout(playBgNoise, 0);
			clearInterval(soundCheckInterval);
		}
	}, 1000);
}

var testLayer;
//游戏层显示初始化
function layerInit(){
	//游戏底层添加
	backLayer = new LSprite();
	addChild(backLayer);
	//地图层添加
	mapLayer1 = new LSprite();
	mapLayer2 = new LSprite();
	
	backLayer.addChild(mapLayer1);
	backLayer.addChild(mapLayer2);

	//人物层添加
	charaLayer = new LSprite();
	backLayer.addChild(charaLayer);
	//效果层添加
	effectLayer = new LSprite();
	backLayer.addChild(effectLayer);
	//对话层添加
	talkLayer = new LSprite();
	backLayer.addChild(talkLayer);
	//控制层添加
	if(LGlobal.canTouch){
		ctrlLayer = new LSprite();
		backLayer.addChild(ctrlLayer);
	}
}

//地图图片初始化
function initMap(){	
	var bitmapdata;	
	if(imageArray == null){
		//地图图片数据
		bitmapdata = new LBitmapData(imglist["map"]);
		//将地图图片拆分，得到拆分后的各个小图片的坐标数组（10,10是横竖的个数）
		imageArray = LGlobal.divideCoordinate(bitmapdata.image.width,bitmapdata.image.height,30,30);
	}
}

//添加地图
function addMap(cx,cy){
	var i,j,index1,indexX1,indexY1,index2,indexX2,indexY2;
	var bitmapdata1,bitmapdata2,bitmap1,bitmap2;
	var mapX = mapLayer1.x / STEP;
	var mapY = mapLayer1.y / STEP;
	var mx = cx<0?-1:0,my = cy<0?-1:0;
	mapLayer1.removeAllChild();
	mapLayer2.removeAllChild();
	//在地图层上，画出32*32的小图片
	for(i=my;i<screen.height/32 +Math.abs(cy) && i-mapY < map1.length;i++){
		for(j=mx;j<screen.width/32 +Math.abs(cx)&& j-mapX < map1[0].length;j++){
			//从地图数组中得到相应位置的图片坐标
			index1 = map1[i-mapY][j-mapX];
			//小图片的竖坐标
			indexY1 = Math.floor(index1 /100);
			//小图片的横坐标
			indexX1 = index1 - indexY1*100;
			//得到小图片
			bitmapdata1 = new LBitmapData(imglist["map"],indexX1*32,indexY1*32,32,32);
			bitmap1 = new LBitmap(bitmapdata1);
			//设置小图片的显示位置
			bitmap1.x = j*STEP - mapLayer1.x;
			bitmap1.y = i*STEP - mapLayer1.y;
			//将小图片显示到地图层
			mapLayer1.addChild(bitmap1);
			
			//从地图数组中得到相应位置的图片坐标
			index2 = map2[i-mapY][j-mapX];
			//小图片的竖坐标
			indexY2 = Math.floor(index2 /100);
			//小图片的横坐标
			indexX2 = index2 - indexY2*100;
			//得到小图片
			bitmapdata2 = new LBitmapData(imglist["map"],indexX2*32,indexY2*32,32,32);
			bitmap2 = new LBitmap(bitmapdata2);
			//设置小图片的显示位置
			bitmap2.x = j*STEP - mapLayer2.x;
			bitmap2.y = i*STEP - mapLayer2.y;
			//将小图片显示到地图层
			mapLayer2.addChild(bitmap2);
		}
	} 
}

//移除多余地图块
function delMap(){
	var bitmap,i;
	for(i=0;i<mapLayer1.childList.length;i++){
		bitmap = mapLayer1.childList[i];
		if(bitmap.x + mapLayer1.x < 0 || bitmap.x + mapLayer1.x >= screen.width || 
				bitmap.y + mapLayer1.y < 0 || bitmap.y + mapLayer1.y >= screen.height){
			mapLayer1.removeChild(bitmap);
			i--;
		}
	}
	for(i=0;i<mapLayer2.childList.length;i++){
		bitmap = mapLayer2.childList[i];
		if(bitmap.x + mapLayer2.x < 0 || bitmap.x + mapLayer2.x >= screen.width || 
				bitmap.y + mapLayer2.y < 0 || bitmap.y + mapLayer2.y >= screen.height){
			mapLayer2.removeChild(bitmap);
			i--;
		}
	}
}

//添加人物
function addChara(){
	var charaList = stage.add;
	var chara,charaObj;
	for(var i=0;i<charaList.length;i++){
		charaObj = charaList[i];
		if(charaObj.chara == "player"){
			//加入英雄
			bitmapdata = new LBitmapData(imglist[playerDress]);
			chara = new Character(true,i,bitmapdata,4,3);
			player = chara;
			if(stage.name == "main"){
				chara.x = personX;
				chara.y = personY;
			}else{
				chara.x = charaObj.x * 32;
				chara.y = charaObj.y * 32;
			}
			charaLayer.addChildAt(chara, 0);
		}else{
			//加入npc
			bitmapdata = new LBitmapData(imglist[charaObj.img]);
			chara = new Character(false,i,bitmapdata,1,1);
			chara.x = charaObj.x * 32;
			chara.y = charaObj.y * 32;
			charaLayer.addChild(chara);
		}
	}
}

function ondown(event){
	//根据点击位置，判断移动方向
	if(event.offsetX >= ctrlLayer.x + 40 && event.offsetX <= ctrlLayer.x+80){
		if(event.offsetY >= ctrlLayer.y && event.offsetY <= ctrlLayer.y+40){
			player.changeDir(UP);
		}else if(event.offsetY >= ctrlLayer.y+80 && event.offsetY <= ctrlLayer.y+120){
			player.changeDir(DOWN);
		}
	}else if(event.offsetX >= ctrlLayer.x && event.offsetX <= ctrlLayer.x+40){
		if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
			player.changeDir(LEFT);
		}
	}else if(event.offsetX >= ctrlLayer.x+80 && event.offsetX <= ctrlLayer.x+120){
		if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
			player.changeDir(RIGHT);
		}
	}
	isKeyDown = true;
}
function onup(event){
	isKeyDown = false;
	if(event.offsetX >= ctrlLayer.x + 280 && event.offsetX <= ctrlLayer.x+330){
		if(event.offsetY >= ctrlLayer.y+40 && event.offsetY <= ctrlLayer.y+100){
			//对话
			addTalk();
		}
	}
}
function onkeydown(event){
	if(event.keyCode == 65){//left
		player.changeDir(LEFT);
	}else if(event.keyCode == 87){//up
		player.changeDir(UP);
	}else if(event.keyCode == 68){//right
		player.changeDir(RIGHT);
	}else if(event.keyCode == 83){//down
		player.changeDir(DOWN);
	}
	isKeyDown = true;
}
function onkeyup(event){
	isKeyDown = false;
	if(event.keyCode == 13){
		//对话
		addTalk();
	}
	else if(event.keyCode == 49){
		var tmp = charaLayer.getChildAt(0);
		playerDress = "player_pink";
		var bitmapdata = new LBitmapData(imglist["player_pink"]);
		var chara = new Character(true,0,bitmapdata,4,3);
		player = chara;
		chara.x = tmp.x;
		chara.y = tmp.y;
		charaLayer.removeChild(tmp);
		charaLayer.addChildAt(chara, 0);
	}
	else if(event.keyCode == 50){
		var tmp = charaLayer.getChildAt(0);
		playerDress = "player_yellow";
		var bitmapdata = new LBitmapData(imglist["player_yellow"]);
		var chara = new Character(true,0,bitmapdata,4,3);
		player = chara;
		chara.x = tmp.x;
		chara.y = tmp.y;
		charaLayer.removeChild(tmp);
		charaLayer.addChildAt(chara, 0);
	}
	else if(event.keyCode == 51){
		var tmp = charaLayer.getChildAt(0);
		playerDress = "player_orange";
		var bitmapdata = new LBitmapData(imglist["player_orange"]);
		var chara = new Character(true,0,bitmapdata,4,3);
		player = chara;
		chara.x = tmp.x;
		chara.y = tmp.y;
		charaLayer.removeChild(tmp);
		charaLayer.addChildAt(chara, 0);
	}
	else if(event.keyCode == 52){
		var tmp = charaLayer.getChildAt(0);
		playerDress = "player_blue";
		var bitmapdata = new LBitmapData(imglist["player_blue"]);
		var chara = new Character(true,0,bitmapdata,4,3);
		player = chara;
		chara.x = tmp.x;
		chara.y = tmp.y;
		charaLayer.removeChild(tmp);
		charaLayer.addChildAt(chara, 0);
	}
	else if(event.keyCode == 38){//volume
		if(volume + 10 <= 100)
			volume += 10;
		bgSound.setVolume(volume);
		bgNoise.setVolume(volume*8/10);
	}
	else if(event.keyCode == 40){
		if(volume - 10 >= 0)
			volume -= 10;
		bgSound.setVolume(volume);
		bgNoise.setVolume(volume*8/10);
	}
	else if(event.keyCode == 37){//bgsound
		soundIndex++;
		if(soundIndex >= soundList.length) soundIndex = 0;
		bgSound.stop();
		bgSound = soundList[soundIndex];
		bgSound.loop();
		bgSound.play();
	}
	else if(event.keyCode == 39){
		soundIndex--;
		if(soundIndex < 0) soundIndex = soundList.length - 1;
		bgSound.stop();
		bgSound = soundList[soundIndex];
		bgSound.loop();
		bgSound.play();
	}
}
/**
 * 循环
 * */
function onframe(){
	for(var i=0;i<charaLayer.childList.length;i++)charaLayer.childList[i].onframe();
}