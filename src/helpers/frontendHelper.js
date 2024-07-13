function fnv1aHash(string) {
	let hash = 2166136261;
	for (let i = 0; i < string.length; i++) {
		hash ^= string.charCodeAt(i);
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}
	return hash >>> 0;
}
  
export function getUserInt(string) {
	const hash = fnv1aHash(string);
	return (hash % 16) + 1;
}

export function getExtensionLink(browser) {
	switch (browser) {
		case 'Chrome':
			return 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
		case 'Firefox':
			return 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
		case 'Edge':
			return 'https://microsoftedge.microsoft.com/addons/detail/metamask/blplhpclcehdnajacjagnbdhhaimkjbh';
		case 'Safari':
			return 'https://metamask.io/download.html';
		default:
			return 'https://metamask.io/download.html';
	}
};

export function detectBrowser() {
	const userAgent = navigator.userAgent;
	if (userAgent.includes('Chrome')) return 'Chrome';
	if (userAgent.includes('Firefox')) return 'Firefox';
	if (userAgent.includes('Edge')) return 'Edge';
	if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
	return 'Other';
};
export function ethtowei(eth) {
	return eth * Math.pow(10, 18);
  }
  
  export function weitoeth(wei) {
	return wei / Math.pow(10, 18);
  }

 export function slugString(strval) {
    return strval.toLowerCase().replace(/\s+/g, '_');
}