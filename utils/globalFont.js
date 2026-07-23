const FONT_FAMILY = 'PingFangSC-Medium';
const FONT_URL = 'https://www.hnpuyuan.com/font/PingFangSC-Medium.woff2';

let fontLoaded = false;
let fontLoadPromise = null;

export function loadGlobalFont() {
	// #ifdef MP-WEIXIN
	if (fontLoaded) {
		return Promise.resolve(true);
	}
	if (fontLoadPromise) {
		return fontLoadPromise;
	}
	if (typeof wx === 'undefined' || !wx.loadFontFace) {
		return Promise.resolve(false);
	}

	fontLoadPromise = new Promise((resolve) => {
		wx.loadFontFace({
			family: FONT_FAMILY,
			source: `url("${FONT_URL}")`,
			global: true,
			success: () => {
				fontLoaded = true;
				resolve(true);
			},
			fail: (err) => {
				console.warn(`${FONT_FAMILY} font load failed`, err);
				resolve(false);
			},
			complete: () => {
				fontLoadPromise = null;
			}
		});
	});

	return fontLoadPromise;
	// #endif

	// #ifndef MP-WEIXIN
	return Promise.resolve(false);
	// #endif
}

