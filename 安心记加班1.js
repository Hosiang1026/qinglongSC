/**
 * 
 *
 * MgLive  app 
 *
 * cron 10 7 * * *  mg.js
 *
 * 9-24		基本完成所有任务 ,自己玩把!
 *
 * 无
 * ====================================
 */

const { url } = require("inspector");

const $ = new Env("安心加班_扭蛋奖励");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1 		//0为关闭通知,1为打开通知,默认为1
const debug = 0			//0为关闭调试,1为打开调试,默认为0
//---------------------------------------------------------------------------------------------------------
let ckStr = ($.isNode() ? process.env.jb_data : $.getdata('jb_data')) || '';
let msg="安心加班_扭蛋奖励", ck;
let product_ids = [];//文章编号
let ck_status = true;
let ci = 1
let f01, f02 = true;
let comments = ["支持", "插眼", "一切都会好起来的", "希望一切都好", "我认为", "我感觉", "ccc", "hhh", "sq"]
// const CryptoJS = require("crypto-js");
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.0.1"
let Change = '基本完成所有任务 ,自己玩把!'
let thank = `\n by clz \n`
//---------------------------------------------------------------------------------------------------------

async function tips(ckArr) {
	DoubleLog(`\n========== 共找到 ${ckArr.length} 个账号 ==========`);
	debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}


!(async () => {
	if (typeof $request !== "undefined") {  // 严格不相等
		// await GetRewrite();
		console.log(`暂时无重写!`);
	} else {
		let ckArr = await checkEnv(ckStr, "jb_data");
		await tips(ckArr);
		for (let index = 0; index < ckArr.length; index++) {
			let num = index + 1;
			DoubleLog(`\n-------- 开始【第 ${num} 个账号】--------`);
			ck = ckArr[index].split("&");
			debugLog(`【debug】 这是你第 ${num} 账号信息:\n ${ck}`);
			await start();
		}
		await SendMsg(msg);
	}

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done());
let isJ = true;
async function start() {
	await niuDanPush()

}



/**
 * 获取扭蛋是否中奖  httpPost 
 */
async function niuDanPush() {
	var isL = false;
	try {
		let url = {
			method: "GET",
			url: `https://market-gateway.julanling.com/market-center/api2/gacha/index?deviceToken=${ck[1]}&version=6.9.60&os=ANDROID&appVersion=6.9.60&appChannel=baidu`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"pragma": "no-cache",
				"cache-control": "no-cache",
				"accept": "application/json, text/plain, */*",
				"authorization": `Bearer ${ck[0]}`,
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046247 Mobile Safari/537.36;_android{\"version\":6960,\"versionName\":\"6.9.60\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"baidu\",\"uid\":\"659GS3\"}_android",
				"origin": "https://h5.julanling.com",
				"x-requested-with": "com.julanling.app",
				"sec-fetch-site": "same-site",
				"sec-fetch-mode": "cors",
				"sec-fetch-dest": "empty",
				"referer": "https://h5.julanling.com/",
				"accept-encoding": "gzip, deflate, br",
				"accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
			},
		};

		let result = await httpRequest(url, "获取扭蛋是否中奖");
		if (result.errorCode == 0) {
			if (result.results.exchangeList != 'defined') {
				for (var i = 0; i < result.results.exchangeList.length; i++) {
					// console.log(result.results.exchangeList[i].chipNum + "," + result.results.exchangeList[i].exchangeNum)
					if (result.results.exchangeList[i].chipNum >= result.results.exchangeList[i].exchangeNum) {
						DoubleLog("中奖:  " + result.results.exchangeList[i].name)
						isL = true;
					}

				}
			}
			if (!isL) DoubleLog(`未中奖.....`);
			await wait(5);
		} else {
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}





/**
 * 激活扭蛋模块  httpPost 
 */
async function reflushEgg() {
	try {
		let url = {
			method: "GET",
			url: `https://market-gateway.julanling.com/market-center/api2/gacha/index?deviceToken=${ck[1]}&version=6.5.54&os=ANDROID&appVersion=6.5.54&appChannel=unknow`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"accept": "application/json, text/plain, */*",
				"authorization": `Bearer ${ck[0]}`,
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
			},
		};

		let result = await httpRequest(url, "激活扭蛋模块");
		console.log(result)
		if (result.errorCode == 0) {
			DoubleLog(`激活扭蛋模块成功`);
			await wait(5);
		} else {
			DoubleLog(`激活扭蛋模块失败`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}








/**
 * 钓鱼  httpPost 
 */
async function getFishs() {
	var r = randomInt(4001, 4002)
	if (!f01 && !f02) {
		r = randomInt(4003, 4005)
	}
	try {

		let options = {
			method: 'POST',
			url: `https://market-gateway.julanling.com/market-center/api2/fish/luckyDraw`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"content-length": "103",
				"accept": "application/json, text/plain, */*",
				"origin": "https://h5.julanling.com",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"content-type": "application/json",
				"x-requested-with": "com.julanling.app",

			},
			body: JSON.stringify({
				"kindId": r,//01鱼 02 龟 05包
				"appChannel": "samsung",
				"appVersion": "6.5.54",
				"operatingSystem": "ANDROID",
				"os": "ANDROID"
			})
		};
		let result = await httpRequest(options, `模拟钓鱼`);
		if (result.errorCode == 1211155 && result.errorStr == "鱼已经钓完啦！请钓其他的鱼啊") {
			if (r == 4001) {
				f01 = false;
			} else {
				f02 = false;
			}
		}
		if (result.errorCode == 0) {
			DoubleLog(`模拟钓鱼成功: 获得${result.results.fishLuckyLotteryResp.awardValue}R`);
			await wait(5);
		} else {
			DoubleLog(`模拟钓鱼失败: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}





/**
 * 钓鱼次数  httpPost 
 */
async function getFishCounts() {
	try {

		let options = {
			method: 'POST',
			url: `https://market-gateway.julanling.com/market-center/api2/fish/finishFishNormalTask`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"accept": "application/json, text/plain, */*",
				"origin": "https://h5.julanling.com",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"Content-Type": "application/json;charset=UTF-8",
				"x-requested-with": "com.julanling.app",

			},
			body: JSON.stringify({
				"businessType": "JJB_FISH_DAILY_SEE_VIDEOS",
				"appChannel": "samsung",
				"appVersion": "6.9.30",
				"operatingSystem": "ANDROID",
				"os": "ANDROID"
			})
		};
		let result = await httpRequest(options, `钓鱼次数`);
		if (result.errorCode == 0) {
			DoubleLog(`获取钓鱼次数成功: 获得${result.results.award}`);
			await wait(5);
		} else {
			DoubleLog(`获取钓鱼次数成功: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}





/**
 * 刷新打卡奖励  httpPost 
 */
async function finshDakaAward() {
	try {

		let options = {
			method: 'POST',
			url: `https://market-gateway.julanling.com/market-center/api2/assignment/finishAssignment`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"content-length": "156",
				"pragma": "no-cache",
				"cache-control": "no-cache",
				"accept": "application/json, text/plain, */*",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36;_android{\"version\":6930,\"versionName\":\"6.9.30\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"content-type": "application/json;charset=UTF-8",
				"origin": "https://market-h5.julanling.com",
				"x-requested-with": "com.julanling.app",
				"sec-fetch-site": "same-site",
				"sec-fetch-mode": "cors",
				"sec-fetch-dest": "empty",
				"referer": "https://market-h5.julanling.com/",
				"accept-encoding": "gzip, deflate, br",
				"accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
			},
			body: JSON.stringify({
				"businessType": "JJB_CLOCK_OUT_DAY_TASK_CLICK",
				"os": "ANDROID",
				"appVersion": "6.9.30",
				"appChannel": "samsung",
				"deviceToken": "58a872e6103b3fa46a501e5f25f011ff"
			})
		};
		console.log(options)
		let result = await httpRequest(options, `刷新打卡奖励`);
		if (result.errorCode == 0) {
			DoubleLog(`刷新打卡奖励}`);
			await wait(5);
		} else {
			DoubleLog(`获取打卡奖励失败: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}





/**
 * 打卡奖励  httpPost 
 */
async function dakaAward() {
	try {

		let options = {
			method: 'POST',
			url: `https://market-gateway.julanling.com/market-center/api2/assignment/receiveAwardByBusinessType`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"content-length": "156",
				"pragma": "no-cache",
				"cache-control": "no-cache",
				"accept": "application/json, text/plain, */*",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36;_android{\"version\":6930,\"versionName\":\"6.9.30\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"content-type": "application/json;charset=UTF-8",
				"origin": "https://market-h5.julanling.com",
				"x-requested-with": "com.julanling.app",
				"sec-fetch-site": "same-site",
				"sec-fetch-mode": "cors",
				"sec-fetch-dest": "empty",
				"referer": "https://market-h5.julanling.com/",
				"accept-encoding": "gzip, deflate, br",
				"accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
			},
			body: JSON.stringify({
				"businessType": "JJB_CLOCK_OUT_DAY_TASK_CLICK",
				"os": "ANDROID",
				"appVersion": "6.9.30",
				"appChannel": "samsung",
				"deviceToken": "58a872e6103b3fa46a501e5f25f011ff"
			})
		};
		console.log(options)
		let result = await httpRequest(options, `打卡奖励`);
		if (result.errorCode == 0) {
			DoubleLog(`获取打卡奖励成功: 获得30金币`);
			await wait(5);
		} else {
			DoubleLog(`获取打卡奖励失败: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}




/**
 * 扭蛋  httpPost 
 */
async function niuEgg() {
	try {

		let options = {
			method: 'POST',
			url: `https://market-gateway.julanling.com/market-center/api2/gacha/luckyDraw`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"content-length": "128",
				"accept": "application/json, text/plain, */*",
				"origin": "https://h5.julanling.com",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"content-type": "application/json",
				"x-requested-with": "com.julanling.app",

			},
			body: JSON.stringify({
				"deviceToken": ck[1],
				"version": "6.5.54",
				"os": "ANDROID",
				"appVersion": "6.5.54",
				"appChannel": "unknow"
			})
		};
		let result = await httpRequest(options, `安心加班抽碎片`);
		if (result.errorCode == 0) {
			DoubleLog(`扭蛋成功: 获得${result.results.name}`);
			await wait(5);
		} else {
			DoubleLog(`扭蛋失败: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}




/**
 * 扭蛋次数  httpPost 
 */
async function niuEggCounts() {
	try {

		let options = {
			method: 'POST',
			url: `https://market-gateway.julanling.com/market-center/api2/gacha/finishGachaTask`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"accept": "application/json, text/plain, */*",
				"origin": "https://h5.julanling.com",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"Content-Type": "application/json;charset=UTF-8",
				"x-requested-with": "com.julanling.app",

			},
			body: JSON.stringify({
				"businessType": "JJB_DAILY_GACHA_INC_VIDEOS",
				"deviceToken": ck[1],
				"version": "6.9.21",
				"os": "ANDROID",
				"appVersion": "6.9.21",
				"appChannel": "unknow"
			})
		};
		console.log(options)
		let result = await httpRequest(options, `安心加班抽碎片`);
		console.log(result)
		if (result.errorCode == 0) {
			DoubleLog(`获取扭蛋次数成功: 获得${result.results.amount}`);
			await wait(5);
		} else {
			DoubleLog(`获取扭蛋次数成功: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}



/**
 * 转盘  httpPost 
 */
async function luckDraw() {
	try {

		let options = {
			method: 'POST',
			url: `https://market-gateway.julanling.com/market-center/api2/dial/luckyDraw`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"content-length": "89",
				"accept": "application/json, text/plain, */*",
				"origin": "https://h5.julanling.com",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"content-type": "application/json",
				"x-requested-with": "com.julanling.app",

			},
			body: JSON.stringify({
				"appChannel": "samsung",
				"appVersion": "6.5.54",
				"operatingSystem": "ANDROID",
				"os": "ANDROID"
			})
		};
		let result = await httpRequest(options, `安心加班转盘`);
		if (result.errorCode == 0) {
			if (result.results.bizNo != null) {
				DoubleLog("第 " + (ci) + " 次抽奖 " + `抽奖成功: 获得${result.results.amount}金币`);
				await getAmount(result.results.bizNo)
			} else {
				DoubleLog("第 " + (ci) + " 次抽奖 " + `抽奖成功: 未中奖: miss`);
			}
			ci++
			await wait(5);
		} else {
			DoubleLog(`抽奖成功: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}


/**
 * 领取转盘奖励  httpPost 
 */
async function getAmount(bizNo) {
	try {
		let url = {
			method: "POST",
			url: `https://market-gateway.julanling.com/market-center/api2/dial/receiveDialCoin`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"content-length": "132",
				"accept": "application/json, text/plain, */*",
				"origin": "https://h5.julanling.com",
				"authorization": "Bearer " + ck[0],
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"content-type": "application/json",
				"x-requested-with": "com.julanling.app",
			},
			body: JSON.stringify({
				"bizNo": `${bizNo}`,
				"appChannel": "samsung",
				"appVersion": "6.5.54",
				"operatingSystem": "ANDROID",
				"os": "ANDROID"
			})
		};
		let result = await httpRequest(url, "领取安心加班转盘奖励");
		if (result.errorCode == 0) {
			DoubleLog(`领取安心加班转盘奖励成功: 获得${result.results.amount}金币`);
			await wait(5);
		} else {
			DoubleLog(`领取安心加班转盘奖励失败: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}



/**
 * 签到  httpPost 
 */
async function signIn() {
	try {
		let url = {
			method: "POST",
			url: `https://market-gateway.julanling.com/market-center/api2/signIn/signIn`,
			headers: {
				"Host": "market-gateway.julanling.com",
				"content-length": "110",
				"accept": "application/json, text/plain, */*",
				"authorization": `Bearer ${ck[0]}`,
				"user-agent": "Mozilla/5.0 (Linux; Android 10; SM-G9650 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.71 Mobile Safari/537.36;_android{\"version\":6554,\"versionName\":\"6.5.54\",\"userType\":\"1\",\"sdkVersion\":\"29\",\"statusBarHeight\":24,\"toolBarHeight\":68,\"imei\":\"\",\"oaid\":\"1277f8b88c34afa0f8329620f87fcb83f6c0ea3490a6efc7d7cfaf8c9fe16282\",\"channel\":\"samsung\",\"uid\":\"63JWFG\"}_android",
				"content-type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify({
				"os": "ANDROID",
				"appVersion": "6.5.54",
				"appChannel": "samsung",
				"deviceToken": `${ck[1]}`
			})
		};

		let result = await httpRequest(url, "安心加班签到");
		if (result.errorCode == 0) {
			DoubleLog(`签到成功: 获得${result.results.amount}金币`);
			await wait(5);
		} else {
			DoubleLog(`签到失败: ${result.errorStr}`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}
}







//*********************************解密模块勿动********************************************* */


function durationShow(str) {
	var len = str.length - 10;

	if (len > 0) {
		return str.slice(0, 10).toString();
	}

	if (len >= 0) {
		return str;
	}
	for (var i = 0; i < Math.abs(len); i++) {
		str = str + "0";
	}

	return str;

}

function sign(str, str2) {
	return MD5Encrypt(str + str2 + "Asus!@#$%^&*()Store").toString().toUpperCase();
}




/** */










// #region ********************************************************  固定代码  ********************************************************
/**
 * 变量检查
 */
async function checkEnv(ck, Variables) {
	return new Promise((resolve) => {
		let ckArr = []
		if (ck) {
			if (ck.indexOf("@") !== -1) {

				ck.split("@").forEach((item) => {
					ckArr.push(item);
				});
			} else if (ck.indexOf("\n") !== -1) {

				ck.split("\n").forEach((item) => {
					ckArr.push(item);
				});
			} else {
				ckArr.push(ck);
			}
			resolve(ckArr)
		} else {
			console.log(` ${$.neme}:未填写变量 ${Variables} ,请仔细阅读脚本说明!`)
		}
	}
	)
}


/**
 * 获取远程版本
 * http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/${name}.js
 * https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js
 */
function Version_Check(name, type) {
	return new Promise((resolve) => {
		if (type == 1) {
			data = `https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js`
		} else if (type == 2) {
			data = `http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/${name}.js`
		}
		let url = {
			url: data,
		}
		$.get(url, async (err, resp, data) => {
			try {
				VersionCheck = resp.body.match(/VersionCheck = "([\d\.]+)"/)[1]
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve(VersionCheck)
			}
		}, timeout = 3)
	})
}

/**
 * 发送消息
 */
async function SendMsg(message) {
	if (!message) return;
	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require("./sendNotify");
			await notify.sendNotify($.name, message);
		} else {
			// $.msg(message);
			$.msg($.name, '', message)
		}
	} else {
		console.log(message);
	}
}

/**
 * 双平台log输出
 */
function DoubleLog(data) {
	if ($.isNode()) {
		if (data) {
			console.log(`    ${data}`);
			msg += `\n    ${data}`;
		}
	} else {
		console.log(`    ${data}`);
		msg += `\n    ${data}`;
	}

}

/**
 * 随机 数字 + 大写字母 生成
 */
function randomszdx(e) {
	e = e || 32;
	var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}


/**
 * 随机 数字 + 小写字母 生成
 */
function randomszxx(e) {
	e = e || 32;
	var t = "qwertyuioplkjhgfdsazxcvbnm1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}




/**
 * 随机整数生成
 */
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}


/**
 * 时间戳 13位
 */
function ts13() {
	return Math.round(new Date().getTime()).toString();
}

/**
 * 时间戳 10位
 */
function ts10() {
	return Math.round(new Date().getTime() / 1000).toString();
}

/**
 * 获取当前小时数
 */
function local_hours() {
	let myDate = new Date();
	let h = myDate.getHours();
	return h;
}

/**
 * 获取当前分钟数
 */
function local_minutes() {
	let myDate = new Date();
	let m = myDate.getMinutes();
	return m;
}


/**
 * 获取当前年份 2022
 */
function local_year() {
	let myDate = new Date();
	y = myDate.getFullYear();
	return y;
}

/**
 * 获取当前月份(数字)  5月
 */
function local_month() {
	let myDate = new Date();
	let m = myDate.getMonth();
	return m;
}


/**
* 获取当前月份(数字)  05月 补零
*/
function local_month_two() {
	let myDate = new Date();
	let m = myDate.getMonth();
	m = Number(m) + 1
	if (m.toString().length == 1) {
		m = `0${m}`
	}
	return m;
}

/**
* 获取当前天数(数字)  5日  
*/
function local_day() {
	let myDate = new Date();
	let d = myDate.getDate();
	return d;
}


/**
* 获取当前天数  05日 补零
*/
function local_day_two() {
	let myDate = new Date();
	let d = myDate.getDate();
	d = Number(d)
	if (d.toString().length == 1) {
		d = `0${d}`
	}
	return d;
}



/**
* 获取当前天数  05日 补零
*/
function local_day_two2() {
	let myDate = new Date();
	let d = myDate.getDate();
	d = Number(d) + 1
	if (d.toString().length == 1) {
		d = `0${d}`
	}
	return d;
}



/**
 * 等待 X 秒
 */
function wait(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}


/**
 * 每日网抑云
 */
function wyy() {
	return new Promise((resolve) => {
		let url = {
			url: `http://ovooa.com/API/wyrp/api.php`,
		}
		$.get(url, async (err, resp, data) => {
			try {
				data = JSON.parse(data);
				// console.log(data);
				console.log(`网抑云时间: ${data.data.Content}  by--${data.data.Music}`)
				msg = `[网抑云时间]: ${data.data.Content}  by--${data.data.Music}`
				// DoubleLog(`[网抑云时间]: ${data.data.Content}  by--${data.data.Music}`);
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout = 3)
	})
}

/**
 * get请求
 */
async function httpGet(getUrlObject, tip, timeout = 3) {
	return new Promise((resolve) => {
		let url = getUrlObject;
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
			console.log(url);
		}

		$.get(
			url,
			async (err, resp, data) => {
				try {
					if (debug) {
						console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
						console.log(data);
						console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					if (result == undefined) {
						return;
					} else {
						resolve(result);
					}

				} catch (e) {
					console.log(err, resp);
					console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					msg = `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

/**
 * post请求
 */
async function httpPost(postUrlObject, tip, timeout = 3) {
	return new Promise((resolve) => {
		let url = postUrlObject;
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
			console.log(url);
		}

		$.post(
			url,
			async (err, resp, data) => {
				try {
					if (debug) {
						console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
						console.log(data);
						console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					if (result == undefined) {
						return;
					} else {
						resolve(result);
					}

				} catch (e) {
					console.log(err, resp);
					console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					msg = `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

/**
 * 网络请求 (get, post等)
 */
async function httpRequest(postOptionsObject, tip, timeout = 3) {
	return new Promise((resolve) => {

		let Options = postOptionsObject;
		let request = require('request');
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 信息 ===============`);
			console.log(Options);
		}

		request(Options, async (err, resp, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 ${tip} 返回数据==============`);
					console.log(data);
					console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
					console.log(JSON.parse(data));
				}
				let result = JSON.parse(data);
				if (!result) return;
				resolve(result);
			} catch (e) {
				console.log(err, resp);
				console.log(`\n ${tip} 失败了!请稍后尝试!!`);
				msg = `\n ${tip} 失败了!请稍后尝试!!`
			} finally {
				resolve();
			}
		}), timeout

	});
}


/**
 * debug调试
 */
function debugLog(...args) {
	if (debug) {
		console.log(...args);
	}
}



function getNowTime() {
	var date = new Date();
	var sign2 = ":";
	var year = date.getFullYear() // 年
	var month = date.getMonth() + 1; // 月
	var day = date.getDate(); // 日
	var hour = date.getHours(); // 时
	var minutes = date.getMinutes(); // 分
	var seconds = date.getSeconds() //秒
	var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
	var week = weekArr[date.getDay()];
	// 给一位数的数据前面加 “0”
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
}



// /**
//  *  单名字 Env
//  */
// function Env() {
//     return new class {
//         isNode() {
//             return "undefined" != typeof module && !!module.exports
//         }
//     }()
// }


// md5
function MD5Encrypt(a) { function b(a, b) { return a << b | a >>> 32 - b } function c(a, b) { var c, d, e, f, g; return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f } function d(a, b, c) { return a & b | ~a & c } function e(a, b, c) { return a & c | b & ~c } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++; return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128)) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }




/* SHA256 logical functions */
function rotateRight(n, x) {
	return ((x >>> n) | (x << (32 - n)));
}
function choice(x, y, z) {
	return ((x & y) ^ (~x & z));
}
function majority(x, y, z) {
	return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
	return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
	return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
	return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
	return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
	return (W[j & 0x0f] += sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
		sha256_sigma0(W[(j + 1) & 0x0f]));
}

/* Hash constant words K: */
var K256 = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

/* global arrays */
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
overflow) */
function safe_add(x, y) {
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

/* Initialise the SHA256 computation */
function sha256_init() {
	ihash = new Array(8);
	count = new Array(2);
	buffer = new Array(64);
	count[0] = count[1] = 0;
	ihash[0] = 0x6a09e667;
	ihash[1] = 0xbb67ae85;
	ihash[2] = 0x3c6ef372;
	ihash[3] = 0xa54ff53a;
	ihash[4] = 0x510e527f;
	ihash[5] = 0x9b05688c;
	ihash[6] = 0x1f83d9ab;
	ihash[7] = 0x5be0cd19;
}

/* Transform a 512-bit message block */
function sha256_transform() {
	var a, b, c, d, e, f, g, h, T1, T2;
	var W = new Array(16);

	/* Initialize registers with the previous intermediate value */
	a = ihash[0];
	b = ihash[1];
	c = ihash[2];
	d = ihash[3];
	e = ihash[4];
	f = ihash[5];
	g = ihash[6];
	h = ihash[7];

	/* make 32-bit words */
	for (var i = 0; i < 16; i++)
		W[i] = ((buffer[(i << 2) + 3]) | (buffer[(i << 2) + 2] << 8) | (buffer[(i << 2) + 1]
			<< 16) | (buffer[i << 2] << 24));

	for (var j = 0; j < 64; j++) {
		T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
		if (j < 16) T1 += W[j];
		else T1 += sha256_expand(W, j);
		T2 = sha256_Sigma0(a) + majority(a, b, c);
		h = g;
		g = f;
		f = e;
		e = safe_add(d, T1);
		d = c;
		c = b;
		b = a;
		a = safe_add(T1, T2);
	}

	/* Compute the current intermediate hash value */
	ihash[0] += a;
	ihash[1] += b;
	ihash[2] += c;
	ihash[3] += d;
	ihash[4] += e;
	ihash[5] += f;
	ihash[6] += g;
	ihash[7] += h;
}

/* Read the next chunk of data and update the SHA256 computation */
function sha256_update(data, inputLen) {
	var i, index, curpos = 0;
	/* Compute number of bytes mod 64 */
	index = ((count[0] >> 3) & 0x3f);
	var remainder = (inputLen & 0x3f);

	/* Update number of bits */
	if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
	count[1] += (inputLen >> 29);

	/* Transform as many times as possible */
	for (i = 0; i + 63 < inputLen; i += 64) {
		for (var j = index; j < 64; j++)
			buffer[j] = data.charCodeAt(curpos++);
		sha256_transform();
		index = 0;
	}

	/* Buffer remaining input */
	for (var j = 0; j < remainder; j++)
		buffer[j] = data.charCodeAt(curpos++);
}

/* Finish the computation by operations such as padding */
function sha256_final() {
	var index = ((count[0] >> 3) & 0x3f);
	buffer[index++] = 0x80;
	if (index <= 56) {
		for (var i = index; i < 56; i++)
			buffer[i] = 0;
	} else {
		for (var i = index; i < 64; i++)
			buffer[i] = 0;
		sha256_transform();
		for (var i = 0; i < 56; i++)
			buffer[i] = 0;
	}
	buffer[56] = (count[1] >>> 24) & 0xff;
	buffer[57] = (count[1] >>> 16) & 0xff;
	buffer[58] = (count[1] >>> 8) & 0xff;
	buffer[59] = count[1] & 0xff;
	buffer[60] = (count[0] >>> 24) & 0xff;
	buffer[61] = (count[0] >>> 16) & 0xff;
	buffer[62] = (count[0] >>> 8) & 0xff;
	buffer[63] = count[0] & 0xff;
	sha256_transform();
}

/* Split the internal hash values into an array of bytes */
function sha256_encode_bytes() {
	var j = 0;
	var output = new Array(32);
	for (var i = 0; i < 8; i++) {
		output[j++] = ((ihash[i] >>> 24) & 0xff);
		output[j++] = ((ihash[i] >>> 16) & 0xff);
		output[j++] = ((ihash[i] >>> 8) & 0xff);
		output[j++] = (ihash[i] & 0xff);
	}
	return output;
}

/* Get the internal hash as a hex string */
function sha256_encode_hex() {
	var output = new String();
	for (var i = 0; i < 8; i++) {
		for (var j = 28; j >= 0; j -= 4)
			output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
	}
	return output;
}

/* Main function: returns a hex string representing the SHA256 value of the 
given data */
function sha256_Encrypt(data) {
	sha256_init();
	sha256_update(data, data.length);
	sha256_final();
	return sha256_encode_hex();
}

/**
 * 获取随机诗词
 */
function poem(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `https://v1.jinrishici.com/all.json`
		}
		$.get(url, async (err, resp, data) => {
			try {
				data = JSON.parse(data)
				log(`${data.content}  \n————《${data.origin}》${data.author}`);
			} catch (e) {
				log(e, resp);
			} finally {
				resolve()
			}
		}, timeout)
	})
}

// 完整 Env
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

//#endregion


var CryptoJS = CryptoJS || (function (Math, undefined) {
	var C = {};
	var C_lib = C.lib = {};
	var Base = C_lib.Base = (function () {
		function F() { };
		return {
			extend: function (overrides) {
				F.prototype = this;
				var subtype = new F();
				if (overrides) {
					subtype.mixIn(overrides);
				}
				if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
					subtype.init = function () {
						subtype.$super.init.apply(this, arguments);
					};
				}
				subtype.init.prototype = subtype;
				subtype.$super = this;
				return subtype;
			}, create: function () {
				var instance = this.extend();
				instance.init.apply(instance, arguments);
				return instance;
			}, init: function () { }, mixIn: function (properties) {
				for (var propertyName in properties) {
					if (properties.hasOwnProperty(propertyName)) {
						this[propertyName] = properties[propertyName];
					}
				}
				if (properties.hasOwnProperty('toString')) {
					this.toString = properties.toString;
				}
			}, clone: function () {
				return this.init.prototype.extend(this);
			}
		};
	}());
	var WordArray = C_lib.WordArray = Base.extend({
		init: function (words, sigBytes) {
			words = this.words = words || [];
			if (sigBytes != undefined) {
				this.sigBytes = sigBytes;
			} else {
				this.sigBytes = words.length * 4;
			}
		}, toString: function (encoder) {
			return (encoder || Hex).stringify(this);
		}, concat: function (wordArray) {
			var thisWords = this.words;
			var thatWords = wordArray.words;
			var thisSigBytes = this.sigBytes;
			var thatSigBytes = wordArray.sigBytes;
			this.clamp();
			if (thisSigBytes % 4) {
				for (var i = 0; i < thatSigBytes; i++) {
					var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
					thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
				}
			} else if (thatWords.length > 0xffff) {
				for (var i = 0; i < thatSigBytes; i += 4) {
					thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
				}
			} else {
				thisWords.push.apply(thisWords, thatWords);
			}
			this.sigBytes += thatSigBytes;
			return this;
		}, clamp: function () {
			var words = this.words;
			var sigBytes = this.sigBytes;
			words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
			words.length = Math.ceil(sigBytes / 4);
		}, clone: function () {
			var clone = Base.clone.call(this);
			clone.words = this.words.slice(0);
			return clone;
		}, random: function (nBytes) {
			var words = [];
			var r = (function (m_w) {
				var m_w = m_w;
				var m_z = 0x3ade68b1;
				var mask = 0xffffffff;
				return function () {
					m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
					m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
					var result = ((m_z << 0x10) + m_w) & mask;
					result /= 0x100000000;
					result += 0.5;
					return result * (Math.random() > .5 ? 1 : -1);
				}
			});
			for (var i = 0, rcache; i < nBytes; i += 4) {
				var _r = r((rcache || Math.random()) * 0x100000000);
				rcache = _r() * 0x3ade67b7;
				words.push((_r() * 0x100000000) | 0);
			}
			return new WordArray.init(words, nBytes);
		}
	});
	var C_enc = C.enc = {};
	var Hex = C_enc.Hex = {
		stringify: function (wordArray) {
			var words = wordArray.words;
			var sigBytes = wordArray.sigBytes;
			var hexChars = [];
			for (var i = 0; i < sigBytes; i++) {
				var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				hexChars.push((bite >>> 4).toString(16));
				hexChars.push((bite & 0x0f).toString(16));
			}
			return hexChars.join('');
		}, parse: function (hexStr) {
			var hexStrLength = hexStr.length;
			var words = [];
			for (var i = 0; i < hexStrLength; i += 2) {
				words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
			}
			return new WordArray.init(words, hexStrLength / 2);
		}
	};
	var Latin1 = C_enc.Latin1 = {
		stringify: function (wordArray) {
			var words = wordArray.words;
			var sigBytes = wordArray.sigBytes;
			var latin1Chars = [];
			for (var i = 0; i < sigBytes; i++) {
				var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				latin1Chars.push(String.fromCharCode(bite));
			}
			return latin1Chars.join('');
		}, parse: function (latin1Str) {
			var latin1StrLength = latin1Str.length;
			var words = [];
			for (var i = 0; i < latin1StrLength; i++) {
				words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
			}
			return new WordArray.init(words, latin1StrLength);
		}
	};
	var Utf8 = C_enc.Utf8 = {
		stringify: function (wordArray) {
			try {
				return decodeURIComponent(escape(Latin1.stringify(wordArray)));
			} catch (e) {
				throw new Error('Malformed UTF-8 data');
			}
		}, parse: function (utf8Str) {
			return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		}
	};
	var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		reset: function () {
			this._data = new WordArray.init();
			this._nDataBytes = 0;
		}, _append: function (data) {
			if (typeof data == 'string') {
				data = Utf8.parse(data);
			}
			this._data.concat(data);
			this._nDataBytes += data.sigBytes;
		}, _process: function (doFlush) {
			var data = this._data;
			var dataWords = data.words;
			var dataSigBytes = data.sigBytes;
			var blockSize = this.blockSize;
			var blockSizeBytes = blockSize * 4;
			var nBlocksReady = dataSigBytes / blockSizeBytes;
			if (doFlush) {
				nBlocksReady = Math.ceil(nBlocksReady);
			} else {
				nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
			}
			var nWordsReady = nBlocksReady * blockSize;
			var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
			if (nWordsReady) {
				for (var offset = 0; offset < nWordsReady; offset += blockSize) {
					this._doProcessBlock(dataWords, offset);
				}
				var processedWords = dataWords.splice(0, nWordsReady);
				data.sigBytes -= nBytesReady;
			}
			return new WordArray.init(processedWords, nBytesReady);
		}, clone: function () {
			var clone = Base.clone.call(this);
			clone._data = this._data.clone();
			return clone;
		}, _minBufferSize: 0
	});
	var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		cfg: Base.extend(),
		init: function (cfg) {
			this.cfg = this.cfg.extend(cfg);
			this.reset();
		}, reset: function () {
			BufferedBlockAlgorithm.reset.call(this);
			this._doReset();
		}, update: function (messageUpdate) {
			this._append(messageUpdate);
			this._process();
			return this;
		}, finalize: function (messageUpdate) {
			if (messageUpdate) {
				this._append(messageUpdate);
			}
			var hash = this._doFinalize();
			return hash;
		}, blockSize: 512 / 32,
		_createHelper: function (hasher) {
			return function (message, cfg) {
				return new hasher.init(cfg).finalize(message);
			};
		}, _createHmacHelper: function (hasher) {
			return function (message, key) {
				return new C_algo.HMAC.init(hasher, key).finalize(message);
			};
		}
	});
	var C_algo = C.algo = {};
	return C;
}(Math));

(function () {
	var C = CryptoJS;
	var C_lib = C.lib;
	var WordArray = C_lib.WordArray;
	var C_enc = C.enc;
	var Base64 = C_enc.Base64 = {
		stringify: function (wordArray) {
			var words = wordArray.words;
			var sigBytes = wordArray.sigBytes;
			var map = this._map;
			wordArray.clamp();
			var base64Chars = [];
			for (var i = 0; i < sigBytes; i += 3) {
				var byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
				var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
				var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
				for (var j = 0;
					(j < 4) && (i + j * 0.75 < sigBytes); j++) {
					base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
				}
			}
			var paddingChar = map.charAt(64);
			if (paddingChar) {
				while (base64Chars.length % 4) {
					base64Chars.push(paddingChar);
				}
			}
			return base64Chars.join('');
		}, parse: function (base64Str) {
			var base64StrLength = base64Str.length;
			var map = this._map;
			var reverseMap = this._reverseMap;
			if (!reverseMap) {
				reverseMap = this._reverseMap = [];
				for (var j = 0; j < map.length; j++) {
					reverseMap[map.charCodeAt(j)] = j;
				}
			}
			var paddingChar = map.charAt(64);
			if (paddingChar) {
				var paddingIndex = base64Str.indexOf(paddingChar);
				if (paddingIndex !== -1) {
					base64StrLength = paddingIndex;
				}
			}
			return parseLoop(base64Str, base64StrLength, reverseMap);
		}, _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	};
	function parseLoop(base64Str, base64StrLength, reverseMap) {
		var words = [];
		var nBytes = 0;
		for (var i = 0; i < base64StrLength; i++) {
			if (i % 4) {
				var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
				var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
				words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
				nBytes++;
			}
		}
		return WordArray.create(words, nBytes);
	}
}());

CryptoJS.lib.Cipher || (function (undefined) {
	var C = CryptoJS;
	var C_lib = C.lib;
	var Base = C_lib.Base;
	var WordArray = C_lib.WordArray;
	var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	var C_enc = C.enc;
	var Utf8 = C_enc.Utf8;
	var Base64 = C_enc.Base64;
	var C_algo = C.algo;
	var EvpKDF = C_algo.EvpKDF;
	var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
		cfg: Base.extend(),
		createEncryptor: function (key, cfg) {
			return this.create(this._ENC_XFORM_MODE, key, cfg);
		}, createDecryptor: function (key, cfg) {
			return this.create(this._DEC_XFORM_MODE, key, cfg);
		}, init: function (xformMode, key, cfg) {
			this.cfg = this.cfg.extend(cfg);
			this._xformMode = xformMode;
			this._key = key;
			this.reset();
		}, reset: function () {
			BufferedBlockAlgorithm.reset.call(this);
			this._doReset();
		}, process: function (dataUpdate) {
			this._append(dataUpdate);
			return this._process();
		}, finalize: function (dataUpdate) {
			if (dataUpdate) {
				this._append(dataUpdate);
			}
			var finalProcessedData = this._doFinalize();
			return finalProcessedData;
		}, keySize: 128 / 32,
		ivSize: 128 / 32,
		_ENC_XFORM_MODE: 1,
		_DEC_XFORM_MODE: 2,
		_createHelper: (function () {
			function selectCipherStrategy(key) {
				if (typeof key == 'string') {
					return PasswordBasedCipher;
				} else {
					return SerializableCipher;
				}
			}
			return function (cipher) {
				return {
					encrypt: function (message, key, cfg) {
						return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
					}, decrypt: function (ciphertext, key, cfg) {
						return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
					}
				};
			};
		}())
	});
	var StreamCipher = C_lib.StreamCipher = Cipher.extend({
		_doFinalize: function () {
			var finalProcessedBlocks = this._process(!!'flush');
			return finalProcessedBlocks;
		}, blockSize: 1
	});
	var C_mode = C.mode = {};
	var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
		createEncryptor: function (cipher, iv) {
			return this.Encryptor.create(cipher, iv);
		}, createDecryptor: function (cipher, iv) {
			return this.Decryptor.create(cipher, iv);
		}, init: function (cipher, iv) {
			this._cipher = cipher;
			this._iv = iv;
		}
	});
	var CBC = C_mode.CBC = (function () {
		var CBC = BlockCipherMode.extend();
		CBC.Encryptor = CBC.extend({
			processBlock: function (words, offset) {
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				xorBlock.call(this, words, offset, blockSize);
				cipher.encryptBlock(words, offset);
				this._prevBlock = words.slice(offset, offset + blockSize);
			}
		});
		CBC.Decryptor = CBC.extend({
			processBlock: function (words, offset) {
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var thisBlock = words.slice(offset, offset + blockSize);
				cipher.decryptBlock(words, offset);
				xorBlock.call(this, words, offset, blockSize);
				this._prevBlock = thisBlock;
			}
		});

		function xorBlock(words, offset, blockSize) {
			var iv = this._iv;
			if (iv) {
				var block = iv;
				this._iv = undefined;
			} else {
				var block = this._prevBlock;
			}
			for (var i = 0; i < blockSize; i++) {
				words[offset + i] ^= block[i];
			}
		}
		return CBC;
	}());
	var C_pad = C.pad = {};
	var Pkcs7 = C_pad.Pkcs7 = {
		pad: function (data, blockSize) {
			var blockSizeBytes = blockSize * 4;
			var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
			var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
			var paddingWords = [];
			for (var i = 0; i < nPaddingBytes; i += 4) {
				paddingWords.push(paddingWord);
			}
			var padding = WordArray.create(paddingWords, nPaddingBytes);
			data.concat(padding);
		}, unpad: function (data) {
			var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
			data.sigBytes -= nPaddingBytes;
		}
	};
	var BlockCipher = C_lib.BlockCipher = Cipher.extend({
		cfg: Cipher.cfg.extend({
			mode: CBC,
			padding: Pkcs7
		}),
		reset: function () {
			Cipher.reset.call(this);
			var cfg = this.cfg;
			var iv = cfg.iv;
			var mode = cfg.mode;
			if (this._xformMode == this._ENC_XFORM_MODE) {
				var modeCreator = mode.createEncryptor;
			} else {
				var modeCreator = mode.createDecryptor;
				this._minBufferSize = 1;
			} if (this._mode && this._mode.__creator == modeCreator) {
				this._mode.init(this, iv && iv.words);
			} else {
				this._mode = modeCreator.call(mode, this, iv && iv.words);
				this._mode.__creator = modeCreator;
			}
		}, _doProcessBlock: function (words, offset) {
			this._mode.processBlock(words, offset);
		}, _doFinalize: function () {
			var padding = this.cfg.padding;
			if (this._xformMode == this._ENC_XFORM_MODE) {
				padding.pad(this._data, this.blockSize);
				var finalProcessedBlocks = this._process(!!'flush');
			} else {
				var finalProcessedBlocks = this._process(!!'flush');
				padding.unpad(finalProcessedBlocks);
			}
			return finalProcessedBlocks;
		}, blockSize: 128 / 32
	});
	var CipherParams = C_lib.CipherParams = Base.extend({
		init: function (cipherParams) {
			this.mixIn(cipherParams);
		}, toString: function (formatter) {
			return (formatter || this.formatter).stringify(this);
		}
	});
	var C_format = C.format = {};
	var OpenSSLFormatter = C_format.OpenSSL = {
		stringify: function (cipherParams) {
			var ciphertext = cipherParams.ciphertext;
			var salt = cipherParams.salt;
			if (salt) {
				var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
			} else {
				var wordArray = ciphertext;
			}
			return wordArray.toString(Base64);
		}, parse: function (openSSLStr) {
			var ciphertext = Base64.parse(openSSLStr);
			var ciphertextWords = ciphertext.words;
			if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
				var salt = WordArray.create(ciphertextWords.slice(2, 4));
				ciphertextWords.splice(0, 4);
				ciphertext.sigBytes -= 16;
			}
			return CipherParams.create({
				ciphertext: ciphertext,
				salt: salt
			});
		}
	};
	var SerializableCipher = C_lib.SerializableCipher = Base.extend({
		cfg: Base.extend({
			format: OpenSSLFormatter
		}),
		encrypt: function (cipher, message, key, cfg) {
			cfg = this.cfg.extend(cfg);
			var encryptor = cipher.createEncryptor(key, cfg);
			var ciphertext = encryptor.finalize(message);
			var cipherCfg = encryptor.cfg;
			return CipherParams.create({
				ciphertext: ciphertext,
				key: key,
				iv: cipherCfg.iv,
				algorithm: cipher,
				mode: cipherCfg.mode,
				padding: cipherCfg.padding,
				blockSize: cipher.blockSize,
				formatter: cfg.format
			});
		}, decrypt: function (cipher, ciphertext, key, cfg) {
			cfg = this.cfg.extend(cfg);
			ciphertext = this._parse(ciphertext, cfg.format);
			var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
			return plaintext;
		}, _parse: function (ciphertext, format) {
			if (typeof ciphertext == 'string') {
				return format.parse(ciphertext, this);
			} else {
				return ciphertext;
			}
		}
	});
	var C_kdf = C.kdf = {};
	var OpenSSLKdf = C_kdf.OpenSSL = {
		execute: function (password, keySize, ivSize, salt) {
			if (!salt) {
				salt = WordArray.random(64 / 8);
			}
			var key = EvpKDF.create({
				keySize: keySize + ivSize
			}).compute(password, salt);
			var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
			key.sigBytes = keySize * 4;
			return CipherParams.create({
				key: key,
				iv: iv,
				salt: salt
			});
		}
	};
	var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
		cfg: SerializableCipher.cfg.extend({
			kdf: OpenSSLKdf
		}),
		encrypt: function (cipher, message, password, cfg) {
			cfg = this.cfg.extend(cfg);
			var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
			cfg.iv = derivedParams.iv;
			var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
			ciphertext.mixIn(derivedParams);
			return ciphertext;
		}, decrypt: function (cipher, ciphertext, password, cfg) {
			cfg = this.cfg.extend(cfg);
			ciphertext = this._parse(ciphertext, cfg.format);
			var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
			cfg.iv = derivedParams.iv;
			var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
			return plaintext;
		}
	});
}());

CryptoJS.mode.ECB = (function () {
	var ECB = CryptoJS.lib.BlockCipherMode.extend();
	ECB.Encryptor = ECB.extend({
		processBlock: function (words, offset) {
			this._cipher.encryptBlock(words, offset);
		}
	});
	ECB.Decryptor = ECB.extend({
		processBlock: function (words, offset) {
			this._cipher.decryptBlock(words, offset);
		}
	});
	return ECB;
}());

(function () {
	var C = CryptoJS;
	var C_lib = C.lib;
	var WordArray = C_lib.WordArray;
	var BlockCipher = C_lib.BlockCipher;
	var C_algo = C.algo;
	var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
	var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
	var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
	var SBOX_P = [{
		0x0: 0x808200,
		0x10000000: 0x8000,
		0x20000000: 0x808002,
		0x30000000: 0x2,
		0x40000000: 0x200,
		0x50000000: 0x808202,
		0x60000000: 0x800202,
		0x70000000: 0x800000,
		0x80000000: 0x202,
		0x90000000: 0x800200,
		0xa0000000: 0x8200,
		0xb0000000: 0x808000,
		0xc0000000: 0x8002,
		0xd0000000: 0x800002,
		0xe0000000: 0x0,
		0xf0000000: 0x8202,
		0x8000000: 0x0,
		0x18000000: 0x808202,
		0x28000000: 0x8202,
		0x38000000: 0x8000,
		0x48000000: 0x808200,
		0x58000000: 0x200,
		0x68000000: 0x808002,
		0x78000000: 0x2,
		0x88000000: 0x800200,
		0x98000000: 0x8200,
		0xa8000000: 0x808000,
		0xb8000000: 0x800202,
		0xc8000000: 0x800002,
		0xd8000000: 0x8002,
		0xe8000000: 0x202,
		0xf8000000: 0x800000,
		0x1: 0x8000,
		0x10000001: 0x2,
		0x20000001: 0x808200,
		0x30000001: 0x800000,
		0x40000001: 0x808002,
		0x50000001: 0x8200,
		0x60000001: 0x200,
		0x70000001: 0x800202,
		0x80000001: 0x808202,
		0x90000001: 0x808000,
		0xa0000001: 0x800002,
		0xb0000001: 0x8202,
		0xc0000001: 0x202,
		0xd0000001: 0x800200,
		0xe0000001: 0x8002,
		0xf0000001: 0x0,
		0x8000001: 0x808202,
		0x18000001: 0x808000,
		0x28000001: 0x800000,
		0x38000001: 0x200,
		0x48000001: 0x8000,
		0x58000001: 0x800002,
		0x68000001: 0x2,
		0x78000001: 0x8202,
		0x88000001: 0x8002,
		0x98000001: 0x800202,
		0xa8000001: 0x202,
		0xb8000001: 0x808200,
		0xc8000001: 0x800200,
		0xd8000001: 0x0,
		0xe8000001: 0x8200,
		0xf8000001: 0x808002
	}, {
		0x0: 0x40084010,
		0x1000000: 0x4000,
		0x2000000: 0x80000,
		0x3000000: 0x40080010,
		0x4000000: 0x40000010,
		0x5000000: 0x40084000,
		0x6000000: 0x40004000,
		0x7000000: 0x10,
		0x8000000: 0x84000,
		0x9000000: 0x40004010,
		0xa000000: 0x40000000,
		0xb000000: 0x84010,
		0xc000000: 0x80010,
		0xd000000: 0x0,
		0xe000000: 0x4010,
		0xf000000: 0x40080000,
		0x800000: 0x40004000,
		0x1800000: 0x84010,
		0x2800000: 0x10,
		0x3800000: 0x40004010,
		0x4800000: 0x40084010,
		0x5800000: 0x40000000,
		0x6800000: 0x80000,
		0x7800000: 0x40080010,
		0x8800000: 0x80010,
		0x9800000: 0x0,
		0xa800000: 0x4000,
		0xb800000: 0x40080000,
		0xc800000: 0x40000010,
		0xd800000: 0x84000,
		0xe800000: 0x40084000,
		0xf800000: 0x4010,
		0x10000000: 0x0,
		0x11000000: 0x40080010,
		0x12000000: 0x40004010,
		0x13000000: 0x40084000,
		0x14000000: 0x40080000,
		0x15000000: 0x10,
		0x16000000: 0x84010,
		0x17000000: 0x4000,
		0x18000000: 0x4010,
		0x19000000: 0x80000,
		0x1a000000: 0x80010,
		0x1b000000: 0x40000010,
		0x1c000000: 0x84000,
		0x1d000000: 0x40004000,
		0x1e000000: 0x40000000,
		0x1f000000: 0x40084010,
		0x10800000: 0x84010,
		0x11800000: 0x80000,
		0x12800000: 0x40080000,
		0x13800000: 0x4000,
		0x14800000: 0x40004000,
		0x15800000: 0x40084010,
		0x16800000: 0x10,
		0x17800000: 0x40000000,
		0x18800000: 0x40084000,
		0x19800000: 0x40000010,
		0x1a800000: 0x40004010,
		0x1b800000: 0x80010,
		0x1c800000: 0x0,
		0x1d800000: 0x4010,
		0x1e800000: 0x40080010,
		0x1f800000: 0x84000
	}, {
		0x0: 0x104,
		0x100000: 0x0,
		0x200000: 0x4000100,
		0x300000: 0x10104,
		0x400000: 0x10004,
		0x500000: 0x4000004,
		0x600000: 0x4010104,
		0x700000: 0x4010000,
		0x800000: 0x4000000,
		0x900000: 0x4010100,
		0xa00000: 0x10100,
		0xb00000: 0x4010004,
		0xc00000: 0x4000104,
		0xd00000: 0x10000,
		0xe00000: 0x4,
		0xf00000: 0x100,
		0x80000: 0x4010100,
		0x180000: 0x4010004,
		0x280000: 0x0,
		0x380000: 0x4000100,
		0x480000: 0x4000004,
		0x580000: 0x10000,
		0x680000: 0x10004,
		0x780000: 0x104,
		0x880000: 0x4,
		0x980000: 0x100,
		0xa80000: 0x4010000,
		0xb80000: 0x10104,
		0xc80000: 0x10100,
		0xd80000: 0x4000104,
		0xe80000: 0x4010104,
		0xf80000: 0x4000000,
		0x1000000: 0x4010100,
		0x1100000: 0x10004,
		0x1200000: 0x10000,
		0x1300000: 0x4000100,
		0x1400000: 0x100,
		0x1500000: 0x4010104,
		0x1600000: 0x4000004,
		0x1700000: 0x0,
		0x1800000: 0x4000104,
		0x1900000: 0x4000000,
		0x1a00000: 0x4,
		0x1b00000: 0x10100,
		0x1c00000: 0x4010000,
		0x1d00000: 0x104,
		0x1e00000: 0x10104,
		0x1f00000: 0x4010004,
		0x1080000: 0x4000000,
		0x1180000: 0x104,
		0x1280000: 0x4010100,
		0x1380000: 0x0,
		0x1480000: 0x10004,
		0x1580000: 0x4000100,
		0x1680000: 0x100,
		0x1780000: 0x4010004,
		0x1880000: 0x10000,
		0x1980000: 0x4010104,
		0x1a80000: 0x10104,
		0x1b80000: 0x4000004,
		0x1c80000: 0x4000104,
		0x1d80000: 0x4010000,
		0x1e80000: 0x4,
		0x1f80000: 0x10100
	}, {
		0x0: 0x80401000,
		0x10000: 0x80001040,
		0x20000: 0x401040,
		0x30000: 0x80400000,
		0x40000: 0x0,
		0x50000: 0x401000,
		0x60000: 0x80000040,
		0x70000: 0x400040,
		0x80000: 0x80000000,
		0x90000: 0x400000,
		0xa0000: 0x40,
		0xb0000: 0x80001000,
		0xc0000: 0x80400040,
		0xd0000: 0x1040,
		0xe0000: 0x1000,
		0xf0000: 0x80401040,
		0x8000: 0x80001040,
		0x18000: 0x40,
		0x28000: 0x80400040,
		0x38000: 0x80001000,
		0x48000: 0x401000,
		0x58000: 0x80401040,
		0x68000: 0x0,
		0x78000: 0x80400000,
		0x88000: 0x1000,
		0x98000: 0x80401000,
		0xa8000: 0x400000,
		0xb8000: 0x1040,
		0xc8000: 0x80000000,
		0xd8000: 0x400040,
		0xe8000: 0x401040,
		0xf8000: 0x80000040,
		0x100000: 0x400040,
		0x110000: 0x401000,
		0x120000: 0x80000040,
		0x130000: 0x0,
		0x140000: 0x1040,
		0x150000: 0x80400040,
		0x160000: 0x80401000,
		0x170000: 0x80001040,
		0x180000: 0x80401040,
		0x190000: 0x80000000,
		0x1a0000: 0x80400000,
		0x1b0000: 0x401040,
		0x1c0000: 0x80001000,
		0x1d0000: 0x400000,
		0x1e0000: 0x40,
		0x1f0000: 0x1000,
		0x108000: 0x80400000,
		0x118000: 0x80401040,
		0x128000: 0x0,
		0x138000: 0x401000,
		0x148000: 0x400040,
		0x158000: 0x80000000,
		0x168000: 0x80001040,
		0x178000: 0x40,
		0x188000: 0x80000040,
		0x198000: 0x1000,
		0x1a8000: 0x80001000,
		0x1b8000: 0x80400040,
		0x1c8000: 0x1040,
		0x1d8000: 0x80401000,
		0x1e8000: 0x400000,
		0x1f8000: 0x401040
	}, {
		0x0: 0x80,
		0x1000: 0x1040000,
		0x2000: 0x40000,
		0x3000: 0x20000000,
		0x4000: 0x20040080,
		0x5000: 0x1000080,
		0x6000: 0x21000080,
		0x7000: 0x40080,
		0x8000: 0x1000000,
		0x9000: 0x20040000,
		0xa000: 0x20000080,
		0xb000: 0x21040080,
		0xc000: 0x21040000,
		0xd000: 0x0,
		0xe000: 0x1040080,
		0xf000: 0x21000000,
		0x800: 0x1040080,
		0x1800: 0x21000080,
		0x2800: 0x80,
		0x3800: 0x1040000,
		0x4800: 0x40000,
		0x5800: 0x20040080,
		0x6800: 0x21040000,
		0x7800: 0x20000000,
		0x8800: 0x20040000,
		0x9800: 0x0,
		0xa800: 0x21040080,
		0xb800: 0x1000080,
		0xc800: 0x20000080,
		0xd800: 0x21000000,
		0xe800: 0x1000000,
		0xf800: 0x40080,
		0x10000: 0x40000,
		0x11000: 0x80,
		0x12000: 0x20000000,
		0x13000: 0x21000080,
		0x14000: 0x1000080,
		0x15000: 0x21040000,
		0x16000: 0x20040080,
		0x17000: 0x1000000,
		0x18000: 0x21040080,
		0x19000: 0x21000000,
		0x1a000: 0x1040000,
		0x1b000: 0x20040000,
		0x1c000: 0x40080,
		0x1d000: 0x20000080,
		0x1e000: 0x0,
		0x1f000: 0x1040080,
		0x10800: 0x21000080,
		0x11800: 0x1000000,
		0x12800: 0x1040000,
		0x13800: 0x20040080,
		0x14800: 0x20000000,
		0x15800: 0x1040080,
		0x16800: 0x80,
		0x17800: 0x21040000,
		0x18800: 0x40080,
		0x19800: 0x21040080,
		0x1a800: 0x0,
		0x1b800: 0x21000000,
		0x1c800: 0x1000080,
		0x1d800: 0x40000,
		0x1e800: 0x20040000,
		0x1f800: 0x20000080
	}, {
		0x0: 0x10000008,
		0x100: 0x2000,
		0x200: 0x10200000,
		0x300: 0x10202008,
		0x400: 0x10002000,
		0x500: 0x200000,
		0x600: 0x200008,
		0x700: 0x10000000,
		0x800: 0x0,
		0x900: 0x10002008,
		0xa00: 0x202000,
		0xb00: 0x8,
		0xc00: 0x10200008,
		0xd00: 0x202008,
		0xe00: 0x2008,
		0xf00: 0x10202000,
		0x80: 0x10200000,
		0x180: 0x10202008,
		0x280: 0x8,
		0x380: 0x200000,
		0x480: 0x202008,
		0x580: 0x10000008,
		0x680: 0x10002000,
		0x780: 0x2008,
		0x880: 0x200008,
		0x980: 0x2000,
		0xa80: 0x10002008,
		0xb80: 0x10200008,
		0xc80: 0x0,
		0xd80: 0x10202000,
		0xe80: 0x202000,
		0xf80: 0x10000000,
		0x1000: 0x10002000,
		0x1100: 0x10200008,
		0x1200: 0x10202008,
		0x1300: 0x2008,
		0x1400: 0x200000,
		0x1500: 0x10000000,
		0x1600: 0x10000008,
		0x1700: 0x202000,
		0x1800: 0x202008,
		0x1900: 0x0,
		0x1a00: 0x8,
		0x1b00: 0x10200000,
		0x1c00: 0x2000,
		0x1d00: 0x10002008,
		0x1e00: 0x10202000,
		0x1f00: 0x200008,
		0x1080: 0x8,
		0x1180: 0x202000,
		0x1280: 0x200000,
		0x1380: 0x10000008,
		0x1480: 0x10002000,
		0x1580: 0x2008,
		0x1680: 0x10202008,
		0x1780: 0x10200000,
		0x1880: 0x10202000,
		0x1980: 0x10200008,
		0x1a80: 0x2000,
		0x1b80: 0x202008,
		0x1c80: 0x200008,
		0x1d80: 0x0,
		0x1e80: 0x10000000,
		0x1f80: 0x10002008
	}, {
		0x0: 0x100000,
		0x10: 0x2000401,
		0x20: 0x400,
		0x30: 0x100401,
		0x40: 0x2100401,
		0x50: 0x0,
		0x60: 0x1,
		0x70: 0x2100001,
		0x80: 0x2000400,
		0x90: 0x100001,
		0xa0: 0x2000001,
		0xb0: 0x2100400,
		0xc0: 0x2100000,
		0xd0: 0x401,
		0xe0: 0x100400,
		0xf0: 0x2000000,
		0x8: 0x2100001,
		0x18: 0x0,
		0x28: 0x2000401,
		0x38: 0x2100400,
		0x48: 0x100000,
		0x58: 0x2000001,
		0x68: 0x2000000,
		0x78: 0x401,
		0x88: 0x100401,
		0x98: 0x2000400,
		0xa8: 0x2100000,
		0xb8: 0x100001,
		0xc8: 0x400,
		0xd8: 0x2100401,
		0xe8: 0x1,
		0xf8: 0x100400,
		0x100: 0x2000000,
		0x110: 0x100000,
		0x120: 0x2000401,
		0x130: 0x2100001,
		0x140: 0x100001,
		0x150: 0x2000400,
		0x160: 0x2100400,
		0x170: 0x100401,
		0x180: 0x401,
		0x190: 0x2100401,
		0x1a0: 0x100400,
		0x1b0: 0x1,
		0x1c0: 0x0,
		0x1d0: 0x2100000,
		0x1e0: 0x2000001,
		0x1f0: 0x400,
		0x108: 0x100400,
		0x118: 0x2000401,
		0x128: 0x2100001,
		0x138: 0x1,
		0x148: 0x2000000,
		0x158: 0x100000,
		0x168: 0x401,
		0x178: 0x2100400,
		0x188: 0x2000001,
		0x198: 0x2100000,
		0x1a8: 0x0,
		0x1b8: 0x2100401,
		0x1c8: 0x100401,
		0x1d8: 0x400,
		0x1e8: 0x2000400,
		0x1f8: 0x100001
	}, {
		0x0: 0x8000820,
		0x1: 0x20000,
		0x2: 0x8000000,
		0x3: 0x20,
		0x4: 0x20020,
		0x5: 0x8020820,
		0x6: 0x8020800,
		0x7: 0x800,
		0x8: 0x8020000,
		0x9: 0x8000800,
		0xa: 0x20800,
		0xb: 0x8020020,
		0xc: 0x820,
		0xd: 0x0,
		0xe: 0x8000020,
		0xf: 0x20820,
		0x80000000: 0x800,
		0x80000001: 0x8020820,
		0x80000002: 0x8000820,
		0x80000003: 0x8000000,
		0x80000004: 0x8020000,
		0x80000005: 0x20800,
		0x80000006: 0x20820,
		0x80000007: 0x20,
		0x80000008: 0x8000020,
		0x80000009: 0x820,
		0x8000000a: 0x20020,
		0x8000000b: 0x8020800,
		0x8000000c: 0x0,
		0x8000000d: 0x8020020,
		0x8000000e: 0x8000800,
		0x8000000f: 0x20000,
		0x10: 0x20820,
		0x11: 0x8020800,
		0x12: 0x20,
		0x13: 0x800,
		0x14: 0x8000800,
		0x15: 0x8000020,
		0x16: 0x8020020,
		0x17: 0x20000,
		0x18: 0x0,
		0x19: 0x20020,
		0x1a: 0x8020000,
		0x1b: 0x8000820,
		0x1c: 0x8020820,
		0x1d: 0x20800,
		0x1e: 0x820,
		0x1f: 0x8000000,
		0x80000010: 0x20000,
		0x80000011: 0x800,
		0x80000012: 0x8020020,
		0x80000013: 0x20820,
		0x80000014: 0x20,
		0x80000015: 0x8020000,
		0x80000016: 0x8000000,
		0x80000017: 0x8000820,
		0x80000018: 0x8020820,
		0x80000019: 0x8000020,
		0x8000001a: 0x8000800,
		0x8000001b: 0x0,
		0x8000001c: 0x20800,
		0x8000001d: 0x820,
		0x8000001e: 0x20020,
		0x8000001f: 0x8020800
	}];
	var SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];
	var DES = C_algo.DES = BlockCipher.extend({
		_doReset: function () {
			var key = this._key;
			var keyWords = key.words;
			var keyBits = [];
			for (var i = 0; i < 56; i++) {
				var keyBitPos = PC1[i] - 1;
				keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
			}
			var subKeys = this._subKeys = [];
			for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
				var subKey = subKeys[nSubKey] = [];
				var bitShift = BIT_SHIFTS[nSubKey];
				for (var i = 0; i < 24; i++) {
					subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);
					subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
				}
				subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
				for (var i = 1; i < 7; i++) {
					subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
				}
				subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
			}
			var invSubKeys = this._invSubKeys = [];
			for (var i = 0; i < 16; i++) {
				invSubKeys[i] = subKeys[15 - i];
			}
		}, encryptBlock: function (M, offset) {
			this._doCryptBlock(M, offset, this._subKeys);
		}, decryptBlock: function (M, offset) {
			this._doCryptBlock(M, offset, this._invSubKeys);
		}, _doCryptBlock: function (M, offset, subKeys) {
			this._lBlock = M[offset];
			this._rBlock = M[offset + 1];
			exchangeLR.call(this, 4, 0x0f0f0f0f);
			exchangeLR.call(this, 16, 0x0000ffff);
			exchangeRL.call(this, 2, 0x33333333);
			exchangeRL.call(this, 8, 0x00ff00ff);
			exchangeLR.call(this, 1, 0x55555555);
			for (var round = 0; round < 16; round++) {
				var subKey = subKeys[round];
				var lBlock = this._lBlock;
				var rBlock = this._rBlock;
				var f = 0;
				for (var i = 0; i < 8; i++) {
					f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
				}
				this._lBlock = rBlock;
				this._rBlock = lBlock ^ f;
			}
			var t = this._lBlock;
			this._lBlock = this._rBlock;
			this._rBlock = t;
			exchangeLR.call(this, 1, 0x55555555);
			exchangeRL.call(this, 8, 0x00ff00ff);
			exchangeRL.call(this, 2, 0x33333333);
			exchangeLR.call(this, 16, 0x0000ffff);
			exchangeLR.call(this, 4, 0x0f0f0f0f);
			M[offset] = this._lBlock;
			M[offset + 1] = this._rBlock;
		}, keySize: 64 / 32,
		ivSize: 64 / 32,
		blockSize: 64 / 32
	});
	function exchangeLR(offset, mask) {
		var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
		this._rBlock ^= t;
		this._lBlock ^= t << offset;
	}
	function exchangeRL(offset, mask) {
		var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
		this._lBlock ^= t;
		this._rBlock ^= t << offset;
	}
	C.DES = BlockCipher._createHelper(DES);
	var TripleDES = C_algo.TripleDES = BlockCipher.extend({
		_doReset: function () {
			var key = this._key;
			var keyWords = key.words;
			this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
			this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
			this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
		}, encryptBlock: function (M, offset) {
			this._des1.encryptBlock(M, offset);
			this._des2.decryptBlock(M, offset);
			this._des3.encryptBlock(M, offset);
		}, decryptBlock: function (M, offset) {
			this._des3.decryptBlock(M, offset);
			this._des2.encryptBlock(M, offset);
			this._des1.decryptBlock(M, offset);
		}, keySize: 192 / 32,
		ivSize: 64 / 32,
		blockSize: 64 / 32
	});
	C.TripleDES = BlockCipher._createHelper(TripleDES);
}());

var key = CryptoJS.enc.Utf8.parse("Xo823-dl");

function DES_Encrypt(word) {
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.DES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}

function DES_Decrypt(word) {
	var srcs = word;
	var decrypt = CryptoJS.DES.decrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return decrypt.toString(CryptoJS.enc.Utf8);
}


