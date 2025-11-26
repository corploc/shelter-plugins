(function() {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to$1, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i$1 = 0, n$1 = keys.length, key; i$1 < n$1; i$1++) {
		key = keys[i$1];
		if (!__hasOwnProp.call(to$1, key) && key !== except) __defProp(to$1, key, {
			get: ((k$1) => from[k$1]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to$1;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region solid-js
var require_solid_js = __commonJS({ "solid-js"(exports, module) {
	module.exports = shelter.solid;
} });

//#endregion
//#region plugins/pgpcord/lib/constants.ts
const IS_DEV = true;
const WEB_BASE_URL = IS_DEV ? "http://localhost:3000" : "https://pgpcord.corploc.net";

//#endregion
//#region node_modules/.pnpm/openpgp@6.2.2/node_modules/openpgp/dist/openpgp.min.mjs
/*! OpenPGP.js v6.2.2 - 2025-09-02 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. */
const t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function e(t$1, e$1) {
	return e$1.forEach(function(e$2) {
		e$2 && "string" != typeof e$2 && !Array.isArray(e$2) && Object.keys(e$2).forEach(function(r$1) {
			if ("default" !== r$1 && !(r$1 in t$1)) {
				var n$1 = Object.getOwnPropertyDescriptor(e$2, r$1);
				Object.defineProperty(t$1, r$1, n$1.get ? n$1 : {
					enumerable: !0,
					get: function() {
						return e$2[r$1];
					}
				});
			}
		});
	}), Object.freeze(t$1);
}
const r = Symbol("doneWritingPromise"), n = Symbol("doneWritingResolve"), i = Symbol("doneWritingReject"), s = Symbol("readingIndex");
var a = class a extends Array {
	constructor() {
		super(), Object.setPrototypeOf(this, a.prototype), this[r] = new Promise((t$1, e$1) => {
			this[n] = t$1, this[i] = e$1;
		}), this[r].catch(() => {});
	}
};
function o(t$1) {
	return t$1 && t$1.getReader && Array.isArray(t$1);
}
function c(t$1) {
	if (!o(t$1)) {
		const e$1 = t$1.getWriter(), r$1 = e$1.releaseLock;
		return e$1.releaseLock = () => {
			e$1.closed.catch(function() {}), r$1.call(e$1);
		}, e$1;
	}
	this.stream = t$1;
}
function u(e$1) {
	if (o(e$1)) return "array";
	if (t.ReadableStream && t.ReadableStream.prototype.isPrototypeOf(e$1)) return "web";
	if (e$1 && !(t.ReadableStream && e$1 instanceof t.ReadableStream) && "function" == typeof e$1._read && "object" == typeof e$1._readableState) throw Error("Native Node streams are no longer supported: please manually convert the stream to a WebStream, using e.g. `stream.Readable.toWeb`");
	return !(!e$1 || !e$1.getReader) && "web-like";
}
function h(t$1) {
	return Uint8Array.prototype.isPrototypeOf(t$1);
}
function f(t$1) {
	if (1 === t$1.length) return t$1[0];
	let e$1 = 0;
	for (let r$2 = 0; r$2 < t$1.length; r$2++) {
		if (!h(t$1[r$2])) throw Error("concatUint8Array: Data must be in the form of a Uint8Array");
		e$1 += t$1[r$2].length;
	}
	const r$1 = new Uint8Array(e$1);
	let n$1 = 0;
	return t$1.forEach(function(t$2) {
		r$1.set(t$2, n$1), n$1 += t$2.length;
	}), r$1;
}
a.prototype.getReader = function() {
	return void 0 === this[s] && (this[s] = 0), { read: async () => (await this[r], this[s] === this.length ? {
		value: void 0,
		done: !0
	} : {
		value: this[this[s]++],
		done: !1
	}) };
}, a.prototype.readToEnd = async function(t$1) {
	await this[r];
	const e$1 = t$1(this.slice(this[s]));
	return this.length = 0, e$1;
}, a.prototype.clone = function() {
	const t$1 = new a();
	return t$1[r] = this[r].then(() => {
		t$1.push(...this);
	}), t$1;
}, c.prototype.write = async function(t$1) {
	this.stream.push(t$1);
}, c.prototype.close = async function() {
	this.stream[n]();
}, c.prototype.abort = async function(t$1) {
	return this.stream[i](t$1), t$1;
}, c.prototype.releaseLock = function() {}, "object" == typeof t.process && t.process.versions;
const l = new WeakSet(), y = Symbol("externalBuffer");
function g(t$1) {
	if (this.stream = t$1, t$1[y] && (this[y] = t$1[y].slice()), o(t$1)) {
		const e$2 = t$1.getReader();
		return this._read = e$2.read.bind(e$2), this._releaseLock = () => {}, void (this._cancel = () => {});
	}
	if (u(t$1)) {
		const e$2 = t$1.getReader();
		return this._read = e$2.read.bind(e$2), this._releaseLock = () => {
			e$2.closed.catch(function() {}), e$2.releaseLock();
		}, void (this._cancel = e$2.cancel.bind(e$2));
	}
	let e$1 = !1;
	this._read = async () => e$1 || l.has(t$1) ? {
		value: void 0,
		done: !0
	} : (e$1 = !0, {
		value: t$1,
		done: !1
	}), this._releaseLock = () => {
		if (e$1) try {
			l.add(t$1);
		} catch (t$2) {}
	};
}
function p(t$1) {
	return u(t$1) ? t$1 : new ReadableStream({ start(e$1) {
		e$1.enqueue(t$1), e$1.close();
	} });
}
function d(t$1) {
	if (u(t$1)) return t$1;
	const e$1 = new a();
	return (async () => {
		const r$1 = x(e$1);
		await r$1.write(t$1), await r$1.close();
	})(), e$1;
}
function A(t$1) {
	return t$1.some((t$2) => u(t$2) && !o(t$2)) ? function(t$2) {
		t$2 = t$2.map(p);
		const e$1 = b(async function(t$3) {
			await Promise.all(n$1.map((e$2) => D(e$2, t$3)));
		});
		let r$1 = Promise.resolve();
		const n$1 = t$2.map((n$2, i$1) => E(n$2, (n$3, s$1) => (r$1 = r$1.then(() => w(n$3, e$1.writable, { preventClose: i$1 !== t$2.length - 1 })), r$1)));
		return e$1.readable;
	}(t$1) : t$1.some((t$2) => o(t$2)) ? function(t$2) {
		const e$1 = new a();
		let r$1 = Promise.resolve();
		return t$2.forEach((n$1, i$1) => (r$1 = r$1.then(() => w(n$1, e$1, { preventClose: i$1 !== t$2.length - 1 })), r$1)), e$1;
	}(t$1) : "string" == typeof t$1[0] ? t$1.join("") : f(t$1);
}
async function w(t$1, e$1, { preventClose: r$1 = !1, preventAbort: n$1 = !1, preventCancel: i$1 = !1 } = {}) {
	if (u(t$1) && !o(t$1)) {
		t$1 = p(t$1);
		try {
			if (t$1[y]) {
				const r$2 = x(e$1);
				for (let e$2 = 0; e$2 < t$1[y].length; e$2++) await r$2.ready, await r$2.write(t$1[y][e$2]);
				r$2.releaseLock();
			}
			await t$1.pipeTo(e$1, {
				preventClose: r$1,
				preventAbort: n$1,
				preventCancel: i$1
			});
		} catch (t$2) {}
		return;
	}
	const s$1 = P(t$1 = d(t$1)), a$1 = x(e$1);
	try {
		for (;;) {
			await a$1.ready;
			const { done: t$2, value: e$2 } = await s$1.read();
			if (t$2) {
				r$1 || await a$1.close();
				break;
			}
			await a$1.write(e$2);
		}
	} catch (t$2) {
		n$1 || await a$1.abort(t$2);
	} finally {
		s$1.releaseLock(), a$1.releaseLock();
	}
}
function m(t$1, e$1) {
	const r$1 = new TransformStream(e$1);
	return w(t$1, r$1.writable), r$1.readable;
}
function b(t$1) {
	let e$1, r$1, n$1, i$1 = !1, s$1 = !1;
	return {
		readable: new ReadableStream({
			start(t$2) {
				n$1 = t$2;
			},
			pull() {
				e$1 ? e$1() : i$1 = !0;
			},
			async cancel(e$2) {
				s$1 = !0, t$1 && await t$1(e$2), r$1 && r$1(e$2);
			}
		}, { highWaterMark: 0 }),
		writable: new WritableStream({
			write: async function(t$2) {
				if (s$1) throw Error("Stream is cancelled");
				n$1.enqueue(t$2), i$1 ? i$1 = !1 : (await new Promise((t$3, n$2) => {
					e$1 = t$3, r$1 = n$2;
				}), e$1 = null, r$1 = null);
			},
			close: n$1.close.bind(n$1),
			abort: n$1.error.bind(n$1)
		})
	};
}
function k(t$1, e$1 = () => {}, r$1 = () => {}) {
	if (o(t$1)) {
		const n$2 = new a();
		return (async () => {
			const i$2 = x(n$2);
			try {
				const n$3 = await C(t$1), s$1 = e$1(n$3), a$1 = r$1();
				let o$1;
				o$1 = void 0 !== s$1 && void 0 !== a$1 ? A([s$1, a$1]) : void 0 !== s$1 ? s$1 : a$1, await i$2.write(o$1), await i$2.close();
			} catch (t$2) {
				await i$2.abort(t$2);
			}
		})(), n$2;
	}
	if (u(t$1)) return m(t$1, {
		async transform(t$2, r$2) {
			try {
				const n$2 = await e$1(t$2);
				void 0 !== n$2 && r$2.enqueue(n$2);
			} catch (t$3) {
				r$2.error(t$3);
			}
		},
		async flush(t$2) {
			try {
				const e$2 = await r$1();
				void 0 !== e$2 && t$2.enqueue(e$2);
			} catch (e$2) {
				t$2.error(e$2);
			}
		}
	});
	const n$1 = e$1(t$1), i$1 = r$1();
	return void 0 !== n$1 && void 0 !== i$1 ? A([n$1, i$1]) : void 0 !== n$1 ? n$1 : i$1;
}
function E(t$1, e$1) {
	if (u(t$1) && !o(t$1)) {
		let r$2;
		const n$1 = new TransformStream({ start(t$2) {
			r$2 = t$2;
		} }), i$1 = w(t$1, n$1.writable), s$1 = b(async function(t$2) {
			r$2.error(t$2), await i$1, await new Promise(setTimeout);
		});
		return e$1(n$1.readable, s$1.writable), s$1.readable;
	}
	t$1 = d(t$1);
	const r$1 = new a();
	return e$1(t$1, r$1), r$1;
}
function v(t$1, e$1) {
	let r$1;
	const n$1 = E(t$1, (t$2, i$1) => {
		const s$1 = P(t$2);
		s$1.remainder = () => (s$1.releaseLock(), w(t$2, i$1), n$1), r$1 = e$1(s$1);
	});
	return r$1;
}
function B(t$1) {
	if (o(t$1)) return t$1.clone();
	if (u(t$1)) {
		const e$1 = function(t$2) {
			if (o(t$2)) throw Error("ArrayStream cannot be tee()d, use clone() instead");
			if (u(t$2)) {
				const e$2 = p(t$2).tee();
				return e$2[0][y] = e$2[1][y] = t$2[y], e$2;
			}
			return [K(t$2), K(t$2)];
		}(t$1);
		return S(t$1, e$1[0]), e$1[1];
	}
	return K(t$1);
}
function I(t$1) {
	return o(t$1) ? B(t$1) : u(t$1) ? new ReadableStream({ start(e$1) {
		const r$1 = E(t$1, async (t$2, r$2) => {
			const n$1 = P(t$2), i$1 = x(r$2);
			try {
				for (;;) {
					await i$1.ready;
					const { done: t$3, value: r$3 } = await n$1.read();
					if (t$3) {
						try {
							e$1.close();
						} catch (t$4) {}
						return void await i$1.close();
					}
					try {
						e$1.enqueue(r$3);
					} catch (t$4) {}
					await i$1.write(r$3);
				}
			} catch (t$3) {
				e$1.error(t$3), await i$1.abort(t$3);
			}
		});
		S(t$1, r$1);
	} }) : K(t$1);
}
function S(t$1, e$1) {
	Object.entries(Object.getOwnPropertyDescriptors(t$1.constructor.prototype)).forEach(([r$1, n$1]) => {
		"constructor" !== r$1 && (n$1.value ? n$1.value = n$1.value.bind(e$1) : n$1.get = n$1.get.bind(e$1), Object.defineProperty(t$1, r$1, n$1));
	});
}
function K(t$1, e$1 = 0, r$1 = Infinity) {
	if (o(t$1)) throw Error("Not implemented");
	if (u(t$1)) {
		if (e$1 >= 0 && r$1 >= 0) {
			let n$1 = 0;
			return m(t$1, { transform(t$2, i$1) {
				n$1 < r$1 ? (n$1 + t$2.length >= e$1 && i$1.enqueue(K(t$2, Math.max(e$1 - n$1, 0), r$1 - n$1)), n$1 += t$2.length) : i$1.terminate();
			} });
		}
		if (e$1 < 0 && (r$1 < 0 || r$1 === Infinity)) {
			let n$1 = [];
			return k(t$1, (t$2) => {
				t$2.length >= -e$1 ? n$1 = [t$2] : n$1.push(t$2);
			}, () => K(A(n$1), e$1, r$1));
		}
		if (0 === e$1 && r$1 < 0) {
			let n$1;
			return k(t$1, (t$2) => {
				const i$1 = n$1 ? A([n$1, t$2]) : t$2;
				if (i$1.length >= -r$1) return n$1 = K(i$1, r$1), K(i$1, e$1, r$1);
				n$1 = i$1;
			});
		}
		return console.warn(`stream.slice(input, ${e$1}, ${r$1}) not implemented efficiently.`), U(async () => K(await C(t$1), e$1, r$1));
	}
	return t$1[y] && (t$1 = A(t$1[y].concat([t$1]))), h(t$1) ? t$1.subarray(e$1, r$1 === Infinity ? t$1.length : r$1) : t$1.slice(e$1, r$1);
}
async function C(t$1, e$1 = A) {
	return o(t$1) ? t$1.readToEnd(e$1) : u(t$1) ? P(t$1).readToEnd(e$1) : t$1;
}
async function D(t$1, e$1) {
	if (u(t$1)) {
		if (t$1.cancel) {
			const r$1 = await t$1.cancel(e$1);
			return await new Promise(setTimeout), r$1;
		}
		if (t$1.destroy) return t$1.destroy(e$1), await new Promise(setTimeout), e$1;
	}
}
function U(t$1) {
	const e$1 = new a();
	return (async () => {
		const r$1 = x(e$1);
		try {
			await r$1.write(await t$1()), await r$1.close();
		} catch (t$2) {
			await r$1.abort(t$2);
		}
	})(), e$1;
}
function P(t$1) {
	return new g(t$1);
}
function x(t$1) {
	return new c(t$1);
}
g.prototype.read = async function() {
	if (this[y] && this[y].length) return {
		done: !1,
		value: this[y].shift()
	};
	return this._read();
}, g.prototype.releaseLock = function() {
	this[y] && (this.stream[y] = this[y]), this._releaseLock();
}, g.prototype.cancel = function(t$1) {
	return this._cancel(t$1);
}, g.prototype.readLine = async function() {
	let t$1, e$1 = [];
	for (; !t$1;) {
		let { done: r$1, value: n$1 } = await this.read();
		if (n$1 += "", r$1) return e$1.length ? A(e$1) : void 0;
		const i$1 = n$1.indexOf("\n") + 1;
		i$1 && (t$1 = A(e$1.concat(n$1.substr(0, i$1))), e$1 = []), i$1 !== n$1.length && e$1.push(n$1.substr(i$1));
	}
	return this.unshift(...e$1), t$1;
}, g.prototype.readByte = async function() {
	const { done: t$1, value: e$1 } = await this.read();
	if (t$1) return;
	const r$1 = e$1[0];
	return this.unshift(K(e$1, 1)), r$1;
}, g.prototype.readBytes = async function(t$1) {
	const e$1 = [];
	let r$1 = 0;
	for (;;) {
		const { done: n$1, value: i$1 } = await this.read();
		if (n$1) return e$1.length ? A(e$1) : void 0;
		if (e$1.push(i$1), r$1 += i$1.length, r$1 >= t$1) {
			const r$2 = A(e$1);
			return this.unshift(K(r$2, t$1)), K(r$2, 0, t$1);
		}
	}
}, g.prototype.peekBytes = async function(t$1) {
	const e$1 = await this.readBytes(t$1);
	return this.unshift(e$1), e$1;
}, g.prototype.unshift = function(...t$1) {
	this[y] || (this[y] = []), 1 === t$1.length && h(t$1[0]) && this[y].length && t$1[0].length && this[y][0].byteOffset >= t$1[0].length ? this[y][0] = new Uint8Array(this[y][0].buffer, this[y][0].byteOffset - t$1[0].length, this[y][0].byteLength + t$1[0].length) : this[y].unshift(...t$1.filter((t$2) => t$2 && t$2.length));
}, g.prototype.readToEnd = async function(t$1 = A) {
	const e$1 = [];
	for (;;) {
		const { done: t$2, value: r$1 } = await this.read();
		if (t$2) break;
		e$1.push(r$1);
	}
	return t$1(e$1);
};
const Q = Symbol("byValue");
var R = {
	curve: {
		nistP256: "nistP256",
		p256: "nistP256",
		nistP384: "nistP384",
		p384: "nistP384",
		nistP521: "nistP521",
		p521: "nistP521",
		secp256k1: "secp256k1",
		ed25519Legacy: "ed25519Legacy",
		ed25519: "ed25519Legacy",
		curve25519Legacy: "curve25519Legacy",
		curve25519: "curve25519Legacy",
		brainpoolP256r1: "brainpoolP256r1",
		brainpoolP384r1: "brainpoolP384r1",
		brainpoolP512r1: "brainpoolP512r1"
	},
	s2k: {
		simple: 0,
		salted: 1,
		iterated: 3,
		argon2: 4,
		gnu: 101
	},
	publicKey: {
		rsaEncryptSign: 1,
		rsaEncrypt: 2,
		rsaSign: 3,
		elgamal: 16,
		dsa: 17,
		ecdh: 18,
		ecdsa: 19,
		eddsaLegacy: 22,
		aedh: 23,
		aedsa: 24,
		x25519: 25,
		x448: 26,
		ed25519: 27,
		ed448: 28
	},
	symmetric: {
		idea: 1,
		tripledes: 2,
		cast5: 3,
		blowfish: 4,
		aes128: 7,
		aes192: 8,
		aes256: 9,
		twofish: 10
	},
	compression: {
		uncompressed: 0,
		zip: 1,
		zlib: 2,
		bzip2: 3
	},
	hash: {
		md5: 1,
		sha1: 2,
		ripemd: 3,
		sha256: 8,
		sha384: 9,
		sha512: 10,
		sha224: 11,
		sha3_256: 12,
		sha3_512: 14
	},
	webHash: {
		"SHA-1": 2,
		"SHA-256": 8,
		"SHA-384": 9,
		"SHA-512": 10
	},
	aead: {
		eax: 1,
		ocb: 2,
		gcm: 3,
		experimentalGCM: 100
	},
	packet: {
		publicKeyEncryptedSessionKey: 1,
		signature: 2,
		symEncryptedSessionKey: 3,
		onePassSignature: 4,
		secretKey: 5,
		publicKey: 6,
		secretSubkey: 7,
		compressedData: 8,
		symmetricallyEncryptedData: 9,
		marker: 10,
		literalData: 11,
		trust: 12,
		userID: 13,
		publicSubkey: 14,
		userAttribute: 17,
		symEncryptedIntegrityProtectedData: 18,
		modificationDetectionCode: 19,
		aeadEncryptedData: 20,
		padding: 21
	},
	literal: {
		binary: 98,
		text: 116,
		utf8: 117,
		mime: 109
	},
	signature: {
		binary: 0,
		text: 1,
		standalone: 2,
		certGeneric: 16,
		certPersona: 17,
		certCasual: 18,
		certPositive: 19,
		certRevocation: 48,
		subkeyBinding: 24,
		keyBinding: 25,
		key: 31,
		keyRevocation: 32,
		subkeyRevocation: 40,
		timestamp: 64,
		thirdParty: 80
	},
	signatureSubpacket: {
		signatureCreationTime: 2,
		signatureExpirationTime: 3,
		exportableCertification: 4,
		trustSignature: 5,
		regularExpression: 6,
		revocable: 7,
		keyExpirationTime: 9,
		placeholderBackwardsCompatibility: 10,
		preferredSymmetricAlgorithms: 11,
		revocationKey: 12,
		issuerKeyID: 16,
		notationData: 20,
		preferredHashAlgorithms: 21,
		preferredCompressionAlgorithms: 22,
		keyServerPreferences: 23,
		preferredKeyServer: 24,
		primaryUserID: 25,
		policyURI: 26,
		keyFlags: 27,
		signersUserID: 28,
		reasonForRevocation: 29,
		features: 30,
		signatureTarget: 31,
		embeddedSignature: 32,
		issuerFingerprint: 33,
		preferredAEADAlgorithms: 34,
		preferredCipherSuites: 39
	},
	keyFlags: {
		certifyKeys: 1,
		signData: 2,
		encryptCommunication: 4,
		encryptStorage: 8,
		splitPrivateKey: 16,
		authentication: 32,
		sharedPrivateKey: 128
	},
	armor: {
		multipartSection: 0,
		multipartLast: 1,
		signed: 2,
		message: 3,
		publicKey: 4,
		privateKey: 5,
		signature: 6
	},
	reasonForRevocation: {
		noReason: 0,
		keySuperseded: 1,
		keyCompromised: 2,
		keyRetired: 3,
		userIDInvalid: 32
	},
	features: {
		modificationDetection: 1,
		aead: 2,
		v5Keys: 4,
		seipdv2: 8
	},
	write: function(t$1, e$1) {
		if ("number" == typeof e$1 && (e$1 = this.read(t$1, e$1)), void 0 !== t$1[e$1]) return t$1[e$1];
		throw Error("Invalid enum value.");
	},
	read: function(t$1, e$1) {
		if (t$1[Q] || (t$1[Q] = [], Object.entries(t$1).forEach(([e$2, r$1]) => {
			t$1[Q][r$1] = e$2;
		})), void 0 !== t$1[Q][e$1]) return t$1[Q][e$1];
		throw Error("Invalid enum value.");
	}
}, T = {
	preferredHashAlgorithm: R.hash.sha512,
	preferredSymmetricAlgorithm: R.symmetric.aes256,
	preferredCompressionAlgorithm: R.compression.uncompressed,
	aeadProtect: !1,
	parseAEADEncryptedV4KeysAsLegacy: !1,
	preferredAEADAlgorithm: R.aead.gcm,
	aeadChunkSizeByte: 12,
	v6Keys: !1,
	enableParsingV5Entities: !1,
	s2kType: R.s2k.iterated,
	s2kIterationCountByte: 224,
	s2kArgon2Params: {
		passes: 3,
		parallelism: 4,
		memoryExponent: 16
	},
	allowUnauthenticatedMessages: !1,
	allowUnauthenticatedStream: !1,
	minRSABits: 2047,
	passwordCollisionCheck: !1,
	allowInsecureDecryptionWithSigningKeys: !1,
	allowInsecureVerificationWithReformattedKeys: !1,
	allowMissingKeyFlags: !1,
	constantTimePKCS1Decryption: !1,
	constantTimePKCS1DecryptionSupportedSymmetricAlgorithms: new Set([
		R.symmetric.aes128,
		R.symmetric.aes192,
		R.symmetric.aes256
	]),
	ignoreUnsupportedPackets: !0,
	ignoreMalformedPackets: !1,
	enforceGrammar: !0,
	additionalAllowedPackets: [],
	showVersion: !1,
	showComment: !1,
	versionString: "OpenPGP.js 6.2.2",
	commentString: "https://openpgpjs.org",
	maxUserIDLength: 5120,
	knownNotations: [],
	nonDeterministicSignaturesViaNotation: !0,
	useEllipticFallback: !0,
	rejectHashAlgorithms: new Set([R.hash.md5, R.hash.ripemd]),
	rejectMessageHashAlgorithms: new Set([
		R.hash.md5,
		R.hash.ripemd,
		R.hash.sha1
	]),
	rejectPublicKeyAlgorithms: new Set([R.publicKey.elgamal, R.publicKey.dsa]),
	rejectCurves: new Set([R.curve.secp256k1])
};
const M = (() => {
	try {
		return true;
	} catch (t$1) {}
	return !1;
})(), F = {
	isString: function(t$1) {
		return "string" == typeof t$1 || t$1 instanceof String;
	},
	nodeRequire: () => {},
	isArray: function(t$1) {
		return t$1 instanceof Array;
	},
	isUint8Array: h,
	isStream: u,
	getNobleCurve: async (t$1, e$1) => {
		if (!T.useEllipticFallback) throw Error("This curve is only supported in the full build of OpenPGP.js");
		const { nobleCurves: r$1 } = await Promise.resolve().then(function() {
			return Mf;
		});
		switch (t$1) {
			case R.publicKey.ecdh:
			case R.publicKey.ecdsa: {
				const t$2 = r$1.get(e$1);
				if (!t$2) throw Error("Unsupported curve");
				return t$2;
			}
			case R.publicKey.x448: return r$1.get("x448");
			case R.publicKey.ed448: return r$1.get("ed448");
			default: throw Error("Unsupported curve");
		}
	},
	readNumber: function(t$1) {
		let e$1 = 0;
		for (let r$1 = 0; r$1 < t$1.length; r$1++) e$1 += 256 ** r$1 * t$1[t$1.length - 1 - r$1];
		return e$1;
	},
	writeNumber: function(t$1, e$1) {
		const r$1 = new Uint8Array(e$1);
		for (let n$1 = 0; n$1 < e$1; n$1++) r$1[n$1] = t$1 >> 8 * (e$1 - n$1 - 1) & 255;
		return r$1;
	},
	readDate: function(t$1) {
		const e$1 = F.readNumber(t$1);
		return new Date(1e3 * e$1);
	},
	writeDate: function(t$1) {
		const e$1 = Math.floor(t$1.getTime() / 1e3);
		return F.writeNumber(e$1, 4);
	},
	normalizeDate: function(t$1 = Date.now()) {
		return null === t$1 || t$1 === Infinity ? t$1 : new Date(1e3 * Math.floor(+t$1 / 1e3));
	},
	readMPI: function(t$1) {
		const e$1 = (t$1[0] << 8 | t$1[1]) + 7 >>> 3;
		return F.readExactSubarray(t$1, 2, 2 + e$1);
	},
	readExactSubarray: function(t$1, e$1, r$1) {
		if (t$1.length < r$1 - e$1) throw Error("Input array too short");
		return t$1.subarray(e$1, r$1);
	},
	leftPad(t$1, e$1) {
		if (t$1.length > e$1) throw Error("Input array too long");
		const r$1 = new Uint8Array(e$1), n$1 = e$1 - t$1.length;
		return r$1.set(t$1, n$1), r$1;
	},
	uint8ArrayToMPI: function(t$1) {
		const e$1 = F.uint8ArrayBitLength(t$1);
		if (0 === e$1) throw Error("Zero MPI");
		const r$1 = t$1.subarray(t$1.length - Math.ceil(e$1 / 8)), n$1 = new Uint8Array([(65280 & e$1) >> 8, 255 & e$1]);
		return F.concatUint8Array([n$1, r$1]);
	},
	uint8ArrayBitLength: function(t$1) {
		let e$1;
		for (e$1 = 0; e$1 < t$1.length && 0 === t$1[e$1]; e$1++);
		if (e$1 === t$1.length) return 0;
		const r$1 = t$1.subarray(e$1);
		return 8 * (r$1.length - 1) + F.nbits(r$1[0]);
	},
	hexToUint8Array: function(t$1) {
		const e$1 = new Uint8Array(t$1.length >> 1);
		for (let r$1 = 0; r$1 < t$1.length >> 1; r$1++) e$1[r$1] = parseInt(t$1.substr(r$1 << 1, 2), 16);
		return e$1;
	},
	uint8ArrayToHex: function(t$1) {
		const e$1 = "0123456789abcdef";
		let r$1 = "";
		return t$1.forEach((t$2) => {
			r$1 += e$1[t$2 >> 4] + e$1[15 & t$2];
		}), r$1;
	},
	stringToUint8Array: function(t$1) {
		return k(t$1, (t$2) => {
			if (!F.isString(t$2)) throw Error("stringToUint8Array: Data must be in the form of a string");
			const e$1 = new Uint8Array(t$2.length);
			for (let r$1 = 0; r$1 < t$2.length; r$1++) e$1[r$1] = t$2.charCodeAt(r$1);
			return e$1;
		});
	},
	uint8ArrayToString: function(t$1) {
		const e$1 = [], r$1 = 16384, n$1 = (t$1 = new Uint8Array(t$1)).length;
		for (let i$1 = 0; i$1 < n$1; i$1 += r$1) e$1.push(String.fromCharCode.apply(String, t$1.subarray(i$1, i$1 + r$1 < n$1 ? i$1 + r$1 : n$1)));
		return e$1.join("");
	},
	encodeUTF8: function(t$1) {
		const e$1 = new TextEncoder("utf-8");
		function r$1(t$2, r$2 = !1) {
			return e$1.encode(t$2, { stream: !r$2 });
		}
		return k(t$1, r$1, () => r$1("", !0));
	},
	decodeUTF8: function(t$1) {
		const e$1 = new TextDecoder("utf-8");
		function r$1(t$2, r$2 = !1) {
			return e$1.decode(t$2, { stream: !r$2 });
		}
		return k(t$1, r$1, () => r$1(new Uint8Array(), !0));
	},
	concat: A,
	concatUint8Array: f,
	equalsUint8Array: function(t$1, e$1) {
		if (!F.isUint8Array(t$1) || !F.isUint8Array(e$1)) throw Error("Data must be in the form of a Uint8Array");
		if (t$1.length !== e$1.length) return !1;
		for (let r$1 = 0; r$1 < t$1.length; r$1++) if (t$1[r$1] !== e$1[r$1]) return !1;
		return !0;
	},
	findLastIndex: function(t$1, e$1) {
		for (let r$1 = t$1.length; r$1 >= 0; r$1--) if (e$1(t$1[r$1], r$1, t$1)) return r$1;
		return -1;
	},
	writeChecksum: function(t$1) {
		let e$1 = 0;
		for (let r$1 = 0; r$1 < t$1.length; r$1++) e$1 = e$1 + t$1[r$1] & 65535;
		return F.writeNumber(e$1, 2);
	},
	printDebug: function(t$1) {
		M && console.log("[OpenPGP.js debug]", t$1);
	},
	printDebugError: function(t$1) {
		M && console.error("[OpenPGP.js debug]", t$1);
	},
	nbits: function(t$1) {
		let e$1 = 1, r$1 = t$1 >>> 16;
		return 0 !== r$1 && (t$1 = r$1, e$1 += 16), r$1 = t$1 >> 8, 0 !== r$1 && (t$1 = r$1, e$1 += 8), r$1 = t$1 >> 4, 0 !== r$1 && (t$1 = r$1, e$1 += 4), r$1 = t$1 >> 2, 0 !== r$1 && (t$1 = r$1, e$1 += 2), r$1 = t$1 >> 1, 0 !== r$1 && (t$1 = r$1, e$1 += 1), e$1;
	},
	double: function(t$1) {
		const e$1 = new Uint8Array(t$1.length), r$1 = t$1.length - 1;
		for (let n$1 = 0; n$1 < r$1; n$1++) e$1[n$1] = t$1[n$1] << 1 ^ t$1[n$1 + 1] >> 7;
		return e$1[r$1] = t$1[r$1] << 1 ^ 135 * (t$1[0] >> 7), e$1;
	},
	shiftRight: function(t$1, e$1) {
		if (e$1) for (let r$1 = t$1.length - 1; r$1 >= 0; r$1--) t$1[r$1] >>= e$1, r$1 > 0 && (t$1[r$1] |= t$1[r$1 - 1] << 8 - e$1);
		return t$1;
	},
	getWebCrypto: function() {
		const e$1 = void 0 !== t && t.crypto && t.crypto.subtle || this.getNodeCrypto()?.webcrypto.subtle;
		if (!e$1) throw Error("The WebCrypto API is not available");
		return e$1;
	},
	getNodeCrypto: function() {
		return this.nodeRequire("crypto");
	},
	getNodeZlib: function() {
		return this.nodeRequire("zlib");
	},
	getNodeBuffer: function() {
		return (this.nodeRequire("buffer") || {}).Buffer;
	},
	getHardwareConcurrency: function() {
		if ("undefined" != typeof navigator) return navigator.hardwareConcurrency || 1;
		return this.nodeRequire("os").cpus().length;
	},
	isEmailAddress: function(t$1) {
		if (!F.isString(t$1)) return !1;
		return /^[^\p{C}\p{Z}@<>\\]+@[^\p{C}\p{Z}@<>\\]+[^\p{C}\p{Z}\p{P}]$/u.test(t$1);
	},
	canonicalizeEOL: function(t$1) {
		let e$1 = !1;
		return k(t$1, (t$2) => {
			let r$1;
			e$1 && (t$2 = F.concatUint8Array([new Uint8Array([13]), t$2])), 13 === t$2[t$2.length - 1] ? (e$1 = !0, t$2 = t$2.subarray(0, -1)) : e$1 = !1;
			const n$1 = [];
			for (let e$2 = 0; r$1 = t$2.indexOf(10, e$2) + 1, r$1; e$2 = r$1) 13 !== t$2[r$1 - 2] && n$1.push(r$1);
			if (!n$1.length) return t$2;
			const i$1 = new Uint8Array(t$2.length + n$1.length);
			let s$1 = 0;
			for (let e$2 = 0; e$2 < n$1.length; e$2++) {
				const r$2 = t$2.subarray(n$1[e$2 - 1] || 0, n$1[e$2]);
				i$1.set(r$2, s$1), s$1 += r$2.length, i$1[s$1 - 1] = 13, i$1[s$1] = 10, s$1++;
			}
			return i$1.set(t$2.subarray(n$1[n$1.length - 1] || 0), s$1), i$1;
		}, () => e$1 ? new Uint8Array([13]) : void 0);
	},
	nativeEOL: function(t$1) {
		let e$1 = !1;
		return k(t$1, (t$2) => {
			let r$1;
			13 === (t$2 = e$1 && 10 !== t$2[0] ? F.concatUint8Array([new Uint8Array([13]), t$2]) : new Uint8Array(t$2))[t$2.length - 1] ? (e$1 = !0, t$2 = t$2.subarray(0, -1)) : e$1 = !1;
			let n$1 = 0;
			for (let e$2 = 0; e$2 !== t$2.length; e$2 = r$1) {
				r$1 = t$2.indexOf(13, e$2) + 1, r$1 || (r$1 = t$2.length);
				const i$1 = r$1 - (10 === t$2[r$1] ? 1 : 0);
				e$2 && t$2.copyWithin(n$1, e$2, i$1), n$1 += i$1 - e$2;
			}
			return t$2.subarray(0, n$1);
		}, () => e$1 ? new Uint8Array([13]) : void 0);
	},
	removeTrailingSpaces: function(t$1) {
		return t$1.split("\n").map((t$2) => {
			let e$1 = t$2.length - 1;
			for (; e$1 >= 0 && (" " === t$2[e$1] || "	" === t$2[e$1] || "\r" === t$2[e$1]); e$1--);
			return t$2.substr(0, e$1 + 1);
		}).join("\n");
	},
	wrapError: function(t$1, e$1) {
		if (!e$1) return t$1 instanceof Error ? t$1 : Error(t$1);
		if (t$1 instanceof Error) {
			try {
				t$1.message += ": " + e$1.message, t$1.cause = e$1;
			} catch (t$2) {}
			return t$1;
		}
		return Error(t$1 + ": " + e$1.message, { cause: e$1 });
	},
	constructAllowedPackets: function(t$1) {
		const e$1 = {};
		return t$1.forEach((t$2) => {
			if (!t$2.tag) throw Error("Invalid input: expected a packet class");
			e$1[t$2.tag] = t$2;
		}), e$1;
	},
	anyPromise: function(t$1) {
		return new Promise(async (e$1, r$1) => {
			let n$1;
			await Promise.all(t$1.map(async (t$2) => {
				try {
					e$1(await t$2);
				} catch (t$3) {
					n$1 = t$3;
				}
			})), r$1(n$1);
		});
	},
	selectUint8Array: function(t$1, e$1, r$1) {
		const n$1 = Math.max(e$1.length, r$1.length), i$1 = new Uint8Array(n$1);
		let s$1 = 0;
		for (let n$2 = 0; n$2 < i$1.length; n$2++) i$1[n$2] = e$1[n$2] & 256 - t$1 | r$1[n$2] & 255 + t$1, s$1 += t$1 & n$2 < e$1.length | 1 - t$1 & n$2 < r$1.length;
		return i$1.subarray(0, s$1);
	},
	selectUint8: function(t$1, e$1, r$1) {
		return e$1 & 256 - t$1 | r$1 & 255 + t$1;
	},
	isAES: function(t$1) {
		return t$1 === R.symmetric.aes128 || t$1 === R.symmetric.aes192 || t$1 === R.symmetric.aes256;
	}
}, N = F.getNodeBuffer();
let L, O;
function H(t$1) {
	let e$1 = new Uint8Array();
	return k(t$1, (t$2) => {
		e$1 = F.concatUint8Array([e$1, t$2]);
		const r$1 = [], n$1 = Math.floor(e$1.length / 45), i$1 = 45 * n$1, s$1 = L(e$1.subarray(0, i$1));
		for (let t$3 = 0; t$3 < n$1; t$3++) r$1.push(s$1.substr(60 * t$3, 60)), r$1.push("\n");
		return e$1 = e$1.subarray(i$1), r$1.join("");
	}, () => e$1.length ? L(e$1) + "\n" : "");
}
function z(t$1) {
	let e$1 = "";
	return k(t$1, (t$2) => {
		e$1 += t$2;
		let r$1 = 0;
		const n$1 = [
			" ",
			"	",
			"\r",
			"\n"
		];
		for (let t$3 = 0; t$3 < n$1.length; t$3++) {
			const i$2 = n$1[t$3];
			for (let t$4 = e$1.indexOf(i$2); -1 !== t$4; t$4 = e$1.indexOf(i$2, t$4 + 1)) r$1++;
		}
		let i$1 = e$1.length;
		for (; i$1 > 0 && (i$1 - r$1) % 4 != 0; i$1--) n$1.includes(e$1[i$1]) && r$1--;
		const s$1 = O(e$1.substr(0, i$1));
		return e$1 = e$1.substr(i$1), s$1;
	}, () => O(e$1));
}
function G(t$1) {
	return z(t$1.replace(/-/g, "+").replace(/_/g, "/"));
}
function _(t$1, e$1) {
	let r$1 = H(t$1).replace(/[\r\n]/g, "");
	return r$1 = r$1.replace(/[+]/g, "-").replace(/[/]/g, "_").replace(/[=]/g, ""), r$1;
}
function j(t$1) {
	const e$1 = t$1.match(/^-----BEGIN PGP (MESSAGE, PART \d+\/\d+|MESSAGE, PART \d+|SIGNED MESSAGE|MESSAGE|PUBLIC KEY BLOCK|PRIVATE KEY BLOCK|SIGNATURE)-----$/m);
	if (!e$1) throw Error("Unknown ASCII armor type");
	return /MESSAGE, PART \d+\/\d+/.test(e$1[1]) ? R.armor.multipartSection : /MESSAGE, PART \d+/.test(e$1[1]) ? R.armor.multipartLast : /SIGNED MESSAGE/.test(e$1[1]) ? R.armor.signed : /MESSAGE/.test(e$1[1]) ? R.armor.message : /PUBLIC KEY BLOCK/.test(e$1[1]) ? R.armor.publicKey : /PRIVATE KEY BLOCK/.test(e$1[1]) ? R.armor.privateKey : /SIGNATURE/.test(e$1[1]) ? R.armor.signature : void 0;
}
function V(t$1, e$1) {
	let r$1 = "";
	return e$1.showVersion && (r$1 += "Version: " + e$1.versionString + "\n"), e$1.showComment && (r$1 += "Comment: " + e$1.commentString + "\n"), t$1 && (r$1 += "Comment: " + t$1 + "\n"), r$1 += "\n", r$1;
}
function q(t$1) {
	const e$1 = function(t$2) {
		let e$2 = 13501623;
		return k(t$2, (t$3) => {
			const r$1 = Z ? Math.floor(t$3.length / 4) : 0, n$1 = new Uint32Array(t$3.buffer, t$3.byteOffset, r$1);
			for (let t$4 = 0; t$4 < r$1; t$4++) e$2 ^= n$1[t$4], e$2 = Y[0][e$2 >> 24 & 255] ^ Y[1][e$2 >> 16 & 255] ^ Y[2][e$2 >> 8 & 255] ^ Y[3][255 & e$2];
			for (let n$2 = 4 * r$1; n$2 < t$3.length; n$2++) e$2 = e$2 >> 8 ^ Y[0][255 & e$2 ^ t$3[n$2]];
		}, () => new Uint8Array([
			e$2,
			e$2 >> 8,
			e$2 >> 16
		]));
	}(t$1);
	return H(e$1);
}
N ? (L = (t$1) => N.from(t$1).toString("base64"), O = (t$1) => {
	const e$1 = N.from(t$1, "base64");
	return new Uint8Array(e$1.buffer, e$1.byteOffset, e$1.byteLength);
}) : (L = (t$1) => btoa(F.uint8ArrayToString(t$1)), O = (t$1) => F.stringToUint8Array(atob(t$1)));
const Y = [
	Array(255),
	Array(255),
	Array(255),
	Array(255)
];
for (let t$1 = 0; t$1 <= 255; t$1++) {
	let e$1 = t$1 << 16;
	for (let t$2 = 0; t$2 < 8; t$2++) e$1 = e$1 << 1 ^ (8388608 & e$1 ? 8801531 : 0);
	Y[0][t$1] = (16711680 & e$1) >> 16 | 65280 & e$1 | (255 & e$1) << 16;
}
for (let t$1 = 0; t$1 <= 255; t$1++) Y[1][t$1] = Y[0][t$1] >> 8 ^ Y[0][255 & Y[0][t$1]];
for (let t$1 = 0; t$1 <= 255; t$1++) Y[2][t$1] = Y[1][t$1] >> 8 ^ Y[0][255 & Y[1][t$1]];
for (let t$1 = 0; t$1 <= 255; t$1++) Y[3][t$1] = Y[2][t$1] >> 8 ^ Y[0][255 & Y[2][t$1]];
const Z = function() {
	const t$1 = new ArrayBuffer(2);
	return new DataView(t$1).setInt16(0, 255, !0), 255 === new Int16Array(t$1)[0];
}();
function J(t$1) {
	for (let e$1 = 0; e$1 < t$1.length; e$1++) /^([^\s:]|[^\s:][^:]*[^\s:]): .+$/.test(t$1[e$1]) || F.printDebugError(Error("Improperly formatted armor header: " + t$1[e$1])), /^(Version|Comment|MessageID|Hash|Charset): .+$/.test(t$1[e$1]) || F.printDebugError(Error("Unknown header: " + t$1[e$1]));
}
function W(t$1) {
	let e$1 = t$1;
	const r$1 = t$1.lastIndexOf("=");
	return r$1 >= 0 && r$1 !== t$1.length - 1 && (e$1 = t$1.slice(0, r$1)), e$1;
}
function X(t$1) {
	return new Promise(async (e$1, r$1) => {
		try {
			const n$1 = /^-----[^-]+-----$/m, i$1 = /^[ \f\r\t\u00a0\u2000-\u200a\u202f\u205f\u3000]*$/;
			let s$1;
			const a$1 = [];
			let o$1, c$1, u$1 = a$1, h$1 = [];
			const f$1 = z(E(t$1, async (t$2, l$1) => {
				const y$1 = P(t$2);
				try {
					for (;;) {
						let t$3 = await y$1.readLine();
						if (void 0 === t$3) throw Error("Misformed armored text");
						if (t$3 = F.removeTrailingSpaces(t$3.replace(/[\r\n]/g, "")), s$1) if (o$1) c$1 || s$1 !== R.armor.signed || (n$1.test(t$3) ? (h$1 = h$1.join("\r\n"), c$1 = !0, J(u$1), u$1 = [], o$1 = !1) : h$1.push(t$3.replace(/^- /, "")));
else if (n$1.test(t$3) && r$1(Error("Mandatory blank line missing between armor headers and armor data")), i$1.test(t$3)) {
							if (J(u$1), o$1 = !0, c$1 || s$1 !== R.armor.signed) {
								e$1({
									text: h$1,
									data: f$1,
									headers: a$1,
									type: s$1
								});
								break;
							}
						} else u$1.push(t$3);
else n$1.test(t$3) && (s$1 = j(t$3));
					}
				} catch (t$3) {
					return void r$1(t$3);
				}
				const g$1 = x(l$1);
				try {
					for (;;) {
						await g$1.ready;
						const { done: t$3, value: e$2 } = await y$1.read();
						if (t$3) throw Error("Misformed armored text");
						const r$2 = e$2 + "";
						if (-1 !== r$2.indexOf("=") || -1 !== r$2.indexOf("-")) {
							let t$4 = await y$1.readToEnd();
							t$4.length || (t$4 = ""), t$4 = r$2 + t$4, t$4 = F.removeTrailingSpaces(t$4.replace(/\r/g, ""));
							const e$3 = t$4.split(n$1);
							if (1 === e$3.length) throw Error("Misformed armored text");
							const i$2 = W(e$3[0].slice(0, -1));
							await g$1.write(i$2);
							break;
						}
						await g$1.write(r$2);
					}
					await g$1.ready, await g$1.close();
				} catch (t$3) {
					await g$1.abort(t$3);
				}
			}));
		} catch (t$2) {
			r$1(t$2);
		}
	}).then(async (t$2) => (o(t$2.data) && (t$2.data = await C(t$2.data)), t$2));
}
function $(t$1, e$1, r$1, n$1, i$1, s$1 = !1, a$1 = T) {
	let o$1, c$1;
	t$1 === R.armor.signed && (o$1 = e$1.text, c$1 = e$1.hash, e$1 = e$1.data);
	const u$1 = s$1 && I(e$1), h$1 = [];
	switch (t$1) {
		case R.armor.multipartSection:
			h$1.push("-----BEGIN PGP MESSAGE, PART " + r$1 + "/" + n$1 + "-----\n"), h$1.push(V(i$1, a$1)), h$1.push(H(e$1)), u$1 && h$1.push("=", q(u$1)), h$1.push("-----END PGP MESSAGE, PART " + r$1 + "/" + n$1 + "-----\n");
			break;
		case R.armor.multipartLast:
			h$1.push("-----BEGIN PGP MESSAGE, PART " + r$1 + "-----\n"), h$1.push(V(i$1, a$1)), h$1.push(H(e$1)), u$1 && h$1.push("=", q(u$1)), h$1.push("-----END PGP MESSAGE, PART " + r$1 + "-----\n");
			break;
		case R.armor.signed:
			h$1.push("-----BEGIN PGP SIGNED MESSAGE-----\n"), h$1.push(c$1 ? `Hash: ${c$1}\n\n` : "\n"), h$1.push(o$1.replace(/^-/gm, "- -")), h$1.push("\n-----BEGIN PGP SIGNATURE-----\n"), h$1.push(V(i$1, a$1)), h$1.push(H(e$1)), u$1 && h$1.push("=", q(u$1)), h$1.push("-----END PGP SIGNATURE-----\n");
			break;
		case R.armor.message:
			h$1.push("-----BEGIN PGP MESSAGE-----\n"), h$1.push(V(i$1, a$1)), h$1.push(H(e$1)), u$1 && h$1.push("=", q(u$1)), h$1.push("-----END PGP MESSAGE-----\n");
			break;
		case R.armor.publicKey:
			h$1.push("-----BEGIN PGP PUBLIC KEY BLOCK-----\n"), h$1.push(V(i$1, a$1)), h$1.push(H(e$1)), u$1 && h$1.push("=", q(u$1)), h$1.push("-----END PGP PUBLIC KEY BLOCK-----\n");
			break;
		case R.armor.privateKey:
			h$1.push("-----BEGIN PGP PRIVATE KEY BLOCK-----\n"), h$1.push(V(i$1, a$1)), h$1.push(H(e$1)), u$1 && h$1.push("=", q(u$1)), h$1.push("-----END PGP PRIVATE KEY BLOCK-----\n");
			break;
		case R.armor.signature: h$1.push("-----BEGIN PGP SIGNATURE-----\n"), h$1.push(V(i$1, a$1)), h$1.push(H(e$1)), u$1 && h$1.push("=", q(u$1)), h$1.push("-----END PGP SIGNATURE-----\n");
	}
	return F.concat(h$1);
}
const tt = BigInt(0), et = BigInt(1);
function rt(t$1) {
	const e$1 = "0123456789ABCDEF";
	let r$1 = "";
	return t$1.forEach((t$2) => {
		r$1 += e$1[t$2 >> 4] + e$1[15 & t$2];
	}), BigInt("0x0" + r$1);
}
function nt(t$1, e$1) {
	const r$1 = t$1 % e$1;
	return r$1 < tt ? r$1 + e$1 : r$1;
}
function it(t$1, e$1, r$1) {
	if (r$1 === tt) throw Error("Modulo cannot be zero");
	if (r$1 === et) return BigInt(0);
	if (e$1 < tt) throw Error("Unsopported negative exponent");
	let n$1 = e$1, i$1 = t$1;
	i$1 %= r$1;
	let s$1 = BigInt(1);
	for (; n$1 > tt;) {
		const t$2 = n$1 & et;
		n$1 >>= et;
		s$1 = t$2 ? s$1 * i$1 % r$1 : s$1, i$1 = i$1 * i$1 % r$1;
	}
	return s$1;
}
function st(t$1) {
	return t$1 >= tt ? t$1 : -t$1;
}
function at(t$1, e$1) {
	const { gcd: r$1, x: n$1 } = function(t$2, e$2) {
		let r$2 = BigInt(0), n$2 = BigInt(1), i$1 = BigInt(1), s$1 = BigInt(0), a$1 = st(t$2), o$1 = st(e$2);
		const c$1 = t$2 < tt, u$1 = e$2 < tt;
		for (; o$1 !== tt;) {
			const t$3 = a$1 / o$1;
			let e$3 = r$2;
			r$2 = i$1 - t$3 * r$2, i$1 = e$3, e$3 = n$2, n$2 = s$1 - t$3 * n$2, s$1 = e$3, e$3 = o$1, o$1 = a$1 % o$1, a$1 = e$3;
		}
		return {
			x: c$1 ? -i$1 : i$1,
			y: u$1 ? -s$1 : s$1,
			gcd: a$1
		};
	}(t$1, e$1);
	if (r$1 !== et) throw Error("Inverse does not exist");
	return nt(n$1 + e$1, e$1);
}
function ot(t$1) {
	const e$1 = Number(t$1);
	if (e$1 > Number.MAX_SAFE_INTEGER) throw Error("Number can only safely store up to 53 bits");
	return e$1;
}
function ct(t$1, e$1) {
	return (t$1 >> BigInt(e$1) & et) === tt ? 0 : 1;
}
function ut(t$1) {
	const e$1 = t$1 < tt ? BigInt(-1) : tt;
	let r$1 = 1, n$1 = t$1;
	for (; (n$1 >>= et) !== e$1;) r$1++;
	return r$1;
}
function ht(t$1) {
	const e$1 = t$1 < tt ? BigInt(-1) : tt, r$1 = BigInt(8);
	let n$1 = 1, i$1 = t$1;
	for (; (i$1 >>= r$1) !== e$1;) n$1++;
	return n$1;
}
function ft(t$1, e$1 = "be", r$1) {
	let n$1 = t$1.toString(16);
	n$1.length % 2 == 1 && (n$1 = "0" + n$1);
	const i$1 = n$1.length / 2, s$1 = new Uint8Array(r$1 || i$1), a$1 = r$1 ? r$1 - i$1 : 0;
	let o$1 = 0;
	for (; o$1 < i$1;) s$1[o$1 + a$1] = parseInt(n$1.slice(2 * o$1, 2 * o$1 + 2), 16), o$1++;
	return "be" !== e$1 && s$1.reverse(), s$1;
}
const lt = F.getNodeCrypto();
function yt(t$1) {
	const e$1 = "undefined" != typeof crypto ? crypto : lt?.webcrypto;
	if (e$1?.getRandomValues) {
		const r$1 = new Uint8Array(t$1);
		return e$1.getRandomValues(r$1);
	}
	throw Error("No secure random number generator available.");
}
function gt(t$1, e$1) {
	if (e$1 < t$1) throw Error("Illegal parameter value: max <= min");
	const r$1 = e$1 - t$1;
	return nt(rt(yt(ht(r$1) + 8)), r$1) + t$1;
}
const pt = BigInt(1);
function dt(t$1, e$1, r$1) {
	const n$1 = BigInt(30), i$1 = pt << BigInt(t$1 - 1), s$1 = [
		1,
		6,
		5,
		4,
		3,
		2,
		1,
		4,
		3,
		2,
		1,
		2,
		1,
		4,
		3,
		2,
		1,
		2,
		1,
		4,
		3,
		2,
		1,
		6,
		5,
		4,
		3,
		2,
		1,
		2
	];
	let a$1 = gt(i$1, i$1 << pt), o$1 = ot(nt(a$1, n$1));
	do 
		a$1 += BigInt(s$1[o$1]), o$1 = (o$1 + s$1[o$1]) % s$1.length, ut(a$1) > t$1 && (a$1 = nt(a$1, i$1 << pt), a$1 += i$1, o$1 = ot(nt(a$1, n$1)));
	while (!At(a$1, e$1, r$1));
	return a$1;
}
function At(t$1, e$1, r$1) {
	return (!e$1 || function(t$2, e$2) {
		let r$2 = t$2, n$1 = e$2;
		for (; n$1 !== tt;) {
			const t$3 = n$1;
			n$1 = r$2 % n$1, r$2 = t$3;
		}
		return r$2;
	}(t$1 - pt, e$1) === pt) && !!function(t$2) {
		const e$2 = BigInt(0);
		return wt.every((r$2) => nt(t$2, r$2) !== e$2);
	}(t$1) && !!function(t$2, e$2 = BigInt(2)) {
		return it(e$2, t$2 - pt, t$2) === pt;
	}(t$1) && !!function(t$2, e$2) {
		const r$2 = ut(t$2);
		e$2 || (e$2 = Math.max(1, r$2 / 48 | 0));
		const n$1 = t$2 - pt;
		let i$1 = 0;
		for (; !ct(n$1, i$1);) i$1++;
		const s$1 = t$2 >> BigInt(i$1);
		for (; e$2 > 0; e$2--) {
			let e$3, r$3 = it(gt(BigInt(2), n$1), s$1, t$2);
			if (r$3 !== pt && r$3 !== n$1) {
				for (e$3 = 1; e$3 < i$1; e$3++) {
					if (r$3 = nt(r$3 * r$3, t$2), r$3 === pt) return !1;
					if (r$3 === n$1) break;
				}
				if (e$3 === i$1) return !1;
			}
		}
		return !0;
	}(t$1, r$1);
}
const wt = [
	7,
	11,
	13,
	17,
	19,
	23,
	29,
	31,
	37,
	41,
	43,
	47,
	53,
	59,
	61,
	67,
	71,
	73,
	79,
	83,
	89,
	97,
	101,
	103,
	107,
	109,
	113,
	127,
	131,
	137,
	139,
	149,
	151,
	157,
	163,
	167,
	173,
	179,
	181,
	191,
	193,
	197,
	199,
	211,
	223,
	227,
	229,
	233,
	239,
	241,
	251,
	257,
	263,
	269,
	271,
	277,
	281,
	283,
	293,
	307,
	311,
	313,
	317,
	331,
	337,
	347,
	349,
	353,
	359,
	367,
	373,
	379,
	383,
	389,
	397,
	401,
	409,
	419,
	421,
	431,
	433,
	439,
	443,
	449,
	457,
	461,
	463,
	467,
	479,
	487,
	491,
	499,
	503,
	509,
	521,
	523,
	541,
	547,
	557,
	563,
	569,
	571,
	577,
	587,
	593,
	599,
	601,
	607,
	613,
	617,
	619,
	631,
	641,
	643,
	647,
	653,
	659,
	661,
	673,
	677,
	683,
	691,
	701,
	709,
	719,
	727,
	733,
	739,
	743,
	751,
	757,
	761,
	769,
	773,
	787,
	797,
	809,
	811,
	821,
	823,
	827,
	829,
	839,
	853,
	857,
	859,
	863,
	877,
	881,
	883,
	887,
	907,
	911,
	919,
	929,
	937,
	941,
	947,
	953,
	967,
	971,
	977,
	983,
	991,
	997,
	1009,
	1013,
	1019,
	1021,
	1031,
	1033,
	1039,
	1049,
	1051,
	1061,
	1063,
	1069,
	1087,
	1091,
	1093,
	1097,
	1103,
	1109,
	1117,
	1123,
	1129,
	1151,
	1153,
	1163,
	1171,
	1181,
	1187,
	1193,
	1201,
	1213,
	1217,
	1223,
	1229,
	1231,
	1237,
	1249,
	1259,
	1277,
	1279,
	1283,
	1289,
	1291,
	1297,
	1301,
	1303,
	1307,
	1319,
	1321,
	1327,
	1361,
	1367,
	1373,
	1381,
	1399,
	1409,
	1423,
	1427,
	1429,
	1433,
	1439,
	1447,
	1451,
	1453,
	1459,
	1471,
	1481,
	1483,
	1487,
	1489,
	1493,
	1499,
	1511,
	1523,
	1531,
	1543,
	1549,
	1553,
	1559,
	1567,
	1571,
	1579,
	1583,
	1597,
	1601,
	1607,
	1609,
	1613,
	1619,
	1621,
	1627,
	1637,
	1657,
	1663,
	1667,
	1669,
	1693,
	1697,
	1699,
	1709,
	1721,
	1723,
	1733,
	1741,
	1747,
	1753,
	1759,
	1777,
	1783,
	1787,
	1789,
	1801,
	1811,
	1823,
	1831,
	1847,
	1861,
	1867,
	1871,
	1873,
	1877,
	1879,
	1889,
	1901,
	1907,
	1913,
	1931,
	1933,
	1949,
	1951,
	1973,
	1979,
	1987,
	1993,
	1997,
	1999,
	2003,
	2011,
	2017,
	2027,
	2029,
	2039,
	2053,
	2063,
	2069,
	2081,
	2083,
	2087,
	2089,
	2099,
	2111,
	2113,
	2129,
	2131,
	2137,
	2141,
	2143,
	2153,
	2161,
	2179,
	2203,
	2207,
	2213,
	2221,
	2237,
	2239,
	2243,
	2251,
	2267,
	2269,
	2273,
	2281,
	2287,
	2293,
	2297,
	2309,
	2311,
	2333,
	2339,
	2341,
	2347,
	2351,
	2357,
	2371,
	2377,
	2381,
	2383,
	2389,
	2393,
	2399,
	2411,
	2417,
	2423,
	2437,
	2441,
	2447,
	2459,
	2467,
	2473,
	2477,
	2503,
	2521,
	2531,
	2539,
	2543,
	2549,
	2551,
	2557,
	2579,
	2591,
	2593,
	2609,
	2617,
	2621,
	2633,
	2647,
	2657,
	2659,
	2663,
	2671,
	2677,
	2683,
	2687,
	2689,
	2693,
	2699,
	2707,
	2711,
	2713,
	2719,
	2729,
	2731,
	2741,
	2749,
	2753,
	2767,
	2777,
	2789,
	2791,
	2797,
	2801,
	2803,
	2819,
	2833,
	2837,
	2843,
	2851,
	2857,
	2861,
	2879,
	2887,
	2897,
	2903,
	2909,
	2917,
	2927,
	2939,
	2953,
	2957,
	2963,
	2969,
	2971,
	2999,
	3001,
	3011,
	3019,
	3023,
	3037,
	3041,
	3049,
	3061,
	3067,
	3079,
	3083,
	3089,
	3109,
	3119,
	3121,
	3137,
	3163,
	3167,
	3169,
	3181,
	3187,
	3191,
	3203,
	3209,
	3217,
	3221,
	3229,
	3251,
	3253,
	3257,
	3259,
	3271,
	3299,
	3301,
	3307,
	3313,
	3319,
	3323,
	3329,
	3331,
	3343,
	3347,
	3359,
	3361,
	3371,
	3373,
	3389,
	3391,
	3407,
	3413,
	3433,
	3449,
	3457,
	3461,
	3463,
	3467,
	3469,
	3491,
	3499,
	3511,
	3517,
	3527,
	3529,
	3533,
	3539,
	3541,
	3547,
	3557,
	3559,
	3571,
	3581,
	3583,
	3593,
	3607,
	3613,
	3617,
	3623,
	3631,
	3637,
	3643,
	3659,
	3671,
	3673,
	3677,
	3691,
	3697,
	3701,
	3709,
	3719,
	3727,
	3733,
	3739,
	3761,
	3767,
	3769,
	3779,
	3793,
	3797,
	3803,
	3821,
	3823,
	3833,
	3847,
	3851,
	3853,
	3863,
	3877,
	3881,
	3889,
	3907,
	3911,
	3917,
	3919,
	3923,
	3929,
	3931,
	3943,
	3947,
	3967,
	3989,
	4001,
	4003,
	4007,
	4013,
	4019,
	4021,
	4027,
	4049,
	4051,
	4057,
	4073,
	4079,
	4091,
	4093,
	4099,
	4111,
	4127,
	4129,
	4133,
	4139,
	4153,
	4157,
	4159,
	4177,
	4201,
	4211,
	4217,
	4219,
	4229,
	4231,
	4241,
	4243,
	4253,
	4259,
	4261,
	4271,
	4273,
	4283,
	4289,
	4297,
	4327,
	4337,
	4339,
	4349,
	4357,
	4363,
	4373,
	4391,
	4397,
	4409,
	4421,
	4423,
	4441,
	4447,
	4451,
	4457,
	4463,
	4481,
	4483,
	4493,
	4507,
	4513,
	4517,
	4519,
	4523,
	4547,
	4549,
	4561,
	4567,
	4583,
	4591,
	4597,
	4603,
	4621,
	4637,
	4639,
	4643,
	4649,
	4651,
	4657,
	4663,
	4673,
	4679,
	4691,
	4703,
	4721,
	4723,
	4729,
	4733,
	4751,
	4759,
	4783,
	4787,
	4789,
	4793,
	4799,
	4801,
	4813,
	4817,
	4831,
	4861,
	4871,
	4877,
	4889,
	4903,
	4909,
	4919,
	4931,
	4933,
	4937,
	4943,
	4951,
	4957,
	4967,
	4969,
	4973,
	4987,
	4993,
	4999
].map((t$1) => BigInt(t$1));
const mt = F.getWebCrypto(), bt = F.getNodeCrypto(), kt = bt && bt.getHashes();
function Et(t$1) {
	if (bt && kt.includes(t$1)) return async function(e$1) {
		const r$1 = bt.createHash(t$1);
		return k(e$1, (t$2) => {
			r$1.update(t$2);
		}, () => new Uint8Array(r$1.digest()));
	};
}
function vt(t$1, e$1) {
	const r$1 = async () => {
		const { nobleHashes: e$2 } = await Promise.resolve().then(function() {
			return ul;
		}), r$2 = e$2.get(t$1);
		if (!r$2) throw Error("Unsupported hash");
		return r$2;
	};
	return async function(t$2) {
		if (o(t$2) && (t$2 = await C(t$2)), F.isStream(t$2)) {
			const e$2 = (await r$1()).create();
			return k(t$2, (t$3) => {
				e$2.update(t$3);
			}, () => e$2.digest());
		}
		if (mt && e$1) return new Uint8Array(await mt.digest(e$1, t$2));
		return (await r$1())(t$2);
	};
}
const Bt = Et("md5") || vt("md5"), It = Et("sha1") || vt("sha1", "SHA-1"), St = Et("sha224") || vt("sha224"), Kt = Et("sha256") || vt("sha256", "SHA-256"), Ct = Et("sha384") || vt("sha384", "SHA-384"), Dt = Et("sha512") || vt("sha512", "SHA-512"), Ut = Et("ripemd160") || vt("ripemd160"), Pt = Et("sha3-256") || vt("sha3_256"), xt = Et("sha3-512") || vt("sha3_512");
function Qt(t$1, e$1) {
	switch (t$1) {
		case R.hash.md5: return Bt(e$1);
		case R.hash.sha1: return It(e$1);
		case R.hash.ripemd: return Ut(e$1);
		case R.hash.sha256: return Kt(e$1);
		case R.hash.sha384: return Ct(e$1);
		case R.hash.sha512: return Dt(e$1);
		case R.hash.sha224: return St(e$1);
		case R.hash.sha3_256: return Pt(e$1);
		case R.hash.sha3_512: return xt(e$1);
		default: throw Error("Unsupported hash function");
	}
}
function Rt(t$1) {
	switch (t$1) {
		case R.hash.md5: return 16;
		case R.hash.sha1:
		case R.hash.ripemd: return 20;
		case R.hash.sha256: return 32;
		case R.hash.sha384: return 48;
		case R.hash.sha512: return 64;
		case R.hash.sha224: return 28;
		case R.hash.sha3_256: return 32;
		case R.hash.sha3_512: return 64;
		default: throw Error("Invalid hash algorithm.");
	}
}
const Tt = [];
function Mt(t$1, e$1) {
	const r$1 = t$1.length;
	if (r$1 > e$1 - 11) throw Error("Message too long");
	const n$1 = function(t$2) {
		const e$2 = new Uint8Array(t$2);
		let r$2 = 0;
		for (; r$2 < t$2;) {
			const n$2 = yt(t$2 - r$2);
			for (let t$3 = 0; t$3 < n$2.length; t$3++) 0 !== n$2[t$3] && (e$2[r$2++] = n$2[t$3]);
		}
		return e$2;
	}(e$1 - r$1 - 3), i$1 = new Uint8Array(e$1);
	return i$1[1] = 2, i$1.set(n$1, 2), i$1.set(t$1, e$1 - r$1), i$1;
}
function Ft(t$1, e$1) {
	let r$1 = 2, n$1 = 1;
	for (let e$2 = r$1; e$2 < t$1.length; e$2++) n$1 &= 0 !== t$1[e$2], r$1 += n$1;
	const i$1 = r$1 - 2, s$1 = t$1.subarray(r$1 + 1), a$1 = 0 === t$1[0] & 2 === t$1[1] & i$1 >= 8 & !n$1;
	if (e$1) return F.selectUint8Array(a$1, s$1, e$1);
	if (a$1) return s$1;
	throw Error("Decryption error");
}
function Nt(t$1, e$1, r$1) {
	let n$1;
	if (e$1.length !== Rt(t$1)) throw Error("Invalid hash length");
	const i$1 = new Uint8Array(Tt[t$1].length);
	for (n$1 = 0; n$1 < Tt[t$1].length; n$1++) i$1[n$1] = Tt[t$1][n$1];
	const s$1 = i$1.length + e$1.length;
	if (r$1 < s$1 + 11) throw Error("Intended encoded message length too short");
	const a$1 = new Uint8Array(r$1 - s$1 - 3).fill(255), o$1 = new Uint8Array(r$1);
	return o$1[1] = 1, o$1.set(a$1, 2), o$1.set(i$1, r$1 - s$1), o$1.set(e$1, r$1 - e$1.length), o$1;
}
Tt[1] = [
	48,
	32,
	48,
	12,
	6,
	8,
	42,
	134,
	72,
	134,
	247,
	13,
	2,
	5,
	5,
	0,
	4,
	16
], Tt[2] = [
	48,
	33,
	48,
	9,
	6,
	5,
	43,
	14,
	3,
	2,
	26,
	5,
	0,
	4,
	20
], Tt[3] = [
	48,
	33,
	48,
	9,
	6,
	5,
	43,
	36,
	3,
	2,
	1,
	5,
	0,
	4,
	20
], Tt[8] = [
	48,
	49,
	48,
	13,
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	1,
	5,
	0,
	4,
	32
], Tt[9] = [
	48,
	65,
	48,
	13,
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	2,
	5,
	0,
	4,
	48
], Tt[10] = [
	48,
	81,
	48,
	13,
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	3,
	5,
	0,
	4,
	64
], Tt[11] = [
	48,
	45,
	48,
	13,
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	4,
	5,
	0,
	4,
	28
];
const Lt = F.getWebCrypto(), Ot = F.getNodeCrypto(), Ht = BigInt(1);
async function zt(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1, c$1) {
	if (Rt(t$1) >= r$1.length) throw Error("Digest size cannot exceed key modulus size");
	if (e$1 && !F.isStream(e$1)) {
		if (F.getWebCrypto()) try {
			return await async function(t$2, e$2, r$2, n$2, i$2, s$2, a$2, o$2) {
				const c$2 = await Vt(r$2, n$2, i$2, s$2, a$2, o$2), u$1 = {
					name: "RSASSA-PKCS1-v1_5",
					hash: { name: t$2 }
				}, h$1 = await Lt.importKey("jwk", c$2, u$1, !1, ["sign"]);
				return new Uint8Array(await Lt.sign("RSASSA-PKCS1-v1_5", h$1, e$2));
			}(R.read(R.webHash, t$1), e$1, r$1, n$1, i$1, s$1, a$1, o$1);
		} catch (t$2) {
			F.printDebugError(t$2);
		}
else if (F.getNodeCrypto()) return async function(t$2, e$2, r$2, n$2, i$2, s$2, a$2, o$2) {
			const c$2 = Ot.createSign(R.read(R.hash, t$2));
			c$2.write(e$2), c$2.end();
			const u$1 = await Vt(r$2, n$2, i$2, s$2, a$2, o$2);
			return new Uint8Array(c$2.sign({
				key: u$1,
				format: "jwk",
				type: "pkcs1"
			}));
		}(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1);
	}
	return async function(t$2, e$2, r$2, n$2) {
		e$2 = rt(e$2);
		const i$2 = rt(Nt(t$2, n$2, ht(e$2)));
		return r$2 = rt(r$2), ft(it(i$2, r$2, e$2), "be", ht(e$2));
	}(t$1, r$1, i$1, c$1);
}
async function Gt(t$1, e$1, r$1, n$1, i$1, s$1) {
	if (e$1 && !F.isStream(e$1)) {
		if (F.getWebCrypto()) try {
			return await async function(t$2, e$2, r$2, n$2, i$2) {
				const s$2 = qt(n$2, i$2), a$1 = await Lt.importKey("jwk", s$2, {
					name: "RSASSA-PKCS1-v1_5",
					hash: { name: t$2 }
				}, !1, ["verify"]);
				return Lt.verify("RSASSA-PKCS1-v1_5", a$1, r$2, e$2);
			}(R.read(R.webHash, t$1), e$1, r$1, n$1, i$1);
		} catch (t$2) {
			F.printDebugError(t$2);
		}
else if (F.getNodeCrypto()) return async function(t$2, e$2, r$2, n$2, i$2) {
			const s$2 = qt(n$2, i$2), a$1 = {
				key: s$2,
				format: "jwk",
				type: "pkcs1"
			}, o$1 = Ot.createVerify(R.read(R.hash, t$2));
			o$1.write(e$2), o$1.end();
			try {
				return o$1.verify(a$1, r$2);
			} catch (t$3) {
				return !1;
			}
		}(t$1, e$1, r$1, n$1, i$1);
	}
	return async function(t$2, e$2, r$2, n$2, i$2) {
		if (r$2 = rt(r$2), e$2 = rt(e$2), n$2 = rt(n$2), e$2 >= r$2) throw Error("Signature size cannot exceed modulus size");
		const s$2 = ft(it(e$2, n$2, r$2), "be", ht(r$2)), a$1 = Nt(t$2, i$2, ht(r$2));
		return F.equalsUint8Array(s$2, a$1);
	}(t$1, r$1, n$1, i$1, s$1);
}
async function _t(t$1, e$1, r$1) {
	return F.getNodeCrypto() ? async function(t$2, e$2, r$2) {
		const n$1 = qt(e$2, r$2), i$1 = {
			key: n$1,
			format: "jwk",
			type: "pkcs1",
			padding: Ot.constants.RSA_PKCS1_PADDING
		};
		return new Uint8Array(Ot.publicEncrypt(i$1, t$2));
	}(t$1, e$1, r$1) : async function(t$2, e$2, r$2) {
		if (e$2 = rt(e$2), t$2 = rt(Mt(t$2, ht(e$2))), r$2 = rt(r$2), t$2 >= e$2) throw Error("Message size cannot exceed modulus size");
		return ft(it(t$2, r$2, e$2), "be", ht(e$2));
	}(t$1, e$1, r$1);
}
async function jt(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1) {
	if (F.getNodeCrypto() && !o$1) try {
		return await async function(t$2, e$2, r$2, n$2, i$2, s$2, a$2) {
			const o$2 = await Vt(e$2, r$2, n$2, i$2, s$2, a$2), c$1 = {
				key: o$2,
				format: "jwk",
				type: "pkcs1",
				padding: Ot.constants.RSA_PKCS1_PADDING
			};
			try {
				return new Uint8Array(Ot.privateDecrypt(c$1, t$2));
			} catch (t$3) {
				throw Error("Decryption error");
			}
		}(t$1, e$1, r$1, n$1, i$1, s$1, a$1);
	} catch (t$2) {
		F.printDebugError(t$2);
	}
	return async function(t$2, e$2, r$2, n$2, i$2, s$2, a$2, o$2) {
		if (t$2 = rt(t$2), e$2 = rt(e$2), r$2 = rt(r$2), n$2 = rt(n$2), i$2 = rt(i$2), s$2 = rt(s$2), a$2 = rt(a$2), t$2 >= e$2) throw Error("Data too large.");
		const c$1 = nt(n$2, s$2 - Ht), u$1 = nt(n$2, i$2 - Ht), h$1 = gt(BigInt(2), e$2), f$1 = it(at(h$1, e$2), r$2, e$2);
		t$2 = nt(t$2 * f$1, e$2);
		const l$1 = it(t$2, u$1, i$2), y$1 = it(t$2, c$1, s$2), g$1 = nt(a$2 * (y$1 - l$1), s$2);
		let p$1 = g$1 * i$2 + l$1;
		return p$1 = nt(p$1 * h$1, e$2), Ft(ft(p$1, "be", ht(e$2)), o$2);
	}(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1);
}
async function Vt(t$1, e$1, r$1, n$1, i$1, s$1) {
	const a$1 = rt(n$1), o$1 = rt(i$1), c$1 = rt(r$1);
	let u$1 = nt(c$1, o$1 - Ht), h$1 = nt(c$1, a$1 - Ht);
	return h$1 = ft(h$1), u$1 = ft(u$1), {
		kty: "RSA",
		n: _(t$1),
		e: _(e$1),
		d: _(r$1),
		p: _(i$1),
		q: _(n$1),
		dp: _(u$1),
		dq: _(h$1),
		qi: _(s$1),
		ext: !0
	};
}
function qt(t$1, e$1) {
	return {
		kty: "RSA",
		n: _(t$1),
		e: _(e$1),
		ext: !0
	};
}
function Yt(t$1, e$1) {
	return {
		n: G(t$1.n),
		e: ft(e$1),
		d: G(t$1.d),
		p: G(t$1.q),
		q: G(t$1.p),
		u: G(t$1.qi)
	};
}
const Zt = BigInt(1);
const Jt = {
	"2a8648ce3d030107": R.curve.nistP256,
	"2b81040022": R.curve.nistP384,
	"2b81040023": R.curve.nistP521,
	"2b8104000a": R.curve.secp256k1,
	"2b06010401da470f01": R.curve.ed25519Legacy,
	"2b060104019755010501": R.curve.curve25519Legacy,
	"2b2403030208010107": R.curve.brainpoolP256r1,
	"2b240303020801010b": R.curve.brainpoolP384r1,
	"2b240303020801010d": R.curve.brainpoolP512r1
};
var Wt = class Wt {
	constructor(t$1) {
		if (t$1 instanceof Wt) this.oid = t$1.oid;
else if (F.isArray(t$1) || F.isUint8Array(t$1)) {
			if (6 === (t$1 = new Uint8Array(t$1))[0]) {
				if (t$1[1] !== t$1.length - 2) throw Error("Length mismatch in DER encoded oid");
				t$1 = t$1.subarray(2);
			}
			this.oid = t$1;
		} else this.oid = "";
	}
	read(t$1) {
		if (t$1.length >= 1) {
			const e$1 = t$1[0];
			if (t$1.length >= 1 + e$1) return this.oid = t$1.subarray(1, 1 + e$1), 1 + this.oid.length;
		}
		throw Error("Invalid oid");
	}
	write() {
		return F.concatUint8Array([new Uint8Array([this.oid.length]), this.oid]);
	}
	toHex() {
		return F.uint8ArrayToHex(this.oid);
	}
	getName() {
		const t$1 = Jt[this.toHex()];
		if (!t$1) throw Error("Unknown curve object identifier.");
		return t$1;
	}
};
function Xt(t$1) {
	let e$1, r$1 = 0;
	const n$1 = t$1[0];
	return n$1 < 192 ? ([r$1] = t$1, e$1 = 1) : n$1 < 255 ? (r$1 = (t$1[0] - 192 << 8) + t$1[1] + 192, e$1 = 2) : 255 === n$1 && (r$1 = F.readNumber(t$1.subarray(1, 5)), e$1 = 5), {
		len: r$1,
		offset: e$1
	};
}
function $t(t$1) {
	return t$1 < 192 ? new Uint8Array([t$1]) : t$1 > 191 && t$1 < 8384 ? new Uint8Array([192 + (t$1 - 192 >> 8), t$1 - 192 & 255]) : F.concatUint8Array([new Uint8Array([255]), F.writeNumber(t$1, 4)]);
}
function te(t$1) {
	if (t$1 < 0 || t$1 > 30) throw Error("Partial Length power must be between 1 and 30");
	return new Uint8Array([224 + t$1]);
}
function ee(t$1) {
	return new Uint8Array([192 | t$1]);
}
function re(t$1, e$1) {
	return F.concatUint8Array([ee(t$1), $t(e$1)]);
}
function ne(t$1) {
	return [
		R.packet.literalData,
		R.packet.compressedData,
		R.packet.symmetricallyEncryptedData,
		R.packet.symEncryptedIntegrityProtectedData,
		R.packet.aeadEncryptedData
	].includes(t$1);
}
async function ie(t$1, e$1, r$1) {
	let n$1, i$1;
	try {
		const s$1 = await t$1.peekBytes(2);
		if (!s$1 || s$1.length < 2 || !(128 & s$1[0])) throw Error("Error during parsing. This message / key probably does not conform to a valid OpenPGP format.");
		const o$1 = await t$1.readByte();
		let c$1, u$1, h$1 = -1, f$1 = -1;
		f$1 = 0, 64 & o$1 && (f$1 = 1), f$1 ? h$1 = 63 & o$1 : (h$1 = (63 & o$1) >> 2, u$1 = 3 & o$1);
		const l$1 = ne(h$1);
		let y$1, g$1 = null;
		if (e$1 && l$1) {
			if ("array" === e$1) {
				const t$2 = new a();
				n$1 = x(t$2), g$1 = t$2;
			} else {
				const t$2 = new TransformStream();
				n$1 = x(t$2.writable), g$1 = t$2.readable;
			}
			i$1 = r$1({
				tag: h$1,
				packet: g$1
			});
		} else g$1 = [];
		do {
			if (f$1) {
				const e$2 = await t$1.readByte();
				if (y$1 = !1, e$2 < 192) c$1 = e$2;
else if (e$2 >= 192 && e$2 < 224) c$1 = (e$2 - 192 << 8) + await t$1.readByte() + 192;
else if (e$2 > 223 && e$2 < 255) {
					if (c$1 = 1 << (31 & e$2), y$1 = !0, !l$1) throw new TypeError("This packet type does not support partial lengths.");
				} else c$1 = await t$1.readByte() << 24 | await t$1.readByte() << 16 | await t$1.readByte() << 8 | await t$1.readByte();
			} else switch (u$1) {
				case 0:
					c$1 = await t$1.readByte();
					break;
				case 1:
					c$1 = await t$1.readByte() << 8 | await t$1.readByte();
					break;
				case 2:
					c$1 = await t$1.readByte() << 24 | await t$1.readByte() << 16 | await t$1.readByte() << 8 | await t$1.readByte();
					break;
				default: c$1 = Infinity;
			}
			if (c$1 > 0) {
				let e$2 = 0;
				for (;;) {
					n$1 && await n$1.ready;
					const { done: r$2, value: i$2 } = await t$1.read();
					if (r$2) {
						if (c$1 === Infinity) break;
						throw Error("Unexpected end of packet");
					}
					const s$2 = c$1 === Infinity ? i$2 : i$2.subarray(0, c$1 - e$2);
					if (n$1 ? await n$1.write(s$2) : g$1.push(s$2), e$2 += i$2.length, e$2 >= c$1) {
						t$1.unshift(i$2.subarray(c$1 - e$2 + i$2.length));
						break;
					}
				}
			}
		} while (y$1);
		n$1 ? (await n$1.ready, await n$1.close()) : (g$1 = F.concatUint8Array(g$1), await r$1({
			tag: h$1,
			packet: g$1
		}));
	} catch (t$2) {
		if (n$1) return await n$1.abort(t$2), !0;
		throw t$2;
	} finally {
		n$1 && await i$1;
	}
}
var se = class se extends Error {
	constructor(...t$1) {
		super(...t$1), Error.captureStackTrace && Error.captureStackTrace(this, se), this.name = "UnsupportedError";
	}
};
var ae = class extends se {
	constructor(...t$1) {
		super(...t$1), Error.captureStackTrace && Error.captureStackTrace(this, se), this.name = "UnknownPacketError";
	}
};
var oe = class extends se {
	constructor(...t$1) {
		super(...t$1), Error.captureStackTrace && Error.captureStackTrace(this, se), this.name = "MalformedPacketError";
	}
};
var ce = class {
	constructor(t$1, e$1) {
		this.tag = t$1, this.rawContent = e$1;
	}
	write() {
		return this.rawContent;
	}
};
async function ue(t$1) {
	switch (t$1) {
		case R.publicKey.ed25519: try {
			const t$2 = F.getWebCrypto(), e$1 = await t$2.generateKey("Ed25519", !0, ["sign", "verify"]).catch((t$3) => {
				if ("OperationError" === t$3.name) {
					const t$4 = Error("Unexpected key generation issue");
					throw t$4.name = "NotSupportedError", t$4;
				}
				throw t$3;
			}), r$1 = await t$2.exportKey("jwk", e$1.privateKey), n$1 = await t$2.exportKey("jwk", e$1.publicKey);
			return {
				A: new Uint8Array(G(n$1.x)),
				seed: G(r$1.d)
			};
		} catch (e$1) {
			if ("NotSupportedError" !== e$1.name) throw e$1;
			const { default: r$1 } = await Promise.resolve().then(function() {
				return ty;
			}), n$1 = yt(ye(t$1)), { publicKey: i$1 } = r$1.sign.keyPair.fromSeed(n$1);
			return {
				A: i$1,
				seed: n$1
			};
		}
		case R.publicKey.ed448: {
			const t$2 = await F.getNobleCurve(R.publicKey.ed448), { secretKey: e$1, publicKey: r$1 } = t$2.keygen();
			return {
				A: r$1,
				seed: e$1
			};
		}
		default: throw Error("Unsupported EdDSA algorithm");
	}
}
async function he(t$1, e$1, r$1, n$1, i$1, s$1) {
	if (Rt(e$1) < Rt(ge(t$1))) throw Error("Hash algorithm too weak for EdDSA.");
	switch (t$1) {
		case R.publicKey.ed25519: try {
			const e$2 = F.getWebCrypto(), r$2 = de(t$1, n$1, i$1), a$1 = await e$2.importKey("jwk", r$2, "Ed25519", !1, ["sign"]);
			return { RS: new Uint8Array(await e$2.sign("Ed25519", a$1, s$1)) };
		} catch (t$2) {
			if ("NotSupportedError" !== t$2.name) throw t$2;
			const { default: e$2 } = await Promise.resolve().then(function() {
				return ty;
			}), r$2 = F.concatUint8Array([i$1, n$1]);
			return { RS: e$2.sign.detached(s$1, r$2) };
		}
		case R.publicKey.ed448: return { RS: (await F.getNobleCurve(R.publicKey.ed448)).sign(s$1, i$1) };
		default: throw Error("Unsupported EdDSA algorithm");
	}
}
async function fe(t$1, e$1, { RS: r$1 }, n$1, i$1, s$1) {
	if (Rt(e$1) < Rt(ge(t$1))) throw Error("Hash algorithm too weak for EdDSA.");
	switch (t$1) {
		case R.publicKey.ed25519: try {
			const e$2 = F.getWebCrypto(), n$2 = pe(t$1, i$1), a$1 = await e$2.importKey("jwk", n$2, "Ed25519", !1, ["verify"]);
			return await e$2.verify("Ed25519", a$1, r$1, s$1);
		} catch (t$2) {
			if ("NotSupportedError" !== t$2.name) throw t$2;
			const { default: e$2 } = await Promise.resolve().then(function() {
				return ty;
			});
			return e$2.sign.detached.verify(s$1, r$1, i$1);
		}
		case R.publicKey.ed448: return (await F.getNobleCurve(R.publicKey.ed448)).verify(r$1, s$1, i$1);
		default: throw Error("Unsupported EdDSA algorithm");
	}
}
async function le(t$1, e$1, r$1) {
	switch (t$1) {
		case R.publicKey.ed25519: try {
			const n$1 = F.getWebCrypto(), i$1 = de(t$1, e$1, r$1), s$1 = pe(t$1, e$1), a$1 = await n$1.importKey("jwk", i$1, "Ed25519", !1, ["sign"]), o$1 = await n$1.importKey("jwk", s$1, "Ed25519", !1, ["verify"]), c$1 = yt(8), u$1 = new Uint8Array(await n$1.sign("Ed25519", a$1, c$1));
			return await n$1.verify("Ed25519", o$1, u$1, c$1);
		} catch (t$2) {
			if ("NotSupportedError" !== t$2.name) return !1;
			const { default: n$1 } = await Promise.resolve().then(function() {
				return ty;
			}), { publicKey: i$1 } = n$1.sign.keyPair.fromSeed(r$1);
			return F.equalsUint8Array(e$1, i$1);
		}
		case R.publicKey.ed448: {
			const t$2 = (await F.getNobleCurve(R.publicKey.ed448)).getPublicKey(r$1);
			return F.equalsUint8Array(e$1, t$2);
		}
		default: return !1;
	}
}
function ye(t$1) {
	switch (t$1) {
		case R.publicKey.ed25519: return 32;
		case R.publicKey.ed448: return 57;
		default: throw Error("Unsupported EdDSA algorithm");
	}
}
function ge(t$1) {
	switch (t$1) {
		case R.publicKey.ed25519: return R.hash.sha256;
		case R.publicKey.ed448: return R.hash.sha512;
		default: throw Error("Unknown EdDSA algo");
	}
}
const pe = (t$1, e$1) => {
	if (t$1 === R.publicKey.ed25519) return {
		kty: "OKP",
		crv: "Ed25519",
		x: _(e$1),
		ext: !0
	};
	throw Error("Unsupported EdDSA algorithm");
}, de = (t$1, e$1, r$1) => {
	if (t$1 === R.publicKey.ed25519) {
		const n$1 = pe(t$1, e$1);
		return n$1.d = _(r$1), n$1;
	}
	throw Error("Unsupported EdDSA algorithm");
};
var Ae = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	generate: ue,
	getPayloadSize: ye,
	getPreferredHashAlgo: ge,
	sign: he,
	validateParams: le,
	verify: fe
});
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */ function we(t$1) {
	return t$1 instanceof Uint8Array || ArrayBuffer.isView(t$1) && "Uint8Array" === t$1.constructor.name;
}
function me(t$1, ...e$1) {
	if (!we(t$1)) throw Error("Uint8Array expected");
	if (e$1.length > 0 && !e$1.includes(t$1.length)) throw Error("Uint8Array expected of length " + e$1 + ", got length=" + t$1.length);
}
function be(t$1, e$1 = !0) {
	if (t$1.destroyed) throw Error("Hash instance has been destroyed");
	if (e$1 && t$1.finished) throw Error("Hash#digest() has already been called");
}
function ke(t$1, e$1) {
	me(t$1);
	const r$1 = e$1.outputLen;
	if (t$1.length < r$1) throw Error("digestInto() expects output buffer of length at least " + r$1);
}
function Ee(t$1) {
	return new Uint8Array(t$1.buffer, t$1.byteOffset, t$1.byteLength);
}
function ve(t$1) {
	return new Uint32Array(t$1.buffer, t$1.byteOffset, Math.floor(t$1.byteLength / 4));
}
function Be(...t$1) {
	for (let e$1 = 0; e$1 < t$1.length; e$1++) t$1[e$1].fill(0);
}
function Ie(t$1) {
	return new DataView(t$1.buffer, t$1.byteOffset, t$1.byteLength);
}
const Se = /* @__PURE__ */ (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])();
function Ke(t$1) {
	if ("string" == typeof t$1) t$1 = function(t$2) {
		if ("string" != typeof t$2) throw Error("string expected");
		return new Uint8Array(new TextEncoder().encode(t$2));
	}(t$1);
else {
		if (!we(t$1)) throw Error("Uint8Array expected, got " + typeof t$1);
		t$1 = Te(t$1);
	}
	return t$1;
}
function Ce(t$1, e$1) {
	return t$1.buffer === e$1.buffer && t$1.byteOffset < e$1.byteOffset + e$1.byteLength && e$1.byteOffset < t$1.byteOffset + t$1.byteLength;
}
function De(t$1, e$1) {
	if (Ce(t$1, e$1) && t$1.byteOffset < e$1.byteOffset) throw Error("complex overlap of input and output is not supported");
}
function Ue(t$1, e$1) {
	if (t$1.length !== e$1.length) return !1;
	let r$1 = 0;
	for (let n$1 = 0; n$1 < t$1.length; n$1++) r$1 |= t$1[n$1] ^ e$1[n$1];
	return 0 === r$1;
}
const Pe = (t$1, e$1) => {
	function r$1(r$2, ...n$1) {
		if (me(r$2), !Se) throw Error("Non little-endian hardware is not yet supported");
		if (void 0 !== t$1.nonceLength) {
			const e$2 = n$1[0];
			if (!e$2) throw Error("nonce / iv required");
			t$1.varSizeNonce ? me(e$2) : me(e$2, t$1.nonceLength);
		}
		const i$1 = t$1.tagLength;
		i$1 && void 0 !== n$1[1] && me(n$1[1]);
		const s$1 = e$1(r$2, ...n$1), a$1 = (t$2, e$2) => {
			if (void 0 !== e$2) {
				if (2 !== t$2) throw Error("cipher output not supported");
				me(e$2);
			}
		};
		let o$1 = !1;
		return {
			encrypt(t$2, e$2) {
				if (o$1) throw Error("cannot encrypt() twice with same key + nonce");
				return o$1 = !0, me(t$2), a$1(s$1.encrypt.length, e$2), s$1.encrypt(t$2, e$2);
			},
			decrypt(t$2, e$2) {
				if (me(t$2), i$1 && t$2.length < i$1) throw Error("invalid ciphertext length: smaller than tagLength=" + i$1);
				return a$1(s$1.decrypt.length, e$2), s$1.decrypt(t$2, e$2);
			}
		};
	}
	return Object.assign(r$1, t$1), r$1;
};
function xe(t$1, e$1, r$1 = !0) {
	if (void 0 === e$1) return new Uint8Array(t$1);
	if (e$1.length !== t$1) throw Error("invalid output length, expected " + t$1 + ", got: " + e$1.length);
	if (r$1 && !Re(e$1)) throw Error("invalid output, must be aligned");
	return e$1;
}
function Qe(t$1, e$1, r$1, n$1) {
	if ("function" == typeof t$1.setBigUint64) return t$1.setBigUint64(e$1, r$1, n$1);
	const i$1 = BigInt(32), s$1 = BigInt(4294967295), a$1 = Number(r$1 >> i$1 & s$1), o$1 = Number(r$1 & s$1);
	t$1.setUint32(e$1 + 0, a$1, n$1), t$1.setUint32(e$1 + 4, o$1, n$1);
}
function Re(t$1) {
	return t$1.byteOffset % 4 == 0;
}
function Te(t$1) {
	return Uint8Array.from(t$1);
}
const Me = 16, Fe = /* @__PURE__ */ new Uint8Array(16), Ne = ve(Fe), Le = (t$1) => (t$1 >>> 0 & 255) << 24 | (t$1 >>> 8 & 255) << 16 | (t$1 >>> 16 & 255) << 8 | t$1 >>> 24 & 255;
var Oe = class {
	constructor(t$1, e$1) {
		this.blockLen = Me, this.outputLen = Me, this.s0 = 0, this.s1 = 0, this.s2 = 0, this.s3 = 0, this.finished = !1, me(t$1 = Ke(t$1), 16);
		const r$1 = Ie(t$1);
		let n$1 = r$1.getUint32(0, !1), i$1 = r$1.getUint32(4, !1), s$1 = r$1.getUint32(8, !1), a$1 = r$1.getUint32(12, !1);
		const o$1 = [];
		for (let t$2 = 0; t$2 < 128; t$2++) o$1.push({
			s0: Le(n$1),
			s1: Le(i$1),
			s2: Le(s$1),
			s3: Le(a$1)
		}), {s0: n$1, s1: i$1, s2: s$1, s3: a$1} = {
			s3: (h$1 = s$1) << 31 | (f$1 = a$1) >>> 1,
			s2: (u$1 = i$1) << 31 | h$1 >>> 1,
			s1: (c$1 = n$1) << 31 | u$1 >>> 1,
			s0: c$1 >>> 1 ^ -520093696 & -(1 & f$1)
		};
		var c$1, u$1, h$1, f$1;
		const l$1 = (y$1 = e$1 || 1024) > 65536 ? 8 : y$1 > 1024 ? 4 : 2;
		var y$1;
		if (![
			1,
			2,
			4,
			8
		].includes(l$1)) throw Error("ghash: invalid window size, expected 2, 4 or 8");
		this.W = l$1;
		const g$1 = 128 / l$1, p$1 = this.windowSize = 2 ** l$1, d$1 = [];
		for (let t$2 = 0; t$2 < g$1; t$2++) for (let e$2 = 0; e$2 < p$1; e$2++) {
			let r$2 = 0, n$2 = 0, i$2 = 0, s$2 = 0;
			for (let a$2 = 0; a$2 < l$1; a$2++) {
				if (!(e$2 >>> l$1 - a$2 - 1 & 1)) continue;
				const { s0: c$2, s1: u$2, s2: h$2, s3: f$2 } = o$1[l$1 * t$2 + a$2];
				r$2 ^= c$2, n$2 ^= u$2, i$2 ^= h$2, s$2 ^= f$2;
			}
			d$1.push({
				s0: r$2,
				s1: n$2,
				s2: i$2,
				s3: s$2
			});
		}
		this.t = d$1;
	}
	_updateBlock(t$1, e$1, r$1, n$1) {
		t$1 ^= this.s0, e$1 ^= this.s1, r$1 ^= this.s2, n$1 ^= this.s3;
		const { W: i$1, t: s$1, windowSize: a$1 } = this;
		let o$1 = 0, c$1 = 0, u$1 = 0, h$1 = 0;
		const f$1 = (1 << i$1) - 1;
		let l$1 = 0;
		for (const y$1 of [
			t$1,
			e$1,
			r$1,
			n$1
		]) for (let t$2 = 0; t$2 < 4; t$2++) {
			const e$2 = y$1 >>> 8 * t$2 & 255;
			for (let t$3 = 8 / i$1 - 1; t$3 >= 0; t$3--) {
				const r$2 = e$2 >>> i$1 * t$3 & f$1, { s0: n$2, s1: y$2, s2: g$1, s3: p$1 } = s$1[l$1 * a$1 + r$2];
				o$1 ^= n$2, c$1 ^= y$2, u$1 ^= g$1, h$1 ^= p$1, l$1 += 1;
			}
		}
		this.s0 = o$1, this.s1 = c$1, this.s2 = u$1, this.s3 = h$1;
	}
	update(t$1) {
		be(this), me(t$1 = Ke(t$1));
		const e$1 = ve(t$1), r$1 = Math.floor(t$1.length / Me), n$1 = t$1.length % Me;
		for (let t$2 = 0; t$2 < r$1; t$2++) this._updateBlock(e$1[4 * t$2 + 0], e$1[4 * t$2 + 1], e$1[4 * t$2 + 2], e$1[4 * t$2 + 3]);
		return n$1 && (Fe.set(t$1.subarray(r$1 * Me)), this._updateBlock(Ne[0], Ne[1], Ne[2], Ne[3]), Be(Ne)), this;
	}
	destroy() {
		const { t: t$1 } = this;
		for (const e$1 of t$1) e$1.s0 = 0, e$1.s1 = 0, e$1.s2 = 0, e$1.s3 = 0;
	}
	digestInto(t$1) {
		be(this), ke(t$1, this), this.finished = !0;
		const { s0: e$1, s1: r$1, s2: n$1, s3: i$1 } = this, s$1 = ve(t$1);
		return s$1[0] = e$1, s$1[1] = r$1, s$1[2] = n$1, s$1[3] = i$1, t$1;
	}
	digest() {
		const t$1 = new Uint8Array(Me);
		return this.digestInto(t$1), this.destroy(), t$1;
	}
};
var He = class extends Oe {
	constructor(t$1, e$1) {
		me(t$1 = Ke(t$1));
		const r$1 = function(t$2) {
			t$2.reverse();
			const e$2 = 1 & t$2[15];
			let r$2 = 0;
			for (let e$3 = 0; e$3 < t$2.length; e$3++) {
				const n$1 = t$2[e$3];
				t$2[e$3] = n$1 >>> 1 | r$2, r$2 = (1 & n$1) << 7;
			}
			return t$2[0] ^= 225 & -e$2, t$2;
		}(Te(t$1));
		super(r$1, e$1), Be(r$1);
	}
	update(t$1) {
		t$1 = Ke(t$1), be(this);
		const e$1 = ve(t$1), r$1 = t$1.length % Me, n$1 = Math.floor(t$1.length / Me);
		for (let t$2 = 0; t$2 < n$1; t$2++) this._updateBlock(Le(e$1[4 * t$2 + 3]), Le(e$1[4 * t$2 + 2]), Le(e$1[4 * t$2 + 1]), Le(e$1[4 * t$2 + 0]));
		return r$1 && (Fe.set(t$1.subarray(n$1 * Me)), this._updateBlock(Le(Ne[3]), Le(Ne[2]), Le(Ne[1]), Le(Ne[0])), Be(Ne)), this;
	}
	digestInto(t$1) {
		be(this), ke(t$1, this), this.finished = !0;
		const { s0: e$1, s1: r$1, s2: n$1, s3: i$1 } = this, s$1 = ve(t$1);
		return s$1[0] = e$1, s$1[1] = r$1, s$1[2] = n$1, s$1[3] = i$1, t$1.reverse();
	}
};
function ze(t$1) {
	const e$1 = (e$2, r$2) => t$1(r$2, e$2.length).update(Ke(e$2)).digest(), r$1 = t$1(new Uint8Array(16), 0);
	return e$1.outputLen = r$1.outputLen, e$1.blockLen = r$1.blockLen, e$1.create = (e$2, r$2) => t$1(e$2, r$2), e$1;
}
const Ge = ze((t$1, e$1) => new Oe(t$1, e$1));
ze((t$1, e$1) => new He(t$1, e$1));
const _e = 16, je = /* @__PURE__ */ new Uint8Array(_e);
function Ve(t$1) {
	return t$1 << 1 ^ 283 & -(t$1 >> 7);
}
function qe(t$1, e$1) {
	let r$1 = 0;
	for (; e$1 > 0; e$1 >>= 1) r$1 ^= t$1 & -(1 & e$1), t$1 = Ve(t$1);
	return r$1;
}
const Ye = /* @__PURE__ */ (() => {
	const t$1 = new Uint8Array(256);
	for (let e$2 = 0, r$1 = 1; e$2 < 256; e$2++, r$1 ^= Ve(r$1)) t$1[e$2] = r$1;
	const e$1 = new Uint8Array(256);
	e$1[0] = 99;
	for (let r$1 = 0; r$1 < 255; r$1++) {
		let n$1 = t$1[255 - r$1];
		n$1 |= n$1 << 8, e$1[t$1[r$1]] = 255 & (n$1 ^ n$1 >> 4 ^ n$1 >> 5 ^ n$1 >> 6 ^ n$1 >> 7 ^ 99);
	}
	return Be(t$1), e$1;
})(), Ze = /* @__PURE__ */ Ye.map((t$1, e$1) => Ye.indexOf(e$1)), Je = (t$1) => t$1 << 8 | t$1 >>> 24, We = (t$1) => t$1 << 24 & 4278190080 | t$1 << 8 & 16711680 | t$1 >>> 8 & 65280 | t$1 >>> 24 & 255;
function Xe(t$1, e$1) {
	if (256 !== t$1.length) throw Error("Wrong sbox length");
	const r$1 = new Uint32Array(256).map((r$2, n$2) => e$1(t$1[n$2])), n$1 = r$1.map(Je), i$1 = n$1.map(Je), s$1 = i$1.map(Je), a$1 = new Uint32Array(65536), o$1 = new Uint32Array(65536), c$1 = new Uint16Array(65536);
	for (let e$2 = 0; e$2 < 256; e$2++) for (let u$1 = 0; u$1 < 256; u$1++) {
		const h$1 = 256 * e$2 + u$1;
		a$1[h$1] = r$1[e$2] ^ n$1[u$1], o$1[h$1] = i$1[e$2] ^ s$1[u$1], c$1[h$1] = t$1[e$2] << 8 | t$1[u$1];
	}
	return {
		sbox: t$1,
		sbox2: c$1,
		T0: r$1,
		T1: n$1,
		T2: i$1,
		T3: s$1,
		T01: a$1,
		T23: o$1
	};
}
const $e = /* @__PURE__ */ Xe(Ye, (t$1) => qe(t$1, 3) << 24 | t$1 << 16 | t$1 << 8 | qe(t$1, 2)), tr = /* @__PURE__ */ Xe(Ze, (t$1) => qe(t$1, 11) << 24 | qe(t$1, 13) << 16 | qe(t$1, 9) << 8 | qe(t$1, 14)), er = /* @__PURE__ */ (() => {
	const t$1 = new Uint8Array(16);
	for (let e$1 = 0, r$1 = 1; e$1 < 16; e$1++, r$1 = Ve(r$1)) t$1[e$1] = r$1;
	return t$1;
})();
function rr(t$1) {
	me(t$1);
	const e$1 = t$1.length;
	if (![
		16,
		24,
		32
	].includes(e$1)) throw Error("aes: invalid key size, should be 16, 24 or 32, got " + e$1);
	const { sbox2: r$1 } = $e, n$1 = [];
	Re(t$1) || n$1.push(t$1 = Te(t$1));
	const i$1 = ve(t$1), s$1 = i$1.length, a$1 = (t$2) => sr(r$1, t$2, t$2, t$2, t$2), o$1 = new Uint32Array(e$1 + 28);
	o$1.set(i$1);
	for (let t$2 = s$1; t$2 < o$1.length; t$2++) {
		let e$2 = o$1[t$2 - 1];
		t$2 % s$1 == 0 ? e$2 = a$1((c$1 = e$2) << 24 | c$1 >>> 8) ^ er[t$2 / s$1 - 1] : s$1 > 6 && t$2 % s$1 == 4 && (e$2 = a$1(e$2)), o$1[t$2] = o$1[t$2 - s$1] ^ e$2;
	}
	var c$1;
	return Be(...n$1), o$1;
}
function nr(t$1) {
	const e$1 = rr(t$1), r$1 = e$1.slice(), n$1 = e$1.length, { sbox2: i$1 } = $e, { T0: s$1, T1: a$1, T2: o$1, T3: c$1 } = tr;
	for (let t$2 = 0; t$2 < n$1; t$2 += 4) for (let i$2 = 0; i$2 < 4; i$2++) r$1[t$2 + i$2] = e$1[n$1 - t$2 - 4 + i$2];
	Be(e$1);
	for (let t$2 = 4; t$2 < n$1 - 4; t$2++) {
		const e$2 = r$1[t$2], n$2 = sr(i$1, e$2, e$2, e$2, e$2);
		r$1[t$2] = s$1[255 & n$2] ^ a$1[n$2 >>> 8 & 255] ^ o$1[n$2 >>> 16 & 255] ^ c$1[n$2 >>> 24];
	}
	return r$1;
}
function ir(t$1, e$1, r$1, n$1, i$1, s$1) {
	return t$1[r$1 << 8 & 65280 | n$1 >>> 8 & 255] ^ e$1[i$1 >>> 8 & 65280 | s$1 >>> 24 & 255];
}
function sr(t$1, e$1, r$1, n$1, i$1) {
	return t$1[255 & e$1 | 65280 & r$1] | t$1[n$1 >>> 16 & 255 | i$1 >>> 16 & 65280] << 16;
}
function ar(t$1, e$1, r$1, n$1, i$1) {
	const { sbox2: s$1, T01: a$1, T23: o$1 } = $e;
	let c$1 = 0;
	e$1 ^= t$1[c$1++], r$1 ^= t$1[c$1++], n$1 ^= t$1[c$1++], i$1 ^= t$1[c$1++];
	const u$1 = t$1.length / 4 - 2;
	for (let s$2 = 0; s$2 < u$1; s$2++) {
		const s$3 = t$1[c$1++] ^ ir(a$1, o$1, e$1, r$1, n$1, i$1), u$2 = t$1[c$1++] ^ ir(a$1, o$1, r$1, n$1, i$1, e$1), h$1 = t$1[c$1++] ^ ir(a$1, o$1, n$1, i$1, e$1, r$1), f$1 = t$1[c$1++] ^ ir(a$1, o$1, i$1, e$1, r$1, n$1);
		e$1 = s$3, r$1 = u$2, n$1 = h$1, i$1 = f$1;
	}
	return {
		s0: t$1[c$1++] ^ sr(s$1, e$1, r$1, n$1, i$1),
		s1: t$1[c$1++] ^ sr(s$1, r$1, n$1, i$1, e$1),
		s2: t$1[c$1++] ^ sr(s$1, n$1, i$1, e$1, r$1),
		s3: t$1[c$1++] ^ sr(s$1, i$1, e$1, r$1, n$1)
	};
}
function or(t$1, e$1, r$1, n$1, i$1) {
	const { sbox2: s$1, T01: a$1, T23: o$1 } = tr;
	let c$1 = 0;
	e$1 ^= t$1[c$1++], r$1 ^= t$1[c$1++], n$1 ^= t$1[c$1++], i$1 ^= t$1[c$1++];
	const u$1 = t$1.length / 4 - 2;
	for (let s$2 = 0; s$2 < u$1; s$2++) {
		const s$3 = t$1[c$1++] ^ ir(a$1, o$1, e$1, i$1, n$1, r$1), u$2 = t$1[c$1++] ^ ir(a$1, o$1, r$1, e$1, i$1, n$1), h$1 = t$1[c$1++] ^ ir(a$1, o$1, n$1, r$1, e$1, i$1), f$1 = t$1[c$1++] ^ ir(a$1, o$1, i$1, n$1, r$1, e$1);
		e$1 = s$3, r$1 = u$2, n$1 = h$1, i$1 = f$1;
	}
	return {
		s0: t$1[c$1++] ^ sr(s$1, e$1, i$1, n$1, r$1),
		s1: t$1[c$1++] ^ sr(s$1, r$1, e$1, i$1, n$1),
		s2: t$1[c$1++] ^ sr(s$1, n$1, r$1, e$1, i$1),
		s3: t$1[c$1++] ^ sr(s$1, i$1, n$1, r$1, e$1)
	};
}
function cr(t$1, e$1, r$1, n$1) {
	me(e$1, _e), me(r$1);
	const i$1 = r$1.length;
	De(r$1, n$1 = xe(i$1, n$1));
	const s$1 = e$1, a$1 = ve(s$1);
	let { s0: o$1, s1: c$1, s2: u$1, s3: h$1 } = ar(t$1, a$1[0], a$1[1], a$1[2], a$1[3]);
	const f$1 = ve(r$1), l$1 = ve(n$1);
	for (let e$2 = 0; e$2 + 4 <= f$1.length; e$2 += 4) {
		l$1[e$2 + 0] = f$1[e$2 + 0] ^ o$1, l$1[e$2 + 1] = f$1[e$2 + 1] ^ c$1, l$1[e$2 + 2] = f$1[e$2 + 2] ^ u$1, l$1[e$2 + 3] = f$1[e$2 + 3] ^ h$1;
		let r$2 = 1;
		for (let t$2 = s$1.length - 1; t$2 >= 0; t$2--) r$2 = r$2 + (255 & s$1[t$2]) | 0, s$1[t$2] = 255 & r$2, r$2 >>>= 8;
		({s0: o$1, s1: c$1, s2: u$1, s3: h$1} = ar(t$1, a$1[0], a$1[1], a$1[2], a$1[3]));
	}
	const y$1 = _e * Math.floor(f$1.length / 4);
	if (y$1 < i$1) {
		const t$2 = new Uint32Array([
			o$1,
			c$1,
			u$1,
			h$1
		]), e$2 = Ee(t$2);
		for (let t$3 = y$1, s$2 = 0; t$3 < i$1; t$3++, s$2++) n$1[t$3] = r$1[t$3] ^ e$2[s$2];
		Be(t$2);
	}
	return n$1;
}
function ur(t$1, e$1, r$1, n$1, i$1) {
	me(r$1, _e), me(n$1), i$1 = xe(n$1.length, i$1);
	const s$1 = r$1, a$1 = ve(s$1), o$1 = Ie(s$1), c$1 = ve(n$1), u$1 = ve(i$1), h$1 = e$1 ? 0 : 12, f$1 = n$1.length;
	let l$1 = o$1.getUint32(h$1, e$1), { s0: y$1, s1: g$1, s2: p$1, s3: d$1 } = ar(t$1, a$1[0], a$1[1], a$1[2], a$1[3]);
	for (let r$2 = 0; r$2 + 4 <= c$1.length; r$2 += 4) u$1[r$2 + 0] = c$1[r$2 + 0] ^ y$1, u$1[r$2 + 1] = c$1[r$2 + 1] ^ g$1, u$1[r$2 + 2] = c$1[r$2 + 2] ^ p$1, u$1[r$2 + 3] = c$1[r$2 + 3] ^ d$1, l$1 = l$1 + 1 >>> 0, o$1.setUint32(h$1, l$1, e$1), {s0: y$1, s1: g$1, s2: p$1, s3: d$1} = ar(t$1, a$1[0], a$1[1], a$1[2], a$1[3]);
	const A$1 = _e * Math.floor(c$1.length / 4);
	if (A$1 < f$1) {
		const t$2 = new Uint32Array([
			y$1,
			g$1,
			p$1,
			d$1
		]), e$2 = Ee(t$2);
		for (let t$3 = A$1, r$2 = 0; t$3 < f$1; t$3++, r$2++) i$1[t$3] = n$1[t$3] ^ e$2[r$2];
		Be(t$2);
	}
	return i$1;
}
const hr = /* @__PURE__ */ Pe({
	blockSize: 16,
	nonceLength: 16
}, function(t$1, e$1) {
	function r$1(r$2, n$1) {
		if (me(r$2), void 0 !== n$1 && (me(n$1), !Re(n$1))) throw Error("unaligned destination");
		const i$1 = rr(t$1), s$1 = Te(e$1), a$1 = [i$1, s$1];
		Re(r$2) || a$1.push(r$2 = Te(r$2));
		const o$1 = cr(i$1, s$1, r$2, n$1);
		return Be(...a$1), o$1;
	}
	return {
		encrypt: (t$2, e$2) => r$1(t$2, e$2),
		decrypt: (t$2, e$2) => r$1(t$2, e$2)
	};
});
const fr = /* @__PURE__ */ Pe({
	blockSize: 16,
	nonceLength: 16
}, function(t$1, e$1, r$1 = {}) {
	const n$1 = !r$1.disablePadding;
	return {
		encrypt(r$2, i$1) {
			const s$1 = rr(t$1), { b: a$1, o: o$1, out: c$1 } = function(t$2, e$2, r$3) {
				me(t$2);
				let n$2 = t$2.length;
				const i$2 = n$2 % _e;
				if (!e$2 && 0 !== i$2) throw Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
				Re(t$2) || (t$2 = Te(t$2));
				const s$2 = ve(t$2);
				if (e$2) {
					let t$3 = _e - i$2;
					t$3 || (t$3 = _e), n$2 += t$3;
				}
				return De(t$2, r$3 = xe(n$2, r$3)), {
					b: s$2,
					o: ve(r$3),
					out: r$3
				};
			}(r$2, n$1, i$1);
			let u$1 = e$1;
			const h$1 = [s$1];
			Re(u$1) || h$1.push(u$1 = Te(u$1));
			const f$1 = ve(u$1);
			let l$1 = f$1[0], y$1 = f$1[1], g$1 = f$1[2], p$1 = f$1[3], d$1 = 0;
			for (; d$1 + 4 <= a$1.length;) l$1 ^= a$1[d$1 + 0], y$1 ^= a$1[d$1 + 1], g$1 ^= a$1[d$1 + 2], p$1 ^= a$1[d$1 + 3], {s0: l$1, s1: y$1, s2: g$1, s3: p$1} = ar(s$1, l$1, y$1, g$1, p$1), o$1[d$1++] = l$1, o$1[d$1++] = y$1, o$1[d$1++] = g$1, o$1[d$1++] = p$1;
			if (n$1) {
				const t$2 = function(t$3) {
					const e$2 = new Uint8Array(16), r$3 = ve(e$2);
					e$2.set(t$3);
					const n$2 = _e - t$3.length;
					for (let t$4 = _e - n$2; t$4 < _e; t$4++) e$2[t$4] = n$2;
					return r$3;
				}(r$2.subarray(4 * d$1));
				l$1 ^= t$2[0], y$1 ^= t$2[1], g$1 ^= t$2[2], p$1 ^= t$2[3], {s0: l$1, s1: y$1, s2: g$1, s3: p$1} = ar(s$1, l$1, y$1, g$1, p$1), o$1[d$1++] = l$1, o$1[d$1++] = y$1, o$1[d$1++] = g$1, o$1[d$1++] = p$1;
			}
			return Be(...h$1), c$1;
		},
		decrypt(r$2, i$1) {
			!function(t$2) {
				if (me(t$2), t$2.length % _e != 0) throw Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size 16");
			}(r$2);
			const s$1 = nr(t$1);
			let a$1 = e$1;
			const o$1 = [s$1];
			Re(a$1) || o$1.push(a$1 = Te(a$1));
			const c$1 = ve(a$1);
			i$1 = xe(r$2.length, i$1), Re(r$2) || o$1.push(r$2 = Te(r$2)), De(r$2, i$1);
			const u$1 = ve(r$2), h$1 = ve(i$1);
			let f$1 = c$1[0], l$1 = c$1[1], y$1 = c$1[2], g$1 = c$1[3];
			for (let t$2 = 0; t$2 + 4 <= u$1.length;) {
				const e$2 = f$1, r$3 = l$1, n$2 = y$1, i$2 = g$1;
				f$1 = u$1[t$2 + 0], l$1 = u$1[t$2 + 1], y$1 = u$1[t$2 + 2], g$1 = u$1[t$2 + 3];
				const { s0: a$2, s1: o$2, s2: c$2, s3: p$1 } = or(s$1, f$1, l$1, y$1, g$1);
				h$1[t$2++] = a$2 ^ e$2, h$1[t$2++] = o$2 ^ r$3, h$1[t$2++] = c$2 ^ n$2, h$1[t$2++] = p$1 ^ i$2;
			}
			return Be(...o$1), function(t$2, e$2) {
				if (!e$2) return t$2;
				const r$3 = t$2.length;
				if (!r$3) throw Error("aes/pcks5: empty ciphertext not allowed");
				const n$2 = t$2[r$3 - 1];
				if (n$2 <= 0 || n$2 > 16) throw Error("aes/pcks5: wrong padding");
				const i$2 = t$2.subarray(0, -n$2);
				for (let e$3 = 0; e$3 < n$2; e$3++) if (t$2[r$3 - e$3 - 1] !== n$2) throw Error("aes/pcks5: wrong padding");
				return i$2;
			}(i$1, n$1);
		}
	};
}), lr = /* @__PURE__ */ Pe({
	blockSize: 16,
	nonceLength: 16
}, function(t$1, e$1) {
	function r$1(r$2, n$1, i$1) {
		me(r$2);
		const s$1 = r$2.length;
		if (Ce(r$2, i$1 = xe(s$1, i$1))) throw Error("overlapping src and dst not supported.");
		const a$1 = rr(t$1);
		let o$1 = e$1;
		const c$1 = [a$1];
		Re(o$1) || c$1.push(o$1 = Te(o$1)), Re(r$2) || c$1.push(r$2 = Te(r$2));
		const u$1 = ve(r$2), h$1 = ve(i$1), f$1 = n$1 ? h$1 : u$1, l$1 = ve(o$1);
		let y$1 = l$1[0], g$1 = l$1[1], p$1 = l$1[2], d$1 = l$1[3];
		for (let t$2 = 0; t$2 + 4 <= u$1.length;) {
			const { s0: e$2, s1: r$3, s2: n$2, s3: i$2 } = ar(a$1, y$1, g$1, p$1, d$1);
			h$1[t$2 + 0] = u$1[t$2 + 0] ^ e$2, h$1[t$2 + 1] = u$1[t$2 + 1] ^ r$3, h$1[t$2 + 2] = u$1[t$2 + 2] ^ n$2, h$1[t$2 + 3] = u$1[t$2 + 3] ^ i$2, y$1 = f$1[t$2++], g$1 = f$1[t$2++], p$1 = f$1[t$2++], d$1 = f$1[t$2++];
		}
		const A$1 = _e * Math.floor(u$1.length / 4);
		if (A$1 < s$1) {
			({s0: y$1, s1: g$1, s2: p$1, s3: d$1} = ar(a$1, y$1, g$1, p$1, d$1));
			const t$2 = Ee(new Uint32Array([
				y$1,
				g$1,
				p$1,
				d$1
			]));
			for (let e$2 = A$1, n$2 = 0; e$2 < s$1; e$2++, n$2++) i$1[e$2] = r$2[e$2] ^ t$2[n$2];
			Be(t$2);
		}
		return Be(...c$1), i$1;
	}
	return {
		encrypt: (t$2, e$2) => r$1(t$2, !0, e$2),
		decrypt: (t$2, e$2) => r$1(t$2, !1, e$2)
	};
});
function yr(t$1, e$1, r$1, n$1, i$1) {
	const s$1 = i$1 ? i$1.length : 0, a$1 = t$1.create(r$1, n$1.length + s$1);
	i$1 && a$1.update(i$1);
	const o$1 = function(t$2, e$2, r$2) {
		const n$2 = new Uint8Array(16), i$2 = Ie(n$2);
		return Qe(i$2, 0, BigInt(e$2), r$2), Qe(i$2, 8, BigInt(t$2), r$2), n$2;
	}(8 * n$1.length, 8 * s$1, e$1);
	a$1.update(n$1), a$1.update(o$1);
	const c$1 = a$1.digest();
	return Be(o$1), c$1;
}
const gr = /* @__PURE__ */ Pe({
	blockSize: 16,
	nonceLength: 12,
	tagLength: 16,
	varSizeNonce: !0
}, function(t$1, e$1, r$1) {
	if (e$1.length < 8) throw Error("aes/gcm: invalid nonce length");
	function n$1(t$2, e$2, n$2) {
		const i$2 = yr(Ge, !1, t$2, n$2, r$1);
		for (let t$3 = 0; t$3 < e$2.length; t$3++) i$2[t$3] ^= e$2[t$3];
		return i$2;
	}
	function i$1() {
		const r$2 = rr(t$1), n$2 = je.slice(), i$2 = je.slice();
		if (ur(r$2, !1, i$2, i$2, n$2), 12 === e$1.length) i$2.set(e$1);
else {
			const t$2 = je.slice();
			Qe(Ie(t$2), 8, BigInt(8 * e$1.length), !1);
			const r$3 = Ge.create(n$2).update(e$1).update(t$2);
			r$3.digestInto(i$2), r$3.destroy();
		}
		return {
			xk: r$2,
			authKey: n$2,
			counter: i$2,
			tagMask: ur(r$2, !1, i$2, je)
		};
	}
	return {
		encrypt(t$2) {
			const { xk: e$2, authKey: r$2, counter: s$1, tagMask: a$1 } = i$1(), o$1 = new Uint8Array(t$2.length + 16), c$1 = [
				e$2,
				r$2,
				s$1,
				a$1
			];
			Re(t$2) || c$1.push(t$2 = Te(t$2)), ur(e$2, !1, s$1, t$2, o$1.subarray(0, t$2.length));
			const u$1 = n$1(r$2, a$1, o$1.subarray(0, o$1.length - 16));
			return c$1.push(u$1), o$1.set(u$1, t$2.length), Be(...c$1), o$1;
		},
		decrypt(t$2) {
			const { xk: e$2, authKey: r$2, counter: s$1, tagMask: a$1 } = i$1(), o$1 = [
				e$2,
				r$2,
				a$1,
				s$1
			];
			Re(t$2) || o$1.push(t$2 = Te(t$2));
			const c$1 = t$2.subarray(0, -16), u$1 = t$2.subarray(-16), h$1 = n$1(r$2, a$1, c$1);
			if (o$1.push(h$1), !Ue(h$1, u$1)) throw Error("aes/gcm: invalid ghash tag");
			const f$1 = ur(e$2, !1, s$1, c$1);
			return Be(...o$1), f$1;
		}
	};
});
function pr(t$1) {
	return t$1 instanceof Uint32Array || ArrayBuffer.isView(t$1) && "Uint32Array" === t$1.constructor.name;
}
function dr(t$1, e$1) {
	if (me(e$1, 16), !pr(t$1)) throw Error("_encryptBlock accepts result of expandKeyLE");
	const r$1 = ve(e$1);
	let { s0: n$1, s1: i$1, s2: s$1, s3: a$1 } = ar(t$1, r$1[0], r$1[1], r$1[2], r$1[3]);
	return r$1[0] = n$1, r$1[1] = i$1, r$1[2] = s$1, r$1[3] = a$1, e$1;
}
function Ar(t$1, e$1) {
	if (me(e$1, 16), !pr(t$1)) throw Error("_decryptBlock accepts result of expandKeyLE");
	const r$1 = ve(e$1);
	let { s0: n$1, s1: i$1, s2: s$1, s3: a$1 } = or(t$1, r$1[0], r$1[1], r$1[2], r$1[3]);
	return r$1[0] = n$1, r$1[1] = i$1, r$1[2] = s$1, r$1[3] = a$1, e$1;
}
const wr = {
	encrypt(t$1, e$1) {
		if (e$1.length >= 4294967296) throw Error("plaintext should be less than 4gb");
		const r$1 = rr(t$1);
		if (16 === e$1.length) dr(r$1, e$1);
else {
			const t$2 = ve(e$1);
			let n$1 = t$2[0], i$1 = t$2[1];
			for (let e$2 = 0, s$1 = 1; e$2 < 6; e$2++) for (let e$3 = 2; e$3 < t$2.length; e$3 += 2, s$1++) {
				const { s0: a$1, s1: o$1, s2: c$1, s3: u$1 } = ar(r$1, n$1, i$1, t$2[e$3], t$2[e$3 + 1]);
				n$1 = a$1, i$1 = o$1 ^ We(s$1), t$2[e$3] = c$1, t$2[e$3 + 1] = u$1;
			}
			t$2[0] = n$1, t$2[1] = i$1;
		}
		r$1.fill(0);
	},
	decrypt(t$1, e$1) {
		if (e$1.length - 8 >= 4294967296) throw Error("ciphertext should be less than 4gb");
		const r$1 = nr(t$1), n$1 = e$1.length / 8 - 1;
		if (1 === n$1) Ar(r$1, e$1);
else {
			const t$2 = ve(e$1);
			let i$1 = t$2[0], s$1 = t$2[1];
			for (let e$2 = 0, a$1 = 6 * n$1; e$2 < 6; e$2++) for (let e$3 = 2 * n$1; e$3 >= 1; e$3 -= 2, a$1--) {
				s$1 ^= We(a$1);
				const { s0: n$2, s1: o$1, s2: c$1, s3: u$1 } = or(r$1, i$1, s$1, t$2[e$3], t$2[e$3 + 1]);
				i$1 = n$2, s$1 = o$1, t$2[e$3] = c$1, t$2[e$3 + 1] = u$1;
			}
			t$2[0] = i$1, t$2[1] = s$1;
		}
		r$1.fill(0);
	}
}, mr = /* @__PURE__ */ new Uint8Array(8).fill(166), br = /* @__PURE__ */ Pe({ blockSize: 8 }, (t$1) => ({
	encrypt(e$1) {
		if (!e$1.length || e$1.length % 8 != 0) throw Error("invalid plaintext length");
		if (8 === e$1.length) throw Error("8-byte keys not allowed in AESKW, use AESKWP instead");
		const r$1 = function(...t$2) {
			let e$2 = 0;
			for (let r$3 = 0; r$3 < t$2.length; r$3++) {
				const n$1 = t$2[r$3];
				me(n$1), e$2 += n$1.length;
			}
			const r$2 = new Uint8Array(e$2);
			for (let e$3 = 0, n$1 = 0; e$3 < t$2.length; e$3++) {
				const i$1 = t$2[e$3];
				r$2.set(i$1, n$1), n$1 += i$1.length;
			}
			return r$2;
		}(mr, e$1);
		return wr.encrypt(t$1, r$1), r$1;
	},
	decrypt(e$1) {
		if (e$1.length % 8 != 0 || e$1.length < 24) throw Error("invalid ciphertext length");
		const r$1 = Te(e$1);
		if (wr.decrypt(t$1, r$1), !Ue(r$1.subarray(0, 8), mr)) throw Error("integrity check failed");
		return r$1.subarray(0, 8).fill(0), r$1.subarray(8);
	}
})), kr = {
	expandKeyLE: rr,
	expandKeyDecLE: nr,
	encrypt: ar,
	decrypt: or,
	encryptBlock: dr,
	decryptBlock: Ar,
	ctrCounter: cr,
	ctr32: ur
};
async function Er(t$1) {
	switch (t$1) {
		case R.symmetric.aes128:
		case R.symmetric.aes192:
		case R.symmetric.aes256: throw Error("Not a legacy cipher");
		case R.symmetric.cast5:
		case R.symmetric.blowfish:
		case R.symmetric.twofish:
		case R.symmetric.tripledes: {
			const { legacyCiphers: e$1 } = await Promise.resolve().then(function() {
				return py;
			}), r$1 = R.read(R.symmetric, t$1), n$1 = e$1.get(r$1);
			if (!n$1) throw Error("Unsupported cipher algorithm");
			return n$1;
		}
		default: throw Error("Unsupported cipher algorithm");
	}
}
function vr(t$1) {
	switch (t$1) {
		case R.symmetric.aes128:
		case R.symmetric.aes192:
		case R.symmetric.aes256:
		case R.symmetric.twofish: return 16;
		case R.symmetric.blowfish:
		case R.symmetric.cast5:
		case R.symmetric.tripledes: return 8;
		default: throw Error("Unsupported cipher");
	}
}
function Br(t$1) {
	switch (t$1) {
		case R.symmetric.aes128:
		case R.symmetric.blowfish:
		case R.symmetric.cast5: return 16;
		case R.symmetric.aes192:
		case R.symmetric.tripledes: return 24;
		case R.symmetric.aes256:
		case R.symmetric.twofish: return 32;
		default: throw Error("Unsupported cipher");
	}
}
function Ir(t$1) {
	return {
		keySize: Br(t$1),
		blockSize: vr(t$1)
	};
}
const Sr = F.getWebCrypto();
async function Kr(t$1, e$1, r$1) {
	const { keySize: n$1 } = Ir(t$1);
	if (!F.isAES(t$1) || e$1.length !== n$1) throw Error("Unexpected algorithm or key size");
	try {
		const t$2 = await Sr.importKey("raw", e$1, { name: "AES-KW" }, !1, ["wrapKey"]), n$2 = await Sr.importKey("raw", r$1, {
			name: "HMAC",
			hash: "SHA-256"
		}, !0, ["sign"]), i$1 = await Sr.wrapKey("raw", n$2, t$2, { name: "AES-KW" });
		return new Uint8Array(i$1);
	} catch (t$2) {
		if ("NotSupportedError" !== t$2.name && (24 !== e$1.length || "OperationError" !== t$2.name)) throw t$2;
		F.printDebugError("Browser did not support operation: " + t$2.message);
	}
	return br(e$1).encrypt(r$1);
}
async function Cr(t$1, e$1, r$1) {
	const { keySize: n$1 } = Ir(t$1);
	if (!F.isAES(t$1) || e$1.length !== n$1) throw Error("Unexpected algorithm or key size");
	let i$1;
	try {
		i$1 = await Sr.importKey("raw", e$1, { name: "AES-KW" }, !1, ["unwrapKey"]);
	} catch (t$2) {
		if ("NotSupportedError" !== t$2.name && (24 !== e$1.length || "OperationError" !== t$2.name)) throw t$2;
		return F.printDebugError("Browser did not support operation: " + t$2.message), br(e$1).decrypt(r$1);
	}
	try {
		const t$2 = await Sr.unwrapKey("raw", r$1, i$1, { name: "AES-KW" }, {
			name: "HMAC",
			hash: "SHA-256"
		}, !0, ["sign"]);
		return new Uint8Array(await Sr.exportKey("raw", t$2));
	} catch (t$2) {
		if ("OperationError" === t$2.name) throw Error("Key Data Integrity failed");
		throw t$2;
	}
}
async function Dr(t$1, e$1, r$1, n$1, i$1) {
	const s$1 = F.getWebCrypto(), a$1 = R.read(R.webHash, t$1);
	if (!a$1) throw Error("Hash algo not supported with HKDF");
	const o$1 = await s$1.importKey("raw", e$1, "HKDF", !1, ["deriveBits"]), c$1 = await s$1.deriveBits({
		name: "HKDF",
		hash: a$1,
		salt: r$1,
		info: n$1
	}, o$1, 8 * i$1);
	return new Uint8Array(c$1);
}
const Ur = {
	x25519: F.encodeUTF8("OpenPGP X25519"),
	x448: F.encodeUTF8("OpenPGP X448")
};
async function Pr(t$1) {
	switch (t$1) {
		case R.publicKey.x25519: try {
			const t$2 = F.getWebCrypto(), e$1 = await t$2.generateKey("X25519", !0, ["deriveKey", "deriveBits"]).catch((t$3) => {
				if ("OperationError" === t$3.name) {
					const t$4 = Error("Unexpected key generation issue");
					throw t$4.name = "NotSupportedError", t$4;
				}
				throw t$3;
			}), r$1 = await t$2.exportKey("jwk", e$1.privateKey), n$1 = await t$2.exportKey("jwk", e$1.publicKey);
			if (r$1.x !== n$1.x) {
				const t$3 = Error("Unexpected mismatching public point");
				throw t$3.name = "NotSupportedError", t$3;
			}
			return {
				A: new Uint8Array(G(n$1.x)),
				k: G(r$1.d)
			};
		} catch (t$2) {
			if ("NotSupportedError" !== t$2.name) throw t$2;
			const { default: e$1 } = await Promise.resolve().then(function() {
				return ty;
			}), { secretKey: r$1, publicKey: n$1 } = e$1.box.keyPair();
			return {
				A: n$1,
				k: r$1
			};
		}
		case R.publicKey.x448: {
			const t$2 = await F.getNobleCurve(R.publicKey.x448), { secretKey: e$1, publicKey: r$1 } = t$2.keygen();
			return {
				A: r$1,
				k: e$1
			};
		}
		default: throw Error("Unsupported ECDH algorithm");
	}
}
async function xr(t$1, e$1, r$1) {
	switch (t$1) {
		case R.publicKey.x25519: try {
			const { ephemeralPublicKey: n$1, sharedSecret: i$1 } = await Mr(t$1, e$1), s$1 = await Fr(t$1, n$1, e$1, r$1);
			return F.equalsUint8Array(i$1, s$1);
		} catch (t$2) {
			return !1;
		}
		case R.publicKey.x448: {
			const t$2 = (await F.getNobleCurve(R.publicKey.x448)).getPublicKey(r$1);
			return F.equalsUint8Array(e$1, t$2);
		}
		default: return !1;
	}
}
async function Qr(t$1, e$1, r$1) {
	const { ephemeralPublicKey: n$1, sharedSecret: i$1 } = await Mr(t$1, r$1), s$1 = F.concatUint8Array([
		n$1,
		r$1,
		i$1
	]);
	switch (t$1) {
		case R.publicKey.x25519: {
			const t$2 = R.symmetric.aes128, { keySize: r$2 } = Ir(t$2), i$2 = await Dr(R.hash.sha256, s$1, new Uint8Array(), Ur.x25519, r$2);
			return {
				ephemeralPublicKey: n$1,
				wrappedKey: await Kr(t$2, i$2, e$1)
			};
		}
		case R.publicKey.x448: {
			const t$2 = R.symmetric.aes256, { keySize: r$2 } = Ir(R.symmetric.aes256), i$2 = await Dr(R.hash.sha512, s$1, new Uint8Array(), Ur.x448, r$2);
			return {
				ephemeralPublicKey: n$1,
				wrappedKey: await Kr(t$2, i$2, e$1)
			};
		}
		default: throw Error("Unsupported ECDH algorithm");
	}
}
async function Rr(t$1, e$1, r$1, n$1, i$1) {
	const s$1 = await Fr(t$1, e$1, n$1, i$1), a$1 = F.concatUint8Array([
		e$1,
		n$1,
		s$1
	]);
	switch (t$1) {
		case R.publicKey.x25519: {
			const t$2 = R.symmetric.aes128, { keySize: e$2 } = Ir(t$2);
			return Cr(t$2, await Dr(R.hash.sha256, a$1, new Uint8Array(), Ur.x25519, e$2), r$1);
		}
		case R.publicKey.x448: {
			const t$2 = R.symmetric.aes256, { keySize: e$2 } = Ir(R.symmetric.aes256);
			return Cr(t$2, await Dr(R.hash.sha512, a$1, new Uint8Array(), Ur.x448, e$2), r$1);
		}
		default: throw Error("Unsupported ECDH algorithm");
	}
}
function Tr(t$1) {
	switch (t$1) {
		case R.publicKey.x25519: return 32;
		case R.publicKey.x448: return 56;
		default: throw Error("Unsupported ECDH algorithm");
	}
}
async function Mr(t$1, e$1) {
	switch (t$1) {
		case R.publicKey.x25519: try {
			const r$1 = F.getWebCrypto(), n$1 = await r$1.generateKey("X25519", !0, ["deriveKey", "deriveBits"]).catch((t$2) => {
				if ("OperationError" === t$2.name) {
					const t$3 = Error("Unexpected key generation issue");
					throw t$3.name = "NotSupportedError", t$3;
				}
				throw t$2;
			}), i$1 = await r$1.exportKey("jwk", n$1.publicKey);
			if ((await r$1.exportKey("jwk", n$1.privateKey)).x !== i$1.x) {
				const t$2 = Error("Unexpected mismatching public point");
				throw t$2.name = "NotSupportedError", t$2;
			}
			const s$1 = Lr(t$1, e$1), a$1 = await r$1.importKey("jwk", s$1, "X25519", !1, []), o$1 = await r$1.deriveBits({
				name: "X25519",
				public: a$1
			}, n$1.privateKey, 8 * Tr(t$1));
			return {
				sharedSecret: new Uint8Array(o$1),
				ephemeralPublicKey: new Uint8Array(G(i$1.x))
			};
		} catch (t$2) {
			if ("NotSupportedError" !== t$2.name) throw t$2;
			const { default: r$1 } = await Promise.resolve().then(function() {
				return ty;
			}), { secretKey: n$1, publicKey: i$1 } = r$1.box.keyPair(), s$1 = r$1.scalarMult(n$1, e$1);
			return Nr(s$1), {
				ephemeralPublicKey: i$1,
				sharedSecret: s$1
			};
		}
		case R.publicKey.x448: {
			const t$2 = await F.getNobleCurve(R.publicKey.x448), { secretKey: r$1, publicKey: n$1 } = t$2.keygen(), i$1 = t$2.getSharedSecret(r$1, e$1);
			return Nr(i$1), {
				ephemeralPublicKey: n$1,
				sharedSecret: i$1
			};
		}
		default: throw Error("Unsupported ECDH algorithm");
	}
}
async function Fr(t$1, e$1, r$1, n$1) {
	switch (t$1) {
		case R.publicKey.x25519: try {
			const i$1 = F.getWebCrypto(), s$1 = function(t$2, e$2, r$2) {
				if (t$2 === R.publicKey.x25519) {
					const n$2 = Lr(t$2, e$2);
					return n$2.d = _(r$2), n$2;
				}
				throw Error("Unsupported ECDH algorithm");
			}(t$1, r$1, n$1), a$1 = Lr(t$1, e$1), o$1 = await i$1.importKey("jwk", s$1, "X25519", !1, ["deriveKey", "deriveBits"]), c$1 = await i$1.importKey("jwk", a$1, "X25519", !1, []), u$1 = await i$1.deriveBits({
				name: "X25519",
				public: c$1
			}, o$1, 8 * Tr(t$1));
			return new Uint8Array(u$1);
		} catch (t$2) {
			if ("NotSupportedError" !== t$2.name) throw t$2;
			const { default: r$2 } = await Promise.resolve().then(function() {
				return ty;
			}), i$1 = r$2.scalarMult(n$1, e$1);
			return Nr(i$1), i$1;
		}
		case R.publicKey.x448: {
			const t$2 = (await F.getNobleCurve(R.publicKey.x448)).getSharedSecret(n$1, e$1);
			return Nr(t$2), t$2;
		}
		default: throw Error("Unsupported ECDH algorithm");
	}
}
function Nr(t$1) {
	let e$1 = 0;
	for (let r$1 = 0; r$1 < t$1.length; r$1++) e$1 |= t$1[r$1];
	if (0 === e$1) throw Error("Unexpected low order point");
}
function Lr(t$1, e$1) {
	if (t$1 === R.publicKey.x25519) return {
		kty: "OKP",
		crv: "X25519",
		x: _(e$1),
		ext: !0
	};
	throw Error("Unsupported ECDH algorithm");
}
var Or = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	decrypt: Rr,
	encrypt: Qr,
	generate: Pr,
	generateEphemeralEncryptionMaterial: Mr,
	getPayloadSize: Tr,
	recomputeSharedSecret: Fr,
	validateParams: xr
});
const Hr = F.getWebCrypto(), zr = F.getNodeCrypto(), Gr = {
	[R.curve.nistP256]: "P-256",
	[R.curve.nistP384]: "P-384",
	[R.curve.nistP521]: "P-521"
}, _r = zr ? zr.getCurves() : [], jr = zr ? {
	[R.curve.secp256k1]: _r.includes("secp256k1") ? "secp256k1" : void 0,
	[R.curve.nistP256]: _r.includes("prime256v1") ? "prime256v1" : void 0,
	[R.curve.nistP384]: _r.includes("secp384r1") ? "secp384r1" : void 0,
	[R.curve.nistP521]: _r.includes("secp521r1") ? "secp521r1" : void 0,
	[R.curve.ed25519Legacy]: _r.includes("ED25519") ? "ED25519" : void 0,
	[R.curve.curve25519Legacy]: _r.includes("X25519") ? "X25519" : void 0,
	[R.curve.brainpoolP256r1]: _r.includes("brainpoolP256r1") ? "brainpoolP256r1" : void 0,
	[R.curve.brainpoolP384r1]: _r.includes("brainpoolP384r1") ? "brainpoolP384r1" : void 0,
	[R.curve.brainpoolP512r1]: _r.includes("brainpoolP512r1") ? "brainpoolP512r1" : void 0
} : {}, Vr = {
	[R.curve.nistP256]: {
		oid: [
			6,
			8,
			42,
			134,
			72,
			206,
			61,
			3,
			1,
			7
		],
		keyType: R.publicKey.ecdsa,
		hash: R.hash.sha256,
		cipher: R.symmetric.aes128,
		node: jr[R.curve.nistP256],
		web: Gr[R.curve.nistP256],
		payloadSize: 32,
		sharedSize: 256,
		wireFormatLeadingByte: 4
	},
	[R.curve.nistP384]: {
		oid: [
			6,
			5,
			43,
			129,
			4,
			0,
			34
		],
		keyType: R.publicKey.ecdsa,
		hash: R.hash.sha384,
		cipher: R.symmetric.aes192,
		node: jr[R.curve.nistP384],
		web: Gr[R.curve.nistP384],
		payloadSize: 48,
		sharedSize: 384,
		wireFormatLeadingByte: 4
	},
	[R.curve.nistP521]: {
		oid: [
			6,
			5,
			43,
			129,
			4,
			0,
			35
		],
		keyType: R.publicKey.ecdsa,
		hash: R.hash.sha512,
		cipher: R.symmetric.aes256,
		node: jr[R.curve.nistP521],
		web: Gr[R.curve.nistP521],
		payloadSize: 66,
		sharedSize: 528,
		wireFormatLeadingByte: 4
	},
	[R.curve.secp256k1]: {
		oid: [
			6,
			5,
			43,
			129,
			4,
			0,
			10
		],
		keyType: R.publicKey.ecdsa,
		hash: R.hash.sha256,
		cipher: R.symmetric.aes128,
		node: jr[R.curve.secp256k1],
		payloadSize: 32,
		wireFormatLeadingByte: 4
	},
	[R.curve.ed25519Legacy]: {
		oid: [
			6,
			9,
			43,
			6,
			1,
			4,
			1,
			218,
			71,
			15,
			1
		],
		keyType: R.publicKey.eddsaLegacy,
		hash: R.hash.sha512,
		node: !1,
		payloadSize: 32,
		wireFormatLeadingByte: 64
	},
	[R.curve.curve25519Legacy]: {
		oid: [
			6,
			10,
			43,
			6,
			1,
			4,
			1,
			151,
			85,
			1,
			5,
			1
		],
		keyType: R.publicKey.ecdh,
		hash: R.hash.sha256,
		cipher: R.symmetric.aes128,
		node: !1,
		payloadSize: 32,
		wireFormatLeadingByte: 64
	},
	[R.curve.brainpoolP256r1]: {
		oid: [
			6,
			9,
			43,
			36,
			3,
			3,
			2,
			8,
			1,
			1,
			7
		],
		keyType: R.publicKey.ecdsa,
		hash: R.hash.sha256,
		cipher: R.symmetric.aes128,
		node: jr[R.curve.brainpoolP256r1],
		payloadSize: 32,
		wireFormatLeadingByte: 4
	},
	[R.curve.brainpoolP384r1]: {
		oid: [
			6,
			9,
			43,
			36,
			3,
			3,
			2,
			8,
			1,
			1,
			11
		],
		keyType: R.publicKey.ecdsa,
		hash: R.hash.sha384,
		cipher: R.symmetric.aes192,
		node: jr[R.curve.brainpoolP384r1],
		payloadSize: 48,
		wireFormatLeadingByte: 4
	},
	[R.curve.brainpoolP512r1]: {
		oid: [
			6,
			9,
			43,
			36,
			3,
			3,
			2,
			8,
			1,
			1,
			13
		],
		keyType: R.publicKey.ecdsa,
		hash: R.hash.sha512,
		cipher: R.symmetric.aes256,
		node: jr[R.curve.brainpoolP512r1],
		payloadSize: 64,
		wireFormatLeadingByte: 4
	}
};
var qr = class {
	constructor(t$1) {
		try {
			this.name = t$1 instanceof Wt ? t$1.getName() : R.write(R.curve, t$1);
		} catch (t$2) {
			throw new se("Unknown curve");
		}
		const e$1 = Vr[this.name];
		this.keyType = e$1.keyType, this.oid = e$1.oid, this.hash = e$1.hash, this.cipher = e$1.cipher, this.node = e$1.node, this.web = e$1.web, this.payloadSize = e$1.payloadSize, this.sharedSize = e$1.sharedSize, this.wireFormatLeadingByte = e$1.wireFormatLeadingByte, this.web && F.getWebCrypto() ? this.type = "web" : this.node && F.getNodeCrypto() ? this.type = "node" : this.name === R.curve.curve25519Legacy ? this.type = "curve25519Legacy" : this.name === R.curve.ed25519Legacy && (this.type = "ed25519Legacy");
	}
	async genKeyPair() {
		switch (this.type) {
			case "web": try {
				return await async function(t$1, e$1) {
					const r$1 = await Hr.generateKey({
						name: "ECDSA",
						namedCurve: Gr[t$1]
					}, !0, ["sign", "verify"]), n$1 = await Hr.exportKey("jwk", r$1.privateKey);
					return {
						publicKey: $r(await Hr.exportKey("jwk", r$1.publicKey), e$1),
						privateKey: G(n$1.d)
					};
				}(this.name, this.wireFormatLeadingByte);
			} catch (t$1) {
				return F.printDebugError("Browser did not support generating ec key " + t$1.message), Xr(this.name);
			}
			case "node": return async function(t$1) {
				const e$1 = zr.createECDH(jr[t$1]);
				return await e$1.generateKeys(), {
					publicKey: new Uint8Array(e$1.getPublicKey()),
					privateKey: new Uint8Array(e$1.getPrivateKey())
				};
			}(this.name);
			case "curve25519Legacy": {
				const { k: t$1, A: e$1 } = await Pr(R.publicKey.x25519), r$1 = t$1.slice().reverse();
				r$1[0] = 127 & r$1[0] | 64, r$1[31] &= 248;
				return {
					publicKey: F.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), e$1]),
					privateKey: r$1
				};
			}
			case "ed25519Legacy": {
				const { seed: t$1, A: e$1 } = await ue(R.publicKey.ed25519);
				return {
					publicKey: F.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), e$1]),
					privateKey: t$1
				};
			}
			default: return Xr(this.name);
		}
	}
};
async function Yr(t$1) {
	const e$1 = new qr(t$1), { oid: r$1, hash: n$1, cipher: i$1 } = e$1, s$1 = await e$1.genKeyPair();
	return {
		oid: r$1,
		Q: s$1.publicKey,
		secret: F.leftPad(s$1.privateKey, e$1.payloadSize),
		hash: n$1,
		cipher: i$1
	};
}
function Zr(t$1) {
	return Vr[t$1.getName()].hash;
}
async function Jr(t$1, e$1, r$1, n$1) {
	const i$1 = {
		[R.curve.nistP256]: !0,
		[R.curve.nistP384]: !0,
		[R.curve.nistP521]: !0,
		[R.curve.secp256k1]: !0,
		[R.curve.curve25519Legacy]: t$1 === R.publicKey.ecdh,
		[R.curve.brainpoolP256r1]: !0,
		[R.curve.brainpoolP384r1]: !0,
		[R.curve.brainpoolP512r1]: !0
	}, s$1 = e$1.getName();
	if (!i$1[s$1]) return !1;
	if (s$1 === R.curve.curve25519Legacy) {
		const t$2 = n$1.slice().reverse();
		return !(r$1.length < 1 || 64 !== r$1[0]) && xr(R.publicKey.x25519, r$1.subarray(1), t$2);
	}
	const a$1 = (await F.getNobleCurve(R.publicKey.ecdsa, s$1)).getPublicKey(n$1, !1);
	return !!F.equalsUint8Array(a$1, r$1);
}
function Wr(t$1, e$1) {
	const { payloadSize: r$1, wireFormatLeadingByte: n$1, name: i$1 } = t$1, s$1 = i$1 === R.curve.curve25519Legacy || i$1 === R.curve.ed25519Legacy ? r$1 : 2 * r$1;
	if (e$1[0] !== n$1 || e$1.length !== s$1 + 1) throw Error("Invalid point encoding");
}
async function Xr(t$1) {
	const e$1 = await F.getNobleCurve(R.publicKey.ecdsa, t$1), { secretKey: r$1 } = e$1.keygen();
	return {
		publicKey: e$1.getPublicKey(r$1, !1),
		privateKey: r$1
	};
}
function $r(t$1, e$1) {
	const r$1 = G(t$1.x), n$1 = G(t$1.y), i$1 = new Uint8Array(r$1.length + n$1.length + 1);
	return i$1[0] = e$1, i$1.set(r$1, 1), i$1.set(n$1, r$1.length + 1), i$1;
}
function tn(t$1, e$1, r$1) {
	const n$1 = t$1, i$1 = r$1.slice(1, n$1 + 1), s$1 = r$1.slice(n$1 + 1, 2 * n$1 + 1);
	return {
		kty: "EC",
		crv: e$1,
		x: _(i$1),
		y: _(s$1),
		ext: !0
	};
}
function en(t$1, e$1, r$1, n$1) {
	const i$1 = tn(t$1, e$1, r$1);
	return i$1.d = _(n$1), i$1;
}
const rn = F.getWebCrypto(), nn = F.getNodeCrypto();
async function sn(t$1, e$1, r$1, n$1, i$1, s$1) {
	const a$1 = new qr(t$1);
	if (Wr(a$1, n$1), r$1 && !F.isStream(r$1)) {
		const t$2 = {
			publicKey: n$1,
			privateKey: i$1
		};
		switch (a$1.type) {
			case "web":
				try {
					return await async function(t$3, e$2, r$2, n$2) {
						const i$2 = t$3.payloadSize, s$2 = en(t$3.payloadSize, Gr[t$3.name], n$2.publicKey, n$2.privateKey), a$2 = await rn.importKey("jwk", s$2, {
							name: "ECDSA",
							namedCurve: Gr[t$3.name],
							hash: { name: R.read(R.webHash, t$3.hash) }
						}, !1, ["sign"]), o$2 = new Uint8Array(await rn.sign({
							name: "ECDSA",
							namedCurve: Gr[t$3.name],
							hash: { name: R.read(R.webHash, e$2) }
						}, a$2, r$2));
						return {
							r: o$2.slice(0, i$2),
							s: o$2.slice(i$2, i$2 << 1)
						};
					}(a$1, e$1, r$1, t$2);
				} catch (t$3) {
					if ("nistP521" !== a$1.name && ("DataError" === t$3.name || "OperationError" === t$3.name)) throw t$3;
					F.printDebugError("Browser did not support signing: " + t$3.message);
				}
				break;
			case "node": return async function(t$3, e$2, r$2, n$2) {
				const i$2 = F.nodeRequire("eckey-utils"), s$2 = F.getNodeBuffer(), { privateKey: a$2 } = i$2.generateDer({
					curveName: jr[t$3.name],
					privateKey: s$2.from(n$2)
				}), o$2 = nn.createSign(R.read(R.hash, e$2));
				o$2.write(r$2), o$2.end();
				const c$1 = new Uint8Array(o$2.sign({
					key: a$2,
					format: "der",
					type: "sec1",
					dsaEncoding: "ieee-p1363"
				})), u$1 = t$3.payloadSize;
				return {
					r: c$1.subarray(0, u$1),
					s: c$1.subarray(u$1, u$1 << 1)
				};
			}(a$1, e$1, r$1, i$1);
		}
	}
	const o$1 = (await F.getNobleCurve(R.publicKey.ecdsa, a$1.name)).sign(s$1, i$1, { lowS: !1 });
	return {
		r: ft(o$1.r, "be", a$1.payloadSize),
		s: ft(o$1.s, "be", a$1.payloadSize)
	};
}
async function an(t$1, e$1, r$1, n$1, i$1, s$1) {
	const a$1 = new qr(t$1);
	Wr(a$1, i$1);
	const o$1 = async () => 0 === s$1[0] && on(a$1, r$1, s$1.subarray(1), i$1);
	if (n$1 && !F.isStream(n$1)) switch (a$1.type) {
		case "web":
			try {
				const t$2 = await async function(t$3, e$2, { r: r$2, s: n$2 }, i$2, s$2) {
					const a$2 = tn(t$3.payloadSize, Gr[t$3.name], s$2), o$2 = await rn.importKey("jwk", a$2, {
						name: "ECDSA",
						namedCurve: Gr[t$3.name],
						hash: { name: R.read(R.webHash, t$3.hash) }
					}, !1, ["verify"]), c$1 = F.concatUint8Array([r$2, n$2]).buffer;
					return rn.verify({
						name: "ECDSA",
						namedCurve: Gr[t$3.name],
						hash: { name: R.read(R.webHash, e$2) }
					}, o$2, c$1, i$2);
				}(a$1, e$1, r$1, n$1, i$1);
				return t$2 || o$1();
			} catch (t$2) {
				if ("nistP521" !== a$1.name && ("DataError" === t$2.name || "OperationError" === t$2.name)) throw t$2;
				F.printDebugError("Browser did not support verifying: " + t$2.message);
			}
			break;
		case "node": {
			const t$2 = await async function(t$3, e$2, { r: r$2, s: n$2 }, i$2, s$2) {
				const a$2 = F.nodeRequire("eckey-utils"), o$2 = F.getNodeBuffer(), { publicKey: c$1 } = a$2.generateDer({
					curveName: jr[t$3.name],
					publicKey: o$2.from(s$2)
				}), u$1 = nn.createVerify(R.read(R.hash, e$2));
				u$1.write(i$2), u$1.end();
				const h$1 = F.concatUint8Array([r$2, n$2]);
				try {
					return u$1.verify({
						key: c$1,
						format: "der",
						type: "spki",
						dsaEncoding: "ieee-p1363"
					}, h$1);
				} catch (t$4) {
					return !1;
				}
			}(a$1, e$1, r$1, n$1, i$1);
			return t$2 || o$1();
		}
	}
	return await on(a$1, r$1, s$1, i$1) || o$1();
}
async function on(t$1, e$1, r$1, n$1) {
	return (await F.getNobleCurve(R.publicKey.ecdsa, t$1.name)).verify(F.concatUint8Array([e$1.r, e$1.s]), r$1, n$1, { lowS: !1 });
}
var cn = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	sign: sn,
	validateParams: async function(t$1, e$1, r$1) {
		const n$1 = new qr(t$1);
		if (n$1.keyType !== R.publicKey.ecdsa) return !1;
		switch (n$1.type) {
			case "web":
			case "node": {
				const n$2 = yt(8), i$1 = R.hash.sha256, s$1 = await Qt(i$1, n$2);
				try {
					const a$1 = await sn(t$1, i$1, n$2, e$1, r$1, s$1);
					return await an(t$1, i$1, a$1, n$2, e$1, s$1);
				} catch (t$2) {
					return !1;
				}
			}
			default: return Jr(R.publicKey.ecdsa, t$1, e$1, r$1);
		}
	},
	verify: an
});
async function un(t$1, e$1, r$1, n$1, i$1, s$1) {
	if (Wr(new qr(t$1), n$1), Rt(e$1) < Rt(R.hash.sha256)) throw Error("Hash algorithm too weak for EdDSA.");
	const { RS: a$1 } = await he(R.publicKey.ed25519, e$1, 0, n$1.subarray(1), i$1, s$1);
	return {
		r: a$1.subarray(0, 32),
		s: a$1.subarray(32)
	};
}
async function hn(t$1, e$1, { r: r$1, s: n$1 }, i$1, s$1, a$1) {
	if (Wr(new qr(t$1), s$1), Rt(e$1) < Rt(R.hash.sha256)) throw Error("Hash algorithm too weak for EdDSA.");
	const o$1 = F.concatUint8Array([r$1, n$1]);
	return fe(R.publicKey.ed25519, e$1, { RS: o$1 }, 0, s$1.subarray(1), a$1);
}
async function fn(t$1, e$1, r$1) {
	return t$1.getName() === R.curve.ed25519Legacy && !(e$1.length < 1 || 64 !== e$1[0]) && le(R.publicKey.ed25519, e$1.subarray(1), r$1);
}
var ln = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	sign: un,
	validateParams: fn,
	verify: hn
});
function yn(t$1) {
	const e$1 = t$1.length;
	if (e$1 > 0) {
		const r$1 = t$1[e$1 - 1];
		if (r$1 >= 1) {
			const n$1 = t$1.subarray(e$1 - r$1), i$1 = new Uint8Array(r$1).fill(r$1);
			if (F.equalsUint8Array(n$1, i$1)) return t$1.subarray(0, e$1 - r$1);
		}
	}
	throw Error("Invalid padding");
}
function gn(t$1, e$1, r$1, n$1) {
	return F.concatUint8Array([
		e$1.write(),
		new Uint8Array([t$1]),
		r$1.write(),
		F.stringToUint8Array("Anonymous Sender    "),
		n$1
	]);
}
async function pn(t$1, e$1, r$1, n$1, i$1 = !1, s$1 = !1) {
	let a$1;
	if (i$1) {
		for (a$1 = 0; a$1 < e$1.length && 0 === e$1[a$1]; a$1++);
		e$1 = e$1.subarray(a$1);
	}
	if (s$1) {
		for (a$1 = e$1.length - 1; a$1 >= 0 && 0 === e$1[a$1]; a$1--);
		e$1 = e$1.subarray(0, a$1 + 1);
	}
	return (await Qt(t$1, F.concatUint8Array([
		new Uint8Array([
			0,
			0,
			0,
			1
		]),
		e$1,
		n$1
	]))).subarray(0, r$1);
}
async function dn(t$1, e$1) {
	switch (t$1.type) {
		case "curve25519Legacy": {
			const { sharedSecret: r$1, ephemeralPublicKey: n$1 } = await Mr(R.publicKey.x25519, e$1.subarray(1));
			return {
				publicKey: F.concatUint8Array([new Uint8Array([t$1.wireFormatLeadingByte]), n$1]),
				sharedKey: r$1
			};
		}
		case "web":
			if (t$1.web && F.getWebCrypto()) try {
				return await async function(t$2, e$2) {
					const r$1 = F.getWebCrypto(), n$1 = tn(t$2.payloadSize, t$2.web, e$2);
					let i$1 = r$1.generateKey({
						name: "ECDH",
						namedCurve: t$2.web
					}, !0, ["deriveKey", "deriveBits"]), s$1 = r$1.importKey("jwk", n$1, {
						name: "ECDH",
						namedCurve: t$2.web
					}, !1, []);
					[i$1, s$1] = await Promise.all([i$1, s$1]);
					let a$1 = r$1.deriveBits({
						name: "ECDH",
						namedCurve: t$2.web,
						public: s$1
					}, i$1.privateKey, t$2.sharedSize), o$1 = r$1.exportKey("jwk", i$1.publicKey);
					[a$1, o$1] = await Promise.all([a$1, o$1]);
					const c$1 = new Uint8Array(a$1), u$1 = new Uint8Array($r(o$1, t$2.wireFormatLeadingByte));
					return {
						publicKey: u$1,
						sharedKey: c$1
					};
				}(t$1, e$1);
			} catch (r$1) {
				return F.printDebugError(r$1), kn(t$1, e$1);
			}
			break;
		case "node": return async function(t$2, e$2) {
			const r$1 = F.getNodeCrypto(), n$1 = r$1.createECDH(t$2.node);
			n$1.generateKeys();
			const i$1 = new Uint8Array(n$1.computeSecret(e$2));
			return {
				publicKey: new Uint8Array(n$1.getPublicKey()),
				sharedKey: i$1
			};
		}(t$1, e$1);
		default: return kn(t$1, e$1);
	}
}
async function An(t$1, e$1, r$1, n$1, i$1) {
	const s$1 = function(t$2) {
		const e$2 = 8 - t$2.length % 8, r$2 = new Uint8Array(t$2.length + e$2).fill(e$2);
		return r$2.set(t$2), r$2;
	}(r$1), a$1 = new qr(t$1);
	Wr(a$1, n$1);
	const { publicKey: o$1, sharedKey: c$1 } = await dn(a$1, n$1), u$1 = gn(R.publicKey.ecdh, t$1, e$1, i$1), { keySize: h$1 } = Ir(e$1.cipher), f$1 = await pn(e$1.hash, c$1, h$1, u$1);
	return {
		publicKey: o$1,
		wrappedKey: await Kr(e$1.cipher, f$1, s$1)
	};
}
async function wn(t$1, e$1, r$1, n$1) {
	if (n$1.length !== t$1.payloadSize) {
		const e$2 = new Uint8Array(t$1.payloadSize);
		e$2.set(n$1, t$1.payloadSize - n$1.length), n$1 = e$2;
	}
	switch (t$1.type) {
		case "curve25519Legacy": {
			const t$2 = n$1.slice().reverse();
			return {
				secretKey: t$2,
				sharedKey: await Fr(R.publicKey.x25519, e$1.subarray(1), r$1.subarray(1), t$2)
			};
		}
		case "web":
			if (t$1.web && F.getWebCrypto()) try {
				return await async function(t$2, e$2, r$2, n$2) {
					const i$1 = F.getWebCrypto(), s$1 = en(t$2.payloadSize, t$2.web, r$2, n$2);
					let a$1 = i$1.importKey("jwk", s$1, {
						name: "ECDH",
						namedCurve: t$2.web
					}, !0, ["deriveKey", "deriveBits"]);
					const o$1 = tn(t$2.payloadSize, t$2.web, e$2);
					let c$1 = i$1.importKey("jwk", o$1, {
						name: "ECDH",
						namedCurve: t$2.web
					}, !0, []);
					[a$1, c$1] = await Promise.all([a$1, c$1]);
					let u$1 = i$1.deriveBits({
						name: "ECDH",
						namedCurve: t$2.web,
						public: c$1
					}, a$1, t$2.sharedSize), h$1 = i$1.exportKey("jwk", a$1);
					[u$1, h$1] = await Promise.all([u$1, h$1]);
					const f$1 = new Uint8Array(u$1);
					return {
						secretKey: G(h$1.d),
						sharedKey: f$1
					};
				}(t$1, e$1, r$1, n$1);
			} catch (r$2) {
				return F.printDebugError(r$2), bn(t$1, e$1, n$1);
			}
			break;
		case "node": return async function(t$2, e$2, r$2) {
			const n$2 = F.getNodeCrypto(), i$1 = n$2.createECDH(t$2.node);
			i$1.setPrivateKey(r$2);
			const s$1 = new Uint8Array(i$1.computeSecret(e$2));
			return {
				secretKey: new Uint8Array(i$1.getPrivateKey()),
				sharedKey: s$1
			};
		}(t$1, e$1, n$1);
		default: return bn(t$1, e$1, n$1);
	}
}
async function mn(t$1, e$1, r$1, n$1, i$1, s$1, a$1) {
	const o$1 = new qr(t$1);
	Wr(o$1, i$1), Wr(o$1, r$1);
	const { sharedKey: c$1 } = await wn(o$1, r$1, i$1, s$1), u$1 = gn(R.publicKey.ecdh, t$1, e$1, a$1), { keySize: h$1 } = Ir(e$1.cipher);
	let f$1;
	for (let t$2 = 0; t$2 < 3; t$2++) try {
		const r$2 = await pn(e$1.hash, c$1, h$1, u$1, 1 === t$2, 2 === t$2);
		return yn(await Cr(e$1.cipher, r$2, n$1));
	} catch (t$3) {
		f$1 = t$3;
	}
	throw f$1;
}
async function bn(t$1, e$1, r$1) {
	return {
		secretKey: r$1,
		sharedKey: (await F.getNobleCurve(R.publicKey.ecdh, t$1.name)).getSharedSecret(r$1, e$1).subarray(1)
	};
}
async function kn(t$1, e$1) {
	const r$1 = await F.getNobleCurve(R.publicKey.ecdh, t$1.name), { publicKey: n$1, privateKey: i$1 } = await t$1.genKeyPair();
	return {
		publicKey: n$1,
		sharedKey: r$1.getSharedSecret(i$1, e$1).subarray(1)
	};
}
var En = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	CurveWithOID: qr,
	ecdh: /*#__PURE__*/ Object.freeze({
		__proto__: null,
		decrypt: mn,
		encrypt: An,
		validateParams: async function(t$1, e$1, r$1) {
			return Jr(R.publicKey.ecdh, t$1, e$1, r$1);
		}
	}),
	ecdhX: Or,
	ecdsa: cn,
	eddsa: Ae,
	eddsaLegacy: ln,
	generate: Yr,
	getPreferredHashAlgo: Zr
});
const vn = BigInt(0), Bn = BigInt(1);
var In = class {
	constructor(t$1) {
		t$1 && (this.data = t$1);
	}
	read(t$1) {
		if (t$1.length >= 1) {
			const e$1 = t$1[0];
			if (t$1.length >= 1 + e$1) return this.data = t$1.subarray(1, 1 + e$1), 1 + this.data.length;
		}
		throw Error("Invalid symmetric key");
	}
	write() {
		return F.concatUint8Array([new Uint8Array([this.data.length]), this.data]);
	}
};
var Sn = class {
	constructor(t$1) {
		if (t$1) {
			const { hash: e$1, cipher: r$1 } = t$1;
			this.hash = e$1, this.cipher = r$1;
		} else this.hash = null, this.cipher = null;
	}
	read(t$1) {
		if (t$1.length < 4 || 3 !== t$1[0] || 1 !== t$1[1]) throw new se("Cannot read KDFParams");
		return this.hash = t$1[2], this.cipher = t$1[3], 4;
	}
	write() {
		return new Uint8Array([
			3,
			1,
			this.hash,
			this.cipher
		]);
	}
};
var Kn = class Kn {
	static fromObject({ wrappedKey: t$1, algorithm: e$1 }) {
		const r$1 = new Kn();
		return r$1.wrappedKey = t$1, r$1.algorithm = e$1, r$1;
	}
	read(t$1) {
		let e$1 = 0, r$1 = t$1[e$1++];
		this.algorithm = r$1 % 2 ? t$1[e$1++] : null, r$1 -= r$1 % 2, this.wrappedKey = F.readExactSubarray(t$1, e$1, e$1 + r$1), e$1 += r$1;
	}
	write() {
		return F.concatUint8Array([this.algorithm ? new Uint8Array([this.wrappedKey.length + 1, this.algorithm]) : new Uint8Array([this.wrappedKey.length]), this.wrappedKey]);
	}
};
async function Cn(t$1, e$1, r$1, n$1, i$1) {
	switch (t$1) {
		case R.publicKey.rsaEncrypt:
		case R.publicKey.rsaEncryptSign: {
			const { n: t$2, e: e$2 } = r$1;
			return { c: await _t(n$1, t$2, e$2) };
		}
		case R.publicKey.elgamal: {
			const { p: t$2, g: e$2, y: i$2 } = r$1;
			return async function(t$3, e$3, r$2, n$2) {
				e$3 = rt(e$3), r$2 = rt(r$2), n$2 = rt(n$2);
				const i$3 = rt(Mt(t$3, ht(e$3))), s$1 = gt(Zt, e$3 - Zt);
				return {
					c1: ft(it(r$2, s$1, e$3)),
					c2: ft(nt(it(n$2, s$1, e$3) * i$3, e$3))
				};
			}(n$1, t$2, e$2, i$2);
		}
		case R.publicKey.ecdh: {
			const { oid: t$2, Q: e$2, kdfParams: s$1 } = r$1, { publicKey: a$1, wrappedKey: o$1 } = await An(t$2, s$1, n$1, e$2, i$1);
			return {
				V: a$1,
				C: new In(o$1)
			};
		}
		case R.publicKey.x25519:
		case R.publicKey.x448: {
			if (e$1 && !F.isAES(e$1)) throw Error("X25519 and X448 keys can only encrypt AES session keys");
			const { A: i$2 } = r$1, { ephemeralPublicKey: s$1, wrappedKey: a$1 } = await Qr(t$1, n$1, i$2);
			return {
				ephemeralPublicKey: s$1,
				C: Kn.fromObject({
					algorithm: e$1,
					wrappedKey: a$1
				})
			};
		}
		default: return [];
	}
}
async function Dn(t$1, e$1, r$1, n$1, i$1, s$1) {
	switch (t$1) {
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaEncrypt: {
			const { c: t$2 } = n$1, { n: i$2, e: a$1 } = e$1, { d: o$1, p: c$1, q: u$1, u: h$1 } = r$1;
			return jt(t$2, i$2, a$1, o$1, c$1, u$1, h$1, s$1);
		}
		case R.publicKey.elgamal: {
			const { c1: t$2, c2: i$2 } = n$1;
			return async function(t$3, e$2, r$2, n$2, i$3) {
				return t$3 = rt(t$3), e$2 = rt(e$2), r$2 = rt(r$2), Ft(ft(nt(at(it(t$3, n$2 = rt(n$2), r$2), r$2) * e$2, r$2), "be", ht(r$2)), i$3);
			}(t$2, i$2, e$1.p, r$1.x, s$1);
		}
		case R.publicKey.ecdh: {
			const { oid: t$2, Q: s$2, kdfParams: a$1 } = e$1, { d: o$1 } = r$1, { V: c$1, C: u$1 } = n$1;
			return mn(t$2, a$1, c$1, u$1.data, s$2, o$1, i$1);
		}
		case R.publicKey.x25519:
		case R.publicKey.x448: {
			const { A: i$2 } = e$1, { k: s$2 } = r$1, { ephemeralPublicKey: a$1, C: o$1 } = n$1;
			if (null !== o$1.algorithm && !F.isAES(o$1.algorithm)) throw Error("AES session key expected");
			return Rr(t$1, a$1, o$1.wrappedKey, i$2, s$2);
		}
		default: throw Error("Unknown public key encryption algorithm.");
	}
}
function Un(t$1, e$1, r$1) {
	let n$1 = 0;
	switch (t$1) {
		case R.publicKey.rsaEncrypt:
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaSign: {
			const t$2 = F.readMPI(e$1.subarray(n$1));
			n$1 += t$2.length + 2;
			const r$2 = F.readMPI(e$1.subarray(n$1));
			n$1 += r$2.length + 2;
			const i$1 = F.readMPI(e$1.subarray(n$1));
			n$1 += i$1.length + 2;
			const s$1 = F.readMPI(e$1.subarray(n$1));
			return n$1 += s$1.length + 2, {
				read: n$1,
				privateParams: {
					d: t$2,
					p: r$2,
					q: i$1,
					u: s$1
				}
			};
		}
		case R.publicKey.dsa:
		case R.publicKey.elgamal: {
			const t$2 = F.readMPI(e$1.subarray(n$1));
			return n$1 += t$2.length + 2, {
				read: n$1,
				privateParams: { x: t$2 }
			};
		}
		case R.publicKey.ecdsa:
		case R.publicKey.ecdh: {
			const i$1 = Mn(t$1, r$1.oid);
			let s$1 = F.readMPI(e$1.subarray(n$1));
			return n$1 += s$1.length + 2, s$1 = F.leftPad(s$1, i$1), {
				read: n$1,
				privateParams: { d: s$1 }
			};
		}
		case R.publicKey.eddsaLegacy: {
			const i$1 = Mn(t$1, r$1.oid);
			if (r$1.oid.getName() !== R.curve.ed25519Legacy) throw Error("Unexpected OID for eddsaLegacy");
			let s$1 = F.readMPI(e$1.subarray(n$1));
			return n$1 += s$1.length + 2, s$1 = F.leftPad(s$1, i$1), {
				read: n$1,
				privateParams: { seed: s$1 }
			};
		}
		case R.publicKey.ed25519:
		case R.publicKey.ed448: {
			const r$2 = Mn(t$1), i$1 = F.readExactSubarray(e$1, n$1, n$1 + r$2);
			return n$1 += i$1.length, {
				read: n$1,
				privateParams: { seed: i$1 }
			};
		}
		case R.publicKey.x25519:
		case R.publicKey.x448: {
			const r$2 = Mn(t$1), i$1 = F.readExactSubarray(e$1, n$1, n$1 + r$2);
			return n$1 += i$1.length, {
				read: n$1,
				privateParams: { k: i$1 }
			};
		}
		default: throw new se("Unknown public key encryption algorithm.");
	}
}
function Pn(t$1, e$1) {
	const r$1 = new Set([
		R.publicKey.ed25519,
		R.publicKey.x25519,
		R.publicKey.ed448,
		R.publicKey.x448
	]), n$1 = Object.keys(e$1).map((n$2) => {
		const i$1 = e$1[n$2];
		return F.isUint8Array(i$1) ? r$1.has(t$1) ? i$1 : F.uint8ArrayToMPI(i$1) : i$1.write();
	});
	return F.concatUint8Array(n$1);
}
function xn(t$1, e$1, r$1) {
	switch (t$1) {
		case R.publicKey.rsaEncrypt:
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaSign: return async function(t$2, e$2) {
			if (e$2 = BigInt(e$2), F.getWebCrypto()) {
				const r$3 = {
					name: "RSASSA-PKCS1-v1_5",
					modulusLength: t$2,
					publicExponent: ft(e$2),
					hash: { name: "SHA-1" }
				}, n$2 = await Lt.generateKey(r$3, !0, ["sign", "verify"]);
				return Yt(await Lt.exportKey("jwk", n$2.privateKey), e$2);
			}
			if (F.getNodeCrypto()) {
				const r$3 = {
					modulusLength: t$2,
					publicExponent: ot(e$2),
					publicKeyEncoding: {
						type: "pkcs1",
						format: "jwk"
					},
					privateKeyEncoding: {
						type: "pkcs1",
						format: "jwk"
					}
				}, n$2 = await new Promise((t$3, e$3) => {
					Ot.generateKeyPair("rsa", r$3, (r$4, n$3, i$2) => {
						r$4 ? e$3(r$4) : t$3(i$2);
					});
				});
				return Yt(n$2, e$2);
			}
			let r$2, n$1, i$1;
			do 
				n$1 = dt(t$2 - (t$2 >> 1), e$2, 40), r$2 = dt(t$2 >> 1, e$2, 40), i$1 = r$2 * n$1;
			while (ut(i$1) !== t$2);
			const s$1 = (r$2 - Ht) * (n$1 - Ht);
			return n$1 < r$2 && ([r$2, n$1] = [n$1, r$2]), {
				n: ft(i$1),
				e: ft(e$2),
				d: ft(at(e$2, s$1)),
				p: ft(r$2),
				q: ft(n$1),
				u: ft(at(r$2, n$1))
			};
		}(e$1, 65537).then(({ n: t$2, e: e$2, d: r$2, p: n$1, q: i$1, u: s$1 }) => ({
			privateParams: {
				d: r$2,
				p: n$1,
				q: i$1,
				u: s$1
			},
			publicParams: {
				n: t$2,
				e: e$2
			}
		}));
		case R.publicKey.ecdsa: return Yr(r$1).then(({ oid: t$2, Q: e$2, secret: r$2 }) => ({
			privateParams: { d: r$2 },
			publicParams: {
				oid: new Wt(t$2),
				Q: e$2
			}
		}));
		case R.publicKey.eddsaLegacy: return Yr(r$1).then(({ oid: t$2, Q: e$2, secret: r$2 }) => ({
			privateParams: { seed: r$2 },
			publicParams: {
				oid: new Wt(t$2),
				Q: e$2
			}
		}));
		case R.publicKey.ecdh: return Yr(r$1).then(({ oid: t$2, Q: e$2, secret: r$2, hash: n$1, cipher: i$1 }) => ({
			privateParams: { d: r$2 },
			publicParams: {
				oid: new Wt(t$2),
				Q: e$2,
				kdfParams: new Sn({
					hash: n$1,
					cipher: i$1
				})
			}
		}));
		case R.publicKey.ed25519:
		case R.publicKey.ed448: return ue(t$1).then(({ A: t$2, seed: e$2 }) => ({
			privateParams: { seed: e$2 },
			publicParams: { A: t$2 }
		}));
		case R.publicKey.x25519:
		case R.publicKey.x448: return Pr(t$1).then(({ A: t$2, k: e$2 }) => ({
			privateParams: { k: e$2 },
			publicParams: { A: t$2 }
		}));
		case R.publicKey.dsa:
		case R.publicKey.elgamal: throw Error("Unsupported algorithm for key generation.");
		default: throw Error("Unknown public key algorithm.");
	}
}
async function Qn(t$1, e$1, r$1) {
	if (!e$1 || !r$1) throw Error("Missing key parameters");
	switch (t$1) {
		case R.publicKey.rsaEncrypt:
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaSign: {
			const { n: t$2, e: n$1 } = e$1, { d: i$1, p: s$1, q: a$1, u: o$1 } = r$1;
			return async function(t$3, e$2, r$2, n$2, i$2, s$2) {
				if (t$3 = rt(t$3), (n$2 = rt(n$2)) * (i$2 = rt(i$2)) !== t$3) return !1;
				const a$2 = BigInt(2);
				if (nt(n$2 * (s$2 = rt(s$2)), i$2) !== BigInt(1)) return !1;
				e$2 = rt(e$2), r$2 = rt(r$2);
				const o$2 = gt(a$2, a$2 << BigInt(Math.floor(ut(t$3) / 3))), c$1 = o$2 * r$2 * e$2;
				return !(nt(c$1, n$2 - Ht) !== o$2 || nt(c$1, i$2 - Ht) !== o$2);
			}(t$2, n$1, i$1, s$1, a$1, o$1);
		}
		case R.publicKey.dsa: {
			const { p: t$2, q: n$1, g: i$1, y: s$1 } = e$1, { x: a$1 } = r$1;
			return async function(t$3, e$2, r$2, n$2, i$2) {
				if (t$3 = rt(t$3), e$2 = rt(e$2), r$2 = rt(r$2), n$2 = rt(n$2), r$2 <= Bn || r$2 >= t$3) return !1;
				if (nt(t$3 - Bn, e$2) !== vn) return !1;
				if (it(r$2, e$2, t$3) !== Bn) return !1;
				const s$2 = BigInt(ut(e$2));
				if (s$2 < BigInt(150) || !At(e$2, null, 32)) return !1;
				i$2 = rt(i$2);
				const a$2 = BigInt(2);
				return n$2 === it(r$2, e$2 * gt(a$2 << s$2 - Bn, a$2 << s$2) + i$2, t$3);
			}(t$2, n$1, i$1, s$1, a$1);
		}
		case R.publicKey.elgamal: {
			const { p: t$2, g: n$1, y: i$1 } = e$1, { x: s$1 } = r$1;
			return async function(t$3, e$2, r$2, n$2) {
				if (t$3 = rt(t$3), e$2 = rt(e$2), r$2 = rt(r$2), e$2 <= Zt || e$2 >= t$3) return !1;
				const i$2 = BigInt(ut(t$3));
				if (i$2 < BigInt(1023)) return !1;
				if (it(e$2, t$3 - Zt, t$3) !== Zt) return !1;
				let s$2 = e$2, a$1 = BigInt(1);
				const o$1 = BigInt(2), c$1 = o$1 << BigInt(17);
				for (; a$1 < c$1;) {
					if (s$2 = nt(s$2 * e$2, t$3), s$2 === Zt) return !1;
					a$1++;
				}
				n$2 = rt(n$2);
				const u$1 = gt(o$1 << i$2 - Zt, o$1 << i$2);
				return r$2 === it(e$2, (t$3 - Zt) * u$1 + n$2, t$3);
			}(t$2, n$1, i$1, s$1);
		}
		case R.publicKey.ecdsa:
		case R.publicKey.ecdh: {
			const n$1 = En[R.read(R.publicKey, t$1)], { oid: i$1, Q: s$1 } = e$1, { d: a$1 } = r$1;
			return n$1.validateParams(i$1, s$1, a$1);
		}
		case R.publicKey.eddsaLegacy: {
			const { Q: t$2, oid: n$1 } = e$1, { seed: i$1 } = r$1;
			return fn(n$1, t$2, i$1);
		}
		case R.publicKey.ed25519:
		case R.publicKey.ed448: {
			const { A: n$1 } = e$1, { seed: i$1 } = r$1;
			return le(t$1, n$1, i$1);
		}
		case R.publicKey.x25519:
		case R.publicKey.x448: {
			const { A: n$1 } = e$1, { k: i$1 } = r$1;
			return xr(t$1, n$1, i$1);
		}
		default: throw Error("Unknown public key algorithm.");
	}
}
function Rn(t$1) {
	const { keySize: e$1 } = Ir(t$1);
	return yt(e$1);
}
function Tn(t$1) {
	try {
		t$1.getName();
	} catch (t$2) {
		throw new se("Unknown curve OID");
	}
}
function Mn(t$1, e$1) {
	switch (t$1) {
		case R.publicKey.ecdsa:
		case R.publicKey.ecdh:
		case R.publicKey.eddsaLegacy: return new qr(e$1).payloadSize;
		case R.publicKey.ed25519:
		case R.publicKey.ed448: return ye(t$1);
		case R.publicKey.x25519:
		case R.publicKey.x448: return Tr(t$1);
		default: throw Error("Unknown elliptic algo");
	}
}
const Fn = F.getWebCrypto(), Nn = F.getNodeCrypto(), Ln = Nn ? Nn.getCiphers() : [], On = {
	idea: Ln.includes("idea-cfb") ? "idea-cfb" : void 0,
	tripledes: Ln.includes("des-ede3-cfb") ? "des-ede3-cfb" : void 0,
	cast5: Ln.includes("cast5-cfb") ? "cast5-cfb" : void 0,
	blowfish: Ln.includes("bf-cfb") ? "bf-cfb" : void 0,
	aes128: Ln.includes("aes-128-cfb") ? "aes-128-cfb" : void 0,
	aes192: Ln.includes("aes-192-cfb") ? "aes-192-cfb" : void 0,
	aes256: Ln.includes("aes-256-cfb") ? "aes-256-cfb" : void 0
};
async function Hn(t$1) {
	const { blockSize: e$1 } = Ir(t$1), r$1 = await yt(e$1), n$1 = new Uint8Array([r$1[r$1.length - 2], r$1[r$1.length - 1]]);
	return F.concat([r$1, n$1]);
}
async function zn(t$1, e$1, r$1, n$1, i$1) {
	const s$1 = R.read(R.symmetric, t$1);
	if (F.getNodeCrypto() && On[s$1]) return function(t$2, e$2, r$2, n$2) {
		const i$2 = R.read(R.symmetric, t$2), s$2 = new Nn.createCipheriv(On[i$2], e$2, n$2);
		return k(r$2, (t$3) => new Uint8Array(s$2.update(t$3)));
	}(t$1, e$1, r$1, n$1);
	if (F.isAES(t$1)) return async function(t$2, e$2, r$2, n$2) {
		if (Fn && await _n.isSupported(t$2)) {
			const i$2 = new _n(t$2, e$2, n$2);
			return F.isStream(r$2) ? k(r$2, (t$3) => i$2.encryptChunk(t$3), () => i$2.finish()) : i$2.encrypt(r$2);
		}
		if (F.isStream(r$2)) {
			const i$2 = new jn(!0, t$2, e$2, n$2);
			return k(r$2, (t$3) => i$2.processChunk(t$3), () => i$2.finish());
		}
		return lr(e$2, n$2).encrypt(r$2);
	}(t$1, e$1, r$1, n$1);
	const a$1 = new (await (Er(t$1)))(e$1), o$1 = a$1.blockSize, c$1 = n$1.slice();
	let u$1 = new Uint8Array();
	const h$1 = (t$2) => {
		t$2 && (u$1 = F.concatUint8Array([u$1, t$2]));
		const e$2 = new Uint8Array(u$1.length);
		let r$2, n$2 = 0;
		for (; t$2 ? u$1.length >= o$1 : u$1.length;) {
			const t$3 = a$1.encrypt(c$1);
			for (r$2 = 0; r$2 < o$1; r$2++) c$1[r$2] = u$1[r$2] ^ t$3[r$2], e$2[n$2++] = c$1[r$2];
			u$1 = u$1.subarray(o$1);
		}
		return e$2.subarray(0, n$2);
	};
	return k(r$1, h$1, h$1);
}
async function Gn(t$1, e$1, r$1, n$1) {
	const i$1 = R.read(R.symmetric, t$1);
	if (Nn && On[i$1]) return function(t$2, e$2, r$2, n$2) {
		const i$2 = R.read(R.symmetric, t$2), s$2 = new Nn.createDecipheriv(On[i$2], e$2, n$2);
		return k(r$2, (t$3) => new Uint8Array(s$2.update(t$3)));
	}(t$1, e$1, r$1, n$1);
	if (F.isAES(t$1)) return async function(t$2, e$2, r$2, n$2) {
		if (F.isStream(r$2)) {
			const i$2 = new jn(!1, t$2, e$2, n$2);
			return k(r$2, (t$3) => i$2.processChunk(t$3), () => i$2.finish());
		}
		return lr(e$2, n$2).decrypt(r$2);
	}(t$1, e$1, r$1, n$1);
	const s$1 = new (await (Er(t$1)))(e$1), a$1 = s$1.blockSize;
	let o$1 = n$1, c$1 = new Uint8Array();
	const u$1 = (t$2) => {
		t$2 && (c$1 = F.concatUint8Array([c$1, t$2]));
		const e$2 = new Uint8Array(c$1.length);
		let r$2, n$2 = 0;
		for (; t$2 ? c$1.length >= a$1 : c$1.length;) {
			const t$3 = s$1.encrypt(o$1);
			for (o$1 = c$1.subarray(0, a$1), r$2 = 0; r$2 < a$1; r$2++) e$2[n$2++] = o$1[r$2] ^ t$3[r$2];
			c$1 = c$1.subarray(a$1);
		}
		return e$2.subarray(0, n$2);
	};
	return k(r$1, u$1, u$1);
}
var _n = class {
	constructor(t$1, e$1, r$1) {
		const { blockSize: n$1 } = Ir(t$1);
		this.key = e$1, this.prevBlock = r$1, this.nextBlock = new Uint8Array(n$1), this.i = 0, this.blockSize = n$1, this.zeroBlock = new Uint8Array(this.blockSize);
	}
	static async isSupported(t$1) {
		const { keySize: e$1 } = Ir(t$1);
		return Fn.importKey("raw", new Uint8Array(e$1), "aes-cbc", !1, ["encrypt"]).then(() => !0, () => !1);
	}
	async _runCBC(t$1, e$1) {
		const r$1 = "AES-CBC";
		this.keyRef = this.keyRef || await Fn.importKey("raw", this.key, r$1, !1, ["encrypt"]);
		const n$1 = await Fn.encrypt({
			name: r$1,
			iv: e$1 || this.zeroBlock
		}, this.keyRef, t$1);
		return new Uint8Array(n$1).subarray(0, t$1.length);
	}
	async encryptChunk(t$1) {
		const e$1 = this.nextBlock.length - this.i, r$1 = t$1.subarray(0, e$1);
		if (this.nextBlock.set(r$1, this.i), this.i + t$1.length >= 2 * this.blockSize) {
			const r$2 = (t$1.length - e$1) % this.blockSize, n$2 = F.concatUint8Array([this.nextBlock, t$1.subarray(e$1, t$1.length - r$2)]), i$1 = F.concatUint8Array([this.prevBlock, n$2.subarray(0, n$2.length - this.blockSize)]), s$1 = await this._runCBC(i$1);
			return Vn(s$1, n$2), this.prevBlock = s$1.slice(-this.blockSize), r$2 > 0 && this.nextBlock.set(t$1.subarray(-r$2)), this.i = r$2, s$1;
		}
		let n$1;
		if (this.i += r$1.length, this.i === this.nextBlock.length) {
			const e$2 = this.nextBlock;
			n$1 = await this._runCBC(this.prevBlock), Vn(n$1, e$2), this.prevBlock = n$1.slice(), this.i = 0;
			const i$1 = t$1.subarray(r$1.length);
			this.nextBlock.set(i$1, this.i), this.i += i$1.length;
		} else n$1 = new Uint8Array();
		return n$1;
	}
	async finish() {
		let t$1;
		if (0 === this.i) t$1 = new Uint8Array();
else {
			this.nextBlock = this.nextBlock.subarray(0, this.i);
			const e$1 = this.nextBlock, r$1 = await this._runCBC(this.prevBlock);
			Vn(r$1, e$1), t$1 = r$1.subarray(0, e$1.length);
		}
		return this.clearSensitiveData(), t$1;
	}
	clearSensitiveData() {
		this.nextBlock.fill(0), this.prevBlock.fill(0), this.keyRef = null, this.key = null;
	}
	async encrypt(t$1) {
		const e$1 = (await this._runCBC(F.concatUint8Array([new Uint8Array(this.blockSize), t$1]), this.iv)).subarray(0, t$1.length);
		return Vn(e$1, t$1), this.clearSensitiveData(), e$1;
	}
};
var jn = class {
	constructor(t$1, e$1, r$1, n$1) {
		this.forEncryption = t$1;
		const { blockSize: i$1 } = Ir(e$1);
		this.key = kr.expandKeyLE(r$1), n$1.byteOffset % 4 != 0 && (n$1 = n$1.slice()), this.prevBlock = qn(n$1), this.nextBlock = new Uint8Array(i$1), this.i = 0, this.blockSize = i$1;
	}
	_runCFB(t$1) {
		const e$1 = qn(t$1), r$1 = new Uint8Array(t$1.length), n$1 = qn(r$1);
		for (let t$2 = 0; t$2 + 4 <= n$1.length; t$2 += 4) {
			const { s0: r$2, s1: i$1, s2: s$1, s3: a$1 } = kr.encrypt(this.key, this.prevBlock[0], this.prevBlock[1], this.prevBlock[2], this.prevBlock[3]);
			n$1[t$2 + 0] = e$1[t$2 + 0] ^ r$2, n$1[t$2 + 1] = e$1[t$2 + 1] ^ i$1, n$1[t$2 + 2] = e$1[t$2 + 2] ^ s$1, n$1[t$2 + 3] = e$1[t$2 + 3] ^ a$1, this.prevBlock = (this.forEncryption ? n$1 : e$1).slice(t$2, t$2 + 4);
		}
		return r$1;
	}
	async processChunk(t$1) {
		const e$1 = this.nextBlock.length - this.i, r$1 = t$1.subarray(0, e$1);
		if (this.nextBlock.set(r$1, this.i), this.i + t$1.length >= 2 * this.blockSize) {
			const r$2 = (t$1.length - e$1) % this.blockSize, n$2 = F.concatUint8Array([this.nextBlock, t$1.subarray(e$1, t$1.length - r$2)]), i$1 = this._runCFB(n$2);
			return r$2 > 0 && this.nextBlock.set(t$1.subarray(-r$2)), this.i = r$2, i$1;
		}
		let n$1;
		if (this.i += r$1.length, this.i === this.nextBlock.length) {
			n$1 = this._runCFB(this.nextBlock), this.i = 0;
			const e$2 = t$1.subarray(r$1.length);
			this.nextBlock.set(e$2, this.i), this.i += e$2.length;
		} else n$1 = new Uint8Array();
		return n$1;
	}
	async finish() {
		let t$1;
		if (0 === this.i) t$1 = new Uint8Array();
else t$1 = this._runCFB(this.nextBlock).subarray(0, this.i);
		return this.clearSensitiveData(), t$1;
	}
	clearSensitiveData() {
		this.nextBlock.fill(0), this.prevBlock.fill(0), this.key.fill(0);
	}
};
function Vn(t$1, e$1) {
	const r$1 = Math.min(t$1.length, e$1.length);
	for (let n$1 = 0; n$1 < r$1; n$1++) t$1[n$1] = t$1[n$1] ^ e$1[n$1];
}
const qn = (t$1) => new Uint32Array(t$1.buffer, t$1.byteOffset, Math.floor(t$1.byteLength / 4));
const Yn = F.getWebCrypto(), Zn = F.getNodeCrypto(), Jn = 16;
function Wn(t$1, e$1) {
	const r$1 = t$1.length - Jn;
	for (let n$1 = 0; n$1 < Jn; n$1++) t$1[n$1 + r$1] ^= e$1[n$1];
	return t$1;
}
const Xn = new Uint8Array(Jn);
async function $n(t$1) {
	const e$1 = await ti(t$1), r$1 = F.double(await e$1(Xn)), n$1 = F.double(r$1);
	return async function(t$2) {
		return (await e$1(function(t$3, e$2, r$2) {
			if (t$3.length && t$3.length % Jn == 0) return Wn(t$3, e$2);
			const n$2 = new Uint8Array(t$3.length + (Jn - t$3.length % Jn));
			return n$2.set(t$3), n$2[t$3.length] = 128, Wn(n$2, r$2);
		}(t$2, r$1, n$1))).subarray(-16);
	};
}
async function ti(t$1) {
	if (F.getNodeCrypto()) return async function(e$1) {
		const r$1 = new Zn.createCipheriv("aes-" + 8 * t$1.length + "-cbc", t$1, Xn).update(e$1);
		return new Uint8Array(r$1);
	};
	if (F.getWebCrypto()) try {
		return t$1 = await Yn.importKey("raw", t$1, {
			name: "AES-CBC",
			length: 8 * t$1.length
		}, !1, ["encrypt"]), async function(e$1) {
			const r$1 = await Yn.encrypt({
				name: "AES-CBC",
				iv: Xn,
				length: 128
			}, t$1, e$1);
			return new Uint8Array(r$1).subarray(0, r$1.byteLength - Jn);
		};
	} catch (e$1) {
		if ("NotSupportedError" !== e$1.name && (24 !== t$1.length || "OperationError" !== e$1.name)) throw e$1;
		F.printDebugError("Browser did not support operation: " + e$1.message);
	}
	return async function(e$1) {
		return fr(t$1, Xn, { disablePadding: !0 }).encrypt(e$1);
	};
}
const ei = F.getWebCrypto(), ri = F.getNodeCrypto(), ni = F.getNodeBuffer(), ii = 16, si = ii, ai = new Uint8Array(ii), oi = new Uint8Array(ii);
oi[15] = 1;
const ci = new Uint8Array(ii);
async function ui(t$1) {
	const e$1 = await $n(t$1);
	return function(t$2, r$1) {
		return e$1(F.concatUint8Array([t$2, r$1]));
	};
}
async function hi(t$1) {
	if (F.getNodeCrypto()) return async function(e$1, r$1) {
		const n$1 = new ri.createCipheriv("aes-" + 8 * t$1.length + "-ctr", t$1, r$1), i$1 = ni.concat([n$1.update(e$1), n$1.final()]);
		return new Uint8Array(i$1);
	};
	if (F.getWebCrypto()) try {
		const e$1 = await ei.importKey("raw", t$1, {
			name: "AES-CTR",
			length: 8 * t$1.length
		}, !1, ["encrypt"]);
		return async function(t$2, r$1) {
			const n$1 = await ei.encrypt({
				name: "AES-CTR",
				counter: r$1,
				length: 128
			}, e$1, t$2);
			return new Uint8Array(n$1);
		};
	} catch (e$1) {
		if ("NotSupportedError" !== e$1.name && (24 !== t$1.length || "OperationError" !== e$1.name)) throw e$1;
		F.printDebugError("Browser did not support operation: " + e$1.message);
	}
	return async function(e$1, r$1) {
		return hr(t$1, r$1).encrypt(e$1);
	};
}
async function fi(t$1, e$1) {
	if (t$1 !== R.symmetric.aes128 && t$1 !== R.symmetric.aes192 && t$1 !== R.symmetric.aes256) throw Error("EAX mode supports only AES cipher");
	const [r$1, n$1] = await Promise.all([ui(e$1), hi(e$1)]);
	return {
		encrypt: async function(t$2, e$2, i$1) {
			const [s$1, a$1] = await Promise.all([r$1(ai, e$2), r$1(oi, i$1)]), o$1 = await n$1(t$2, s$1), c$1 = await r$1(ci, o$1);
			for (let t$3 = 0; t$3 < si; t$3++) c$1[t$3] ^= a$1[t$3] ^ s$1[t$3];
			return F.concatUint8Array([o$1, c$1]);
		},
		decrypt: async function(t$2, e$2, i$1) {
			if (t$2.length < si) throw Error("Invalid EAX ciphertext");
			const s$1 = t$2.subarray(0, -16), a$1 = t$2.subarray(-16), [o$1, c$1, u$1] = await Promise.all([
				r$1(ai, e$2),
				r$1(oi, i$1),
				r$1(ci, s$1)
			]), h$1 = u$1;
			for (let t$3 = 0; t$3 < si; t$3++) h$1[t$3] ^= c$1[t$3] ^ o$1[t$3];
			if (!F.equalsUint8Array(a$1, h$1)) throw Error("Authentication tag mismatch");
			return await n$1(s$1, o$1);
		}
	};
}
ci[15] = 2, fi.getNonce = function(t$1, e$1) {
	const r$1 = t$1.slice();
	for (let t$2 = 0; t$2 < e$1.length; t$2++) r$1[8 + t$2] ^= e$1[t$2];
	return r$1;
}, fi.blockLength = ii, fi.ivLength = 16, fi.tagLength = si;
const li = 16, yi = 16;
function gi(t$1) {
	let e$1 = 0;
	for (let r$1 = 1; !(t$1 & r$1); r$1 <<= 1) e$1++;
	return e$1;
}
function pi(t$1, e$1) {
	for (let r$1 = 0; r$1 < t$1.length; r$1++) t$1[r$1] ^= e$1[r$1];
	return t$1;
}
function di(t$1, e$1) {
	return pi(t$1.slice(), e$1);
}
const Ai = new Uint8Array(li), wi = new Uint8Array([1]);
async function mi(t$1, e$1) {
	const { keySize: r$1 } = Ir(t$1);
	if (!F.isAES(t$1) || e$1.length !== r$1) throw Error("Unexpected algorithm or key size");
	let n$1 = 0;
	const i$1 = (t$2) => fr(e$1, Ai, { disablePadding: !0 }).encrypt(t$2), s$1 = (t$2) => fr(e$1, Ai, { disablePadding: !0 }).decrypt(t$2);
	let a$1;
	function o$1(t$2, e$2, r$2, s$2) {
		const o$2 = e$2.length / li | 0;
		!function(t$3, e$3) {
			const r$3 = F.nbits(Math.max(t$3.length, e$3.length) / li | 0) - 1;
			for (let t$4 = n$1 + 1; t$4 <= r$3; t$4++) a$1[t$4] = F.double(a$1[t$4 - 1]);
			n$1 = r$3;
		}(e$2, s$2);
		const c$1 = F.concatUint8Array([
			Ai.subarray(0, 15 - r$2.length),
			wi,
			r$2
		]), u$1 = 63 & c$1[15];
		c$1[15] &= 192;
		const h$1 = i$1(c$1), f$1 = F.concatUint8Array([h$1, di(h$1.subarray(0, 8), h$1.subarray(1, 9))]), l$1 = F.shiftRight(f$1.subarray(0 + (u$1 >> 3), 17 + (u$1 >> 3)), 8 - (7 & u$1)).subarray(1), y$1 = new Uint8Array(li), g$1 = new Uint8Array(e$2.length + yi);
		let p$1, d$1 = 0;
		for (p$1 = 0; p$1 < o$2; p$1++) pi(l$1, a$1[gi(p$1 + 1)]), g$1.set(pi(t$2(di(l$1, e$2)), l$1), d$1), pi(y$1, t$2 === i$1 ? e$2 : g$1.subarray(d$1)), e$2 = e$2.subarray(li), d$1 += li;
		if (e$2.length) {
			pi(l$1, a$1.x);
			const r$3 = i$1(l$1);
			g$1.set(di(e$2, r$3), d$1);
			const n$2 = new Uint8Array(li);
			n$2.set(t$2 === i$1 ? e$2 : g$1.subarray(d$1, -16), 0), n$2[e$2.length] = 128, pi(y$1, n$2), d$1 += e$2.length;
		}
		const A$1 = pi(i$1(pi(pi(y$1, l$1), a$1.$)), function(t$3) {
			if (!t$3.length) return Ai;
			const e$3 = t$3.length / li | 0, r$3 = new Uint8Array(li), n$2 = new Uint8Array(li);
			for (let s$3 = 0; s$3 < e$3; s$3++) pi(r$3, a$1[gi(s$3 + 1)]), pi(n$2, i$1(di(r$3, t$3))), t$3 = t$3.subarray(li);
			if (t$3.length) {
				pi(r$3, a$1.x);
				const e$4 = new Uint8Array(li);
				e$4.set(t$3, 0), e$4[t$3.length] = 128, pi(e$4, r$3), pi(n$2, i$1(e$4));
			}
			return n$2;
		}(s$2));
		return g$1.set(A$1, d$1), g$1;
	}
	return function() {
		const t$2 = i$1(Ai), e$2 = F.double(t$2);
		a$1 = [], a$1[0] = F.double(e$2), a$1.x = t$2, a$1.$ = e$2;
	}(), {
		encrypt: async function(t$2, e$2, r$2) {
			return o$1(i$1, t$2, e$2, r$2);
		},
		decrypt: async function(t$2, e$2, r$2) {
			if (t$2.length < yi) throw Error("Invalid OCB ciphertext");
			const n$2 = t$2.subarray(-16);
			t$2 = t$2.subarray(0, -16);
			const i$2 = o$1(s$1, t$2, e$2, r$2);
			if (F.equalsUint8Array(n$2, i$2.subarray(-16))) return i$2.subarray(0, -16);
			throw Error("Authentication tag mismatch");
		}
	};
}
mi.getNonce = function(t$1, e$1) {
	const r$1 = t$1.slice();
	for (let t$2 = 0; t$2 < e$1.length; t$2++) r$1[7 + t$2] ^= e$1[t$2];
	return r$1;
}, mi.blockLength = li, mi.ivLength = 15, mi.tagLength = yi;
const bi = F.getWebCrypto(), ki = F.getNodeCrypto(), Ei = F.getNodeBuffer(), vi = 16, Bi = "AES-GCM";
async function Ii(t$1, e$1) {
	if (t$1 !== R.symmetric.aes128 && t$1 !== R.symmetric.aes192 && t$1 !== R.symmetric.aes256) throw Error("GCM mode supports only AES cipher");
	if (F.getNodeCrypto()) return {
		encrypt: async function(t$2, r$1, n$1 = new Uint8Array()) {
			const i$1 = new ki.createCipheriv("aes-" + 8 * e$1.length + "-gcm", e$1, r$1);
			i$1.setAAD(n$1);
			const s$1 = Ei.concat([
				i$1.update(t$2),
				i$1.final(),
				i$1.getAuthTag()
			]);
			return new Uint8Array(s$1);
		},
		decrypt: async function(t$2, r$1, n$1 = new Uint8Array()) {
			const i$1 = new ki.createDecipheriv("aes-" + 8 * e$1.length + "-gcm", e$1, r$1);
			i$1.setAAD(n$1), i$1.setAuthTag(t$2.slice(t$2.length - vi, t$2.length));
			const s$1 = Ei.concat([i$1.update(t$2.slice(0, t$2.length - vi)), i$1.final()]);
			return new Uint8Array(s$1);
		}
	};
	if (F.getWebCrypto()) try {
		const t$2 = await bi.importKey("raw", e$1, { name: Bi }, !1, ["encrypt", "decrypt"]), r$1 = navigator.userAgent.match(/Version\/13\.\d(\.\d)* Safari/) || navigator.userAgent.match(/Version\/(13|14)\.\d(\.\d)* Mobile\/\S* Safari/);
		return {
			encrypt: async function(n$1, i$1, s$1 = new Uint8Array()) {
				if (r$1 && !n$1.length) return gr(e$1, i$1, s$1).encrypt(n$1);
				const a$1 = await bi.encrypt({
					name: Bi,
					iv: i$1,
					additionalData: s$1,
					tagLength: 128
				}, t$2, n$1);
				return new Uint8Array(a$1);
			},
			decrypt: async function(n$1, i$1, s$1 = new Uint8Array()) {
				if (r$1 && n$1.length === vi) return gr(e$1, i$1, s$1).decrypt(n$1);
				try {
					const e$2 = await bi.decrypt({
						name: Bi,
						iv: i$1,
						additionalData: s$1,
						tagLength: 128
					}, t$2, n$1);
					return new Uint8Array(e$2);
				} catch (t$3) {
					if ("OperationError" === t$3.name) throw Error("Authentication tag mismatch");
				}
			}
		};
	} catch (t$2) {
		if ("NotSupportedError" !== t$2.name && (24 !== e$1.length || "OperationError" !== t$2.name)) throw t$2;
		F.printDebugError("Browser did not support operation: " + t$2.message);
	}
	return {
		encrypt: async function(t$2, r$1, n$1) {
			return gr(e$1, r$1, n$1).encrypt(t$2);
		},
		decrypt: async function(t$2, r$1, n$1) {
			return gr(e$1, r$1, n$1).decrypt(t$2);
		}
	};
}
function Si(t$1, e$1 = !1) {
	switch (t$1) {
		case R.aead.eax: return fi;
		case R.aead.ocb: return mi;
		case R.aead.gcm: return Ii;
		case R.aead.experimentalGCM:
			if (!e$1) throw Error("Unexpected non-standard `experimentalGCM` AEAD algorithm provided in `config.preferredAEADAlgorithm`: use `gcm` instead");
			return Ii;
		default: throw Error("Unsupported AEAD mode");
	}
}
async function Ki(t$1, e$1, r$1, n$1, i$1, s$1) {
	switch (t$1) {
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaEncrypt:
		case R.publicKey.rsaSign: {
			const { n: t$2, e: a$1 } = n$1;
			return Gt(e$1, i$1, F.leftPad(r$1.s, t$2.length), t$2, a$1, s$1);
		}
		case R.publicKey.dsa: {
			const { g: t$2, p: e$2, q: i$2, y: a$1 } = n$1, { r: o$1, s: c$1 } = r$1;
			return async function(t$3, e$3, r$2, n$2, i$3, s$2, a$2, o$2) {
				if (e$3 = rt(e$3), r$2 = rt(r$2), s$2 = rt(s$2), a$2 = rt(a$2), i$3 = rt(i$3), o$2 = rt(o$2), e$3 <= vn || e$3 >= a$2 || r$2 <= vn || r$2 >= a$2) return F.printDebug("invalid DSA Signature"), !1;
				const c$2 = nt(rt(n$2.subarray(0, ht(a$2))), a$2), u$1 = at(r$2, a$2);
				if (u$1 === vn) return F.printDebug("invalid DSA Signature"), !1;
				i$3 = nt(i$3, s$2), o$2 = nt(o$2, s$2);
				const h$1 = nt(c$2 * u$1, a$2), f$1 = nt(e$3 * u$1, a$2);
				return nt(nt(it(i$3, h$1, s$2) * it(o$2, f$1, s$2), s$2), a$2) === e$3;
			}(0, o$1, c$1, s$1, t$2, e$2, i$2, a$1);
		}
		case R.publicKey.ecdsa: {
			const { oid: t$2, Q: a$1 } = n$1, o$1 = new qr(t$2).payloadSize;
			return an(t$2, e$1, {
				r: F.leftPad(r$1.r, o$1),
				s: F.leftPad(r$1.s, o$1)
			}, i$1, a$1, s$1);
		}
		case R.publicKey.eddsaLegacy: {
			const { oid: t$2, Q: i$2 } = n$1, a$1 = new qr(t$2).payloadSize;
			return hn(t$2, e$1, {
				r: F.leftPad(r$1.r, a$1),
				s: F.leftPad(r$1.s, a$1)
			}, 0, i$2, s$1);
		}
		case R.publicKey.ed25519:
		case R.publicKey.ed448: {
			const { A: i$2 } = n$1;
			return fe(t$1, e$1, r$1, 0, i$2, s$1);
		}
		default: throw Error("Unknown signature algorithm.");
	}
}
async function Ci(t$1, e$1, r$1, n$1, i$1, s$1) {
	if (!r$1 || !n$1) throw Error("Missing key parameters");
	switch (t$1) {
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaEncrypt:
		case R.publicKey.rsaSign: {
			const { n: t$2, e: a$1 } = r$1, { d: o$1, p: c$1, q: u$1, u: h$1 } = n$1;
			return { s: await zt(e$1, i$1, t$2, a$1, o$1, c$1, u$1, h$1, s$1) };
		}
		case R.publicKey.dsa: {
			const { g: t$2, p: e$2, q: i$2 } = r$1, { x: a$1 } = n$1;
			return async function(t$3, e$3, r$2, n$2, i$3, s$2) {
				const a$2 = BigInt(0);
				let o$1, c$1, u$1, h$1;
				n$2 = rt(n$2), i$3 = rt(i$3), r$2 = rt(r$2), s$2 = rt(s$2), r$2 = nt(r$2, n$2), s$2 = nt(s$2, i$3);
				const f$1 = nt(rt(e$3.subarray(0, ht(i$3))), i$3);
				for (;;) {
					if (o$1 = gt(Bn, i$3), c$1 = nt(it(r$2, o$1, n$2), i$3), c$1 === a$2) continue;
					const t$4 = nt(s$2 * c$1, i$3);
					if (h$1 = nt(f$1 + t$4, i$3), u$1 = nt(at(o$1, i$3) * h$1, i$3), u$1 !== a$2) break;
				}
				return {
					r: ft(c$1, "be", ht(n$2)),
					s: ft(u$1, "be", ht(n$2))
				};
			}(0, s$1, t$2, e$2, i$2, a$1);
		}
		case R.publicKey.elgamal: throw Error("Signing with Elgamal is not defined in the OpenPGP standard.");
		case R.publicKey.ecdsa: {
			const { oid: t$2, Q: a$1 } = r$1, { d: o$1 } = n$1;
			return sn(t$2, e$1, i$1, a$1, o$1, s$1);
		}
		case R.publicKey.eddsaLegacy: {
			const { oid: t$2, Q: i$2 } = r$1, { seed: a$1 } = n$1;
			return un(t$2, e$1, 0, i$2, a$1, s$1);
		}
		case R.publicKey.ed25519:
		case R.publicKey.ed448: {
			const { A: i$2 } = r$1, { seed: a$1 } = n$1;
			return he(t$1, e$1, 0, i$2, a$1, s$1);
		}
		default: throw Error("Unknown signature algorithm.");
	}
}
Ii.getNonce = function(t$1, e$1) {
	const r$1 = t$1.slice();
	for (let t$2 = 0; t$2 < e$1.length; t$2++) r$1[4 + t$2] ^= e$1[t$2];
	return r$1;
}, Ii.blockLength = 16, Ii.ivLength = 12, Ii.tagLength = vi;
var Di = class Di extends Error {
	constructor(...t$1) {
		super(...t$1), Error.captureStackTrace && Error.captureStackTrace(this, Di), this.name = "Argon2OutOfMemoryError";
	}
};
let Ui, Pi;
var xi = class {
	constructor(t$1 = T) {
		const { passes: e$1, parallelism: r$1, memoryExponent: n$1 } = t$1.s2kArgon2Params;
		this.type = "argon2", this.salt = null, this.t = e$1, this.p = r$1, this.encodedM = n$1;
	}
	generateSalt() {
		this.salt = yt(16);
	}
	read(t$1) {
		let e$1 = 0;
		return this.salt = t$1.subarray(e$1, e$1 + 16), e$1 += 16, this.t = t$1[e$1++], this.p = t$1[e$1++], this.encodedM = t$1[e$1++], e$1;
	}
	write() {
		const t$1 = [
			new Uint8Array([R.write(R.s2k, this.type)]),
			this.salt,
			new Uint8Array([
				this.t,
				this.p,
				this.encodedM
			])
		];
		return F.concatUint8Array(t$1);
	}
	async produceKey(t$1, e$1) {
		const r$1 = 2 << this.encodedM - 1;
		try {
			Ui = Ui || (await Promise.resolve().then(function() {
				return qy;
			})).default, Pi = Pi || Ui();
			const n$1 = await Pi, i$1 = n$1({
				version: 19,
				type: 2,
				password: F.encodeUTF8(t$1),
				salt: this.salt,
				tagLength: e$1,
				memorySize: r$1,
				parallelism: this.p,
				passes: this.t
			});
			return r$1 > 1048576 && (Pi = Ui(), Pi.catch(() => {})), i$1;
		} catch (t$2) {
			throw t$2.message && (t$2.message.includes("Unable to grow instance memory") || t$2.message.includes("failed to grow memory") || t$2.message.includes("WebAssembly.Memory.grow") || t$2.message.includes("Out of memory")) ? new Di("Could not allocate required memory for Argon2") : t$2;
		}
	}
};
var Qi = class {
	constructor(t$1, e$1 = T) {
		this.algorithm = R.hash.sha256, this.type = R.read(R.s2k, t$1), this.c = e$1.s2kIterationCountByte, this.salt = null;
	}
	generateSalt() {
		switch (this.type) {
			case "salted":
			case "iterated": this.salt = yt(8);
		}
	}
	getCount() {
		return 16 + (15 & this.c) << 6 + (this.c >> 4);
	}
	read(t$1) {
		let e$1 = 0;
		switch (this.algorithm = t$1[e$1++], this.type) {
			case "simple": break;
			case "salted":
				this.salt = t$1.subarray(e$1, e$1 + 8), e$1 += 8;
				break;
			case "iterated":
				this.salt = t$1.subarray(e$1, e$1 + 8), e$1 += 8, this.c = t$1[e$1++];
				break;
			case "gnu":
				if ("GNU" !== F.uint8ArrayToString(t$1.subarray(e$1, e$1 + 3))) throw new se("Unknown s2k type.");
				e$1 += 3;
				if (1001 !== 1e3 + t$1[e$1++]) throw new se("Unknown s2k gnu protection mode.");
				this.type = "gnu-dummy";
				break;
			default: throw new se("Unknown s2k type.");
		}
		return e$1;
	}
	write() {
		if ("gnu-dummy" === this.type) return new Uint8Array([
			101,
			0,
			...F.stringToUint8Array("GNU"),
			1
		]);
		const t$1 = [new Uint8Array([R.write(R.s2k, this.type), this.algorithm])];
		switch (this.type) {
			case "simple": break;
			case "salted":
				t$1.push(this.salt);
				break;
			case "iterated":
				t$1.push(this.salt), t$1.push(new Uint8Array([this.c]));
				break;
			case "gnu": throw Error("GNU s2k type not supported.");
			default: throw Error("Unknown s2k type.");
		}
		return F.concatUint8Array(t$1);
	}
	async produceKey(t$1, e$1) {
		t$1 = F.encodeUTF8(t$1);
		const r$1 = [];
		let n$1 = 0, i$1 = 0;
		for (; n$1 < e$1;) {
			let e$2;
			switch (this.type) {
				case "simple":
					e$2 = F.concatUint8Array([new Uint8Array(i$1), t$1]);
					break;
				case "salted":
					e$2 = F.concatUint8Array([
						new Uint8Array(i$1),
						this.salt,
						t$1
					]);
					break;
				case "iterated": {
					const r$2 = F.concatUint8Array([this.salt, t$1]);
					let n$2 = r$2.length;
					const s$2 = Math.max(this.getCount(), n$2);
					e$2 = new Uint8Array(i$1 + s$2), e$2.set(r$2, i$1);
					for (let t$2 = i$1 + n$2; t$2 < s$2; t$2 += n$2, n$2 *= 2) e$2.copyWithin(t$2, i$1, t$2);
					break;
				}
				case "gnu": throw Error("GNU s2k type not supported.");
				default: throw Error("Unknown s2k type.");
			}
			const s$1 = await Qt(this.algorithm, e$2);
			r$1.push(s$1), n$1 += s$1.length, i$1++;
		}
		return F.concatUint8Array(r$1).subarray(0, e$1);
	}
};
const Ri = new Set([R.s2k.argon2, R.s2k.iterated]);
function Ti(t$1, e$1 = T) {
	switch (t$1) {
		case R.s2k.argon2: return new xi(e$1);
		case R.s2k.iterated:
		case R.s2k.gnu:
		case R.s2k.salted:
		case R.s2k.simple: return new Qi(t$1, e$1);
		default: throw new se("Unsupported S2K type");
	}
}
function Mi(t$1) {
	const { s2kType: e$1 } = t$1;
	if (!Ri.has(e$1)) throw Error("The provided `config.s2kType` value is not allowed");
	return Ti(e$1, t$1);
}
var Fi = Uint8Array, Ni = Uint16Array, Li = Int32Array, Oi = new Fi([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), Hi = new Fi([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), zi = new Fi([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), Gi = function(t$1, e$1) {
	for (var r$1 = new Ni(31), n$1 = 0; n$1 < 31; ++n$1) r$1[n$1] = e$1 += 1 << t$1[n$1 - 1];
	var i$1 = new Li(r$1[30]);
	for (n$1 = 1; n$1 < 30; ++n$1) for (var s$1 = r$1[n$1]; s$1 < r$1[n$1 + 1]; ++s$1) i$1[s$1] = s$1 - r$1[n$1] << 5 | n$1;
	return {
		b: r$1,
		r: i$1
	};
}, _i = Gi(Oi, 2), ji = _i.b, Vi = _i.r;
ji[28] = 258, Vi[258] = 28;
for (var qi = Gi(Hi, 0), Yi = qi.b, Zi = qi.r, Ji = new Ni(32768), Wi = 0; Wi < 32768; ++Wi) {
	var Xi = (43690 & Wi) >> 1 | (21845 & Wi) << 1;
	Xi = (61680 & (Xi = (52428 & Xi) >> 2 | (13107 & Xi) << 2)) >> 4 | (3855 & Xi) << 4, Ji[Wi] = ((65280 & Xi) >> 8 | (255 & Xi) << 8) >> 1;
}
var $i = function(t$1, e$1, r$1) {
	for (var n$1 = t$1.length, i$1 = 0, s$1 = new Ni(e$1); i$1 < n$1; ++i$1) t$1[i$1] && ++s$1[t$1[i$1] - 1];
	var a$1, o$1 = new Ni(e$1);
	for (i$1 = 1; i$1 < e$1; ++i$1) o$1[i$1] = o$1[i$1 - 1] + s$1[i$1 - 1] << 1;
	if (r$1) {
		a$1 = new Ni(1 << e$1);
		var c$1 = 15 - e$1;
		for (i$1 = 0; i$1 < n$1; ++i$1) if (t$1[i$1]) for (var u$1 = i$1 << 4 | t$1[i$1], h$1 = e$1 - t$1[i$1], f$1 = o$1[t$1[i$1] - 1]++ << h$1, l$1 = f$1 | (1 << h$1) - 1; f$1 <= l$1; ++f$1) a$1[Ji[f$1] >> c$1] = u$1;
	} else for (a$1 = new Ni(n$1), i$1 = 0; i$1 < n$1; ++i$1) t$1[i$1] && (a$1[i$1] = Ji[o$1[t$1[i$1] - 1]++] >> 15 - t$1[i$1]);
	return a$1;
}, ts = new Fi(288);
for (Wi = 0; Wi < 144; ++Wi) ts[Wi] = 8;
for (Wi = 144; Wi < 256; ++Wi) ts[Wi] = 9;
for (Wi = 256; Wi < 280; ++Wi) ts[Wi] = 7;
for (Wi = 280; Wi < 288; ++Wi) ts[Wi] = 8;
var es = new Fi(32);
for (Wi = 0; Wi < 32; ++Wi) es[Wi] = 5;
var rs = /*#__PURE__*/ $i(ts, 9, 0), ns = /*#__PURE__*/ $i(ts, 9, 1), is = /*#__PURE__*/ $i(es, 5, 0), ss = /*#__PURE__*/ $i(es, 5, 1), as = function(t$1) {
	for (var e$1 = t$1[0], r$1 = 1; r$1 < t$1.length; ++r$1) t$1[r$1] > e$1 && (e$1 = t$1[r$1]);
	return e$1;
}, os = function(t$1, e$1, r$1) {
	var n$1 = e$1 / 8 | 0;
	return (t$1[n$1] | t$1[n$1 + 1] << 8) >> (7 & e$1) & r$1;
}, cs = function(t$1, e$1) {
	var r$1 = e$1 / 8 | 0;
	return (t$1[r$1] | t$1[r$1 + 1] << 8 | t$1[r$1 + 2] << 16) >> (7 & e$1);
}, us = function(t$1) {
	return (t$1 + 7) / 8 | 0;
}, hs = function(t$1, e$1, r$1) {
	return (null == e$1 || e$1 < 0) && (e$1 = 0), (null == r$1 || r$1 > t$1.length) && (r$1 = t$1.length), new Fi(t$1.subarray(e$1, r$1));
}, fs = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], ls = function(t$1, e$1, r$1) {
	var n$1 = Error(e$1 || fs[t$1]);
	if (n$1.code = t$1, Error.captureStackTrace && Error.captureStackTrace(n$1, ls), !r$1) throw n$1;
	return n$1;
}, ys = function(t$1, e$1, r$1) {
	r$1 <<= 7 & e$1;
	var n$1 = e$1 / 8 | 0;
	t$1[n$1] |= r$1, t$1[n$1 + 1] |= r$1 >> 8;
}, gs = function(t$1, e$1, r$1) {
	r$1 <<= 7 & e$1;
	var n$1 = e$1 / 8 | 0;
	t$1[n$1] |= r$1, t$1[n$1 + 1] |= r$1 >> 8, t$1[n$1 + 2] |= r$1 >> 16;
}, ps = function(t$1, e$1) {
	for (var r$1 = [], n$1 = 0; n$1 < t$1.length; ++n$1) t$1[n$1] && r$1.push({
		s: n$1,
		f: t$1[n$1]
	});
	var i$1 = r$1.length, s$1 = r$1.slice();
	if (!i$1) return {
		t: Es,
		l: 0
	};
	if (1 == i$1) {
		var a$1 = new Fi(r$1[0].s + 1);
		return a$1[r$1[0].s] = 1, {
			t: a$1,
			l: 1
		};
	}
	r$1.sort(function(t$2, e$2) {
		return t$2.f - e$2.f;
	}), r$1.push({
		s: -1,
		f: 25001
	});
	var o$1 = r$1[0], c$1 = r$1[1], u$1 = 0, h$1 = 1, f$1 = 2;
	for (r$1[0] = {
		s: -1,
		f: o$1.f + c$1.f,
		l: o$1,
		r: c$1
	}; h$1 != i$1 - 1;) o$1 = r$1[r$1[u$1].f < r$1[f$1].f ? u$1++ : f$1++], c$1 = r$1[u$1 != h$1 && r$1[u$1].f < r$1[f$1].f ? u$1++ : f$1++], r$1[h$1++] = {
		s: -1,
		f: o$1.f + c$1.f,
		l: o$1,
		r: c$1
	};
	var l$1 = s$1[0].s;
	for (n$1 = 1; n$1 < i$1; ++n$1) s$1[n$1].s > l$1 && (l$1 = s$1[n$1].s);
	var y$1 = new Ni(l$1 + 1), g$1 = ds(r$1[h$1 - 1], y$1, 0);
	if (g$1 > e$1) {
		n$1 = 0;
		var p$1 = 0, d$1 = g$1 - e$1, A$1 = 1 << d$1;
		for (s$1.sort(function(t$2, e$2) {
			return y$1[e$2.s] - y$1[t$2.s] || t$2.f - e$2.f;
		}); n$1 < i$1; ++n$1) {
			var w$1 = s$1[n$1].s;
			if (!(y$1[w$1] > e$1)) break;
			p$1 += A$1 - (1 << g$1 - y$1[w$1]), y$1[w$1] = e$1;
		}
		for (p$1 >>= d$1; p$1 > 0;) {
			var m$1 = s$1[n$1].s;
			y$1[m$1] < e$1 ? p$1 -= 1 << e$1 - y$1[m$1]++ - 1 : ++n$1;
		}
		for (; n$1 >= 0 && p$1; --n$1) {
			var b$1 = s$1[n$1].s;
			y$1[b$1] == e$1 && (--y$1[b$1], ++p$1);
		}
		g$1 = e$1;
	}
	return {
		t: new Fi(y$1),
		l: g$1
	};
}, ds = function(t$1, e$1, r$1) {
	return -1 == t$1.s ? Math.max(ds(t$1.l, e$1, r$1 + 1), ds(t$1.r, e$1, r$1 + 1)) : e$1[t$1.s] = r$1;
}, As = function(t$1) {
	for (var e$1 = t$1.length; e$1 && !t$1[--e$1];);
	for (var r$1 = new Ni(++e$1), n$1 = 0, i$1 = t$1[0], s$1 = 1, a$1 = function(t$2) {
		r$1[n$1++] = t$2;
	}, o$1 = 1; o$1 <= e$1; ++o$1) if (t$1[o$1] == i$1 && o$1 != e$1) ++s$1;
else {
		if (!i$1 && s$1 > 2) {
			for (; s$1 > 138; s$1 -= 138) a$1(32754);
			s$1 > 2 && (a$1(s$1 > 10 ? s$1 - 11 << 5 | 28690 : s$1 - 3 << 5 | 12305), s$1 = 0);
		} else if (s$1 > 3) {
			for (a$1(i$1), --s$1; s$1 > 6; s$1 -= 6) a$1(8304);
			s$1 > 2 && (a$1(s$1 - 3 << 5 | 8208), s$1 = 0);
		}
		for (; s$1--;) a$1(i$1);
		s$1 = 1, i$1 = t$1[o$1];
	}
	return {
		c: r$1.subarray(0, n$1),
		n: e$1
	};
}, ws = function(t$1, e$1) {
	for (var r$1 = 0, n$1 = 0; n$1 < e$1.length; ++n$1) r$1 += t$1[n$1] * e$1[n$1];
	return r$1;
}, ms = function(t$1, e$1, r$1) {
	var n$1 = r$1.length, i$1 = us(e$1 + 2);
	t$1[i$1] = 255 & n$1, t$1[i$1 + 1] = n$1 >> 8, t$1[i$1 + 2] = 255 ^ t$1[i$1], t$1[i$1 + 3] = 255 ^ t$1[i$1 + 1];
	for (var s$1 = 0; s$1 < n$1; ++s$1) t$1[i$1 + s$1 + 4] = r$1[s$1];
	return 8 * (i$1 + 4 + n$1);
}, bs = function(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1, c$1, u$1, h$1) {
	ys(e$1, h$1++, r$1), ++i$1[256];
	for (var f$1 = ps(i$1, 15), l$1 = f$1.t, y$1 = f$1.l, g$1 = ps(s$1, 15), p$1 = g$1.t, d$1 = g$1.l, A$1 = As(l$1), w$1 = A$1.c, m$1 = A$1.n, b$1 = As(p$1), k$1 = b$1.c, E$1 = b$1.n, v$1 = new Ni(19), B$1 = 0; B$1 < w$1.length; ++B$1) ++v$1[31 & w$1[B$1]];
	for (B$1 = 0; B$1 < k$1.length; ++B$1) ++v$1[31 & k$1[B$1]];
	for (var I$1 = ps(v$1, 7), S$1 = I$1.t, K$1 = I$1.l, C$1 = 19; C$1 > 4 && !S$1[zi[C$1 - 1]]; --C$1);
	var D$1, U$1, P$1, x$1, Q$1 = u$1 + 5 << 3, R$1 = ws(i$1, ts) + ws(s$1, es) + a$1, T$1 = ws(i$1, l$1) + ws(s$1, p$1) + a$1 + 14 + 3 * C$1 + ws(v$1, S$1) + 2 * v$1[16] + 3 * v$1[17] + 7 * v$1[18];
	if (c$1 >= 0 && Q$1 <= R$1 && Q$1 <= T$1) return ms(e$1, h$1, t$1.subarray(c$1, c$1 + u$1));
	if (ys(e$1, h$1, 1 + (T$1 < R$1)), h$1 += 2, T$1 < R$1) {
		D$1 = $i(l$1, y$1, 0), U$1 = l$1, P$1 = $i(p$1, d$1, 0), x$1 = p$1;
		var M$1 = $i(S$1, K$1, 0);
		ys(e$1, h$1, m$1 - 257), ys(e$1, h$1 + 5, E$1 - 1), ys(e$1, h$1 + 10, C$1 - 4), h$1 += 14;
		for (B$1 = 0; B$1 < C$1; ++B$1) ys(e$1, h$1 + 3 * B$1, S$1[zi[B$1]]);
		h$1 += 3 * C$1;
		for (var F$1 = [w$1, k$1], N$1 = 0; N$1 < 2; ++N$1) {
			var L$1 = F$1[N$1];
			for (B$1 = 0; B$1 < L$1.length; ++B$1) {
				var O$1 = 31 & L$1[B$1];
				ys(e$1, h$1, M$1[O$1]), h$1 += S$1[O$1], O$1 > 15 && (ys(e$1, h$1, L$1[B$1] >> 5 & 127), h$1 += L$1[B$1] >> 12);
			}
		}
	} else D$1 = rs, U$1 = ts, P$1 = is, x$1 = es;
	for (B$1 = 0; B$1 < o$1; ++B$1) {
		var H$1 = n$1[B$1];
		if (H$1 > 255) {
			gs(e$1, h$1, D$1[(O$1 = H$1 >> 18 & 31) + 257]), h$1 += U$1[O$1 + 257], O$1 > 7 && (ys(e$1, h$1, H$1 >> 23 & 31), h$1 += Oi[O$1]);
			var z$1 = 31 & H$1;
			gs(e$1, h$1, P$1[z$1]), h$1 += x$1[z$1], z$1 > 3 && (gs(e$1, h$1, H$1 >> 5 & 8191), h$1 += Hi[z$1]);
		} else gs(e$1, h$1, D$1[H$1]), h$1 += U$1[H$1];
	}
	return gs(e$1, h$1, D$1[256]), h$1 + U$1[256];
}, ks = /*#__PURE__*/ new Li([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), Es = /*#__PURE__*/ new Fi(0), vs = function() {
	var t$1 = 1, e$1 = 0;
	return {
		p: function(r$1) {
			for (var n$1 = t$1, i$1 = e$1, s$1 = 0 | r$1.length, a$1 = 0; a$1 != s$1;) {
				for (var o$1 = Math.min(a$1 + 2655, s$1); a$1 < o$1; ++a$1) i$1 += n$1 += r$1[a$1];
				n$1 = (65535 & n$1) + 15 * (n$1 >> 16), i$1 = (65535 & i$1) + 15 * (i$1 >> 16);
			}
			t$1 = n$1, e$1 = i$1;
		},
		d: function() {
			return (255 & (t$1 %= 65521)) << 24 | (65280 & t$1) << 8 | (255 & (e$1 %= 65521)) << 8 | e$1 >> 8;
		}
	};
}, Bs = function(t$1, e$1, r$1, n$1, i$1) {
	if (!i$1 && (i$1 = { l: 1 }, e$1.dictionary)) {
		var s$1 = e$1.dictionary.subarray(-32768), a$1 = new Fi(s$1.length + t$1.length);
		a$1.set(s$1), a$1.set(t$1, s$1.length), t$1 = a$1, i$1.w = s$1.length;
	}
	return function(t$2, e$2, r$2, n$2, i$2, s$2) {
		var a$2 = s$2.z || t$2.length, o$1 = new Fi(n$2 + a$2 + 5 * (1 + Math.ceil(a$2 / 7e3)) + i$2), c$1 = o$1.subarray(n$2, o$1.length - i$2), u$1 = s$2.l, h$1 = 7 & (s$2.r || 0);
		if (e$2) {
			h$1 && (c$1[0] = s$2.r >> 3);
			for (var f$1 = ks[e$2 - 1], l$1 = f$1 >> 13, y$1 = 8191 & f$1, g$1 = (1 << r$2) - 1, p$1 = s$2.p || new Ni(32768), d$1 = s$2.h || new Ni(g$1 + 1), A$1 = Math.ceil(r$2 / 3), w$1 = 2 * A$1, m$1 = function(e$3) {
				return (t$2[e$3] ^ t$2[e$3 + 1] << A$1 ^ t$2[e$3 + 2] << w$1) & g$1;
			}, b$1 = new Li(25e3), k$1 = new Ni(288), E$1 = new Ni(32), v$1 = 0, B$1 = 0, I$1 = s$2.i || 0, S$1 = 0, K$1 = s$2.w || 0, C$1 = 0; I$1 + 2 < a$2; ++I$1) {
				var D$1 = m$1(I$1), U$1 = 32767 & I$1, P$1 = d$1[D$1];
				if (p$1[U$1] = P$1, d$1[D$1] = U$1, K$1 <= I$1) {
					var x$1 = a$2 - I$1;
					if ((v$1 > 7e3 || S$1 > 24576) && (x$1 > 423 || !u$1)) {
						h$1 = bs(t$2, c$1, 0, b$1, k$1, E$1, B$1, S$1, C$1, I$1 - C$1, h$1), S$1 = v$1 = B$1 = 0, C$1 = I$1;
						for (var Q$1 = 0; Q$1 < 286; ++Q$1) k$1[Q$1] = 0;
						for (Q$1 = 0; Q$1 < 30; ++Q$1) E$1[Q$1] = 0;
					}
					var R$1 = 2, T$1 = 0, M$1 = y$1, F$1 = U$1 - P$1 & 32767;
					if (x$1 > 2 && D$1 == m$1(I$1 - F$1)) for (var N$1 = Math.min(l$1, x$1) - 1, L$1 = Math.min(32767, I$1), O$1 = Math.min(258, x$1); F$1 <= L$1 && --M$1 && U$1 != P$1;) {
						if (t$2[I$1 + R$1] == t$2[I$1 + R$1 - F$1]) {
							for (var H$1 = 0; H$1 < O$1 && t$2[I$1 + H$1] == t$2[I$1 + H$1 - F$1]; ++H$1);
							if (H$1 > R$1) {
								if (R$1 = H$1, T$1 = F$1, H$1 > N$1) break;
								var z$1 = Math.min(F$1, H$1 - 2), G$1 = 0;
								for (Q$1 = 0; Q$1 < z$1; ++Q$1) {
									var _$1 = I$1 - F$1 + Q$1 & 32767, j$1 = _$1 - p$1[_$1] & 32767;
									j$1 > G$1 && (G$1 = j$1, P$1 = _$1);
								}
							}
						}
						F$1 += (U$1 = P$1) - (P$1 = p$1[U$1]) & 32767;
					}
					if (T$1) {
						b$1[S$1++] = 268435456 | Vi[R$1] << 18 | Zi[T$1];
						var V$1 = 31 & Vi[R$1], q$1 = 31 & Zi[T$1];
						B$1 += Oi[V$1] + Hi[q$1], ++k$1[257 + V$1], ++E$1[q$1], K$1 = I$1 + R$1, ++v$1;
					} else b$1[S$1++] = t$2[I$1], ++k$1[t$2[I$1]];
				}
			}
			for (I$1 = Math.max(I$1, K$1); I$1 < a$2; ++I$1) b$1[S$1++] = t$2[I$1], ++k$1[t$2[I$1]];
			h$1 = bs(t$2, c$1, u$1, b$1, k$1, E$1, B$1, S$1, C$1, I$1 - C$1, h$1), u$1 || (s$2.r = 7 & h$1 | c$1[h$1 / 8 | 0] << 3, h$1 -= 7, s$2.h = d$1, s$2.p = p$1, s$2.i = I$1, s$2.w = K$1);
		} else {
			for (I$1 = s$2.w || 0; I$1 < a$2 + u$1; I$1 += 65535) {
				var Y$1 = I$1 + 65535;
				Y$1 >= a$2 && (c$1[h$1 / 8 | 0] = u$1, Y$1 = a$2), h$1 = ms(c$1, h$1 + 1, t$2.subarray(I$1, Y$1));
			}
			s$2.i = a$2;
		}
		return hs(o$1, 0, n$2 + us(h$1) + i$2);
	}(t$1, null == e$1.level ? 6 : e$1.level, null == e$1.mem ? i$1.l ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t$1.length)))) : 20 : 12 + e$1.mem, r$1, n$1, i$1);
}, Is = function(t$1, e$1, r$1) {
	for (; r$1; ++e$1) t$1[e$1] = r$1, r$1 >>>= 8;
}, Ss = /*#__PURE__*/ function() {
	function t$1(t$2, e$1) {
		if ("function" == typeof t$2 && (e$1 = t$2, t$2 = {}), this.ondata = e$1, this.o = t$2 || {}, this.s = {
			l: 0,
			i: 32768,
			w: 32768,
			z: 32768
		}, this.b = new Fi(98304), this.o.dictionary) {
			var r$1 = this.o.dictionary.subarray(-32768);
			this.b.set(r$1, 32768 - r$1.length), this.s.i = 32768 - r$1.length;
		}
	}
	return t$1.prototype.p = function(t$2, e$1) {
		this.ondata(Bs(t$2, this.o, 0, 0, this.s), e$1);
	}, t$1.prototype.push = function(t$2, e$1) {
		this.ondata || ls(5), this.s.l && ls(4);
		var r$1 = t$2.length + this.s.z;
		if (r$1 > this.b.length) {
			if (r$1 > 2 * this.b.length - 32768) {
				var n$1 = new Fi(-32768 & r$1);
				n$1.set(this.b.subarray(0, this.s.z)), this.b = n$1;
			}
			var i$1 = this.b.length - this.s.z;
			this.b.set(t$2.subarray(0, i$1), this.s.z), this.s.z = this.b.length, this.p(this.b, !1), this.b.set(this.b.subarray(-32768)), this.b.set(t$2.subarray(i$1), 32768), this.s.z = t$2.length - i$1 + 32768, this.s.i = 32766, this.s.w = 32768;
		} else this.b.set(t$2, this.s.z), this.s.z += t$2.length;
		this.s.l = 1 & e$1, (this.s.z > this.s.w + 8191 || e$1) && (this.p(this.b, e$1 || !1), this.s.w = this.s.i, this.s.i -= 2);
	}, t$1.prototype.flush = function() {
		this.ondata || ls(5), this.s.l && ls(4), this.p(this.b, !1), this.s.w = this.s.i, this.s.i -= 2;
	}, t$1;
}(), Ks = /*#__PURE__*/ function() {
	function t$1(t$2, e$1) {
		"function" == typeof t$2 && (e$1 = t$2, t$2 = {}), this.ondata = e$1;
		var r$1 = t$2 && t$2.dictionary && t$2.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: r$1 ? r$1.length : 0
		}, this.o = new Fi(32768), this.p = new Fi(0), r$1 && this.o.set(r$1);
	}
	return t$1.prototype.e = function(t$2) {
		if (this.ondata || ls(5), this.d && ls(4), this.p.length) {
			if (t$2.length) {
				var e$1 = new Fi(this.p.length + t$2.length);
				e$1.set(this.p), e$1.set(t$2, this.p.length), this.p = e$1;
			}
		} else this.p = t$2;
	}, t$1.prototype.c = function(t$2) {
		this.s.i = +(this.d = t$2 || !1);
		var e$1 = this.s.b, r$1 = function(t$3, e$2, r$2, n$1) {
			var i$1 = t$3.length;
			if (!i$1 || e$2.f && !e$2.l) return r$2 || new Fi(0);
			var s$1 = !r$2, a$1 = s$1 || 2 != e$2.i, o$1 = e$2.i;
			s$1 && (r$2 = new Fi(3 * i$1));
			var c$1 = function(t$4) {
				var e$3 = r$2.length;
				if (t$4 > e$3) {
					var n$2 = new Fi(Math.max(2 * e$3, t$4));
					n$2.set(r$2), r$2 = n$2;
				}
			}, u$1 = e$2.f || 0, h$1 = e$2.p || 0, f$1 = e$2.b || 0, l$1 = e$2.l, y$1 = e$2.d, g$1 = e$2.m, p$1 = e$2.n, d$1 = 8 * i$1;
			do {
				if (!l$1) {
					u$1 = os(t$3, h$1, 1);
					var A$1 = os(t$3, h$1 + 1, 3);
					if (h$1 += 3, !A$1) {
						var w$1 = t$3[(D$1 = us(h$1) + 4) - 4] | t$3[D$1 - 3] << 8, m$1 = D$1 + w$1;
						if (m$1 > i$1) {
							o$1 && ls(0);
							break;
						}
						a$1 && c$1(f$1 + w$1), r$2.set(t$3.subarray(D$1, m$1), f$1), e$2.b = f$1 += w$1, e$2.p = h$1 = 8 * m$1, e$2.f = u$1;
						continue;
					}
					if (1 == A$1) l$1 = ns, y$1 = ss, g$1 = 9, p$1 = 5;
else if (2 == A$1) {
						var b$1 = os(t$3, h$1, 31) + 257, k$1 = os(t$3, h$1 + 10, 15) + 4, E$1 = b$1 + os(t$3, h$1 + 5, 31) + 1;
						h$1 += 14;
						for (var v$1 = new Fi(E$1), B$1 = new Fi(19), I$1 = 0; I$1 < k$1; ++I$1) B$1[zi[I$1]] = os(t$3, h$1 + 3 * I$1, 7);
						h$1 += 3 * k$1;
						var S$1 = as(B$1), K$1 = (1 << S$1) - 1, C$1 = $i(B$1, S$1, 1);
						for (I$1 = 0; I$1 < E$1;) {
							var D$1, U$1 = C$1[os(t$3, h$1, K$1)];
							if (h$1 += 15 & U$1, (D$1 = U$1 >> 4) < 16) v$1[I$1++] = D$1;
else {
								var P$1 = 0, x$1 = 0;
								for (16 == D$1 ? (x$1 = 3 + os(t$3, h$1, 3), h$1 += 2, P$1 = v$1[I$1 - 1]) : 17 == D$1 ? (x$1 = 3 + os(t$3, h$1, 7), h$1 += 3) : 18 == D$1 && (x$1 = 11 + os(t$3, h$1, 127), h$1 += 7); x$1--;) v$1[I$1++] = P$1;
							}
						}
						var Q$1 = v$1.subarray(0, b$1), R$1 = v$1.subarray(b$1);
						g$1 = as(Q$1), p$1 = as(R$1), l$1 = $i(Q$1, g$1, 1), y$1 = $i(R$1, p$1, 1);
					} else ls(1);
					if (h$1 > d$1) {
						o$1 && ls(0);
						break;
					}
				}
				a$1 && c$1(f$1 + 131072);
				for (var T$1 = (1 << g$1) - 1, M$1 = (1 << p$1) - 1, F$1 = h$1;; F$1 = h$1) {
					var N$1 = (P$1 = l$1[cs(t$3, h$1) & T$1]) >> 4;
					if ((h$1 += 15 & P$1) > d$1) {
						o$1 && ls(0);
						break;
					}
					if (P$1 || ls(2), N$1 < 256) r$2[f$1++] = N$1;
else {
						if (256 == N$1) {
							F$1 = h$1, l$1 = null;
							break;
						}
						var L$1 = N$1 - 254;
						if (N$1 > 264) {
							var O$1 = Oi[I$1 = N$1 - 257];
							L$1 = os(t$3, h$1, (1 << O$1) - 1) + ji[I$1], h$1 += O$1;
						}
						var H$1 = y$1[cs(t$3, h$1) & M$1], z$1 = H$1 >> 4;
						if (H$1 || ls(3), h$1 += 15 & H$1, R$1 = Yi[z$1], z$1 > 3 && (O$1 = Hi[z$1], R$1 += cs(t$3, h$1) & (1 << O$1) - 1, h$1 += O$1), h$1 > d$1) {
							o$1 && ls(0);
							break;
						}
						a$1 && c$1(f$1 + 131072);
						var G$1 = f$1 + L$1;
						if (f$1 < R$1) {
							var _$1 = 0 - R$1, j$1 = Math.min(R$1, G$1);
							for (_$1 + f$1 < 0 && ls(3); f$1 < j$1; ++f$1) r$2[f$1] = n$1[_$1 + f$1];
						}
						for (; f$1 < G$1; ++f$1) r$2[f$1] = r$2[f$1 - R$1];
					}
				}
				e$2.l = l$1, e$2.p = F$1, e$2.b = f$1, e$2.f = u$1, l$1 && (u$1 = 1, e$2.m = g$1, e$2.d = y$1, e$2.n = p$1);
			} while (!u$1);
			return f$1 != r$2.length && s$1 ? hs(r$2, 0, f$1) : r$2.subarray(0, f$1);
		}(this.p, this.s, this.o);
		this.ondata(hs(r$1, e$1, this.s.b), this.d), this.o = hs(r$1, this.s.b - 32768), this.s.b = this.o.length, this.p = hs(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, t$1.prototype.push = function(t$2, e$1) {
		this.e(t$2), this.c(e$1);
	}, t$1;
}(), Cs = /*#__PURE__*/ function() {
	function t$1(t$2, e$1) {
		this.c = vs(), this.v = 1, Ss.call(this, t$2, e$1);
	}
	return t$1.prototype.push = function(t$2, e$1) {
		this.c.p(t$2), Ss.prototype.push.call(this, t$2, e$1);
	}, t$1.prototype.p = function(t$2, e$1) {
		var r$1 = Bs(t$2, this.o, this.v && (this.o.dictionary ? 6 : 2), e$1 && 4, this.s);
		this.v && (function(t$3, e$2) {
			var r$2 = e$2.level, n$1 = 0 == r$2 ? 0 : r$2 < 6 ? 1 : 9 == r$2 ? 3 : 2;
			if (t$3[0] = 120, t$3[1] = n$1 << 6 | (e$2.dictionary && 32), t$3[1] |= 31 - (t$3[0] << 8 | t$3[1]) % 31, e$2.dictionary) {
				var i$1 = vs();
				i$1.p(e$2.dictionary), Is(t$3, 2, i$1.d());
			}
		}(r$1, this.o), this.v = 0), e$1 && Is(r$1, r$1.length - 4, this.c.d()), this.ondata(r$1, e$1);
	}, t$1.prototype.flush = function() {
		Ss.prototype.flush.call(this);
	}, t$1;
}(), Ds = /*#__PURE__*/ function() {
	function t$1(t$2, e$1) {
		Ks.call(this, t$2, e$1), this.v = t$2 && t$2.dictionary ? 2 : 1;
	}
	return t$1.prototype.push = function(t$2, e$1) {
		if (Ks.prototype.e.call(this, t$2), this.v) {
			if (this.p.length < 6 && !e$1) return;
			this.p = this.p.subarray((r$1 = this.p, n$1 = this.v - 1, (8 != (15 & r$1[0]) || r$1[0] >> 4 > 7 || (r$1[0] << 8 | r$1[1]) % 31) && ls(6, "invalid zlib data"), (r$1[1] >> 5 & 1) == +!n$1 && ls(6, "invalid zlib data: " + (32 & r$1[1] ? "need" : "unexpected") + " dictionary"), 2 + (r$1[1] >> 3 & 4))), this.v = 0;
		}
		var r$1, n$1;
		e$1 && (this.p.length < 4 && ls(6, "invalid zlib data"), this.p = this.p.subarray(0, -4)), Ks.prototype.c.call(this, e$1);
	}, t$1;
}(), Us = "undefined" != typeof TextDecoder && /*#__PURE__*/ new TextDecoder();
try {
	Us.decode(Es, { stream: !0 });
} catch (t$1) {}
var Ps = class {
	static get tag() {
		return R.packet.literalData;
	}
	constructor(t$1 = new Date()) {
		this.format = R.literal.utf8, this.date = F.normalizeDate(t$1), this.text = null, this.data = null, this.filename = "";
	}
	setText(t$1, e$1 = R.literal.utf8) {
		this.format = e$1, this.text = t$1, this.data = null;
	}
	getText(t$1 = !1) {
		return (null === this.text || F.isStream(this.text)) && (this.text = F.decodeUTF8(F.nativeEOL(this.getBytes(t$1)))), this.text;
	}
	setBytes(t$1, e$1) {
		this.format = e$1, this.data = t$1, this.text = null;
	}
	getBytes(t$1 = !1) {
		return null === this.data && (this.data = F.canonicalizeEOL(F.encodeUTF8(this.text))), t$1 ? I(this.data) : this.data;
	}
	setFilename(t$1) {
		this.filename = t$1;
	}
	getFilename() {
		return this.filename;
	}
	async read(t$1) {
		await v(t$1, async (t$2) => {
			const e$1 = await t$2.readByte(), r$1 = await t$2.readByte();
			this.filename = F.decodeUTF8(await t$2.readBytes(r$1)), this.date = F.readDate(await t$2.readBytes(4));
			let n$1 = t$2.remainder();
			o(n$1) && (n$1 = await C(n$1)), this.setBytes(n$1, e$1);
		});
	}
	writeHeader() {
		const t$1 = F.encodeUTF8(this.filename), e$1 = new Uint8Array([t$1.length]), r$1 = new Uint8Array([this.format]), n$1 = F.writeDate(this.date);
		return F.concatUint8Array([
			r$1,
			e$1,
			t$1,
			n$1
		]);
	}
	write() {
		const t$1 = this.writeHeader(), e$1 = this.getBytes();
		return F.concat([t$1, e$1]);
	}
};
var xs = class xs {
	constructor() {
		this.bytes = "";
	}
	read(t$1) {
		return this.bytes = F.uint8ArrayToString(t$1.subarray(0, 8)), this.bytes.length;
	}
	write() {
		return F.stringToUint8Array(this.bytes);
	}
	toHex() {
		return F.uint8ArrayToHex(F.stringToUint8Array(this.bytes));
	}
	equals(t$1, e$1 = !1) {
		return e$1 && (t$1.isWildcard() || this.isWildcard()) || this.bytes === t$1.bytes;
	}
	isNull() {
		return "" === this.bytes;
	}
	isWildcard() {
		return /^0+$/.test(this.toHex());
	}
	static mapToHex(t$1) {
		return t$1.toHex();
	}
	static fromID(t$1) {
		const e$1 = new xs();
		return e$1.read(F.hexToUint8Array(t$1)), e$1;
	}
	static wildcard() {
		const t$1 = new xs();
		return t$1.read(new Uint8Array(8)), t$1;
	}
};
const Qs = Symbol("verified"), Rs = "salt@notations.openpgpjs.org", Ts = new Set([
	R.signatureSubpacket.issuerKeyID,
	R.signatureSubpacket.issuerFingerprint,
	R.signatureSubpacket.embeddedSignature
]);
var Ms = class Ms {
	static get tag() {
		return R.packet.signature;
	}
	constructor() {
		this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signatureData = null, this.unhashedSubpackets = [], this.unknownSubpackets = [], this.signedHashValue = null, this.salt = null, this.created = null, this.signatureExpirationTime = null, this.signatureNeverExpires = !0, this.exportable = null, this.trustLevel = null, this.trustAmount = null, this.regularExpression = null, this.revocable = null, this.keyExpirationTime = null, this.keyNeverExpires = null, this.preferredSymmetricAlgorithms = null, this.revocationKeyClass = null, this.revocationKeyAlgorithm = null, this.revocationKeyFingerprint = null, this.issuerKeyID = new xs(), this.rawNotations = [], this.notations = {}, this.preferredHashAlgorithms = null, this.preferredCompressionAlgorithms = null, this.keyServerPreferences = null, this.preferredKeyServer = null, this.isPrimaryUserID = null, this.policyURI = null, this.keyFlags = null, this.signersUserID = null, this.reasonForRevocationFlag = null, this.reasonForRevocationString = null, this.features = null, this.signatureTargetPublicKeyAlgorithm = null, this.signatureTargetHashAlgorithm = null, this.signatureTargetHash = null, this.embeddedSignature = null, this.issuerKeyVersion = null, this.issuerFingerprint = null, this.preferredAEADAlgorithms = null, this.preferredCipherSuites = null, this.revoked = null, this[Qs] = null;
	}
	read(t$1, e$1 = T) {
		let r$1 = 0;
		if (this.version = t$1[r$1++], 5 === this.version && !e$1.enableParsingV5Entities) throw new se("Support for v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
		if (4 !== this.version && 5 !== this.version && 6 !== this.version) throw new se(`Version ${this.version} of the signature packet is unsupported.`);
		if (this.signatureType = t$1[r$1++], this.publicKeyAlgorithm = t$1[r$1++], this.hashAlgorithm = t$1[r$1++], r$1 += this.readSubPackets(t$1.subarray(r$1, t$1.length), !0), !this.created) throw Error("Missing signature creation time subpacket.");
		if (this.signatureData = t$1.subarray(0, r$1), r$1 += this.readSubPackets(t$1.subarray(r$1, t$1.length), !1), this.signedHashValue = t$1.subarray(r$1, r$1 + 2), r$1 += 2, 6 === this.version) {
			const e$2 = t$1[r$1++];
			this.salt = t$1.subarray(r$1, r$1 + e$2), r$1 += e$2;
		}
		const n$1 = t$1.subarray(r$1, t$1.length), { read: i$1, signatureParams: s$1 } = function(t$2, e$2) {
			let r$2 = 0;
			switch (t$2) {
				case R.publicKey.rsaEncryptSign:
				case R.publicKey.rsaEncrypt:
				case R.publicKey.rsaSign: {
					const t$3 = F.readMPI(e$2.subarray(r$2));
					return r$2 += t$3.length + 2, {
						read: r$2,
						signatureParams: { s: t$3 }
					};
				}
				case R.publicKey.dsa:
				case R.publicKey.ecdsa: {
					const t$3 = F.readMPI(e$2.subarray(r$2));
					r$2 += t$3.length + 2;
					const n$2 = F.readMPI(e$2.subarray(r$2));
					return r$2 += n$2.length + 2, {
						read: r$2,
						signatureParams: {
							r: t$3,
							s: n$2
						}
					};
				}
				case R.publicKey.eddsaLegacy: {
					const t$3 = F.readMPI(e$2.subarray(r$2));
					r$2 += t$3.length + 2;
					const n$2 = F.readMPI(e$2.subarray(r$2));
					return r$2 += n$2.length + 2, {
						read: r$2,
						signatureParams: {
							r: t$3,
							s: n$2
						}
					};
				}
				case R.publicKey.ed25519:
				case R.publicKey.ed448: {
					const n$2 = 2 * ye(t$2), i$2 = F.readExactSubarray(e$2, r$2, r$2 + n$2);
					return r$2 += i$2.length, {
						read: r$2,
						signatureParams: { RS: i$2 }
					};
				}
				default: throw new se("Unknown signature algorithm.");
			}
		}(this.publicKeyAlgorithm, n$1);
		if (i$1 < n$1.length) throw Error("Error reading MPIs");
		this.params = s$1;
	}
	writeParams() {
		return this.params instanceof Promise ? U(async () => Pn(this.publicKeyAlgorithm, await this.params)) : Pn(this.publicKeyAlgorithm, this.params);
	}
	write() {
		const t$1 = [];
		return t$1.push(this.signatureData), t$1.push(this.writeUnhashedSubPackets()), t$1.push(this.signedHashValue), 6 === this.version && (t$1.push(new Uint8Array([this.salt.length])), t$1.push(this.salt)), t$1.push(this.writeParams()), F.concat(t$1);
	}
	async sign(t$1, e$1, r$1 = new Date(), n$1 = !1, i$1) {
		this.version = t$1.version, this.created = F.normalizeDate(r$1), this.issuerKeyVersion = t$1.version, this.issuerFingerprint = t$1.getFingerprintBytes(), this.issuerKeyID = t$1.getKeyID();
		const s$1 = [new Uint8Array([
			this.version,
			this.signatureType,
			this.publicKeyAlgorithm,
			this.hashAlgorithm
		])];
		if (6 === this.version) {
			const t$2 = Ns(this.hashAlgorithm);
			if (null === this.salt) this.salt = yt(t$2);
else if (t$2 !== this.salt.length) throw Error("Provided salt does not have the required length");
		} else if (i$1.nonDeterministicSignaturesViaNotation) {
			if (0 !== this.rawNotations.filter(({ name: t$2 }) => t$2 === Rs).length) throw Error("Unexpected existing salt notation");
			{
				const t$2 = yt(Ns(this.hashAlgorithm));
				this.rawNotations.push({
					name: Rs,
					value: t$2,
					humanReadable: !1,
					critical: !1
				});
			}
		}
		s$1.push(this.writeHashedSubPackets()), this.unhashedSubpackets = [], this.signatureData = F.concat(s$1);
		const a$1 = this.toHash(this.signatureType, e$1, n$1), o$1 = await this.hash(this.signatureType, e$1, a$1, n$1);
		this.signedHashValue = K(B(o$1), 0, 2);
		const c$1 = async () => Ci(this.publicKeyAlgorithm, this.hashAlgorithm, t$1.publicParams, t$1.privateParams, a$1, await C(o$1));
		F.isStream(o$1) ? this.params = c$1() : (this.params = await c$1(), this[Qs] = !0);
	}
	writeHashedSubPackets() {
		const t$1 = R.signatureSubpacket, e$1 = [];
		let r$1;
		if (null === this.created) throw Error("Missing signature creation time");
		e$1.push(Fs(t$1.signatureCreationTime, !0, F.writeDate(this.created))), null !== this.signatureExpirationTime && e$1.push(Fs(t$1.signatureExpirationTime, !0, F.writeNumber(this.signatureExpirationTime, 4))), null !== this.exportable && e$1.push(Fs(t$1.exportableCertification, !0, new Uint8Array([this.exportable ? 1 : 0]))), null !== this.trustLevel && (r$1 = new Uint8Array([this.trustLevel, this.trustAmount]), e$1.push(Fs(t$1.trustSignature, !0, r$1))), null !== this.regularExpression && e$1.push(Fs(t$1.regularExpression, !0, this.regularExpression)), null !== this.revocable && e$1.push(Fs(t$1.revocable, !0, new Uint8Array([this.revocable ? 1 : 0]))), null !== this.keyExpirationTime && e$1.push(Fs(t$1.keyExpirationTime, !0, F.writeNumber(this.keyExpirationTime, 4))), null !== this.preferredSymmetricAlgorithms && (r$1 = F.stringToUint8Array(F.uint8ArrayToString(this.preferredSymmetricAlgorithms)), e$1.push(Fs(t$1.preferredSymmetricAlgorithms, !1, r$1))), null !== this.revocationKeyClass && (r$1 = new Uint8Array([this.revocationKeyClass, this.revocationKeyAlgorithm]), r$1 = F.concat([r$1, this.revocationKeyFingerprint]), e$1.push(Fs(t$1.revocationKey, !1, r$1))), !this.issuerKeyID.isNull() && this.issuerKeyVersion < 5 && e$1.push(Fs(t$1.issuerKeyID, !1, this.issuerKeyID.write())), this.rawNotations.forEach(({ name: n$2, value: i$2, humanReadable: s$1, critical: a$1 }) => {
			r$1 = [new Uint8Array([
				s$1 ? 128 : 0,
				0,
				0,
				0
			])];
			const o$1 = F.encodeUTF8(n$2);
			r$1.push(F.writeNumber(o$1.length, 2)), r$1.push(F.writeNumber(i$2.length, 2)), r$1.push(o$1), r$1.push(i$2), r$1 = F.concat(r$1), e$1.push(Fs(t$1.notationData, a$1, r$1));
		}), null !== this.preferredHashAlgorithms && (r$1 = F.stringToUint8Array(F.uint8ArrayToString(this.preferredHashAlgorithms)), e$1.push(Fs(t$1.preferredHashAlgorithms, !1, r$1))), null !== this.preferredCompressionAlgorithms && (r$1 = F.stringToUint8Array(F.uint8ArrayToString(this.preferredCompressionAlgorithms)), e$1.push(Fs(t$1.preferredCompressionAlgorithms, !1, r$1))), null !== this.keyServerPreferences && (r$1 = F.stringToUint8Array(F.uint8ArrayToString(this.keyServerPreferences)), e$1.push(Fs(t$1.keyServerPreferences, !1, r$1))), null !== this.preferredKeyServer && e$1.push(Fs(t$1.preferredKeyServer, !1, F.encodeUTF8(this.preferredKeyServer))), null !== this.isPrimaryUserID && e$1.push(Fs(t$1.primaryUserID, !1, new Uint8Array([this.isPrimaryUserID ? 1 : 0]))), null !== this.policyURI && e$1.push(Fs(t$1.policyURI, !1, F.encodeUTF8(this.policyURI))), null !== this.keyFlags && (r$1 = F.stringToUint8Array(F.uint8ArrayToString(this.keyFlags)), e$1.push(Fs(t$1.keyFlags, !0, r$1))), null !== this.signersUserID && e$1.push(Fs(t$1.signersUserID, !1, F.encodeUTF8(this.signersUserID))), null !== this.reasonForRevocationFlag && (r$1 = F.stringToUint8Array(String.fromCharCode(this.reasonForRevocationFlag) + this.reasonForRevocationString), e$1.push(Fs(t$1.reasonForRevocation, !0, r$1))), null !== this.features && (r$1 = F.stringToUint8Array(F.uint8ArrayToString(this.features)), e$1.push(Fs(t$1.features, !1, r$1))), null !== this.signatureTargetPublicKeyAlgorithm && (r$1 = [new Uint8Array([this.signatureTargetPublicKeyAlgorithm, this.signatureTargetHashAlgorithm])], r$1.push(F.stringToUint8Array(this.signatureTargetHash)), r$1 = F.concat(r$1), e$1.push(Fs(t$1.signatureTarget, !0, r$1))), null !== this.embeddedSignature && e$1.push(Fs(t$1.embeddedSignature, !0, this.embeddedSignature.write())), null !== this.issuerFingerprint && (r$1 = [new Uint8Array([this.issuerKeyVersion]), this.issuerFingerprint], r$1 = F.concat(r$1), e$1.push(Fs(t$1.issuerFingerprint, this.version >= 5, r$1))), null !== this.preferredAEADAlgorithms && (r$1 = F.stringToUint8Array(F.uint8ArrayToString(this.preferredAEADAlgorithms)), e$1.push(Fs(t$1.preferredAEADAlgorithms, !1, r$1))), null !== this.preferredCipherSuites && (r$1 = new Uint8Array([].concat(...this.preferredCipherSuites)), e$1.push(Fs(t$1.preferredCipherSuites, !1, r$1)));
		const n$1 = F.concat(e$1), i$1 = F.writeNumber(n$1.length, 6 === this.version ? 4 : 2);
		return F.concat([i$1, n$1]);
	}
	writeUnhashedSubPackets() {
		const t$1 = this.unhashedSubpackets.map(({ type: t$2, critical: e$2, body: r$2 }) => Fs(t$2, e$2, r$2)), e$1 = F.concat(t$1), r$1 = F.writeNumber(e$1.length, 6 === this.version ? 4 : 2);
		return F.concat([r$1, e$1]);
	}
	readSubPacket(t$1, e$1 = !0) {
		let r$1 = 0;
		const n$1 = !!(128 & t$1[r$1]), i$1 = 127 & t$1[r$1];
		if (r$1++, e$1 || (this.unhashedSubpackets.push({
			type: i$1,
			critical: n$1,
			body: t$1.subarray(r$1, t$1.length)
		}), Ts.has(i$1))) switch (i$1) {
			case R.signatureSubpacket.signatureCreationTime:
				this.created = F.readDate(t$1.subarray(r$1, t$1.length));
				break;
			case R.signatureSubpacket.signatureExpirationTime: {
				const e$2 = F.readNumber(t$1.subarray(r$1, t$1.length));
				this.signatureNeverExpires = 0 === e$2, this.signatureExpirationTime = e$2;
				break;
			}
			case R.signatureSubpacket.exportableCertification:
				this.exportable = 1 === t$1[r$1++];
				break;
			case R.signatureSubpacket.trustSignature:
				this.trustLevel = t$1[r$1++], this.trustAmount = t$1[r$1++];
				break;
			case R.signatureSubpacket.regularExpression:
				this.regularExpression = t$1[r$1];
				break;
			case R.signatureSubpacket.revocable:
				this.revocable = 1 === t$1[r$1++];
				break;
			case R.signatureSubpacket.keyExpirationTime: {
				const e$2 = F.readNumber(t$1.subarray(r$1, t$1.length));
				this.keyExpirationTime = e$2, this.keyNeverExpires = 0 === e$2;
				break;
			}
			case R.signatureSubpacket.preferredSymmetricAlgorithms:
				this.preferredSymmetricAlgorithms = [...t$1.subarray(r$1, t$1.length)];
				break;
			case R.signatureSubpacket.revocationKey:
				this.revocationKeyClass = t$1[r$1++], this.revocationKeyAlgorithm = t$1[r$1++], this.revocationKeyFingerprint = t$1.subarray(r$1, r$1 + 20);
				break;
			case R.signatureSubpacket.issuerKeyID:
				if (4 === this.version) this.issuerKeyID.read(t$1.subarray(r$1, t$1.length));
else if (e$1) throw Error("Unexpected Issuer Key ID subpacket");
				break;
			case R.signatureSubpacket.notationData: {
				const e$2 = !!(128 & t$1[r$1]);
				r$1 += 4;
				const i$2 = F.readNumber(t$1.subarray(r$1, r$1 + 2));
				r$1 += 2;
				const s$1 = F.readNumber(t$1.subarray(r$1, r$1 + 2));
				r$1 += 2;
				const a$1 = F.decodeUTF8(t$1.subarray(r$1, r$1 + i$2)), o$1 = t$1.subarray(r$1 + i$2, r$1 + i$2 + s$1);
				this.rawNotations.push({
					name: a$1,
					humanReadable: e$2,
					value: o$1,
					critical: n$1
				}), e$2 && (this.notations[a$1] = F.decodeUTF8(o$1));
				break;
			}
			case R.signatureSubpacket.preferredHashAlgorithms:
				this.preferredHashAlgorithms = [...t$1.subarray(r$1, t$1.length)];
				break;
			case R.signatureSubpacket.preferredCompressionAlgorithms:
				this.preferredCompressionAlgorithms = [...t$1.subarray(r$1, t$1.length)];
				break;
			case R.signatureSubpacket.keyServerPreferences:
				this.keyServerPreferences = [...t$1.subarray(r$1, t$1.length)];
				break;
			case R.signatureSubpacket.preferredKeyServer:
				this.preferredKeyServer = F.decodeUTF8(t$1.subarray(r$1, t$1.length));
				break;
			case R.signatureSubpacket.primaryUserID:
				this.isPrimaryUserID = 0 !== t$1[r$1++];
				break;
			case R.signatureSubpacket.policyURI:
				this.policyURI = F.decodeUTF8(t$1.subarray(r$1, t$1.length));
				break;
			case R.signatureSubpacket.keyFlags:
				this.keyFlags = [...t$1.subarray(r$1, t$1.length)];
				break;
			case R.signatureSubpacket.signersUserID:
				this.signersUserID = F.decodeUTF8(t$1.subarray(r$1, t$1.length));
				break;
			case R.signatureSubpacket.reasonForRevocation:
				this.reasonForRevocationFlag = t$1[r$1++], this.reasonForRevocationString = F.decodeUTF8(t$1.subarray(r$1, t$1.length));
				break;
			case R.signatureSubpacket.features:
				this.features = [...t$1.subarray(r$1, t$1.length)];
				break;
			case R.signatureSubpacket.signatureTarget: {
				this.signatureTargetPublicKeyAlgorithm = t$1[r$1++], this.signatureTargetHashAlgorithm = t$1[r$1++];
				const e$2 = Rt(this.signatureTargetHashAlgorithm);
				this.signatureTargetHash = F.uint8ArrayToString(t$1.subarray(r$1, r$1 + e$2));
				break;
			}
			case R.signatureSubpacket.embeddedSignature:
				this.embeddedSignature = new Ms(), this.embeddedSignature.read(t$1.subarray(r$1, t$1.length));
				break;
			case R.signatureSubpacket.issuerFingerprint:
				this.issuerKeyVersion = t$1[r$1++], this.issuerFingerprint = t$1.subarray(r$1, t$1.length), this.issuerKeyVersion >= 5 ? this.issuerKeyID.read(this.issuerFingerprint) : this.issuerKeyID.read(this.issuerFingerprint.subarray(-8));
				break;
			case R.signatureSubpacket.preferredAEADAlgorithms:
				this.preferredAEADAlgorithms = [...t$1.subarray(r$1, t$1.length)];
				break;
			case R.signatureSubpacket.preferredCipherSuites:
				this.preferredCipherSuites = [];
				for (let e$2 = r$1; e$2 < t$1.length; e$2 += 2) this.preferredCipherSuites.push([t$1[e$2], t$1[e$2 + 1]]);
				break;
			default: this.unknownSubpackets.push({
				type: i$1,
				critical: n$1,
				body: t$1.subarray(r$1, t$1.length)
			});
		}
	}
	readSubPackets(t$1, e$1 = !0, r$1) {
		const n$1 = 6 === this.version ? 4 : 2, i$1 = F.readNumber(t$1.subarray(0, n$1));
		let s$1 = n$1;
		for (; s$1 < 2 + i$1;) {
			const n$2 = Xt(t$1.subarray(s$1, t$1.length));
			s$1 += n$2.offset, this.readSubPacket(t$1.subarray(s$1, s$1 + n$2.len), e$1, r$1), s$1 += n$2.len;
		}
		return s$1;
	}
	toSign(t$1, e$1) {
		const r$1 = R.signature;
		switch (t$1) {
			case r$1.binary: return null !== e$1.text ? F.encodeUTF8(e$1.getText(!0)) : e$1.getBytes(!0);
			case r$1.text: {
				const t$2 = e$1.getBytes(!0);
				return F.canonicalizeEOL(t$2);
			}
			case r$1.standalone: return new Uint8Array(0);
			case r$1.certGeneric:
			case r$1.certPersona:
			case r$1.certCasual:
			case r$1.certPositive:
			case r$1.certRevocation: {
				let t$2, n$1;
				if (e$1.userID) n$1 = 180, t$2 = e$1.userID;
else {
					if (!e$1.userAttribute) throw Error("Either a userID or userAttribute packet needs to be supplied for certification.");
					n$1 = 209, t$2 = e$1.userAttribute;
				}
				const i$1 = t$2.write();
				return F.concat([
					this.toSign(r$1.key, e$1),
					new Uint8Array([n$1]),
					F.writeNumber(i$1.length, 4),
					i$1
				]);
			}
			case r$1.subkeyBinding:
			case r$1.subkeyRevocation:
			case r$1.keyBinding: return F.concat([this.toSign(r$1.key, e$1), this.toSign(r$1.key, { key: e$1.bind })]);
			case r$1.key:
				if (void 0 === e$1.key) throw Error("Key packet is required for this signature.");
				return e$1.key.writeForHash(this.version);
			case r$1.keyRevocation: return this.toSign(r$1.key, e$1);
			case r$1.timestamp: return new Uint8Array(0);
			case r$1.thirdParty: throw Error("Not implemented");
			default: throw Error("Unknown signature type.");
		}
	}
	calculateTrailer(t$1, e$1) {
		let r$1 = 0;
		return k(B(this.signatureData), (t$2) => {
			r$1 += t$2.length;
		}, () => {
			const n$1 = [];
			return 5 !== this.version || this.signatureType !== R.signature.binary && this.signatureType !== R.signature.text || (e$1 ? n$1.push(new Uint8Array(6)) : n$1.push(t$1.writeHeader())), n$1.push(new Uint8Array([this.version, 255])), 5 === this.version && n$1.push(new Uint8Array(4)), n$1.push(F.writeNumber(r$1, 4)), F.concat(n$1);
		});
	}
	toHash(t$1, e$1, r$1 = !1) {
		const n$1 = this.toSign(t$1, e$1);
		return F.concat([
			this.salt || new Uint8Array(),
			n$1,
			this.signatureData,
			this.calculateTrailer(e$1, r$1)
		]);
	}
	async hash(t$1, e$1, r$1, n$1 = !1) {
		if (6 === this.version && this.salt.length !== Ns(this.hashAlgorithm)) throw Error("Signature salt does not have the expected length");
		return r$1 || (r$1 = this.toHash(t$1, e$1, n$1)), Qt(this.hashAlgorithm, r$1);
	}
	async verify(t$1, e$1, r$1, n$1 = new Date(), i$1 = !1, s$1 = T) {
		if (!this.issuerKeyID.equals(t$1.getKeyID())) throw Error("Signature was not issued by the given public key");
		if (this.publicKeyAlgorithm !== t$1.algorithm) throw Error("Public key algorithm used to sign signature does not match issuer key algorithm.");
		const a$1 = e$1 === R.signature.binary || e$1 === R.signature.text;
		if (!(this[Qs] && !a$1)) {
			let n$2, s$2;
			if (this.hashed ? s$2 = await this.hashed : (n$2 = this.toHash(e$1, r$1, i$1), s$2 = await this.hash(e$1, r$1, n$2)), s$2 = await C(s$2), this.signedHashValue[0] !== s$2[0] || this.signedHashValue[1] !== s$2[1]) throw Error("Signed digest did not match");
			if (this.params = await this.params, this[Qs] = await Ki(this.publicKeyAlgorithm, this.hashAlgorithm, this.params, t$1.publicParams, n$2, s$2), !this[Qs]) throw Error("Signature verification failed");
		}
		const o$1 = F.normalizeDate(n$1);
		if (o$1 && this.created > o$1) throw Error("Signature creation time is in the future");
		if (o$1 && o$1 >= this.getExpirationTime()) throw Error("Signature is expired");
		if (s$1.rejectHashAlgorithms.has(this.hashAlgorithm)) throw Error("Insecure hash algorithm: " + R.read(R.hash, this.hashAlgorithm).toUpperCase());
		if (s$1.rejectMessageHashAlgorithms.has(this.hashAlgorithm) && [R.signature.binary, R.signature.text].includes(this.signatureType)) throw Error("Insecure message hash algorithm: " + R.read(R.hash, this.hashAlgorithm).toUpperCase());
		if (this.unknownSubpackets.forEach(({ type: t$2, critical: e$2 }) => {
			if (e$2) throw Error("Unknown critical signature subpacket type " + t$2);
		}), this.rawNotations.forEach(({ name: t$2, critical: e$2 }) => {
			if (e$2 && s$1.knownNotations.indexOf(t$2) < 0) throw Error("Unknown critical notation: " + t$2);
		}), null !== this.revocationKeyClass) throw Error("This key is intended to be revoked with an authorized key, which OpenPGP.js does not support.");
	}
	isExpired(t$1 = new Date()) {
		const e$1 = F.normalizeDate(t$1);
		return null !== e$1 && !(this.created <= e$1 && e$1 < this.getExpirationTime());
	}
	getExpirationTime() {
		return this.signatureNeverExpires ? Infinity : new Date(this.created.getTime() + 1e3 * this.signatureExpirationTime);
	}
};
function Fs(t$1, e$1, r$1) {
	const n$1 = [];
	return n$1.push($t(r$1.length + 1)), n$1.push(new Uint8Array([(e$1 ? 128 : 0) | t$1])), n$1.push(r$1), F.concat(n$1);
}
function Ns(t$1) {
	switch (t$1) {
		case R.hash.sha256: return 16;
		case R.hash.sha384: return 24;
		case R.hash.sha512: return 32;
		case R.hash.sha224:
		case R.hash.sha3_256: return 16;
		case R.hash.sha3_512: return 32;
		default: throw Error("Unsupported hash function");
	}
}
var Ls = class Ls {
	static get tag() {
		return R.packet.onePassSignature;
	}
	static fromSignaturePacket(t$1, e$1) {
		const r$1 = new Ls();
		return r$1.version = 6 === t$1.version ? 6 : 3, r$1.signatureType = t$1.signatureType, r$1.hashAlgorithm = t$1.hashAlgorithm, r$1.publicKeyAlgorithm = t$1.publicKeyAlgorithm, r$1.issuerKeyID = t$1.issuerKeyID, r$1.salt = t$1.salt, r$1.issuerFingerprint = t$1.issuerFingerprint, r$1.flags = e$1 ? 1 : 0, r$1;
	}
	constructor() {
		this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.salt = null, this.issuerKeyID = null, this.issuerFingerprint = null, this.flags = null;
	}
	read(t$1) {
		let e$1 = 0;
		if (this.version = t$1[e$1++], 3 !== this.version && 6 !== this.version) throw new se(`Version ${this.version} of the one-pass signature packet is unsupported.`);
		if (this.signatureType = t$1[e$1++], this.hashAlgorithm = t$1[e$1++], this.publicKeyAlgorithm = t$1[e$1++], 6 === this.version) {
			const r$1 = t$1[e$1++];
			this.salt = t$1.subarray(e$1, e$1 + r$1), e$1 += r$1, this.issuerFingerprint = t$1.subarray(e$1, e$1 + 32), e$1 += 32, this.issuerKeyID = new xs(), this.issuerKeyID.read(this.issuerFingerprint);
		} else this.issuerKeyID = new xs(), this.issuerKeyID.read(t$1.subarray(e$1, e$1 + 8)), e$1 += 8;
		return this.flags = t$1[e$1++], this;
	}
	write() {
		const t$1 = [new Uint8Array([
			this.version,
			this.signatureType,
			this.hashAlgorithm,
			this.publicKeyAlgorithm
		])];
		return 6 === this.version ? t$1.push(new Uint8Array([this.salt.length]), this.salt, this.issuerFingerprint) : t$1.push(this.issuerKeyID.write()), t$1.push(new Uint8Array([this.flags])), F.concatUint8Array(t$1);
	}
	calculateTrailer(...t$1) {
		return U(async () => Ms.prototype.calculateTrailer.apply(await this.correspondingSig, t$1));
	}
	async verify() {
		const t$1 = await this.correspondingSig;
		if (!t$1 || t$1.constructor.tag !== R.packet.signature) throw Error("Corresponding signature packet missing");
		if (t$1.signatureType !== this.signatureType || t$1.hashAlgorithm !== this.hashAlgorithm || t$1.publicKeyAlgorithm !== this.publicKeyAlgorithm || !t$1.issuerKeyID.equals(this.issuerKeyID) || 3 === this.version && 6 === t$1.version || 6 === this.version && 6 !== t$1.version || 6 === this.version && !F.equalsUint8Array(t$1.issuerFingerprint, this.issuerFingerprint) || 6 === this.version && !F.equalsUint8Array(t$1.salt, this.salt)) throw Error("Corresponding signature packet does not match one-pass signature packet");
		return t$1.hashed = this.hashed, t$1.verify.apply(t$1, arguments);
	}
};
function Os(t$1, e$1) {
	if (!e$1[t$1]) {
		let e$2;
		try {
			e$2 = R.read(R.packet, t$1);
		} catch (e$3) {
			throw new ae("Unknown packet type with tag: " + t$1);
		}
		throw Error("Packet not allowed in this context: " + e$2);
	}
	return new e$1[t$1]();
}
Ls.prototype.hash = Ms.prototype.hash, Ls.prototype.toHash = Ms.prototype.toHash, Ls.prototype.toSign = Ms.prototype.toSign;
var Hs = class Hs extends Array {
	static async fromBinary(t$1, e$1, r$1 = T, n$1 = null, i$1 = !1) {
		const s$1 = new Hs();
		return await s$1.read(t$1, e$1, r$1, n$1, i$1), s$1;
	}
	async read(t$1, e$1, r$1 = T, n$1 = null, i$1 = !1) {
		let s$1;
		r$1.additionalAllowedPackets.length && (s$1 = F.constructAllowedPackets(r$1.additionalAllowedPackets), e$1 = {
			...e$1,
			...s$1
		}), this.stream = E(t$1, async (t$2, a$2) => {
			const o$1 = P(t$2), c$1 = x(a$2);
			try {
				let a$3 = F.isStream(t$2);
				for (;;) {
					let t$3, u$1;
					if (await c$1.ready, await ie(o$1, a$3, async (a$4) => {
						try {
							if (a$4.tag === R.packet.marker || a$4.tag === R.packet.trust || a$4.tag === R.packet.padding) return;
							const t$4 = Os(a$4.tag, e$1);
							try {
								n$1?.recordPacket(a$4.tag, s$1);
							} catch (t$5) {
								if (r$1.enforceGrammar) throw t$5;
								F.printDebugError(t$5);
							}
							t$4.packets = new Hs(), t$4.fromStream = F.isStream(a$4.packet), u$1 = t$4.fromStream;
							try {
								await t$4.read(a$4.packet, r$1);
							} catch (e$2) {
								if (!(e$2 instanceof se)) throw F.wrapError(new oe(`Parsing ${t$4.constructor.name} failed`), e$2);
								throw e$2;
							}
							await c$1.write(t$4);
						} catch (e$2) {
							const n$2 = e$2 instanceof ae && a$4.tag <= 39, s$2 = e$2 instanceof se && !(e$2 instanceof ae) && !r$1.ignoreUnsupportedPackets, o$2 = e$2 instanceof oe && !r$1.ignoreMalformedPackets, u$2 = ne(a$4.tag);
							if (n$2 || s$2 || o$2 || u$2 || !(e$2 instanceof ae || e$2 instanceof se || e$2 instanceof oe)) i$1 ? t$3 = e$2 : await c$1.abort(e$2);
else {
								const t$4 = new ce(a$4.tag, a$4.packet);
								await c$1.write(t$4);
							}
							F.printDebugError(e$2);
						}
					}), u$1 && (a$3 = null), t$3) throw await o$1.readToEnd(), t$3;
					const h$1 = await o$1.peekBytes(2);
					if (!h$1 || !h$1.length) {
						try {
							n$1?.recordEnd();
						} catch (t$4) {
							if (r$1.enforceGrammar) throw t$4;
							F.printDebugError(t$4);
						}
						return await c$1.ready, void await c$1.close();
					}
				}
			} catch (t$3) {
				await c$1.abort(t$3);
			}
		});
		const a$1 = P(this.stream);
		for (;;) {
			const { done: t$2, value: e$2 } = await a$1.read();
			if (t$2 ? this.stream = null : this.push(e$2), t$2 || ne(e$2.constructor.tag)) break;
		}
		a$1.releaseLock();
	}
	write() {
		const t$1 = [];
		for (let e$1 = 0; e$1 < this.length; e$1++) {
			const r$1 = this[e$1] instanceof ce ? this[e$1].tag : this[e$1].constructor.tag, n$1 = this[e$1].write();
			if (F.isStream(n$1) && ne(this[e$1].constructor.tag)) {
				let e$2 = [], i$1 = 0;
				const s$1 = 512;
				t$1.push(ee(r$1)), t$1.push(k(n$1, (t$2) => {
					if (e$2.push(t$2), i$1 += t$2.length, i$1 >= s$1) {
						const t$3 = Math.min(Math.log(i$1) / Math.LN2 | 0, 30), r$2 = 2 ** t$3, n$2 = F.concat([te(t$3)].concat(e$2));
						return e$2 = [n$2.subarray(1 + r$2)], i$1 = e$2[0].length, n$2.subarray(0, 1 + r$2);
					}
				}, () => F.concat([$t(i$1)].concat(e$2))));
			} else {
				if (F.isStream(n$1)) {
					let e$2 = 0;
					t$1.push(k(B(n$1), (t$2) => {
						e$2 += t$2.length;
					}, () => re(r$1, e$2)));
				} else t$1.push(re(r$1, n$1.length));
				t$1.push(n$1);
			}
		}
		return F.concat(t$1);
	}
	filterByTag(...t$1) {
		const e$1 = new Hs(), r$1 = (t$2) => (e$2) => t$2 === e$2;
		for (let n$1 = 0; n$1 < this.length; n$1++) t$1.some(r$1(this[n$1].constructor.tag)) && e$1.push(this[n$1]);
		return e$1;
	}
	findPacket(t$1) {
		return this.find((e$1) => e$1.constructor.tag === t$1);
	}
	indexOfTag(...t$1) {
		const e$1 = [], r$1 = this, n$1 = (t$2) => (e$2) => t$2 === e$2;
		for (let i$1 = 0; i$1 < this.length; i$1++) t$1.some(n$1(r$1[i$1].constructor.tag)) && e$1.push(i$1);
		return e$1;
	}
};
var zs = class zs extends Error {
	constructor(...t$1) {
		super(...t$1), Error.captureStackTrace && Error.captureStackTrace(this, zs), this.name = "GrammarError";
	}
};
var Gs;
!function(t$1) {
	t$1[t$1.EmptyMessage = 0] = "EmptyMessage", t$1[t$1.PlaintextOrEncryptedData = 1] = "PlaintextOrEncryptedData", t$1[t$1.EncryptedSessionKeys = 2] = "EncryptedSessionKeys", t$1[t$1.StandaloneAdditionalAllowedData = 3] = "StandaloneAdditionalAllowedData";
}(Gs || (Gs = {}));
var _s = class {
	constructor() {
		this.state = Gs.EmptyMessage, this.leadingOnePassSignatureCounter = 0;
	}
	recordPacket(t$1, e$1) {
		switch (this.state) {
			case Gs.EmptyMessage:
			case Gs.StandaloneAdditionalAllowedData: switch (t$1) {
				case R.packet.literalData:
				case R.packet.compressedData:
				case R.packet.aeadEncryptedData:
				case R.packet.symEncryptedIntegrityProtectedData:
				case R.packet.symmetricallyEncryptedData: return void (this.state = Gs.PlaintextOrEncryptedData);
				case R.packet.signature:
					if (this.state === Gs.StandaloneAdditionalAllowedData && --this.leadingOnePassSignatureCounter < 0) throw new zs("Trailing signature packet without OPS");
					return;
				case R.packet.onePassSignature:
					if (this.state === Gs.StandaloneAdditionalAllowedData) throw new zs("OPS following StandaloneAdditionalAllowedData");
					return void this.leadingOnePassSignatureCounter++;
				case R.packet.publicKeyEncryptedSessionKey:
				case R.packet.symEncryptedSessionKey: return void (this.state = Gs.EncryptedSessionKeys);
				default:
					if (!e$1?.[t$1]) throw new zs(`Unexpected packet ${t$1} in state ${this.state}`);
					return void (this.state = Gs.StandaloneAdditionalAllowedData);
			}
			case Gs.PlaintextOrEncryptedData:
				if (t$1 === R.packet.signature) {
					if (--this.leadingOnePassSignatureCounter < 0) throw new zs("Trailing signature packet without OPS");
					return void (this.state = Gs.PlaintextOrEncryptedData);
				}
				if (!e$1?.[t$1]) throw new zs(`Unexpected packet ${t$1} in state ${this.state}`);
				return void (this.state = Gs.PlaintextOrEncryptedData);
			case Gs.EncryptedSessionKeys: switch (t$1) {
				case R.packet.publicKeyEncryptedSessionKey:
				case R.packet.symEncryptedSessionKey: return void (this.state = Gs.EncryptedSessionKeys);
				case R.packet.symEncryptedIntegrityProtectedData:
				case R.packet.aeadEncryptedData:
				case R.packet.symmetricallyEncryptedData: return void (this.state = Gs.PlaintextOrEncryptedData);
				case R.packet.signature:
					if (--this.leadingOnePassSignatureCounter < 0) throw new zs("Trailing signature packet without OPS");
					return void (this.state = Gs.PlaintextOrEncryptedData);
				default:
					if (!e$1?.[t$1]) throw new zs(`Unexpected packet ${t$1} in state ${this.state}`);
					this.state = Gs.EncryptedSessionKeys;
			}
		}
	}
	recordEnd() {
		switch (this.state) {
			case Gs.EmptyMessage:
			case Gs.PlaintextOrEncryptedData:
			case Gs.EncryptedSessionKeys:
			case Gs.StandaloneAdditionalAllowedData: if (this.leadingOnePassSignatureCounter > 0) throw new zs("Missing trailing signature packets");
		}
	}
};
const js = /*#__PURE__*/ F.constructAllowedPackets([
	Ps,
	Ls,
	Ms
]);
var Vs = class {
	static get tag() {
		return R.packet.compressedData;
	}
	constructor(t$1 = T) {
		this.packets = null, this.algorithm = t$1.preferredCompressionAlgorithm, this.compressed = null;
	}
	async read(t$1, e$1 = T) {
		await v(t$1, async (t$2) => {
			this.algorithm = await t$2.readByte(), this.compressed = t$2.remainder(), await this.decompress(e$1);
		});
	}
	write() {
		return null === this.compressed && this.compress(), F.concat([new Uint8Array([this.algorithm]), this.compressed]);
	}
	async decompress(t$1 = T) {
		const e$1 = R.read(R.compression, this.algorithm), r$1 = Ws[e$1];
		if (!r$1) throw Error(e$1 + " decompression not supported");
		this.packets = await Hs.fromBinary(await r$1(this.compressed), js, t$1, new _s());
	}
	compress() {
		const t$1 = R.read(R.compression, this.algorithm), e$1 = Js[t$1];
		if (!e$1) throw Error(t$1 + " compression not supported");
		this.compressed = e$1(this.packets.write());
	}
};
function qs(t$1, e$1) {
	return (r$1) => {
		if (!F.isStream(r$1) || o(r$1)) return U(() => C(r$1).then((t$2) => new Promise((r$2, n$2) => {
			const i$2 = new e$1(), s$1 = [];
			i$2.ondata = (t$3, e$2) => {
				s$1.push(t$3), e$2 && r$2(F.concatUint8Array(s$1));
			};
			try {
				i$2.push(t$2, !0);
			} catch (t$3) {
				n$2(t$3);
			}
		})));
		if (t$1) try {
			const e$2 = t$1();
			return r$1.pipeThrough(e$2);
		} catch (t$2) {
			if ("TypeError" !== t$2.name) throw t$2;
		}
		const n$1 = r$1.getReader(), i$1 = new e$1();
		return new ReadableStream({ async start(t$2) {
			for (i$1.ondata = async (e$2, r$2) => {
				t$2.enqueue(e$2), r$2 && t$2.close();
			};;) {
				const { done: t$3, value: e$2 } = await n$1.read();
				if (t$3) return void i$1.push(new Uint8Array(), !0);
				e$2.length && i$1.push(e$2);
			}
		} });
	};
}
function Ys() {
	return async function(t$1) {
		const { decode: e$1 } = await Promise.resolve().then(function() {
			return Jy;
		});
		return U(async () => e$1(await C(t$1)));
	};
}
const Zs = (t$1) => ({
	compressor: "undefined" != typeof CompressionStream && (() => new CompressionStream(t$1)),
	decompressor: "undefined" != typeof DecompressionStream && (() => new DecompressionStream(t$1))
}), Js = {
	zip: /*#__PURE__*/ qs(Zs("deflate-raw").compressor, Ss),
	zlib: /*#__PURE__*/ qs(Zs("deflate").compressor, Cs)
}, Ws = {
	uncompressed: (t$1) => t$1,
	zip: /*#__PURE__*/ qs(Zs("deflate-raw").decompressor, Ks),
	zlib: /*#__PURE__*/ qs(Zs("deflate").decompressor, Ds),
	bzip2: /*#__PURE__*/ Ys()
}, Xs = /*#__PURE__*/ F.constructAllowedPackets([
	Ps,
	Vs,
	Ls,
	Ms
]);
var $s = class $s {
	static get tag() {
		return R.packet.symEncryptedIntegrityProtectedData;
	}
	static fromObject({ version: t$1, aeadAlgorithm: e$1 }) {
		if (1 !== t$1 && 2 !== t$1) throw Error("Unsupported SEIPD version");
		const r$1 = new $s();
		return r$1.version = t$1, 2 === t$1 && (r$1.aeadAlgorithm = e$1), r$1;
	}
	constructor() {
		this.version = null, this.cipherAlgorithm = null, this.aeadAlgorithm = null, this.chunkSizeByte = null, this.salt = null, this.encrypted = null, this.packets = null;
	}
	async read(t$1) {
		await v(t$1, async (t$2) => {
			if (this.version = await t$2.readByte(), 1 !== this.version && 2 !== this.version) throw new se(`Version ${this.version} of the SEIP packet is unsupported.`);
			2 === this.version && (this.cipherAlgorithm = await t$2.readByte(), this.aeadAlgorithm = await t$2.readByte(), this.chunkSizeByte = await t$2.readByte(), this.salt = await t$2.readBytes(32)), this.encrypted = t$2.remainder();
		});
	}
	write() {
		return 2 === this.version ? F.concat([
			new Uint8Array([
				this.version,
				this.cipherAlgorithm,
				this.aeadAlgorithm,
				this.chunkSizeByte
			]),
			this.salt,
			this.encrypted
		]) : F.concat([new Uint8Array([this.version]), this.encrypted]);
	}
	async encrypt(t$1, e$1, r$1 = T) {
		const { blockSize: n$1, keySize: i$1 } = Ir(t$1);
		if (e$1.length !== i$1) throw Error("Unexpected session key size");
		let s$1 = this.packets.write();
		if (o(s$1) && (s$1 = await C(s$1)), 2 === this.version) this.cipherAlgorithm = t$1, this.salt = yt(32), this.chunkSizeByte = r$1.aeadChunkSizeByte, this.encrypted = await ta(this, "encrypt", e$1, s$1);
else {
			const r$2 = await Hn(t$1), i$2 = new Uint8Array([211, 20]), a$1 = F.concat([
				r$2,
				s$1,
				i$2
			]), o$1 = await Qt(R.hash.sha1, I(a$1)), c$1 = F.concat([a$1, o$1]);
			this.encrypted = await zn(t$1, e$1, c$1, new Uint8Array(n$1));
		}
		return !0;
	}
	async decrypt(t$1, e$1, r$1 = T) {
		if (e$1.length !== Ir(t$1).keySize) throw Error("Unexpected session key size");
		let n$1, i$1 = B(this.encrypted);
		o(i$1) && (i$1 = await C(i$1));
		let s$1 = !1;
		if (2 === this.version) {
			if (this.cipherAlgorithm !== t$1) throw Error("Unexpected session key algorithm");
			n$1 = await ta(this, "decrypt", e$1, i$1);
		} else {
			const { blockSize: a$1 } = Ir(t$1), o$1 = await Gn(t$1, e$1, i$1, new Uint8Array(a$1)), c$1 = K(I(o$1), -20), u$1 = K(o$1, 0, -20), h$1 = Promise.all([C(await Qt(R.hash.sha1, I(u$1))), C(c$1)]).then(([t$2, e$2]) => {
				if (!F.equalsUint8Array(t$2, e$2)) throw Error("Modification detected.");
				return new Uint8Array();
			}), f$1 = K(u$1, a$1 + 2);
			n$1 = K(f$1, 0, -2), n$1 = A([n$1, U(() => h$1)]), F.isStream(i$1) && r$1.allowUnauthenticatedStream ? s$1 = !0 : n$1 = await C(n$1);
		}
		return this.packets = await Hs.fromBinary(n$1, Xs, r$1, new _s(), s$1), !0;
	}
};
async function ta(t$1, e$1, r$1, n$1) {
	const i$1 = t$1 instanceof $s && 2 === t$1.version, s$1 = !i$1 && t$1.constructor.tag === R.packet.aeadEncryptedData;
	if (!i$1 && !s$1) throw Error("Unexpected packet type");
	const a$1 = Si(t$1.aeadAlgorithm, s$1), o$1 = "decrypt" === e$1 ? a$1.tagLength : 0, c$1 = "encrypt" === e$1 ? a$1.tagLength : 0, u$1 = 2 ** (t$1.chunkSizeByte + 6) + o$1, h$1 = s$1 ? 8 : 0, f$1 = new ArrayBuffer(13 + h$1), l$1 = new Uint8Array(f$1, 0, 5 + h$1), y$1 = new Uint8Array(f$1), g$1 = new DataView(f$1), p$1 = new Uint8Array(f$1, 5, 8);
	l$1.set([
		192 | t$1.constructor.tag,
		t$1.version,
		t$1.cipherAlgorithm,
		t$1.aeadAlgorithm,
		t$1.chunkSizeByte
	], 0);
	let d$1, A$1, m$1 = 0, b$1 = Promise.resolve(), k$1 = 0, v$1 = 0;
	if (i$1) {
		const { keySize: e$2 } = Ir(t$1.cipherAlgorithm), { ivLength: n$2 } = a$1, i$2 = new Uint8Array(f$1, 0, 5), s$2 = await Dr(R.hash.sha256, r$1, t$1.salt, i$2, e$2 + n$2);
		r$1 = s$2.subarray(0, e$2), d$1 = s$2.subarray(e$2), d$1.fill(0, d$1.length - 8), A$1 = new DataView(d$1.buffer, d$1.byteOffset, d$1.byteLength);
	} else d$1 = t$1.iv;
	const B$1 = await a$1(t$1.cipherAlgorithm, r$1);
	return E(n$1, async (r$2, n$2) => {
		if ("array" !== F.isStream(r$2)) {
			const e$2 = new TransformStream({}, {
				highWaterMark: F.getHardwareConcurrency() * 2 ** (t$1.chunkSizeByte + 6),
				size: (t$2) => t$2.length
			});
			w(e$2.readable, n$2), n$2 = e$2.writable;
		}
		const s$2 = P(r$2), a$2 = x(n$2);
		try {
			for (;;) {
				let t$2 = await s$2.readBytes(u$1 + o$1) || new Uint8Array();
				const r$3 = t$2.subarray(t$2.length - o$1);
				let n$3, f$2, w$1;
				if (t$2 = t$2.subarray(0, t$2.length - o$1), i$1) w$1 = d$1;
else {
					w$1 = d$1.slice();
					for (let t$3 = 0; t$3 < 8; t$3++) w$1[d$1.length - 8 + t$3] ^= p$1[t$3];
				}
				if (!m$1 || t$2.length ? (s$2.unshift(r$3), n$3 = B$1[e$1](t$2, w$1, l$1), n$3.catch(() => {}), v$1 += t$2.length - o$1 + c$1) : (g$1.setInt32(5 + h$1 + 4, k$1), n$3 = B$1[e$1](r$3, w$1, y$1), n$3.catch(() => {}), v$1 += c$1, f$2 = !0), k$1 += t$2.length - o$1, b$1 = b$1.then(() => n$3).then(async (t$3) => {
					await a$2.ready, await a$2.write(t$3), v$1 -= t$3.length;
				}).catch((t$3) => a$2.abort(t$3)), (f$2 || v$1 > a$2.desiredSize) && await b$1, f$2) {
					await a$2.close();
					break;
				}
				i$1 ? A$1.setInt32(d$1.length - 4, ++m$1) : g$1.setInt32(9, ++m$1);
			}
		} catch (t$2) {
			await a$2.ready.catch(() => {}), await a$2.abort(t$2);
		}
	});
}
const ea = /*#__PURE__*/ F.constructAllowedPackets([
	Ps,
	Vs,
	Ls,
	Ms
]);
var ra = class {
	static get tag() {
		return R.packet.aeadEncryptedData;
	}
	constructor() {
		this.version = 1, this.cipherAlgorithm = null, this.aeadAlgorithm = R.aead.eax, this.chunkSizeByte = null, this.iv = null, this.encrypted = null, this.packets = null;
	}
	async read(t$1) {
		await v(t$1, async (t$2) => {
			const e$1 = await t$2.readByte();
			if (1 !== e$1) throw new se(`Version ${e$1} of the AEAD-encrypted data packet is not supported.`);
			this.cipherAlgorithm = await t$2.readByte(), this.aeadAlgorithm = await t$2.readByte(), this.chunkSizeByte = await t$2.readByte();
			const r$1 = Si(this.aeadAlgorithm, !0);
			this.iv = await t$2.readBytes(r$1.ivLength), this.encrypted = t$2.remainder();
		});
	}
	write() {
		return F.concat([
			new Uint8Array([
				this.version,
				this.cipherAlgorithm,
				this.aeadAlgorithm,
				this.chunkSizeByte
			]),
			this.iv,
			this.encrypted
		]);
	}
	async decrypt(t$1, e$1, r$1 = T) {
		this.packets = await Hs.fromBinary(await ta(this, "decrypt", e$1, B(this.encrypted)), ea, r$1, new _s());
	}
	async encrypt(t$1, e$1, r$1 = T) {
		this.cipherAlgorithm = t$1;
		const { ivLength: n$1 } = Si(this.aeadAlgorithm, !0);
		this.iv = yt(n$1), this.chunkSizeByte = r$1.aeadChunkSizeByte;
		const i$1 = this.packets.write();
		this.encrypted = await ta(this, "encrypt", e$1, i$1);
	}
};
var na = class na {
	static get tag() {
		return R.packet.publicKeyEncryptedSessionKey;
	}
	constructor() {
		this.version = null, this.publicKeyID = new xs(), this.publicKeyVersion = null, this.publicKeyFingerprint = null, this.publicKeyAlgorithm = null, this.sessionKey = null, this.sessionKeyAlgorithm = null, this.encrypted = {};
	}
	static fromObject({ version: t$1, encryptionKeyPacket: e$1, anonymousRecipient: r$1, sessionKey: n$1, sessionKeyAlgorithm: i$1 }) {
		const s$1 = new na();
		if (3 !== t$1 && 6 !== t$1) throw Error("Unsupported PKESK version");
		return s$1.version = t$1, 6 === t$1 && (s$1.publicKeyVersion = r$1 ? null : e$1.version, s$1.publicKeyFingerprint = r$1 ? null : e$1.getFingerprintBytes()), s$1.publicKeyID = r$1 ? xs.wildcard() : e$1.getKeyID(), s$1.publicKeyAlgorithm = e$1.algorithm, s$1.sessionKey = n$1, s$1.sessionKeyAlgorithm = i$1, s$1;
	}
	read(t$1) {
		let e$1 = 0;
		if (this.version = t$1[e$1++], 3 !== this.version && 6 !== this.version) throw new se(`Version ${this.version} of the PKESK packet is unsupported.`);
		if (6 === this.version) {
			const r$1 = t$1[e$1++];
			if (r$1) {
				this.publicKeyVersion = t$1[e$1++];
				const n$1 = r$1 - 1;
				this.publicKeyFingerprint = t$1.subarray(e$1, e$1 + n$1), e$1 += n$1, this.publicKeyVersion >= 5 ? this.publicKeyID.read(this.publicKeyFingerprint) : this.publicKeyID.read(this.publicKeyFingerprint.subarray(-8));
			} else this.publicKeyID = xs.wildcard();
		} else e$1 += this.publicKeyID.read(t$1.subarray(e$1, e$1 + 8));
		if (this.publicKeyAlgorithm = t$1[e$1++], this.encrypted = function(t$2, e$2) {
			let r$1 = 0;
			switch (t$2) {
				case R.publicKey.rsaEncrypt:
				case R.publicKey.rsaEncryptSign: return { c: F.readMPI(e$2.subarray(r$1)) };
				case R.publicKey.elgamal: {
					const t$3 = F.readMPI(e$2.subarray(r$1));
					return r$1 += t$3.length + 2, {
						c1: t$3,
						c2: F.readMPI(e$2.subarray(r$1))
					};
				}
				case R.publicKey.ecdh: {
					const t$3 = F.readMPI(e$2.subarray(r$1));
					r$1 += t$3.length + 2;
					const n$1 = new In();
					return n$1.read(e$2.subarray(r$1)), {
						V: t$3,
						C: n$1
					};
				}
				case R.publicKey.x25519:
				case R.publicKey.x448: {
					const n$1 = Mn(t$2), i$1 = F.readExactSubarray(e$2, r$1, r$1 + n$1);
					r$1 += i$1.length;
					const s$1 = new Kn();
					return s$1.read(e$2.subarray(r$1)), {
						ephemeralPublicKey: i$1,
						C: s$1
					};
				}
				default: throw new se("Unknown public key encryption algorithm.");
			}
		}(this.publicKeyAlgorithm, t$1.subarray(e$1)), this.publicKeyAlgorithm === R.publicKey.x25519 || this.publicKeyAlgorithm === R.publicKey.x448) {
			if (3 === this.version) this.sessionKeyAlgorithm = R.write(R.symmetric, this.encrypted.C.algorithm);
else if (null !== this.encrypted.C.algorithm) throw Error("Unexpected cleartext symmetric algorithm");
		}
	}
	write() {
		const t$1 = [new Uint8Array([this.version])];
		return 6 === this.version ? null !== this.publicKeyFingerprint ? (t$1.push(new Uint8Array([this.publicKeyFingerprint.length + 1, this.publicKeyVersion])), t$1.push(this.publicKeyFingerprint)) : t$1.push(new Uint8Array([0])) : t$1.push(this.publicKeyID.write()), t$1.push(new Uint8Array([this.publicKeyAlgorithm]), Pn(this.publicKeyAlgorithm, this.encrypted)), F.concatUint8Array(t$1);
	}
	async encrypt(t$1) {
		const e$1 = R.write(R.publicKey, this.publicKeyAlgorithm), r$1 = 3 === this.version ? this.sessionKeyAlgorithm : null, n$1 = 5 === t$1.version ? t$1.getFingerprintBytes().subarray(0, 20) : t$1.getFingerprintBytes(), i$1 = ia(this.version, e$1, r$1, this.sessionKey);
		this.encrypted = await Cn(e$1, r$1, t$1.publicParams, i$1, n$1);
	}
	async decrypt(t$1, e$1) {
		if (this.publicKeyAlgorithm !== t$1.algorithm) throw Error("Decryption error");
		const r$1 = e$1 ? ia(this.version, this.publicKeyAlgorithm, e$1.sessionKeyAlgorithm, e$1.sessionKey) : null, n$1 = 5 === t$1.version ? t$1.getFingerprintBytes().subarray(0, 20) : t$1.getFingerprintBytes(), i$1 = await Dn(this.publicKeyAlgorithm, t$1.publicParams, t$1.privateParams, this.encrypted, n$1, r$1), { sessionKey: s$1, sessionKeyAlgorithm: a$1 } = function(t$2, e$2, r$2, n$2) {
			switch (e$2) {
				case R.publicKey.rsaEncrypt:
				case R.publicKey.rsaEncryptSign:
				case R.publicKey.elgamal:
				case R.publicKey.ecdh: {
					const e$3 = r$2.subarray(0, r$2.length - 2), i$2 = r$2.subarray(r$2.length - 2), s$2 = F.writeChecksum(e$3.subarray(e$3.length % 8)), a$2 = s$2[0] === i$2[0] & s$2[1] === i$2[1], o$1 = 6 === t$2 ? {
						sessionKeyAlgorithm: null,
						sessionKey: e$3
					} : {
						sessionKeyAlgorithm: e$3[0],
						sessionKey: e$3.subarray(1)
					};
					if (n$2) {
						const e$4 = a$2 & o$1.sessionKeyAlgorithm === n$2.sessionKeyAlgorithm & o$1.sessionKey.length === n$2.sessionKey.length;
						return {
							sessionKey: F.selectUint8Array(e$4, o$1.sessionKey, n$2.sessionKey),
							sessionKeyAlgorithm: 6 === t$2 ? null : F.selectUint8(e$4, o$1.sessionKeyAlgorithm, n$2.sessionKeyAlgorithm)
						};
					}
					if (a$2 && (6 === t$2 || R.read(R.symmetric, o$1.sessionKeyAlgorithm))) return o$1;
					throw Error("Decryption error");
				}
				case R.publicKey.x25519:
				case R.publicKey.x448: return {
					sessionKeyAlgorithm: null,
					sessionKey: r$2
				};
				default: throw Error("Unsupported public key algorithm");
			}
		}(this.version, this.publicKeyAlgorithm, i$1, e$1);
		if (3 === this.version) {
			const t$2 = this.publicKeyAlgorithm !== R.publicKey.x25519 && this.publicKeyAlgorithm !== R.publicKey.x448;
			if (this.sessionKeyAlgorithm = t$2 ? a$1 : this.sessionKeyAlgorithm, s$1.length !== Ir(this.sessionKeyAlgorithm).keySize) throw Error("Unexpected session key size");
		}
		this.sessionKey = s$1;
	}
};
function ia(t$1, e$1, r$1, n$1) {
	switch (e$1) {
		case R.publicKey.rsaEncrypt:
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.elgamal:
		case R.publicKey.ecdh: return F.concatUint8Array([
			new Uint8Array(6 === t$1 ? [] : [r$1]),
			n$1,
			F.writeChecksum(n$1.subarray(n$1.length % 8))
		]);
		case R.publicKey.x25519:
		case R.publicKey.x448: return n$1;
		default: throw Error("Unsupported public key algorithm");
	}
}
var sa = class sa {
	static get tag() {
		return R.packet.symEncryptedSessionKey;
	}
	constructor(t$1 = T) {
		this.version = t$1.aeadProtect ? 6 : 4, this.sessionKey = null, this.sessionKeyEncryptionAlgorithm = null, this.sessionKeyAlgorithm = null, this.aeadAlgorithm = R.write(R.aead, t$1.preferredAEADAlgorithm), this.encrypted = null, this.s2k = null, this.iv = null;
	}
	read(t$1) {
		let e$1 = 0;
		if (this.version = t$1[e$1++], 4 !== this.version && 5 !== this.version && 6 !== this.version) throw new se(`Version ${this.version} of the SKESK packet is unsupported.`);
		6 === this.version && e$1++;
		const r$1 = t$1[e$1++];
		this.version >= 5 && (this.aeadAlgorithm = t$1[e$1++], 6 === this.version && e$1++);
		const n$1 = t$1[e$1++];
		if (this.s2k = Ti(n$1), e$1 += this.s2k.read(t$1.subarray(e$1, t$1.length)), this.version >= 5) {
			const r$2 = Si(this.aeadAlgorithm, !0);
			this.iv = t$1.subarray(e$1, e$1 += r$2.ivLength);
		}
		this.version >= 5 || e$1 < t$1.length ? (this.encrypted = t$1.subarray(e$1, t$1.length), this.sessionKeyEncryptionAlgorithm = r$1) : this.sessionKeyAlgorithm = r$1;
	}
	write() {
		const t$1 = null === this.encrypted ? this.sessionKeyAlgorithm : this.sessionKeyEncryptionAlgorithm;
		let e$1;
		const r$1 = this.s2k.write();
		if (6 === this.version) {
			const n$1 = r$1.length, i$1 = 3 + n$1 + this.iv.length;
			e$1 = F.concatUint8Array([
				new Uint8Array([
					this.version,
					i$1,
					t$1,
					this.aeadAlgorithm,
					n$1
				]),
				r$1,
				this.iv,
				this.encrypted
			]);
		} else 5 === this.version ? e$1 = F.concatUint8Array([
			new Uint8Array([
				this.version,
				t$1,
				this.aeadAlgorithm
			]),
			r$1,
			this.iv,
			this.encrypted
		]) : (e$1 = F.concatUint8Array([new Uint8Array([this.version, t$1]), r$1]), null !== this.encrypted && (e$1 = F.concatUint8Array([e$1, this.encrypted])));
		return e$1;
	}
	async decrypt(t$1) {
		const e$1 = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm, { blockSize: r$1, keySize: n$1 } = Ir(e$1), i$1 = await this.s2k.produceKey(t$1, n$1);
		if (this.version >= 5) {
			const t$2 = Si(this.aeadAlgorithm, !0), r$2 = new Uint8Array([
				192 | sa.tag,
				this.version,
				this.sessionKeyEncryptionAlgorithm,
				this.aeadAlgorithm
			]), s$1 = 6 === this.version ? await Dr(R.hash.sha256, i$1, new Uint8Array(), r$2, n$1) : i$1, a$1 = await t$2(e$1, s$1);
			this.sessionKey = await a$1.decrypt(this.encrypted, this.iv, r$2);
		} else if (null !== this.encrypted) {
			const t$2 = await Gn(e$1, i$1, this.encrypted, new Uint8Array(r$1));
			if (this.sessionKeyAlgorithm = R.write(R.symmetric, t$2[0]), this.sessionKey = t$2.subarray(1, t$2.length), this.sessionKey.length !== Ir(this.sessionKeyAlgorithm).keySize) throw Error("Unexpected session key size");
		} else this.sessionKey = i$1;
	}
	async encrypt(t$1, e$1 = T) {
		const r$1 = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm;
		this.sessionKeyEncryptionAlgorithm = r$1, this.s2k = Mi(e$1), this.s2k.generateSalt();
		const { blockSize: n$1, keySize: i$1 } = Ir(r$1), s$1 = await this.s2k.produceKey(t$1, i$1);
		if (null === this.sessionKey && (this.sessionKey = Rn(this.sessionKeyAlgorithm)), this.version >= 5) {
			const t$2 = Si(this.aeadAlgorithm);
			this.iv = yt(t$2.ivLength);
			const e$2 = new Uint8Array([
				192 | sa.tag,
				this.version,
				this.sessionKeyEncryptionAlgorithm,
				this.aeadAlgorithm
			]), n$2 = 6 === this.version ? await Dr(R.hash.sha256, s$1, new Uint8Array(), e$2, i$1) : s$1, a$1 = await t$2(r$1, n$2);
			this.encrypted = await a$1.encrypt(this.sessionKey, this.iv, e$2);
		} else {
			const t$2 = F.concatUint8Array([new Uint8Array([this.sessionKeyAlgorithm]), this.sessionKey]);
			this.encrypted = await zn(r$1, s$1, t$2, new Uint8Array(n$1));
		}
	}
};
var aa = class aa {
	static get tag() {
		return R.packet.publicKey;
	}
	constructor(t$1 = new Date(), e$1 = T) {
		this.version = e$1.v6Keys ? 6 : 4, this.created = F.normalizeDate(t$1), this.algorithm = null, this.publicParams = null, this.expirationTimeV3 = 0, this.fingerprint = null, this.keyID = null;
	}
	static fromSecretKeyPacket(t$1) {
		const e$1 = new aa(), { version: r$1, created: n$1, algorithm: i$1, publicParams: s$1, keyID: a$1, fingerprint: o$1 } = t$1;
		return e$1.version = r$1, e$1.created = n$1, e$1.algorithm = i$1, e$1.publicParams = s$1, e$1.keyID = a$1, e$1.fingerprint = o$1, e$1;
	}
	async read(t$1, e$1 = T) {
		let r$1 = 0;
		if (this.version = t$1[r$1++], 5 === this.version && !e$1.enableParsingV5Entities) throw new se("Support for parsing v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
		if (4 === this.version || 5 === this.version || 6 === this.version) {
			this.created = F.readDate(t$1.subarray(r$1, r$1 + 4)), r$1 += 4, this.algorithm = t$1[r$1++], this.version >= 5 && (r$1 += 4);
			const { read: e$2, publicParams: n$1 } = function(t$2, e$3) {
				let r$2 = 0;
				switch (t$2) {
					case R.publicKey.rsaEncrypt:
					case R.publicKey.rsaEncryptSign:
					case R.publicKey.rsaSign: {
						const t$3 = F.readMPI(e$3.subarray(r$2));
						r$2 += t$3.length + 2;
						const n$2 = F.readMPI(e$3.subarray(r$2));
						return r$2 += n$2.length + 2, {
							read: r$2,
							publicParams: {
								n: t$3,
								e: n$2
							}
						};
					}
					case R.publicKey.dsa: {
						const t$3 = F.readMPI(e$3.subarray(r$2));
						r$2 += t$3.length + 2;
						const n$2 = F.readMPI(e$3.subarray(r$2));
						r$2 += n$2.length + 2;
						const i$1 = F.readMPI(e$3.subarray(r$2));
						r$2 += i$1.length + 2;
						const s$1 = F.readMPI(e$3.subarray(r$2));
						return r$2 += s$1.length + 2, {
							read: r$2,
							publicParams: {
								p: t$3,
								q: n$2,
								g: i$1,
								y: s$1
							}
						};
					}
					case R.publicKey.elgamal: {
						const t$3 = F.readMPI(e$3.subarray(r$2));
						r$2 += t$3.length + 2;
						const n$2 = F.readMPI(e$3.subarray(r$2));
						r$2 += n$2.length + 2;
						const i$1 = F.readMPI(e$3.subarray(r$2));
						return r$2 += i$1.length + 2, {
							read: r$2,
							publicParams: {
								p: t$3,
								g: n$2,
								y: i$1
							}
						};
					}
					case R.publicKey.ecdsa: {
						const t$3 = new Wt();
						r$2 += t$3.read(e$3), Tn(t$3);
						const n$2 = F.readMPI(e$3.subarray(r$2));
						return r$2 += n$2.length + 2, {
							read: r$2,
							publicParams: {
								oid: t$3,
								Q: n$2
							}
						};
					}
					case R.publicKey.eddsaLegacy: {
						const t$3 = new Wt();
						if (r$2 += t$3.read(e$3), Tn(t$3), t$3.getName() !== R.curve.ed25519Legacy) throw Error("Unexpected OID for eddsaLegacy");
						let n$2 = F.readMPI(e$3.subarray(r$2));
						return r$2 += n$2.length + 2, n$2 = F.leftPad(n$2, 33), {
							read: r$2,
							publicParams: {
								oid: t$3,
								Q: n$2
							}
						};
					}
					case R.publicKey.ecdh: {
						const t$3 = new Wt();
						r$2 += t$3.read(e$3), Tn(t$3);
						const n$2 = F.readMPI(e$3.subarray(r$2));
						r$2 += n$2.length + 2;
						const i$1 = new Sn();
						return r$2 += i$1.read(e$3.subarray(r$2)), {
							read: r$2,
							publicParams: {
								oid: t$3,
								Q: n$2,
								kdfParams: i$1
							}
						};
					}
					case R.publicKey.ed25519:
					case R.publicKey.ed448:
					case R.publicKey.x25519:
					case R.publicKey.x448: {
						const n$2 = F.readExactSubarray(e$3, r$2, r$2 + Mn(t$2));
						return r$2 += n$2.length, {
							read: r$2,
							publicParams: { A: n$2 }
						};
					}
					default: throw new se("Unknown public key encryption algorithm.");
				}
			}(this.algorithm, t$1.subarray(r$1));
			if (6 === this.version && n$1.oid && (n$1.oid.getName() === R.curve.curve25519Legacy || n$1.oid.getName() === R.curve.ed25519Legacy)) throw Error("Legacy curve25519 cannot be used with v6 keys");
			return this.publicParams = n$1, r$1 += e$2, await this.computeFingerprintAndKeyID(), r$1;
		}
		throw new se(`Version ${this.version} of the key packet is unsupported.`);
	}
	write() {
		const t$1 = [];
		t$1.push(new Uint8Array([this.version])), t$1.push(F.writeDate(this.created)), t$1.push(new Uint8Array([this.algorithm]));
		const e$1 = Pn(this.algorithm, this.publicParams);
		return this.version >= 5 && t$1.push(F.writeNumber(e$1.length, 4)), t$1.push(e$1), F.concatUint8Array(t$1);
	}
	writeForHash(t$1) {
		const e$1 = this.writePublicKey(), r$1 = 149 + t$1, n$1 = t$1 >= 5 ? 4 : 2;
		return F.concatUint8Array([
			new Uint8Array([r$1]),
			F.writeNumber(e$1.length, n$1),
			e$1
		]);
	}
	isDecrypted() {
		return null;
	}
	getCreationTime() {
		return this.created;
	}
	getKeyID() {
		return this.keyID;
	}
	async computeFingerprintAndKeyID() {
		if (await this.computeFingerprint(), this.keyID = new xs(), this.version >= 5) this.keyID.read(this.fingerprint.subarray(0, 8));
else {
			if (4 !== this.version) throw Error("Unsupported key version");
			this.keyID.read(this.fingerprint.subarray(12, 20));
		}
	}
	async computeFingerprint() {
		const t$1 = this.writeForHash(this.version);
		if (this.version >= 5) this.fingerprint = await Qt(R.hash.sha256, t$1);
else {
			if (4 !== this.version) throw Error("Unsupported key version");
			this.fingerprint = await Qt(R.hash.sha1, t$1);
		}
	}
	getFingerprintBytes() {
		return this.fingerprint;
	}
	getFingerprint() {
		return F.uint8ArrayToHex(this.getFingerprintBytes());
	}
	hasSameFingerprintAs(t$1) {
		return this.version === t$1.version && F.equalsUint8Array(this.writePublicKey(), t$1.writePublicKey());
	}
	getAlgorithmInfo() {
		const t$1 = {};
		t$1.algorithm = R.read(R.publicKey, this.algorithm);
		const e$1 = this.publicParams.n || this.publicParams.p;
		return e$1 ? t$1.bits = F.uint8ArrayBitLength(e$1) : this.publicParams.oid && (t$1.curve = this.publicParams.oid.getName()), t$1;
	}
};
aa.prototype.readPublicKey = aa.prototype.read, aa.prototype.writePublicKey = aa.prototype.write;
const oa = /*#__PURE__*/ F.constructAllowedPackets([
	Ps,
	Vs,
	Ls,
	Ms
]);
var ca = class {
	static get tag() {
		return R.packet.symmetricallyEncryptedData;
	}
	constructor() {
		this.encrypted = null, this.packets = null;
	}
	read(t$1) {
		this.encrypted = t$1;
	}
	write() {
		return this.encrypted;
	}
	async decrypt(t$1, e$1, r$1 = T) {
		if (!r$1.allowUnauthenticatedMessages) throw Error("Message is not authenticated.");
		const { blockSize: n$1 } = Ir(t$1), i$1 = await C(B(this.encrypted)), s$1 = await Gn(t$1, e$1, i$1.subarray(n$1 + 2), i$1.subarray(2, n$1 + 2));
		this.packets = await Hs.fromBinary(s$1, oa, r$1);
	}
	async encrypt(t$1, e$1, r$1 = T) {
		const n$1 = this.packets.write(), { blockSize: i$1 } = Ir(t$1), s$1 = await Hn(t$1), a$1 = await zn(t$1, e$1, s$1, new Uint8Array(i$1)), o$1 = await zn(t$1, e$1, n$1, a$1.subarray(2));
		this.encrypted = F.concat([a$1, o$1]);
	}
};
var ha = class ha extends aa {
	static get tag() {
		return R.packet.publicSubkey;
	}
	constructor(t$1, e$1) {
		super(t$1, e$1);
	}
	static fromSecretSubkeyPacket(t$1) {
		const e$1 = new ha(), { version: r$1, created: n$1, algorithm: i$1, publicParams: s$1, keyID: a$1, fingerprint: o$1 } = t$1;
		return e$1.version = r$1, e$1.created = n$1, e$1.algorithm = i$1, e$1.publicParams = s$1, e$1.keyID = a$1, e$1.fingerprint = o$1, e$1;
	}
};
var fa = class fa {
	static get tag() {
		return R.packet.userAttribute;
	}
	constructor() {
		this.attributes = [];
	}
	read(t$1) {
		let e$1 = 0;
		for (; e$1 < t$1.length;) {
			const r$1 = Xt(t$1.subarray(e$1, t$1.length));
			e$1 += r$1.offset, this.attributes.push(F.uint8ArrayToString(t$1.subarray(e$1, e$1 + r$1.len))), e$1 += r$1.len;
		}
	}
	write() {
		const t$1 = [];
		for (let e$1 = 0; e$1 < this.attributes.length; e$1++) t$1.push($t(this.attributes[e$1].length)), t$1.push(F.stringToUint8Array(this.attributes[e$1]));
		return F.concatUint8Array(t$1);
	}
	equals(t$1) {
		return !!(t$1 && t$1 instanceof fa) && this.attributes.every(function(e$1, r$1) {
			return e$1 === t$1.attributes[r$1];
		});
	}
};
var la = class extends aa {
	static get tag() {
		return R.packet.secretKey;
	}
	constructor(t$1 = new Date(), e$1 = T) {
		super(t$1, e$1), this.keyMaterial = null, this.isEncrypted = null, this.s2kUsage = 0, this.s2k = null, this.symmetric = null, this.aead = null, this.isLegacyAEAD = null, this.privateParams = null, this.usedModernAEAD = null;
	}
	async read(t$1, e$1 = T) {
		let r$1 = await this.readPublicKey(t$1, e$1);
		const n$1 = r$1;
		this.s2kUsage = t$1[r$1++], 5 === this.version && r$1++, 6 === this.version && this.s2kUsage && r$1++;
		try {
			if (255 === this.s2kUsage || 254 === this.s2kUsage || 253 === this.s2kUsage) {
				this.symmetric = t$1[r$1++], 253 === this.s2kUsage && (this.aead = t$1[r$1++]), 6 === this.version && r$1++;
				const e$2 = t$1[r$1++];
				if (this.s2k = Ti(e$2), r$1 += this.s2k.read(t$1.subarray(r$1, t$1.length)), "gnu-dummy" === this.s2k.type) return;
			} else this.s2kUsage && (this.symmetric = this.s2kUsage);
			this.s2kUsage && (this.isLegacyAEAD = 253 === this.s2kUsage && (5 === this.version || 4 === this.version && e$1.parseAEADEncryptedV4KeysAsLegacy), 253 !== this.s2kUsage || this.isLegacyAEAD ? (this.iv = t$1.subarray(r$1, r$1 + Ir(this.symmetric).blockSize), this.usedModernAEAD = !1) : (this.iv = t$1.subarray(r$1, r$1 + Si(this.aead).ivLength), this.usedModernAEAD = !0), r$1 += this.iv.length);
		} catch (e$2) {
			if (!this.s2kUsage) throw e$2;
			this.unparseableKeyMaterial = t$1.subarray(n$1), this.isEncrypted = !0;
		}
		if (5 === this.version && (r$1 += 4), this.keyMaterial = t$1.subarray(r$1), this.isEncrypted = !!this.s2kUsage, !this.isEncrypted) {
			let t$2;
			if (6 === this.version) t$2 = this.keyMaterial;
else if (t$2 = this.keyMaterial.subarray(0, -2), !F.equalsUint8Array(F.writeChecksum(t$2), this.keyMaterial.subarray(-2))) throw Error("Key checksum mismatch");
			try {
				const { read: e$2, privateParams: r$2 } = Un(this.algorithm, t$2, this.publicParams);
				if (e$2 < t$2.length) throw Error("Error reading MPIs");
				this.privateParams = r$2;
			} catch (t$3) {
				if (t$3 instanceof se) throw t$3;
				throw Error("Error reading MPIs");
			}
		}
	}
	write() {
		const t$1 = this.writePublicKey();
		if (this.unparseableKeyMaterial) return F.concatUint8Array([t$1, this.unparseableKeyMaterial]);
		const e$1 = [t$1];
		e$1.push(new Uint8Array([this.s2kUsage]));
		const r$1 = [];
		if (255 === this.s2kUsage || 254 === this.s2kUsage || 253 === this.s2kUsage) {
			r$1.push(this.symmetric), 253 === this.s2kUsage && r$1.push(this.aead);
			const t$2 = this.s2k.write();
			6 === this.version && r$1.push(t$2.length), r$1.push(...t$2);
		}
		return this.s2kUsage && "gnu-dummy" !== this.s2k.type && r$1.push(...this.iv), (5 === this.version || 6 === this.version && this.s2kUsage) && e$1.push(new Uint8Array([r$1.length])), e$1.push(new Uint8Array(r$1)), this.isDummy() || (this.s2kUsage || (this.keyMaterial = Pn(this.algorithm, this.privateParams)), 5 === this.version && e$1.push(F.writeNumber(this.keyMaterial.length, 4)), e$1.push(this.keyMaterial), this.s2kUsage || 6 === this.version || e$1.push(F.writeChecksum(this.keyMaterial))), F.concatUint8Array(e$1);
	}
	isDecrypted() {
		return !1 === this.isEncrypted;
	}
	isMissingSecretKeyMaterial() {
		return void 0 !== this.unparseableKeyMaterial || this.isDummy();
	}
	isDummy() {
		return !(!this.s2k || "gnu-dummy" !== this.s2k.type);
	}
	makeDummy(t$1 = T) {
		this.isDummy() || (this.isDecrypted() && this.clearPrivateParams(), delete this.unparseableKeyMaterial, this.isEncrypted = null, this.keyMaterial = null, this.s2k = Ti(R.s2k.gnu, t$1), this.s2k.algorithm = 0, this.s2k.c = 0, this.s2k.type = "gnu-dummy", this.s2kUsage = 254, this.symmetric = R.symmetric.aes256, this.isLegacyAEAD = null, this.usedModernAEAD = null);
	}
	async encrypt(t$1, e$1 = T) {
		if (this.isDummy()) return;
		if (!this.isDecrypted()) throw Error("Key packet is already encrypted");
		if (!t$1) throw Error("A non-empty passphrase is required for key encryption.");
		this.s2k = Mi(e$1), this.s2k.generateSalt();
		const r$1 = Pn(this.algorithm, this.privateParams);
		this.symmetric = R.symmetric.aes256;
		const { blockSize: n$1 } = Ir(this.symmetric);
		if (e$1.aeadProtect) {
			this.s2kUsage = 253, this.aead = e$1.preferredAEADAlgorithm;
			const i$1 = Si(this.aead);
			this.isLegacyAEAD = 5 === this.version, this.usedModernAEAD = !this.isLegacyAEAD;
			const s$1 = ee(this.constructor.tag), a$1 = await ya(this.version, this.s2k, t$1, this.symmetric, this.aead, s$1, this.isLegacyAEAD), o$1 = await i$1(this.symmetric, a$1);
			this.iv = this.isLegacyAEAD ? yt(n$1) : yt(i$1.ivLength);
			const c$1 = this.isLegacyAEAD ? new Uint8Array() : F.concatUint8Array([s$1, this.writePublicKey()]);
			this.keyMaterial = await o$1.encrypt(r$1, this.iv.subarray(0, i$1.ivLength), c$1);
		} else {
			this.s2kUsage = 254, this.usedModernAEAD = !1;
			const e$2 = await ya(this.version, this.s2k, t$1, this.symmetric);
			this.iv = yt(n$1), this.keyMaterial = await zn(this.symmetric, e$2, F.concatUint8Array([r$1, await Qt(R.hash.sha1, r$1)]), this.iv);
		}
	}
	async decrypt(t$1) {
		if (this.isDummy()) return !1;
		if (this.unparseableKeyMaterial) throw Error("Key packet cannot be decrypted: unsupported S2K or cipher algo");
		if (this.isDecrypted()) throw Error("Key packet is already decrypted.");
		let e$1;
		const r$1 = ee(this.constructor.tag);
		if (254 !== this.s2kUsage && 253 !== this.s2kUsage) throw 255 === this.s2kUsage ? Error("Encrypted private key is authenticated using an insecure two-byte hash") : Error("Private key is encrypted using an insecure S2K function: unsalted MD5");
		let n$1;
		if (e$1 = await ya(this.version, this.s2k, t$1, this.symmetric, this.aead, r$1, this.isLegacyAEAD), 253 === this.s2kUsage) {
			const t$2 = Si(this.aead, !0), i$1 = await t$2(this.symmetric, e$1);
			try {
				const e$2 = this.isLegacyAEAD ? new Uint8Array() : F.concatUint8Array([r$1, this.writePublicKey()]);
				n$1 = await i$1.decrypt(this.keyMaterial, this.iv.subarray(0, t$2.ivLength), e$2);
			} catch (t$3) {
				if ("Authentication tag mismatch" === t$3.message) throw Error("Incorrect key passphrase: " + t$3.message);
				throw t$3;
			}
		} else {
			const t$2 = await Gn(this.symmetric, e$1, this.keyMaterial, this.iv);
			n$1 = t$2.subarray(0, -20);
			const r$2 = await Qt(R.hash.sha1, n$1);
			if (!F.equalsUint8Array(r$2, t$2.subarray(-20))) throw Error("Incorrect key passphrase");
		}
		try {
			const { privateParams: t$2 } = Un(this.algorithm, n$1, this.publicParams);
			this.privateParams = t$2;
		} catch (t$2) {
			throw Error("Error reading MPIs");
		}
		this.isEncrypted = !1, this.keyMaterial = null, this.s2kUsage = 0, this.aead = null, this.symmetric = null, this.isLegacyAEAD = null;
	}
	async validate() {
		if (this.isDummy()) return;
		if (!this.isDecrypted()) throw Error("Key is not decrypted");
		if (this.usedModernAEAD) return;
		let t$1;
		try {
			t$1 = await Qn(this.algorithm, this.publicParams, this.privateParams);
		} catch (e$1) {
			t$1 = !1;
		}
		if (!t$1) throw Error("Key is invalid");
	}
	async generate(t$1, e$1) {
		if (6 === this.version && (this.algorithm === R.publicKey.ecdh && e$1 === R.curve.curve25519Legacy || this.algorithm === R.publicKey.eddsaLegacy)) throw Error(`Cannot generate v6 keys of type 'ecc' with curve ${e$1}. Generate a key of type 'curve25519' instead`);
		const { privateParams: r$1, publicParams: n$1 } = await xn(this.algorithm, t$1, e$1);
		this.privateParams = r$1, this.publicParams = n$1, this.isEncrypted = !1;
	}
	clearPrivateParams() {
		this.isMissingSecretKeyMaterial() || (Object.keys(this.privateParams).forEach((t$1) => {
			this.privateParams[t$1].fill(0), delete this.privateParams[t$1];
		}), this.privateParams = null, this.isEncrypted = !0);
	}
};
async function ya(t$1, e$1, r$1, n$1, i$1, s$1, a$1) {
	if ("argon2" === e$1.type && !i$1) throw Error("Using Argon2 S2K without AEAD is not allowed");
	if ("simple" === e$1.type && 6 === t$1) throw Error("Using Simple S2K with version 6 keys is not allowed");
	const { keySize: o$1 } = Ir(n$1), c$1 = await e$1.produceKey(r$1, o$1);
	if (!i$1 || 5 === t$1 || a$1) return c$1;
	const u$1 = F.concatUint8Array([s$1, new Uint8Array([
		t$1,
		n$1,
		i$1
	])]);
	return Dr(R.hash.sha256, c$1, new Uint8Array(), u$1, o$1);
}
var ga = class ga {
	static get tag() {
		return R.packet.userID;
	}
	constructor() {
		this.userID = "", this.name = "", this.email = "", this.comment = "";
	}
	static fromObject(t$1) {
		if (F.isString(t$1) || t$1.name && !F.isString(t$1.name) || t$1.email && !F.isEmailAddress(t$1.email) || t$1.comment && !F.isString(t$1.comment)) throw Error("Invalid user ID format");
		const e$1 = new ga();
		Object.assign(e$1, t$1);
		const r$1 = [];
		return e$1.name && r$1.push(e$1.name), e$1.comment && r$1.push(`(${e$1.comment})`), e$1.email && r$1.push(`<${e$1.email}>`), e$1.userID = r$1.join(" "), e$1;
	}
	read(t$1, e$1 = T) {
		const r$1 = F.decodeUTF8(t$1);
		if (r$1.length > e$1.maxUserIDLength) throw Error("User ID string is too long");
		const n$1 = (t$2) => /^[^\s@]+@[^\s@]+$/.test(t$2), i$1 = r$1.indexOf("<"), s$1 = r$1.lastIndexOf(">");
		if (-1 !== i$1 && -1 !== s$1 && s$1 > i$1) {
			const t$2 = r$1.substring(i$1 + 1, s$1);
			if (n$1(t$2)) {
				this.email = t$2;
				const e$2 = r$1.substring(0, i$1).trim(), n$2 = e$2.indexOf("("), s$2 = e$2.lastIndexOf(")");
				-1 !== n$2 && -1 !== s$2 && s$2 > n$2 ? (this.comment = e$2.substring(n$2 + 1, s$2).trim(), this.name = e$2.substring(0, n$2).trim()) : (this.name = e$2, this.comment = "");
			}
		} else n$1(r$1.trim()) && (this.email = r$1.trim(), this.name = "", this.comment = "");
		this.userID = r$1;
	}
	write() {
		return F.encodeUTF8(this.userID);
	}
	equals(t$1) {
		return t$1 && t$1.userID === this.userID;
	}
};
var pa = class extends la {
	static get tag() {
		return R.packet.secretSubkey;
	}
	constructor(t$1 = new Date(), e$1 = T) {
		super(t$1, e$1);
	}
};
var ma = class {
	constructor(t$1) {
		this.packets = t$1 || new Hs();
	}
	write() {
		return this.packets.write();
	}
	armor(t$1 = T) {
		const e$1 = this.packets.some((t$2) => t$2.constructor.tag === Ms.tag && 6 !== t$2.version);
		return $(R.armor.signature, this.write(), void 0, void 0, void 0, e$1, t$1);
	}
	getSigningKeyIDs() {
		return this.packets.map((t$1) => t$1.issuerKeyID);
	}
};
async function ka(t$1, e$1) {
	const r$1 = new pa(t$1.date, e$1);
	return r$1.packets = null, r$1.algorithm = R.write(R.publicKey, t$1.algorithm), await r$1.generate(t$1.rsaBits, t$1.curve), await r$1.computeFingerprintAndKeyID(), r$1;
}
async function Ea(t$1, e$1) {
	const r$1 = new la(t$1.date, e$1);
	return r$1.packets = null, r$1.algorithm = R.write(R.publicKey, t$1.algorithm), await r$1.generate(t$1.rsaBits, t$1.curve, t$1.config), await r$1.computeFingerprintAndKeyID(), r$1;
}
async function va(t$1, e$1, r$1, n$1, i$1 = new Date(), s$1) {
	let a$1, o$1;
	for (let c$1 = t$1.length - 1; c$1 >= 0; c$1--) try {
		(!a$1 || t$1[c$1].created >= a$1.created) && (await t$1[c$1].verify(e$1, r$1, n$1, i$1, void 0, s$1), a$1 = t$1[c$1]);
	} catch (t$2) {
		o$1 = t$2;
	}
	if (!a$1) throw F.wrapError(`Could not find valid ${R.read(R.signature, r$1)} signature in key ${e$1.getKeyID().toHex()}`.replace("certGeneric ", "self-").replace(/([a-z])([A-Z])/g, (t$2, e$2, r$2) => e$2 + " " + r$2.toLowerCase()), o$1);
	return a$1;
}
function Ba(t$1, e$1, r$1 = new Date()) {
	const n$1 = F.normalizeDate(r$1);
	if (null !== n$1) {
		const r$2 = Ua(t$1, e$1);
		return !(t$1.created <= n$1 && n$1 < r$2);
	}
	return !1;
}
async function Ia(t$1, e$1, r$1, n$1) {
	const i$1 = {};
	i$1.key = e$1, i$1.bind = t$1;
	const s$1 = { signatureType: R.signature.subkeyBinding };
	r$1.sign ? (s$1.keyFlags = [R.keyFlags.signData], s$1.embeddedSignature = await Ka(i$1, [], t$1, { signatureType: R.signature.keyBinding }, r$1.date, void 0, void 0, void 0, n$1)) : s$1.keyFlags = [R.keyFlags.encryptCommunication | R.keyFlags.encryptStorage], r$1.keyExpirationTime > 0 && (s$1.keyExpirationTime = r$1.keyExpirationTime, s$1.keyNeverExpires = !1);
	return await Ka(i$1, [], e$1, s$1, r$1.date, void 0, void 0, void 0, n$1);
}
async function Sa(t$1, e$1, r$1 = new Date(), n$1 = [], i$1) {
	const s$1 = R.hash.sha256, a$1 = i$1.preferredHashAlgorithm, o$1 = await Promise.all(t$1.map(async (t$2, e$2) => (await t$2.getPrimarySelfSignature(r$1, n$1[e$2], i$1)).preferredHashAlgorithms || [])), c$1 = new Map();
	for (const t$2 of o$1) for (const e$2 of t$2) try {
		const t$3 = R.write(R.hash, e$2);
		c$1.set(t$3, c$1.has(t$3) ? c$1.get(t$3) + 1 : 1);
	} catch {}
	const u$1 = (e$2) => 0 === t$1.length || c$1.get(e$2) === t$1.length || e$2 === s$1, h$1 = () => {
		if (0 === c$1.size) return s$1;
		const t$2 = Array.from(c$1.keys()).filter((t$3) => u$1(t$3)).sort((t$3, e$2) => Rt(t$3) - Rt(e$2))[0];
		return Rt(t$2) >= Rt(s$1) ? t$2 : s$1;
	};
	if (new Set([
		R.publicKey.ecdsa,
		R.publicKey.eddsaLegacy,
		R.publicKey.ed25519,
		R.publicKey.ed448
	]).has(e$1.algorithm)) {
		const t$2 = function(t$3, e$2) {
			switch (t$3) {
				case R.publicKey.ecdsa:
				case R.publicKey.eddsaLegacy: return Zr(e$2);
				case R.publicKey.ed25519:
				case R.publicKey.ed448: return ge(t$3);
				default: throw Error("Unknown elliptic signing algo");
			}
		}(e$1.algorithm, e$1.publicParams.oid), r$2 = u$1(a$1), n$2 = Rt(a$1) >= Rt(t$2);
		if (r$2 && n$2) return a$1;
		{
			const e$2 = h$1();
			return Rt(e$2) >= Rt(t$2) ? e$2 : t$2;
		}
	}
	return u$1(a$1) ? a$1 : h$1();
}
async function Ka(t$1, e$1, r$1, n$1, i$1, s$1, a$1 = [], o$1 = !1, c$1) {
	if (r$1.isDummy()) throw Error("Cannot sign with a gnu-dummy key.");
	if (!r$1.isDecrypted()) throw Error("Signing key is not decrypted.");
	const u$1 = new Ms();
	return Object.assign(u$1, n$1), u$1.publicKeyAlgorithm = r$1.algorithm, u$1.hashAlgorithm = await Sa(e$1, r$1, i$1, s$1, c$1), u$1.rawNotations = [...a$1], await u$1.sign(r$1, t$1, i$1, o$1, c$1), u$1;
}
async function Ca(t$1, e$1, r$1, n$1 = new Date(), i$1) {
	(t$1 = t$1[r$1]) && (e$1[r$1].length ? await Promise.all(t$1.map(async function(t$2) {
		t$2.isExpired(n$1) || i$1 && !await i$1(t$2) || e$1[r$1].some(function(e$2) {
			return F.equalsUint8Array(e$2.writeParams(), t$2.writeParams());
		}) || e$1[r$1].push(t$2);
	})) : e$1[r$1] = t$1);
}
async function Da(t$1, e$1, r$1, n$1, i$1, s$1, a$1 = new Date(), o$1) {
	s$1 = s$1 || t$1;
	const c$1 = [];
	return await Promise.all(n$1.map(async function(t$2) {
		try {
			if (!i$1 || t$2.issuerKeyID.equals(i$1.issuerKeyID)) {
				const n$2 = ![
					R.reasonForRevocation.keyRetired,
					R.reasonForRevocation.keySuperseded,
					R.reasonForRevocation.userIDInvalid
				].includes(t$2.reasonForRevocationFlag);
				await t$2.verify(s$1, e$1, r$1, n$2 ? null : a$1, !1, o$1), c$1.push(t$2.issuerKeyID);
			}
		} catch (t$3) {}
	})), i$1 ? (i$1.revoked = !!c$1.some((t$2) => t$2.equals(i$1.issuerKeyID)) || i$1.revoked || !1, i$1.revoked) : c$1.length > 0;
}
function Ua(t$1, e$1) {
	let r$1;
	return !1 === e$1.keyNeverExpires && (r$1 = t$1.created.getTime() + 1e3 * e$1.keyExpirationTime), r$1 ? new Date(r$1) : Infinity;
}
function Pa(t$1, e$1 = {}) {
	switch (t$1.type = t$1.type || e$1.type, t$1.curve = t$1.curve || e$1.curve, t$1.rsaBits = t$1.rsaBits || e$1.rsaBits, t$1.keyExpirationTime = void 0 !== t$1.keyExpirationTime ? t$1.keyExpirationTime : e$1.keyExpirationTime, t$1.passphrase = F.isString(t$1.passphrase) ? t$1.passphrase : e$1.passphrase, t$1.date = t$1.date || e$1.date, t$1.sign = t$1.sign || !1, t$1.type) {
		case "ecc":
			try {
				t$1.curve = R.write(R.curve, t$1.curve);
			} catch (t$2) {
				throw Error("Unknown curve");
			}
			t$1.curve !== R.curve.ed25519Legacy && t$1.curve !== R.curve.curve25519Legacy && "ed25519" !== t$1.curve && "curve25519" !== t$1.curve || (t$1.curve = t$1.sign ? R.curve.ed25519Legacy : R.curve.curve25519Legacy), t$1.sign ? t$1.algorithm = t$1.curve === R.curve.ed25519Legacy ? R.publicKey.eddsaLegacy : R.publicKey.ecdsa : t$1.algorithm = R.publicKey.ecdh;
			break;
		case "curve25519":
			t$1.algorithm = t$1.sign ? R.publicKey.ed25519 : R.publicKey.x25519;
			break;
		case "curve448":
			t$1.algorithm = t$1.sign ? R.publicKey.ed448 : R.publicKey.x448;
			break;
		case "rsa":
			t$1.algorithm = R.publicKey.rsaEncryptSign;
			break;
		default: throw Error("Unsupported key type " + t$1.type);
	}
	return t$1;
}
function xa(t$1, e$1, r$1) {
	switch (t$1.algorithm) {
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaSign:
		case R.publicKey.dsa:
		case R.publicKey.ecdsa:
		case R.publicKey.eddsaLegacy:
		case R.publicKey.ed25519:
		case R.publicKey.ed448:
			if (!e$1.keyFlags && !r$1.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
			return !e$1.keyFlags || !!(e$1.keyFlags[0] & R.keyFlags.signData);
		default: return !1;
	}
}
function Qa(t$1, e$1, r$1) {
	switch (t$1.algorithm) {
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaEncrypt:
		case R.publicKey.elgamal:
		case R.publicKey.ecdh:
		case R.publicKey.x25519:
		case R.publicKey.x448:
			if (!e$1.keyFlags && !r$1.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
			return !e$1.keyFlags || !!(e$1.keyFlags[0] & R.keyFlags.encryptCommunication) || !!(e$1.keyFlags[0] & R.keyFlags.encryptStorage);
		default: return !1;
	}
}
function Ra(t$1, e$1, r$1) {
	if (!e$1.keyFlags && !r$1.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
	switch (t$1.algorithm) {
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaEncrypt:
		case R.publicKey.elgamal:
		case R.publicKey.ecdh:
		case R.publicKey.x25519:
		case R.publicKey.x448: return !(!(!e$1.keyFlags || !!(e$1.keyFlags[0] & R.keyFlags.signData)) || !r$1.allowInsecureDecryptionWithSigningKeys) || !e$1.keyFlags || !!(e$1.keyFlags[0] & R.keyFlags.encryptCommunication) || !!(e$1.keyFlags[0] & R.keyFlags.encryptStorage);
		default: return !1;
	}
}
function Ta(t$1, e$1) {
	const r$1 = R.write(R.publicKey, t$1.algorithm), n$1 = t$1.getAlgorithmInfo();
	if (e$1.rejectPublicKeyAlgorithms.has(r$1)) throw Error(n$1.algorithm + " keys are considered too weak.");
	switch (r$1) {
		case R.publicKey.rsaEncryptSign:
		case R.publicKey.rsaSign:
		case R.publicKey.rsaEncrypt:
			if (n$1.bits < e$1.minRSABits) throw Error(`RSA keys shorter than ${e$1.minRSABits} bits are considered too weak.`);
			break;
		case R.publicKey.ecdsa:
		case R.publicKey.eddsaLegacy:
		case R.publicKey.ecdh: if (e$1.rejectCurves.has(n$1.curve)) throw Error(`Support for ${n$1.algorithm} keys using curve ${n$1.curve} is disabled.`);
	}
}
var Ma = class Ma {
	constructor(t$1, e$1) {
		this.userID = t$1.constructor.tag === R.packet.userID ? t$1 : null, this.userAttribute = t$1.constructor.tag === R.packet.userAttribute ? t$1 : null, this.selfCertifications = [], this.otherCertifications = [], this.revocationSignatures = [], this.mainKey = e$1;
	}
	toPacketList() {
		const t$1 = new Hs();
		return t$1.push(this.userID || this.userAttribute), t$1.push(...this.revocationSignatures), t$1.push(...this.selfCertifications), t$1.push(...this.otherCertifications), t$1;
	}
	clone() {
		const t$1 = new Ma(this.userID || this.userAttribute, this.mainKey);
		return t$1.selfCertifications = [...this.selfCertifications], t$1.otherCertifications = [...this.otherCertifications], t$1.revocationSignatures = [...this.revocationSignatures], t$1;
	}
	async certify(t$1, e$1, r$1) {
		const n$1 = this.mainKey.keyPacket, i$1 = {
			userID: this.userID,
			userAttribute: this.userAttribute,
			key: n$1
		}, s$1 = new Ma(i$1.userID || i$1.userAttribute, this.mainKey);
		return s$1.otherCertifications = await Promise.all(t$1.map(async function(t$2) {
			if (!t$2.isPrivate()) throw Error("Need private key for signing");
			if (t$2.hasSameFingerprintAs(n$1)) throw Error("The user's own key can only be used for self-certifications");
			const s$2 = await t$2.getSigningKey(void 0, e$1, void 0, r$1);
			return Ka(i$1, [t$2], s$2.keyPacket, {
				signatureType: R.signature.certGeneric,
				keyFlags: [R.keyFlags.certifyKeys | R.keyFlags.signData]
			}, e$1, void 0, void 0, void 0, r$1);
		})), await s$1.update(this, e$1, r$1), s$1;
	}
	async isRevoked(t$1, e$1, r$1 = new Date(), n$1 = T) {
		const i$1 = this.mainKey.keyPacket;
		return Da(i$1, R.signature.certRevocation, {
			key: i$1,
			userID: this.userID,
			userAttribute: this.userAttribute
		}, this.revocationSignatures, t$1, e$1, r$1, n$1);
	}
	async verifyCertificate(t$1, e$1, r$1 = new Date(), n$1) {
		const i$1 = this, s$1 = this.mainKey.keyPacket, a$1 = {
			userID: this.userID,
			userAttribute: this.userAttribute,
			key: s$1
		}, { issuerKeyID: o$1 } = t$1, c$1 = e$1.filter((t$2) => t$2.getKeys(o$1).length > 0);
		return 0 === c$1.length ? null : (await Promise.all(c$1.map(async (e$2) => {
			const s$2 = await e$2.getSigningKey(o$1, t$1.created, void 0, n$1);
			if (t$1.revoked || await i$1.isRevoked(t$1, s$2.keyPacket, r$1, n$1)) throw Error("User certificate is revoked");
			try {
				await t$1.verify(s$2.keyPacket, R.signature.certGeneric, a$1, r$1, void 0, n$1);
			} catch (t$2) {
				throw F.wrapError("User certificate is invalid", t$2);
			}
		})), !0);
	}
	async verifyAllCertifications(t$1, e$1 = new Date(), r$1) {
		const n$1 = this, i$1 = this.selfCertifications.concat(this.otherCertifications);
		return Promise.all(i$1.map(async (i$2) => ({
			keyID: i$2.issuerKeyID,
			valid: await n$1.verifyCertificate(i$2, t$1, e$1, r$1).catch(() => !1)
		})));
	}
	async verify(t$1 = new Date(), e$1) {
		if (!this.selfCertifications.length) throw Error("No self-certifications found");
		const r$1 = this, n$1 = this.mainKey.keyPacket, i$1 = {
			userID: this.userID,
			userAttribute: this.userAttribute,
			key: n$1
		};
		let s$1;
		for (let a$1 = this.selfCertifications.length - 1; a$1 >= 0; a$1--) try {
			const s$2 = this.selfCertifications[a$1];
			if (s$2.revoked || await r$1.isRevoked(s$2, void 0, t$1, e$1)) throw Error("Self-certification is revoked");
			try {
				await s$2.verify(n$1, R.signature.certGeneric, i$1, t$1, void 0, e$1);
			} catch (t$2) {
				throw F.wrapError("Self-certification is invalid", t$2);
			}
			return !0;
		} catch (t$2) {
			s$1 = t$2;
		}
		throw s$1;
	}
	async update(t$1, e$1, r$1) {
		const n$1 = this.mainKey.keyPacket, i$1 = {
			userID: this.userID,
			userAttribute: this.userAttribute,
			key: n$1
		};
		await Ca(t$1, this, "selfCertifications", e$1, async function(t$2) {
			try {
				return await t$2.verify(n$1, R.signature.certGeneric, i$1, e$1, !1, r$1), !0;
			} catch (t$3) {
				return !1;
			}
		}), await Ca(t$1, this, "otherCertifications", e$1), await Ca(t$1, this, "revocationSignatures", e$1, function(t$2) {
			return Da(n$1, R.signature.certRevocation, i$1, [t$2], void 0, void 0, e$1, r$1);
		});
	}
	async revoke(t$1, { flag: e$1 = R.reasonForRevocation.noReason, string: r$1 = "" } = {}, n$1 = new Date(), i$1 = T) {
		const s$1 = {
			userID: this.userID,
			userAttribute: this.userAttribute,
			key: t$1
		}, a$1 = new Ma(s$1.userID || s$1.userAttribute, this.mainKey);
		return a$1.revocationSignatures.push(await Ka(s$1, [], t$1, {
			signatureType: R.signature.certRevocation,
			reasonForRevocationFlag: R.write(R.reasonForRevocation, e$1),
			reasonForRevocationString: r$1
		}, n$1, void 0, void 0, !1, i$1)), await a$1.update(this), a$1;
	}
};
var Fa = class Fa {
	constructor(t$1, e$1) {
		this.keyPacket = t$1, this.bindingSignatures = [], this.revocationSignatures = [], this.mainKey = e$1;
	}
	toPacketList() {
		const t$1 = new Hs();
		return t$1.push(this.keyPacket), t$1.push(...this.revocationSignatures), t$1.push(...this.bindingSignatures), t$1;
	}
	clone() {
		const t$1 = new Fa(this.keyPacket, this.mainKey);
		return t$1.bindingSignatures = [...this.bindingSignatures], t$1.revocationSignatures = [...this.revocationSignatures], t$1;
	}
	async isRevoked(t$1, e$1, r$1 = new Date(), n$1 = T) {
		const i$1 = this.mainKey.keyPacket;
		return Da(i$1, R.signature.subkeyRevocation, {
			key: i$1,
			bind: this.keyPacket
		}, this.revocationSignatures, t$1, e$1, r$1, n$1);
	}
	async verify(t$1 = new Date(), e$1 = T) {
		const r$1 = this.mainKey.keyPacket, n$1 = {
			key: r$1,
			bind: this.keyPacket
		}, i$1 = await va(this.bindingSignatures, r$1, R.signature.subkeyBinding, n$1, t$1, e$1);
		if (i$1.revoked || await this.isRevoked(i$1, null, t$1, e$1)) throw Error("Subkey is revoked");
		if (Ba(this.keyPacket, i$1, t$1)) throw Error("Subkey is expired");
		return i$1;
	}
	async getExpirationTime(t$1 = new Date(), e$1 = T) {
		const r$1 = this.mainKey.keyPacket, n$1 = {
			key: r$1,
			bind: this.keyPacket
		};
		let i$1;
		try {
			i$1 = await va(this.bindingSignatures, r$1, R.signature.subkeyBinding, n$1, t$1, e$1);
		} catch (t$2) {
			return null;
		}
		const s$1 = Ua(this.keyPacket, i$1), a$1 = i$1.getExpirationTime();
		return s$1 < a$1 ? s$1 : a$1;
	}
	async update(t$1, e$1 = new Date(), r$1 = T) {
		const n$1 = this.mainKey.keyPacket;
		if (!this.hasSameFingerprintAs(t$1)) throw Error("Subkey update method: fingerprints of subkeys not equal");
		this.keyPacket.constructor.tag === R.packet.publicSubkey && t$1.keyPacket.constructor.tag === R.packet.secretSubkey && (this.keyPacket = t$1.keyPacket);
		const i$1 = this, s$1 = {
			key: n$1,
			bind: i$1.keyPacket
		};
		await Ca(t$1, this, "bindingSignatures", e$1, async function(t$2) {
			for (let e$2 = 0; e$2 < i$1.bindingSignatures.length; e$2++) if (i$1.bindingSignatures[e$2].issuerKeyID.equals(t$2.issuerKeyID)) return t$2.created > i$1.bindingSignatures[e$2].created && (i$1.bindingSignatures[e$2] = t$2), !1;
			try {
				return await t$2.verify(n$1, R.signature.subkeyBinding, s$1, e$1, void 0, r$1), !0;
			} catch (t$3) {
				return !1;
			}
		}), await Ca(t$1, this, "revocationSignatures", e$1, function(t$2) {
			return Da(n$1, R.signature.subkeyRevocation, s$1, [t$2], void 0, void 0, e$1, r$1);
		});
	}
	async revoke(t$1, { flag: e$1 = R.reasonForRevocation.noReason, string: r$1 = "" } = {}, n$1 = new Date(), i$1 = T) {
		const s$1 = {
			key: t$1,
			bind: this.keyPacket
		}, a$1 = new Fa(this.keyPacket, this.mainKey);
		return a$1.revocationSignatures.push(await Ka(s$1, [], t$1, {
			signatureType: R.signature.subkeyRevocation,
			reasonForRevocationFlag: R.write(R.reasonForRevocation, e$1),
			reasonForRevocationString: r$1
		}, n$1, void 0, void 0, !1, i$1)), await a$1.update(this), a$1;
	}
	hasSameFingerprintAs(t$1) {
		return this.keyPacket.hasSameFingerprintAs(t$1.keyPacket || t$1);
	}
};
[
	"getKeyID",
	"getFingerprint",
	"getAlgorithmInfo",
	"getCreationTime",
	"isDecrypted"
].forEach((t$1) => {
	Fa.prototype[t$1] = function() {
		return this.keyPacket[t$1]();
	};
});
const Na = /*#__PURE__*/ F.constructAllowedPackets([Ms]), La = new Set([R.packet.publicKey, R.packet.privateKey]), Oa = new Set([
	R.packet.publicKey,
	R.packet.privateKey,
	R.packet.publicSubkey,
	R.packet.privateSubkey
]);
var Ha = class {
	packetListToStructure(t$1, e$1 = new Set()) {
		let r$1, n$1, i$1, s$1;
		for (const a$1 of t$1) {
			if (a$1 instanceof ce) {
				Oa.has(a$1.tag) && !s$1 && (s$1 = La.has(a$1.tag) ? La : Oa);
				continue;
			}
			const t$2 = a$1.constructor.tag;
			if (s$1) {
				if (!s$1.has(t$2)) continue;
				s$1 = null;
			}
			if (e$1.has(t$2)) throw Error("Unexpected packet type: " + t$2);
			switch (t$2) {
				case R.packet.publicKey:
				case R.packet.secretKey:
					if (this.keyPacket) throw Error("Key block contains multiple keys");
					if (this.keyPacket = a$1, n$1 = this.getKeyID(), !n$1) throw Error("Missing Key ID");
					break;
				case R.packet.userID:
				case R.packet.userAttribute:
					r$1 = new Ma(a$1, this), this.users.push(r$1);
					break;
				case R.packet.publicSubkey:
				case R.packet.secretSubkey:
					r$1 = null, i$1 = new Fa(a$1, this), this.subkeys.push(i$1);
					break;
				case R.packet.signature: switch (a$1.signatureType) {
					case R.signature.certGeneric:
					case R.signature.certPersona:
					case R.signature.certCasual:
					case R.signature.certPositive:
						if (!r$1) {
							F.printDebug("Dropping certification signatures without preceding user packet");
							continue;
						}
						a$1.issuerKeyID.equals(n$1) ? r$1.selfCertifications.push(a$1) : r$1.otherCertifications.push(a$1);
						break;
					case R.signature.certRevocation:
						r$1 ? r$1.revocationSignatures.push(a$1) : this.directSignatures.push(a$1);
						break;
					case R.signature.key:
						this.directSignatures.push(a$1);
						break;
					case R.signature.subkeyBinding:
						if (!i$1) {
							F.printDebug("Dropping subkey binding signature without preceding subkey packet");
							continue;
						}
						i$1.bindingSignatures.push(a$1);
						break;
					case R.signature.keyRevocation:
						this.revocationSignatures.push(a$1);
						break;
					case R.signature.subkeyRevocation:
						if (!i$1) {
							F.printDebug("Dropping subkey revocation signature without preceding subkey packet");
							continue;
						}
						i$1.revocationSignatures.push(a$1);
				}
			}
		}
	}
	toPacketList() {
		const t$1 = new Hs();
		return t$1.push(this.keyPacket), t$1.push(...this.revocationSignatures), t$1.push(...this.directSignatures), this.users.map((e$1) => t$1.push(...e$1.toPacketList())), this.subkeys.map((e$1) => t$1.push(...e$1.toPacketList())), t$1;
	}
	clone(t$1 = !1) {
		const e$1 = new this.constructor(this.toPacketList());
		return t$1 && e$1.getKeys().forEach((t$2) => {
			if (t$2.keyPacket = Object.create(Object.getPrototypeOf(t$2.keyPacket), Object.getOwnPropertyDescriptors(t$2.keyPacket)), !t$2.keyPacket.isDecrypted()) return;
			const e$2 = {};
			Object.keys(t$2.keyPacket.privateParams).forEach((r$1) => {
				e$2[r$1] = new Uint8Array(t$2.keyPacket.privateParams[r$1]);
			}), t$2.keyPacket.privateParams = e$2;
		}), e$1;
	}
	getSubkeys(t$1 = null) {
		return this.subkeys.filter((e$1) => !t$1 || e$1.getKeyID().equals(t$1, !0));
	}
	getKeys(t$1 = null) {
		const e$1 = [];
		return t$1 && !this.getKeyID().equals(t$1, !0) || e$1.push(this), e$1.concat(this.getSubkeys(t$1));
	}
	getKeyIDs() {
		return this.getKeys().map((t$1) => t$1.getKeyID());
	}
	getUserIDs() {
		return this.users.map((t$1) => t$1.userID ? t$1.userID.userID : null).filter((t$1) => null !== t$1);
	}
	write() {
		return this.toPacketList().write();
	}
	async getSigningKey(t$1 = null, e$1 = new Date(), r$1 = {}, n$1 = T) {
		await this.verifyPrimaryKey(e$1, r$1, n$1);
		const i$1 = this.keyPacket;
		try {
			Ta(i$1, n$1);
		} catch (t$2) {
			throw F.wrapError("Could not verify primary key", t$2);
		}
		const s$1 = this.subkeys.slice().sort((t$2, e$2) => e$2.keyPacket.created - t$2.keyPacket.created || e$2.keyPacket.algorithm - t$2.keyPacket.algorithm);
		let a$1;
		for (const r$2 of s$1) if (!t$1 || r$2.getKeyID().equals(t$1)) try {
			await r$2.verify(e$1, n$1);
			const t$2 = {
				key: i$1,
				bind: r$2.keyPacket
			}, s$2 = await va(r$2.bindingSignatures, i$1, R.signature.subkeyBinding, t$2, e$1, n$1);
			if (!xa(r$2.keyPacket, s$2, n$1)) continue;
			if (!s$2.embeddedSignature) throw Error("Missing embedded signature");
			return await va([s$2.embeddedSignature], r$2.keyPacket, R.signature.keyBinding, t$2, e$1, n$1), Ta(r$2.keyPacket, n$1), r$2;
		} catch (t$2) {
			a$1 = t$2;
		}
		try {
			const s$2 = await this.getPrimarySelfSignature(e$1, r$1, n$1);
			if ((!t$1 || i$1.getKeyID().equals(t$1)) && xa(i$1, s$2, n$1)) return Ta(i$1, n$1), this;
		} catch (t$2) {
			a$1 = t$2;
		}
		throw F.wrapError("Could not find valid signing key packet in key " + this.getKeyID().toHex(), a$1);
	}
	async getEncryptionKey(t$1, e$1 = new Date(), r$1 = {}, n$1 = T) {
		await this.verifyPrimaryKey(e$1, r$1, n$1);
		const i$1 = this.keyPacket;
		try {
			Ta(i$1, n$1);
		} catch (t$2) {
			throw F.wrapError("Could not verify primary key", t$2);
		}
		const s$1 = this.subkeys.slice().sort((t$2, e$2) => e$2.keyPacket.created - t$2.keyPacket.created || e$2.keyPacket.algorithm - t$2.keyPacket.algorithm);
		let a$1;
		for (const r$2 of s$1) if (!t$1 || r$2.getKeyID().equals(t$1)) try {
			await r$2.verify(e$1, n$1);
			const t$2 = {
				key: i$1,
				bind: r$2.keyPacket
			}, s$2 = await va(r$2.bindingSignatures, i$1, R.signature.subkeyBinding, t$2, e$1, n$1);
			if (Qa(r$2.keyPacket, s$2, n$1)) return Ta(r$2.keyPacket, n$1), r$2;
		} catch (t$2) {
			a$1 = t$2;
		}
		try {
			const s$2 = await this.getPrimarySelfSignature(e$1, r$1, n$1);
			if ((!t$1 || i$1.getKeyID().equals(t$1)) && Qa(i$1, s$2, n$1)) return Ta(i$1, n$1), this;
		} catch (t$2) {
			a$1 = t$2;
		}
		throw F.wrapError("Could not find valid encryption key packet in key " + this.getKeyID().toHex(), a$1);
	}
	async isRevoked(t$1, e$1, r$1 = new Date(), n$1 = T) {
		return Da(this.keyPacket, R.signature.keyRevocation, { key: this.keyPacket }, this.revocationSignatures, t$1, e$1, r$1, n$1);
	}
	async verifyPrimaryKey(t$1 = new Date(), e$1 = {}, r$1 = T) {
		const n$1 = this.keyPacket;
		if (await this.isRevoked(null, null, t$1, r$1)) throw Error("Primary key is revoked");
		if (Ba(n$1, await this.getPrimarySelfSignature(t$1, e$1, r$1), t$1)) throw Error("Primary key is expired");
		if (6 !== n$1.version) {
			const e$2 = await va(this.directSignatures, n$1, R.signature.key, { key: n$1 }, t$1, r$1).catch(() => {});
			if (e$2 && Ba(n$1, e$2, t$1)) throw Error("Primary key is expired");
		}
	}
	async getExpirationTime(t$1, e$1 = T) {
		let r$1;
		try {
			const n$1 = await this.getPrimarySelfSignature(null, t$1, e$1), i$1 = Ua(this.keyPacket, n$1), s$1 = n$1.getExpirationTime(), a$1 = 6 !== this.keyPacket.version && await va(this.directSignatures, this.keyPacket, R.signature.key, { key: this.keyPacket }, null, e$1).catch(() => {});
			if (a$1) {
				const t$2 = Ua(this.keyPacket, a$1);
				r$1 = Math.min(i$1, s$1, t$2);
			} else r$1 = i$1 < s$1 ? i$1 : s$1;
		} catch (t$2) {
			r$1 = null;
		}
		return F.normalizeDate(r$1);
	}
	async getPrimarySelfSignature(t$1 = new Date(), e$1 = {}, r$1 = T) {
		const n$1 = this.keyPacket;
		if (6 === n$1.version) return va(this.directSignatures, n$1, R.signature.key, { key: n$1 }, t$1, r$1);
		const { selfCertification: i$1 } = await this.getPrimaryUser(t$1, e$1, r$1);
		return i$1;
	}
	async getPrimaryUser(t$1 = new Date(), e$1 = {}, r$1 = T) {
		const n$1 = this.keyPacket, i$1 = [];
		let s$1;
		for (let a$2 = 0; a$2 < this.users.length; a$2++) try {
			const s$2 = this.users[a$2];
			if (!s$2.userID) continue;
			if (void 0 !== e$1.name && s$2.userID.name !== e$1.name || void 0 !== e$1.email && s$2.userID.email !== e$1.email || void 0 !== e$1.comment && s$2.userID.comment !== e$1.comment) throw Error("Could not find user that matches that user ID");
			const o$2 = {
				userID: s$2.userID,
				key: n$1
			}, c$2 = await va(s$2.selfCertifications, n$1, R.signature.certGeneric, o$2, t$1, r$1);
			i$1.push({
				index: a$2,
				user: s$2,
				selfCertification: c$2
			});
		} catch (t$2) {
			s$1 = t$2;
		}
		if (!i$1.length) throw s$1 || Error("Could not find primary user");
		await Promise.all(i$1.map(async function(e$2) {
			return e$2.selfCertification.revoked || e$2.user.isRevoked(e$2.selfCertification, null, t$1, r$1);
		}));
		const a$1 = i$1.sort(function(t$2, e$2) {
			const r$2 = t$2.selfCertification, n$2 = e$2.selfCertification;
			return n$2.revoked - r$2.revoked || r$2.isPrimaryUserID - n$2.isPrimaryUserID || r$2.created - n$2.created;
		}).pop(), { user: o$1, selfCertification: c$1 } = a$1;
		if (c$1.revoked || await o$1.isRevoked(c$1, null, t$1, r$1)) throw Error("Primary user is revoked");
		return a$1;
	}
	async update(t$1, e$1 = new Date(), r$1 = T) {
		if (!this.hasSameFingerprintAs(t$1)) throw Error("Primary key fingerprints must be equal to update the key");
		if (!this.isPrivate() && t$1.isPrivate()) {
			if (!(this.subkeys.length === t$1.subkeys.length && this.subkeys.every((e$2) => t$1.subkeys.some((t$2) => e$2.hasSameFingerprintAs(t$2))))) throw Error("Cannot update public key with private key if subkeys mismatch");
			return t$1.update(this, r$1);
		}
		const n$1 = this.clone();
		return await Ca(t$1, n$1, "revocationSignatures", e$1, (i$1) => Da(n$1.keyPacket, R.signature.keyRevocation, n$1, [i$1], null, t$1.keyPacket, e$1, r$1)), await Ca(t$1, n$1, "directSignatures", e$1), await Promise.all(t$1.users.map(async (t$2) => {
			const i$1 = n$1.users.filter((e$2) => t$2.userID && t$2.userID.equals(e$2.userID) || t$2.userAttribute && t$2.userAttribute.equals(e$2.userAttribute));
			if (i$1.length > 0) await Promise.all(i$1.map((n$2) => n$2.update(t$2, e$1, r$1)));
else {
				const e$2 = t$2.clone();
				e$2.mainKey = n$1, n$1.users.push(e$2);
			}
		})), await Promise.all(t$1.subkeys.map(async (t$2) => {
			const i$1 = n$1.subkeys.filter((e$2) => e$2.hasSameFingerprintAs(t$2));
			if (i$1.length > 0) await Promise.all(i$1.map((n$2) => n$2.update(t$2, e$1, r$1)));
else {
				const e$2 = t$2.clone();
				e$2.mainKey = n$1, n$1.subkeys.push(e$2);
			}
		})), n$1;
	}
	async getRevocationCertificate(t$1 = new Date(), e$1 = T) {
		const r$1 = { key: this.keyPacket }, n$1 = await va(this.revocationSignatures, this.keyPacket, R.signature.keyRevocation, r$1, t$1, e$1), i$1 = new Hs();
		i$1.push(n$1);
		const s$1 = 6 !== this.keyPacket.version;
		return $(R.armor.publicKey, i$1.write(), null, null, "This is a revocation certificate", s$1, e$1);
	}
	async applyRevocationCertificate(t$1, e$1 = new Date(), r$1 = T) {
		const n$1 = await X(t$1), i$1 = (await Hs.fromBinary(n$1.data, Na, r$1)).findPacket(R.packet.signature);
		if (!i$1 || i$1.signatureType !== R.signature.keyRevocation) throw Error("Could not find revocation signature packet");
		if (!i$1.issuerKeyID.equals(this.getKeyID())) throw Error("Revocation signature does not match key");
		try {
			await i$1.verify(this.keyPacket, R.signature.keyRevocation, { key: this.keyPacket }, e$1, void 0, r$1);
		} catch (t$2) {
			throw F.wrapError("Could not verify revocation signature", t$2);
		}
		const s$1 = this.clone();
		return s$1.revocationSignatures.push(i$1), s$1;
	}
	async signPrimaryUser(t$1, e$1, r$1, n$1 = T) {
		const { index: i$1, user: s$1 } = await this.getPrimaryUser(e$1, r$1, n$1), a$1 = await s$1.certify(t$1, e$1, n$1), o$1 = this.clone();
		return o$1.users[i$1] = a$1, o$1;
	}
	async signAllUsers(t$1, e$1 = new Date(), r$1 = T) {
		const n$1 = this.clone();
		return n$1.users = await Promise.all(this.users.map(function(n$2) {
			return n$2.certify(t$1, e$1, r$1);
		})), n$1;
	}
	async verifyPrimaryUser(t$1, e$1 = new Date(), r$1, n$1 = T) {
		const i$1 = this.keyPacket, { user: s$1 } = await this.getPrimaryUser(e$1, r$1, n$1);
		return t$1 ? await s$1.verifyAllCertifications(t$1, e$1, n$1) : [{
			keyID: i$1.getKeyID(),
			valid: await s$1.verify(e$1, n$1).catch(() => !1)
		}];
	}
	async verifyAllUsers(t$1, e$1 = new Date(), r$1 = T) {
		const n$1 = this.keyPacket, i$1 = [];
		return await Promise.all(this.users.map(async (s$1) => {
			const a$1 = t$1 ? await s$1.verifyAllCertifications(t$1, e$1, r$1) : [{
				keyID: n$1.getKeyID(),
				valid: await s$1.verify(e$1, r$1).catch(() => !1)
			}];
			i$1.push(...a$1.map((t$2) => ({
				userID: s$1.userID ? s$1.userID.userID : null,
				userAttribute: s$1.userAttribute,
				keyID: t$2.keyID,
				valid: t$2.valid
			})));
		})), i$1;
	}
};
[
	"getKeyID",
	"getFingerprint",
	"getAlgorithmInfo",
	"getCreationTime",
	"hasSameFingerprintAs"
].forEach((t$1) => {
	Ha.prototype[t$1] = Fa.prototype[t$1];
});
var za = class extends Ha {
	constructor(t$1) {
		if (super(), this.keyPacket = null, this.revocationSignatures = [], this.directSignatures = [], this.users = [], this.subkeys = [], t$1 && (this.packetListToStructure(t$1, new Set([R.packet.secretKey, R.packet.secretSubkey])), !this.keyPacket)) throw Error("Invalid key: missing public-key packet");
	}
	isPrivate() {
		return !1;
	}
	toPublic() {
		return this;
	}
	armor(t$1 = T) {
		const e$1 = 6 !== this.keyPacket.version;
		return $(R.armor.publicKey, this.toPacketList().write(), void 0, void 0, void 0, e$1, t$1);
	}
};
var Ga = class Ga extends za {
	constructor(t$1) {
		if (super(), this.packetListToStructure(t$1, new Set([R.packet.publicKey, R.packet.publicSubkey])), !this.keyPacket) throw Error("Invalid key: missing private-key packet");
	}
	isPrivate() {
		return !0;
	}
	toPublic() {
		const t$1 = new Hs(), e$1 = this.toPacketList();
		for (const r$1 of e$1) switch (r$1.constructor.tag) {
			case R.packet.secretKey: {
				const e$2 = aa.fromSecretKeyPacket(r$1);
				t$1.push(e$2);
				break;
			}
			case R.packet.secretSubkey: {
				const e$2 = ha.fromSecretSubkeyPacket(r$1);
				t$1.push(e$2);
				break;
			}
			default: t$1.push(r$1);
		}
		return new za(t$1);
	}
	armor(t$1 = T) {
		const e$1 = 6 !== this.keyPacket.version;
		return $(R.armor.privateKey, this.toPacketList().write(), void 0, void 0, void 0, e$1, t$1);
	}
	async getDecryptionKeys(t$1, e$1 = new Date(), r$1 = {}, n$1 = T) {
		const i$1 = this.keyPacket, s$1 = [];
		let a$1 = null;
		for (let r$2 = 0; r$2 < this.subkeys.length; r$2++) if (!t$1 || this.subkeys[r$2].getKeyID().equals(t$1, !0)) {
			if (this.subkeys[r$2].keyPacket.isDummy()) {
				a$1 = a$1 || Error("Gnu-dummy key packets cannot be used for decryption");
				continue;
			}
			try {
				const t$2 = {
					key: i$1,
					bind: this.subkeys[r$2].keyPacket
				}, a$2 = await va(this.subkeys[r$2].bindingSignatures, i$1, R.signature.subkeyBinding, t$2, e$1, n$1);
				Ra(this.subkeys[r$2].keyPacket, a$2, n$1) && s$1.push(this.subkeys[r$2]);
			} catch (t$2) {
				a$1 = t$2;
			}
		}
		const o$1 = await this.getPrimarySelfSignature(e$1, r$1, n$1);
		if (t$1 && !i$1.getKeyID().equals(t$1, !0) || !Ra(i$1, o$1, n$1) || (i$1.isDummy() ? a$1 = a$1 || Error("Gnu-dummy key packets cannot be used for decryption") : s$1.push(this)), 0 === s$1.length) throw a$1 || Error("No decryption key packets found");
		return s$1;
	}
	isDecrypted() {
		return this.getKeys().some(({ keyPacket: t$1 }) => t$1.isDecrypted());
	}
	async validate(t$1 = T) {
		if (!this.isPrivate()) throw Error("Cannot validate a public key");
		let e$1;
		if (this.keyPacket.isDummy()) {
			const r$1 = await this.getSigningKey(null, null, void 0, {
				...t$1,
				rejectPublicKeyAlgorithms: new Set(),
				minRSABits: 0
			});
			r$1 && !r$1.keyPacket.isDummy() && (e$1 = r$1.keyPacket);
		} else e$1 = this.keyPacket;
		if (e$1) return e$1.validate();
		{
			const t$2 = this.getKeys();
			if (t$2.map((t$3) => t$3.keyPacket.isDummy()).every(Boolean)) throw Error("Cannot validate an all-gnu-dummy key");
			return Promise.all(t$2.map(async (t$3) => t$3.keyPacket.validate()));
		}
	}
	clearPrivateParams() {
		this.getKeys().forEach(({ keyPacket: t$1 }) => {
			t$1.isDecrypted() && t$1.clearPrivateParams();
		});
	}
	async revoke({ flag: t$1 = R.reasonForRevocation.noReason, string: e$1 = "" } = {}, r$1 = new Date(), n$1 = T) {
		if (!this.isPrivate()) throw Error("Need private key for revoking");
		const i$1 = { key: this.keyPacket }, s$1 = this.clone();
		return s$1.revocationSignatures.push(await Ka(i$1, [], this.keyPacket, {
			signatureType: R.signature.keyRevocation,
			reasonForRevocationFlag: R.write(R.reasonForRevocation, t$1),
			reasonForRevocationString: e$1
		}, r$1, void 0, void 0, void 0, n$1)), s$1;
	}
	async addSubkey(t$1 = {}) {
		const e$1 = {
			...T,
			...t$1.config
		};
		if (t$1.passphrase) throw Error("Subkey could not be encrypted here, please encrypt whole key");
		if (t$1.rsaBits < e$1.minRSABits) throw Error(`rsaBits should be at least ${e$1.minRSABits}, got: ${t$1.rsaBits}`);
		const r$1 = this.keyPacket;
		if (r$1.isDummy()) throw Error("Cannot add subkey to gnu-dummy primary key");
		if (!r$1.isDecrypted()) throw Error("Key is not decrypted");
		const n$1 = r$1.getAlgorithmInfo();
		n$1.type = function(t$2) {
			switch (R.write(R.publicKey, t$2)) {
				case R.publicKey.rsaEncrypt:
				case R.publicKey.rsaEncryptSign:
				case R.publicKey.rsaSign:
				case R.publicKey.dsa: return "rsa";
				case R.publicKey.ecdsa:
				case R.publicKey.eddsaLegacy: return "ecc";
				case R.publicKey.ed25519: return "curve25519";
				case R.publicKey.ed448: return "curve448";
				default: throw Error("Unsupported algorithm");
			}
		}(n$1.algorithm), n$1.rsaBits = n$1.bits || 4096, n$1.curve = n$1.curve || "curve25519Legacy", t$1 = Pa(t$1, n$1);
		const i$1 = await ka(t$1, {
			...e$1,
			v6Keys: 6 === this.keyPacket.version
		});
		Ta(i$1, e$1);
		const s$1 = await Ia(i$1, r$1, t$1, e$1), a$1 = this.toPacketList();
		return a$1.push(i$1, s$1), new Ga(a$1);
	}
};
const _a = /*#__PURE__*/ F.constructAllowedPackets([
	aa,
	ha,
	la,
	pa,
	ga,
	fa,
	Ms
]);
function ja(t$1) {
	for (const e$1 of t$1) switch (e$1.constructor.tag) {
		case R.packet.secretKey: return new Ga(t$1);
		case R.packet.publicKey: return new za(t$1);
	}
	throw Error("No key packet found");
}
async function Va(t$1, e$1, r$1, n$1) {
	r$1.passphrase && await t$1.encrypt(r$1.passphrase, n$1), await Promise.all(e$1.map(async function(t$2, e$2) {
		const i$2 = r$1.subkeys[e$2].passphrase;
		i$2 && await t$2.encrypt(i$2, n$1);
	}));
	const i$1 = new Hs();
	function s$1(t$2, e$2) {
		return [e$2, ...t$2.filter((t$3) => t$3 !== e$2)];
	}
	function a$1() {
		const t$2 = {};
		t$2.keyFlags = [R.keyFlags.certifyKeys | R.keyFlags.signData];
		const e$2 = s$1([R.symmetric.aes256, R.symmetric.aes128], n$1.preferredSymmetricAlgorithm);
		if (t$2.preferredSymmetricAlgorithms = e$2, n$1.aeadProtect) {
			const r$2 = s$1([
				R.aead.gcm,
				R.aead.eax,
				R.aead.ocb
			], n$1.preferredAEADAlgorithm);
			t$2.preferredCipherSuites = r$2.flatMap((t$3) => e$2.map((e$3) => [e$3, t$3]));
		}
		return t$2.preferredHashAlgorithms = s$1([
			R.hash.sha512,
			R.hash.sha256,
			R.hash.sha3_512,
			R.hash.sha3_256
		], n$1.preferredHashAlgorithm), t$2.preferredCompressionAlgorithms = s$1([
			R.compression.uncompressed,
			R.compression.zlib,
			R.compression.zip
		], n$1.preferredCompressionAlgorithm), t$2.features = [0], t$2.features[0] |= R.features.modificationDetection, n$1.aeadProtect && (t$2.features[0] |= R.features.seipdv2), r$1.keyExpirationTime > 0 && (t$2.keyExpirationTime = r$1.keyExpirationTime, t$2.keyNeverExpires = !1), t$2;
	}
	if (i$1.push(t$1), 6 === t$1.version) {
		const e$2 = { key: t$1 }, s$2 = a$1();
		s$2.signatureType = R.signature.key;
		const o$2 = await Ka(e$2, [], t$1, s$2, r$1.date, void 0, void 0, void 0, n$1);
		i$1.push(o$2);
	}
	await Promise.all(r$1.userIDs.map(async function(e$2, i$2) {
		const s$2 = ga.fromObject(e$2), o$2 = {
			userID: s$2,
			key: t$1
		}, c$1 = 6 !== t$1.version ? a$1() : {};
		c$1.signatureType = R.signature.certPositive, 0 === i$2 && (c$1.isPrimaryUserID = !0);
		return {
			userIDPacket: s$2,
			signaturePacket: await Ka(o$2, [], t$1, c$1, r$1.date, void 0, void 0, void 0, n$1)
		};
	})).then((t$2) => {
		t$2.forEach(({ userIDPacket: t$3, signaturePacket: e$2 }) => {
			i$1.push(t$3), i$1.push(e$2);
		});
	}), await Promise.all(e$1.map(async function(e$2, i$2) {
		const s$2 = r$1.subkeys[i$2];
		return {
			secretSubkeyPacket: e$2,
			subkeySignaturePacket: await Ia(e$2, t$1, s$2, n$1)
		};
	})).then((t$2) => {
		t$2.forEach(({ secretSubkeyPacket: t$3, subkeySignaturePacket: e$2 }) => {
			i$1.push(t$3), i$1.push(e$2);
		});
	});
	const o$1 = { key: t$1 };
	return i$1.push(await Ka(o$1, [], t$1, {
		signatureType: R.signature.keyRevocation,
		reasonForRevocationFlag: R.reasonForRevocation.noReason,
		reasonForRevocationString: ""
	}, r$1.date, void 0, void 0, void 0, n$1)), r$1.passphrase && t$1.clearPrivateParams(), await Promise.all(e$1.map(async function(t$2, e$2) {
		r$1.subkeys[e$2].passphrase && t$2.clearPrivateParams();
	})), new Ga(i$1);
}
async function qa({ armoredKey: t$1, binaryKey: e$1, config: r$1,...n$1 }) {
	if (r$1 = {
		...T,
		...r$1
	}, !t$1 && !e$1) throw Error("readKey: must pass options object containing `armoredKey` or `binaryKey`");
	if (t$1 && !F.isString(t$1)) throw Error("readKey: options.armoredKey must be a string");
	if (e$1 && !F.isUint8Array(e$1)) throw Error("readKey: options.binaryKey must be a Uint8Array");
	const i$1 = Object.keys(n$1);
	if (i$1.length > 0) throw Error("Unknown option: " + i$1.join(", "));
	let s$1;
	if (t$1) {
		const { type: e$2, data: r$2 } = await X(t$1);
		if (e$2 !== R.armor.publicKey && e$2 !== R.armor.privateKey) throw Error("Armored text not of type key");
		s$1 = r$2;
	} else s$1 = e$1;
	const a$1 = await Hs.fromBinary(s$1, _a, r$1), o$1 = a$1.indexOfTag(R.packet.publicKey, R.packet.secretKey);
	if (0 === o$1.length) throw Error("No key packet found");
	return ja(a$1.slice(o$1[0], o$1[1]));
}
async function Ya({ armoredKey: t$1, binaryKey: e$1, config: r$1,...n$1 }) {
	if (r$1 = {
		...T,
		...r$1
	}, !t$1 && !e$1) throw Error("readPrivateKey: must pass options object containing `armoredKey` or `binaryKey`");
	if (t$1 && !F.isString(t$1)) throw Error("readPrivateKey: options.armoredKey must be a string");
	if (e$1 && !F.isUint8Array(e$1)) throw Error("readPrivateKey: options.binaryKey must be a Uint8Array");
	const i$1 = Object.keys(n$1);
	if (i$1.length > 0) throw Error("Unknown option: " + i$1.join(", "));
	let s$1;
	if (t$1) {
		const { type: e$2, data: r$2 } = await X(t$1);
		if (e$2 !== R.armor.privateKey) throw Error("Armored text not of type private key");
		s$1 = r$2;
	} else s$1 = e$1;
	const a$1 = await Hs.fromBinary(s$1, _a, r$1), o$1 = a$1.indexOfTag(R.packet.publicKey, R.packet.secretKey);
	for (let t$2 = 0; t$2 < o$1.length; t$2++) {
		if (a$1[o$1[t$2]].constructor.tag === R.packet.publicKey) continue;
		const e$2 = a$1.slice(o$1[t$2], o$1[t$2 + 1]);
		return new Ga(e$2);
	}
	throw Error("No secret key packet found");
}
const Wa = /*#__PURE__*/ F.constructAllowedPackets([
	Ps,
	Vs,
	ra,
	$s,
	ca,
	na,
	sa,
	Ls,
	Ms
]), Xa = /*#__PURE__*/ F.constructAllowedPackets([sa]), $a = /*#__PURE__*/ F.constructAllowedPackets([Ms]);
var to = class to {
	constructor(t$1) {
		this.packets = t$1 || new Hs();
	}
	getEncryptionKeyIDs() {
		const t$1 = [];
		return this.packets.filterByTag(R.packet.publicKeyEncryptedSessionKey).forEach(function(e$1) {
			t$1.push(e$1.publicKeyID);
		}), t$1;
	}
	getSigningKeyIDs() {
		const t$1 = this.unwrapCompressed(), e$1 = t$1.packets.filterByTag(R.packet.onePassSignature);
		if (e$1.length > 0) return e$1.map((t$2) => t$2.issuerKeyID);
		return t$1.packets.filterByTag(R.packet.signature).map((t$2) => t$2.issuerKeyID);
	}
	async decrypt(t$1, e$1, r$1, n$1 = new Date(), i$1 = T) {
		const s$1 = this.packets.filterByTag(R.packet.symmetricallyEncryptedData, R.packet.symEncryptedIntegrityProtectedData, R.packet.aeadEncryptedData);
		if (0 === s$1.length) throw Error("No encrypted data found");
		const a$1 = s$1[0], o$1 = a$1.cipherAlgorithm, c$1 = r$1 || await this.decryptSessionKeys(t$1, e$1, o$1, n$1, i$1);
		let u$1 = null;
		const h$1 = Promise.all(c$1.map(async ({ algorithm: t$2, data: e$2 }) => {
			if (!F.isUint8Array(e$2) || !a$1.cipherAlgorithm && !F.isString(t$2)) throw Error("Invalid session key for decryption.");
			try {
				const r$2 = a$1.cipherAlgorithm || R.write(R.symmetric, t$2);
				await a$1.decrypt(r$2, e$2, i$1);
			} catch (t$3) {
				F.printDebugError(t$3), u$1 = t$3;
			}
		}));
		if (D(a$1.encrypted), a$1.encrypted = null, await h$1, !a$1.packets || !a$1.packets.length) throw u$1 || Error("Decryption failed.");
		const f$1 = new to(a$1.packets);
		return a$1.packets = new Hs(), f$1;
	}
	async decryptSessionKeys(t$1, e$1, r$1, n$1 = new Date(), i$1 = T) {
		let s$1, a$1 = [];
		if (e$1) {
			const t$2 = this.packets.filterByTag(R.packet.symEncryptedSessionKey);
			if (0 === t$2.length) throw Error("No symmetrically encrypted session key packet found.");
			await Promise.all(e$1.map(async function(e$2, r$2) {
				let n$2;
				n$2 = r$2 ? await Hs.fromBinary(t$2.write(), Xa, i$1) : t$2, await Promise.all(n$2.map(async function(t$3) {
					try {
						await t$3.decrypt(e$2), a$1.push(t$3);
					} catch (t$4) {
						F.printDebugError(t$4), t$4 instanceof Di && (s$1 = t$4);
					}
				}));
			}));
		} else {
			if (!t$1) throw Error("No key or password specified.");
			{
				const e$2 = this.packets.filterByTag(R.packet.publicKeyEncryptedSessionKey);
				if (0 === e$2.length) throw Error("No public key encrypted session key packet found.");
				await Promise.all(e$2.map(async function(e$3) {
					await Promise.all(t$1.map(async function(t$2) {
						let o$1;
						try {
							o$1 = (await t$2.getDecryptionKeys(e$3.publicKeyID, null, void 0, i$1)).map((t$3) => t$3.keyPacket);
						} catch (t$3) {
							return void (s$1 = t$3);
						}
						let c$1 = [
							R.symmetric.aes256,
							R.symmetric.aes128,
							R.symmetric.tripledes,
							R.symmetric.cast5
						];
						try {
							const e$4 = await t$2.getPrimarySelfSignature(n$1, void 0, i$1);
							e$4.preferredSymmetricAlgorithms && (c$1 = c$1.concat(e$4.preferredSymmetricAlgorithms));
						} catch (t$3) {}
						await Promise.all(o$1.map(async function(t$3) {
							if (!t$3.isDecrypted()) throw Error("Decryption key is not decrypted.");
							if (i$1.constantTimePKCS1Decryption && (e$3.publicKeyAlgorithm === R.publicKey.rsaEncrypt || e$3.publicKeyAlgorithm === R.publicKey.rsaEncryptSign || e$3.publicKeyAlgorithm === R.publicKey.rsaSign || e$3.publicKeyAlgorithm === R.publicKey.elgamal)) {
								const n$2 = e$3.write();
								await Promise.all((r$1 ? [r$1] : Array.from(i$1.constantTimePKCS1DecryptionSupportedSymmetricAlgorithms)).map(async (e$4) => {
									const r$2 = new na();
									r$2.read(n$2);
									const i$2 = {
										sessionKeyAlgorithm: e$4,
										sessionKey: Rn(e$4)
									};
									try {
										await r$2.decrypt(t$3, i$2), a$1.push(r$2);
									} catch (t$4) {
										F.printDebugError(t$4), s$1 = t$4;
									}
								}));
							} else try {
								await e$3.decrypt(t$3);
								const n$2 = r$1 || e$3.sessionKeyAlgorithm;
								if (n$2 && !c$1.includes(R.write(R.symmetric, n$2))) throw Error("A non-preferred symmetric algorithm was used.");
								a$1.push(e$3);
							} catch (t$4) {
								F.printDebugError(t$4), s$1 = t$4;
							}
						}));
					})), D(e$3.encrypted), e$3.encrypted = null;
				}));
			}
		}
		if (a$1.length > 0) {
			if (a$1.length > 1) {
				const t$2 = new Set();
				a$1 = a$1.filter((e$2) => {
					const r$2 = e$2.sessionKeyAlgorithm + F.uint8ArrayToString(e$2.sessionKey);
					return !t$2.has(r$2) && (t$2.add(r$2), !0);
				});
			}
			return a$1.map((t$2) => ({
				data: t$2.sessionKey,
				algorithm: t$2.sessionKeyAlgorithm && R.read(R.symmetric, t$2.sessionKeyAlgorithm)
			}));
		}
		throw s$1 || Error("Session key decryption failed.");
	}
	getLiteralData() {
		const t$1 = this.unwrapCompressed().packets.findPacket(R.packet.literalData);
		return t$1 && t$1.getBytes() || null;
	}
	getFilename() {
		const t$1 = this.unwrapCompressed().packets.findPacket(R.packet.literalData);
		return t$1 && t$1.getFilename() || null;
	}
	getText() {
		const t$1 = this.unwrapCompressed().packets.findPacket(R.packet.literalData);
		return t$1 ? t$1.getText() : null;
	}
	static async generateSessionKey(t$1 = [], e$1 = new Date(), r$1 = [], n$1 = T) {
		const { symmetricAlgo: i$1, aeadAlgo: s$1 } = await async function(t$2 = [], e$2 = new Date(), r$2 = [], n$2 = T) {
			const i$2 = await Promise.all(t$2.map((t$3, i$3) => t$3.getPrimarySelfSignature(e$2, r$2[i$3], n$2)));
			if (t$2.length ? i$2.every((t$3) => t$3.features && t$3.features[0] & R.features.seipdv2) : n$2.aeadProtect) {
				const t$3 = {
					symmetricAlgo: R.symmetric.aes128,
					aeadAlgo: R.aead.ocb
				}, e$3 = [
					{
						symmetricAlgo: n$2.preferredSymmetricAlgorithm,
						aeadAlgo: n$2.preferredAEADAlgorithm
					},
					{
						symmetricAlgo: n$2.preferredSymmetricAlgorithm,
						aeadAlgo: R.aead.ocb
					},
					{
						symmetricAlgo: R.symmetric.aes128,
						aeadAlgo: n$2.preferredAEADAlgorithm
					}
				];
				for (const t$4 of e$3) if (i$2.every((e$4) => e$4.preferredCipherSuites && e$4.preferredCipherSuites.some((e$5) => e$5[0] === t$4.symmetricAlgo && e$5[1] === t$4.aeadAlgo))) return t$4;
				return t$3;
			}
			const s$2 = R.symmetric.aes128, a$2 = n$2.preferredSymmetricAlgorithm;
			return {
				symmetricAlgo: i$2.every((t$3) => t$3.preferredSymmetricAlgorithms && t$3.preferredSymmetricAlgorithms.includes(a$2)) ? a$2 : s$2,
				aeadAlgo: void 0
			};
		}(t$1, e$1, r$1, n$1), a$1 = R.read(R.symmetric, i$1), o$1 = s$1 ? R.read(R.aead, s$1) : void 0;
		await Promise.all(t$1.map((t$2) => t$2.getEncryptionKey().catch(() => null).then((t$3) => {
			if (t$3 && (t$3.keyPacket.algorithm === R.publicKey.x25519 || t$3.keyPacket.algorithm === R.publicKey.x448) && !o$1 && !F.isAES(i$1)) throw Error("Could not generate a session key compatible with the given `encryptionKeys`: X22519 and X448 keys can only be used to encrypt AES session keys; change `config.preferredSymmetricAlgorithm` accordingly.");
		})));
		return {
			data: Rn(i$1),
			algorithm: a$1,
			aeadAlgorithm: o$1
		};
	}
	async encrypt(t$1, e$1, r$1, n$1 = !1, i$1 = [], s$1 = new Date(), a$1 = [], o$1 = T) {
		if (r$1) {
			if (!F.isUint8Array(r$1.data) || !F.isString(r$1.algorithm)) throw Error("Invalid session key for encryption.");
		} else if (t$1 && t$1.length) r$1 = await to.generateSessionKey(t$1, s$1, a$1, o$1);
else {
			if (!e$1 || !e$1.length) throw Error("No keys, passwords, or session key provided.");
			r$1 = await to.generateSessionKey(void 0, void 0, void 0, o$1);
		}
		const { data: c$1, algorithm: u$1, aeadAlgorithm: h$1 } = r$1, f$1 = await to.encryptSessionKey(c$1, u$1, h$1, t$1, e$1, n$1, i$1, s$1, a$1, o$1), l$1 = $s.fromObject({
			version: h$1 ? 2 : 1,
			aeadAlgorithm: h$1 ? R.write(R.aead, h$1) : null
		});
		l$1.packets = this.packets;
		const y$1 = R.write(R.symmetric, u$1);
		return await l$1.encrypt(y$1, c$1, o$1), f$1.packets.push(l$1), l$1.packets = new Hs(), f$1;
	}
	static async encryptSessionKey(t$1, e$1, r$1, n$1, i$1, s$1 = !1, a$1 = [], o$1 = new Date(), c$1 = [], u$1 = T) {
		const h$1 = new Hs(), f$1 = R.write(R.symmetric, e$1), l$1 = r$1 && R.write(R.aead, r$1);
		if (n$1) {
			const e$2 = await Promise.all(n$1.map(async function(e$3, r$2) {
				const n$2 = await e$3.getEncryptionKey(a$1[r$2], o$1, c$1, u$1), i$2 = na.fromObject({
					version: l$1 ? 6 : 3,
					encryptionKeyPacket: n$2.keyPacket,
					anonymousRecipient: s$1,
					sessionKey: t$1,
					sessionKeyAlgorithm: f$1
				});
				return await i$2.encrypt(n$2.keyPacket), delete i$2.sessionKey, i$2;
			}));
			h$1.push(...e$2);
		}
		if (i$1) {
			const e$2 = async function(t$2, e$3) {
				try {
					return await t$2.decrypt(e$3), 1;
				} catch (t$3) {
					return 0;
				}
			}, r$2 = (t$2, e$3) => t$2 + e$3, n$2 = async function(t$2, s$3, a$2, o$2) {
				const c$2 = new sa(u$1);
				if (c$2.sessionKey = t$2, c$2.sessionKeyAlgorithm = s$3, a$2 && (c$2.aeadAlgorithm = a$2), await c$2.encrypt(o$2, u$1), u$1.passwordCollisionCheck) {
					if (1 !== (await Promise.all(i$1.map((t$3) => e$2(c$2, t$3)))).reduce(r$2)) return n$2(t$2, s$3, o$2);
				}
				return delete c$2.sessionKey, c$2;
			}, s$2 = await Promise.all(i$1.map((e$3) => n$2(t$1, f$1, l$1, e$3)));
			h$1.push(...s$2);
		}
		return new to(h$1);
	}
	async sign(t$1 = [], e$1 = [], r$1 = null, n$1 = [], i$1 = new Date(), s$1 = [], a$1 = [], o$1 = [], c$1 = T) {
		const u$1 = new Hs(), h$1 = this.packets.findPacket(R.packet.literalData);
		if (!h$1) throw Error("No literal data packet to sign.");
		const f$1 = await eo(h$1, t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1, !1, c$1), l$1 = f$1.map((t$2, e$2) => Ls.fromSignaturePacket(t$2, 0 === e$2)).reverse();
		return u$1.push(...l$1), u$1.push(h$1), u$1.push(...f$1), new to(u$1);
	}
	compress(t$1, e$1 = T) {
		if (t$1 === R.compression.uncompressed) return this;
		const r$1 = new Vs(e$1);
		r$1.algorithm = t$1, r$1.packets = this.packets;
		const n$1 = new Hs();
		return n$1.push(r$1), new to(n$1);
	}
	async signDetached(t$1 = [], e$1 = [], r$1 = null, n$1 = [], i$1 = [], s$1 = new Date(), a$1 = [], o$1 = [], c$1 = T) {
		const u$1 = this.packets.findPacket(R.packet.literalData);
		if (!u$1) throw Error("No literal data packet to sign.");
		return new ma(await eo(u$1, t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1, !0, c$1));
	}
	async verify(t$1, e$1 = new Date(), r$1 = T) {
		const n$1 = this.unwrapCompressed(), i$1 = n$1.packets.filterByTag(R.packet.literalData);
		if (1 !== i$1.length) throw Error("Can only verify message with one literal data packet.");
		let s$1 = n$1.packets;
		o(s$1.stream) && (s$1 = s$1.concat(await C(s$1.stream, (t$2) => t$2 || [])));
		const a$1 = s$1.filterByTag(R.packet.onePassSignature).reverse(), c$1 = s$1.filterByTag(R.packet.signature);
		return a$1.length && !c$1.length && F.isStream(s$1.stream) && !o(s$1.stream) ? (await Promise.all(a$1.map(async (t$2) => {
			t$2.correspondingSig = new Promise((e$2, r$2) => {
				t$2.correspondingSigResolve = e$2, t$2.correspondingSigReject = r$2;
			}), t$2.signatureData = U(async () => (await t$2.correspondingSig).signatureData), t$2.hashed = C(await t$2.hash(t$2.signatureType, i$1[0], void 0, !1)), t$2.hashed.catch(() => {});
		})), s$1.stream = E(s$1.stream, async (t$2, e$2) => {
			const r$2 = P(t$2), n$2 = x(e$2);
			try {
				for (let t$3 = 0; t$3 < a$1.length; t$3++) {
					const { value: e$3 } = await r$2.read();
					a$1[t$3].correspondingSigResolve(e$3);
				}
				await r$2.readToEnd(), await n$2.ready, await n$2.close();
			} catch (t$3) {
				a$1.forEach((e$3) => {
					e$3.correspondingSigReject(t$3);
				}), await n$2.abort(t$3);
			}
		}), ro(a$1, i$1, t$1, e$1, !1, r$1)) : ro(c$1, i$1, t$1, e$1, !1, r$1);
	}
	verifyDetached(t$1, e$1, r$1 = new Date(), n$1 = T) {
		const i$1 = this.unwrapCompressed().packets.filterByTag(R.packet.literalData);
		if (1 !== i$1.length) throw Error("Can only verify message with one literal data packet.");
		return ro(t$1.packets.filterByTag(R.packet.signature), i$1, e$1, r$1, !0, n$1);
	}
	unwrapCompressed() {
		const t$1 = this.packets.filterByTag(R.packet.compressedData);
		return t$1.length ? new to(t$1[0].packets) : this;
	}
	async appendSignature(t$1, e$1 = T) {
		await this.packets.read(F.isUint8Array(t$1) ? t$1 : (await X(t$1)).data, $a, e$1);
	}
	write() {
		return this.packets.write();
	}
	armor(t$1 = T) {
		const e$1 = this.packets[this.packets.length - 1], r$1 = e$1.constructor.tag === $s.tag ? 2 !== e$1.version : this.packets.some((t$2) => t$2.constructor.tag === Ms.tag && 6 !== t$2.version);
		return $(R.armor.message, this.write(), null, null, null, r$1, t$1);
	}
};
async function eo(t$1, e$1, r$1 = [], n$1 = null, i$1 = [], s$1 = new Date(), a$1 = [], o$1 = [], c$1 = [], u$1 = !1, h$1 = T) {
	const f$1 = new Hs(), l$1 = null === t$1.text ? R.signature.binary : R.signature.text;
	if (await Promise.all(e$1.map(async (e$2, n$2) => {
		const f$2 = a$1[n$2];
		if (!e$2.isPrivate()) throw Error("Need private key for signing");
		const y$1 = await e$2.getSigningKey(i$1[n$2], s$1, f$2, h$1);
		return Ka(t$1, r$1.length ? r$1 : [e$2], y$1.keyPacket, { signatureType: l$1 }, s$1, o$1, c$1, u$1, h$1);
	})).then((t$2) => {
		f$1.push(...t$2);
	}), n$1) {
		const t$2 = n$1.packets.filterByTag(R.packet.signature);
		f$1.push(...t$2);
	}
	return f$1;
}
async function ro(t$1, e$1, r$1, n$1 = new Date(), i$1 = !1, s$1 = T) {
	return Promise.all(t$1.filter(function(t$2) {
		return ["text", "binary"].includes(R.read(R.signature, t$2.signatureType));
	}).map(async function(t$2) {
		return async function(t$3, e$2, r$2, n$2 = new Date(), i$2 = !1, s$2 = T) {
			let a$1, o$1;
			for (const e$3 of r$2) {
				const r$3 = e$3.getKeys(t$3.issuerKeyID);
				if (r$3.length > 0) {
					a$1 = e$3, o$1 = r$3[0];
					break;
				}
			}
			const c$1 = t$3 instanceof Ls ? t$3.correspondingSig : t$3, u$1 = {
				keyID: t$3.issuerKeyID,
				verified: (async () => {
					if (!o$1) throw Error("Could not find signing key with key ID " + t$3.issuerKeyID.toHex());
					await t$3.verify(o$1.keyPacket, t$3.signatureType, e$2[0], n$2, i$2, s$2);
					const r$3 = await c$1;
					if (o$1.getCreationTime() > r$3.created) throw Error("Key is newer than the signature");
					try {
						await a$1.getSigningKey(o$1.getKeyID(), r$3.created, void 0, s$2);
					} catch (t$4) {
						if (!s$2.allowInsecureVerificationWithReformattedKeys || !t$4.message.match(/Signature creation time is in the future/)) throw t$4;
						await a$1.getSigningKey(o$1.getKeyID(), n$2, void 0, s$2);
					}
					return !0;
				})(),
				signature: (async () => {
					const t$4 = await c$1, e$3 = new Hs();
					return t$4 && e$3.push(t$4), new ma(e$3);
				})()
			};
			return u$1.signature.catch(() => {}), u$1.verified.catch(() => {}), u$1;
		}(t$2, e$1, r$1, n$1, i$1, s$1);
	}));
}
async function no({ armoredMessage: t$1, binaryMessage: e$1, config: r$1,...n$1 }) {
	r$1 = {
		...T,
		...r$1
	};
	let i$1 = t$1 || e$1;
	if (!i$1) throw Error("readMessage: must pass options object containing `armoredMessage` or `binaryMessage`");
	if (t$1 && !F.isString(t$1) && !F.isStream(t$1)) throw Error("readMessage: options.armoredMessage must be a string or stream");
	if (e$1 && !F.isUint8Array(e$1) && !F.isStream(e$1)) throw Error("readMessage: options.binaryMessage must be a Uint8Array or stream");
	const s$1 = Object.keys(n$1);
	if (s$1.length > 0) throw Error("Unknown option: " + s$1.join(", "));
	const a$1 = F.isStream(i$1);
	if (t$1) {
		const { type: t$2, data: e$2 } = await X(i$1);
		if (t$2 !== R.armor.message) throw Error("Armored text not of type message");
		i$1 = e$2;
	}
	const o$1 = await Hs.fromBinary(i$1, Wa, r$1, new _s()), c$1 = new to(o$1);
	return c$1.fromStream = a$1, c$1;
}
async function io({ text: t$1, binary: e$1, filename: r$1, date: n$1 = new Date(), format: i$1 = void 0 !== t$1 ? "utf8" : "binary",...s$1 }) {
	const a$1 = void 0 !== t$1 ? t$1 : e$1;
	if (void 0 === a$1) throw Error("createMessage: must pass options object containing `text` or `binary`");
	if (t$1 && !F.isString(t$1) && !F.isStream(t$1)) throw Error("createMessage: options.text must be a string or stream");
	if (e$1 && !F.isUint8Array(e$1) && !F.isStream(e$1)) throw Error("createMessage: options.binary must be a Uint8Array or stream");
	const o$1 = Object.keys(s$1);
	if (o$1.length > 0) throw Error("Unknown option: " + o$1.join(", "));
	const c$1 = F.isStream(a$1), u$1 = new Ps(n$1);
	void 0 !== t$1 ? u$1.setText(a$1, R.write(R.literal, i$1)) : u$1.setBytes(a$1, R.write(R.literal, i$1)), void 0 !== r$1 && u$1.setFilename(r$1);
	const h$1 = new Hs();
	h$1.push(u$1);
	const f$1 = new to(h$1);
	return f$1.fromStream = c$1, f$1;
}
async function uo({ userIDs: t$1 = [], passphrase: e$1, type: r$1, curve: n$1, rsaBits: i$1 = 4096, keyExpirationTime: s$1 = 0, date: a$1 = new Date(), subkeys: o$1 = [{}], format: c$1 = "armored", config: u$1,...h$1 }) {
	So(u$1 = {
		...T,
		...u$1
	}), r$1 || n$1 ? (r$1 = r$1 || "ecc", n$1 = n$1 || "curve25519Legacy") : (r$1 = u$1.v6Keys ? "curve25519" : "ecc", n$1 = "curve25519Legacy"), t$1 = Ko(t$1);
	const f$1 = Object.keys(h$1);
	if (f$1.length > 0) throw Error("Unknown option: " + f$1.join(", "));
	if (0 === t$1.length && !u$1.v6Keys) throw Error("UserIDs are required for V4 keys");
	if ("rsa" === r$1 && i$1 < u$1.minRSABits) throw Error(`rsaBits should be at least ${u$1.minRSABits}, got: ${i$1}`);
	const l$1 = {
		userIDs: t$1,
		passphrase: e$1,
		type: r$1,
		rsaBits: i$1,
		curve: n$1,
		keyExpirationTime: s$1,
		date: a$1,
		subkeys: o$1
	};
	try {
		const { key: t$2, revocationCertificate: e$2 } = await async function(t$3, e$3) {
			t$3.sign = !0, (t$3 = Pa(t$3)).subkeys = t$3.subkeys.map((e$4, r$3) => Pa(t$3.subkeys[r$3], t$3));
			let r$2 = [Ea(t$3, e$3)];
			r$2 = r$2.concat(t$3.subkeys.map((t$4) => ka(t$4, e$3)));
			const n$2 = await Promise.all(r$2), i$2 = await Va(n$2[0], n$2.slice(1), t$3, e$3), s$2 = await i$2.getRevocationCertificate(t$3.date, e$3);
			return i$2.revocationSignatures = [], {
				key: i$2,
				revocationCertificate: s$2
			};
		}(l$1, u$1);
		return t$2.getKeys().forEach(({ keyPacket: t$3 }) => Ta(t$3, u$1)), {
			privateKey: Uo(t$2, c$1, u$1),
			publicKey: Uo(t$2.toPublic(), c$1, u$1),
			revocationCertificate: e$2
		};
	} catch (t$2) {
		throw F.wrapError("Error generating keypair", t$2);
	}
}
async function lo({ privateKey: t$1, passphrase: e$1, config: r$1,...n$1 }) {
	So(r$1 = {
		...T,
		...r$1
	});
	const i$1 = Object.keys(n$1);
	if (i$1.length > 0) throw Error("Unknown option: " + i$1.join(", "));
	if (!t$1.isPrivate()) throw Error("Cannot decrypt a public key");
	const s$1 = t$1.clone(!0), a$1 = F.isArray(e$1) ? e$1 : [e$1];
	try {
		return await Promise.all(s$1.getKeys().map((t$2) => F.anyPromise(a$1.map((e$2) => t$2.keyPacket.decrypt(e$2))))), await s$1.validate(r$1), s$1;
	} catch (t$2) {
		throw s$1.clearPrivateParams(), F.wrapError("Error decrypting private key", t$2);
	}
}
async function yo({ privateKey: t$1, passphrase: e$1, config: r$1,...n$1 }) {
	So(r$1 = {
		...T,
		...r$1
	});
	const i$1 = Object.keys(n$1);
	if (i$1.length > 0) throw Error("Unknown option: " + i$1.join(", "));
	if (!t$1.isPrivate()) throw Error("Cannot encrypt a public key");
	const s$1 = t$1.clone(!0), a$1 = s$1.getKeys(), o$1 = F.isArray(e$1) ? e$1 : Array(a$1.length).fill(e$1);
	if (o$1.length !== a$1.length) throw Error("Invalid number of passphrases given for key encryption");
	try {
		return await Promise.all(a$1.map(async (t$2, e$2) => {
			const { keyPacket: n$2 } = t$2;
			await n$2.encrypt(o$1[e$2], r$1), n$2.clearPrivateParams();
		})), s$1;
	} catch (t$2) {
		throw s$1.clearPrivateParams(), F.wrapError("Error encrypting private key", t$2);
	}
}
async function go({ message: t$1, encryptionKeys: e$1, signingKeys: r$1, passwords: n$1, sessionKey: i$1, format: s$1 = "armored", signature: a$1 = null, wildcard: o$1 = !1, signingKeyIDs: c$1 = [], encryptionKeyIDs: u$1 = [], date: h$1 = new Date(), signingUserIDs: f$1 = [], encryptionUserIDs: l$1 = [], signatureNotations: y$1 = [], config: g$1,...p$1 }) {
	if (So(g$1 = {
		...T,
		...g$1
	}), Eo(t$1), Bo(s$1), e$1 = Ko(e$1), r$1 = Ko(r$1), n$1 = Ko(n$1), c$1 = Ko(c$1), u$1 = Ko(u$1), f$1 = Ko(f$1), l$1 = Ko(l$1), y$1 = Ko(y$1), p$1.detached) throw Error("The `detached` option has been removed from openpgp.encrypt, separately call openpgp.sign instead. Don't forget to remove the `privateKeys` option as well.");
	if (p$1.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.encrypt, pass `encryptionKeys` instead");
	if (p$1.privateKeys) throw Error("The `privateKeys` option has been removed from openpgp.encrypt, pass `signingKeys` instead");
	if (void 0 !== p$1.armor) throw Error("The `armor` option has been removed from openpgp.encrypt, pass `format` instead.");
	const d$1 = Object.keys(p$1);
	if (d$1.length > 0) throw Error("Unknown option: " + d$1.join(", "));
	r$1 || (r$1 = []);
	try {
		if ((r$1.length || a$1) && (t$1 = await t$1.sign(r$1, e$1, a$1, c$1, h$1, f$1, u$1, y$1, g$1)), t$1 = t$1.compress(await async function(t$2 = [], e$2 = new Date(), r$2 = [], n$2 = T) {
			const i$2 = R.compression.uncompressed, s$2 = n$2.preferredCompressionAlgorithm, a$2 = await Promise.all(t$2.map(async function(t$3, i$3) {
				const a$3 = (await t$3.getPrimarySelfSignature(e$2, r$2[i$3], n$2)).preferredCompressionAlgorithms;
				return !!a$3 && a$3.indexOf(s$2) >= 0;
			}));
			return a$2.every(Boolean) ? s$2 : i$2;
		}(e$1, h$1, l$1, g$1), g$1), t$1 = await t$1.encrypt(e$1, n$1, i$1, o$1, u$1, h$1, l$1, g$1), "object" === s$1) return t$1;
		const p$2 = "armored" === s$1 ? t$1.armor(g$1) : t$1.write();
		return await Co(p$2);
	} catch (t$2) {
		throw F.wrapError("Error encrypting message", t$2);
	}
}
async function po({ message: t$1, decryptionKeys: e$1, passwords: r$1, sessionKeys: n$1, verificationKeys: i$1, expectSigned: s$1 = !1, format: a$1 = "utf8", signature: o$1 = null, date: c$1 = new Date(), config: u$1,...h$1 }) {
	if (So(u$1 = {
		...T,
		...u$1
	}), Eo(t$1), i$1 = Ko(i$1), e$1 = Ko(e$1), r$1 = Ko(r$1), n$1 = Ko(n$1), h$1.privateKeys) throw Error("The `privateKeys` option has been removed from openpgp.decrypt, pass `decryptionKeys` instead");
	if (h$1.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.decrypt, pass `verificationKeys` instead");
	const f$1 = Object.keys(h$1);
	if (f$1.length > 0) throw Error("Unknown option: " + f$1.join(", "));
	try {
		const h$2 = await t$1.decrypt(e$1, r$1, n$1, c$1, u$1);
		i$1 || (i$1 = []);
		const f$2 = {};
		if (f$2.signatures = o$1 ? await h$2.verifyDetached(o$1, i$1, c$1, u$1) : await h$2.verify(i$1, c$1, u$1), f$2.data = "binary" === a$1 ? h$2.getLiteralData() : h$2.getText(), f$2.filename = h$2.getFilename(), Do(f$2, t$1, ...new Set([h$2, h$2.unwrapCompressed()])), s$1) {
			if (0 === i$1.length) throw Error("Verification keys are required to verify message signatures");
			if (0 === f$2.signatures.length) throw Error("Message is not signed");
			f$2.data = A([f$2.data, U(async () => (await F.anyPromise(f$2.signatures.map((t$2) => t$2.verified)), "binary" === a$1 ? new Uint8Array() : ""))]);
		}
		return f$2.data = await Co(f$2.data), f$2;
	} catch (t$2) {
		throw F.wrapError("Error decrypting message", t$2);
	}
}
function Eo(t$1) {
	if (!(t$1 instanceof to)) throw Error("Parameter [message] needs to be of type Message");
}
function Bo(t$1) {
	if ("armored" !== t$1 && "binary" !== t$1 && "object" !== t$1) throw Error("Unsupported format " + t$1);
}
const Io = Object.keys(T).length;
function So(t$1) {
	const e$1 = Object.keys(t$1);
	if (e$1.length !== Io) {
		for (const t$2 of e$1) if (void 0 === T[t$2]) throw Error("Unknown config property: " + t$2);
	}
}
function Ko(t$1) {
	return t$1 && !F.isArray(t$1) && (t$1 = [t$1]), t$1;
}
async function Co(t$1) {
	return "array" === F.isStream(t$1) ? C(t$1) : t$1;
}
function Do(t$1, e$1, ...r$1) {
	t$1.data = E(e$1.packets.stream, async (e$2, n$1) => {
		await w(t$1.data, n$1, { preventClose: !0 });
		const i$1 = x(n$1);
		try {
			await C(e$2, (t$2) => t$2), await Promise.all(r$1.map((t$2) => C(t$2.packets.stream, (t$3) => t$3))), await i$1.close();
		} catch (t$2) {
			await i$1.abort(t$2);
		}
	});
}
function Uo(t$1, e$1, r$1) {
	switch (e$1) {
		case "object": return t$1;
		case "armored": return t$1.armor(r$1);
		case "binary": return t$1.write();
		default: throw Error("Unsupported format " + e$1);
	}
}
const Po = "object" == typeof t && "crypto" in t ? t.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function xo(t$1) {
	return t$1 instanceof Uint8Array || ArrayBuffer.isView(t$1) && "Uint8Array" === t$1.constructor.name;
}
function Qo(t$1) {
	if (!Number.isSafeInteger(t$1) || t$1 < 0) throw Error("positive integer expected, got " + t$1);
}
function Ro(t$1, ...e$1) {
	if (!xo(t$1)) throw Error("Uint8Array expected");
	if (e$1.length > 0 && !e$1.includes(t$1.length)) throw Error("Uint8Array expected of length " + e$1 + ", got length=" + t$1.length);
}
function To(t$1) {
	if ("function" != typeof t$1 || "function" != typeof t$1.create) throw Error("Hash should be wrapped by utils.createHasher");
	Qo(t$1.outputLen), Qo(t$1.blockLen);
}
function Mo(t$1, e$1 = !0) {
	if (t$1.destroyed) throw Error("Hash instance has been destroyed");
	if (e$1 && t$1.finished) throw Error("Hash#digest() has already been called");
}
function Fo(t$1, e$1) {
	Ro(t$1);
	const r$1 = e$1.outputLen;
	if (t$1.length < r$1) throw Error("digestInto() expects output buffer of length at least " + r$1);
}
function No(...t$1) {
	for (let e$1 = 0; e$1 < t$1.length; e$1++) t$1[e$1].fill(0);
}
function Lo(t$1) {
	return new DataView(t$1.buffer, t$1.byteOffset, t$1.byteLength);
}
function Oo(t$1, e$1) {
	return t$1 << 32 - e$1 | t$1 >>> e$1;
}
function Ho(t$1, e$1) {
	return t$1 << e$1 | t$1 >>> 32 - e$1 >>> 0;
}
const zo = /* @__PURE__ */ (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])() ? (t$1) => t$1 : function(t$1) {
	for (let r$1 = 0; r$1 < t$1.length; r$1++) t$1[r$1] = (e$1 = t$1[r$1]) << 24 & 4278190080 | e$1 << 8 & 16711680 | e$1 >>> 8 & 65280 | e$1 >>> 24 & 255;
	var e$1;
	return t$1;
}, Go = /* @__PURE__ */ (() => "function" == typeof Uint8Array.from([]).toHex && "function" == typeof Uint8Array.fromHex)(), _o = /* @__PURE__ */ Array.from({ length: 256 }, (t$1, e$1) => e$1.toString(16).padStart(2, "0"));
function jo(t$1) {
	if (Ro(t$1), Go) return t$1.toHex();
	let e$1 = "";
	for (let r$1 = 0; r$1 < t$1.length; r$1++) e$1 += _o[t$1[r$1]];
	return e$1;
}
const Vo = 48, qo = 57, Yo = 65, Zo = 70, Jo = 97, Wo = 102;
function Xo(t$1) {
	return t$1 >= Vo && t$1 <= qo ? t$1 - Vo : t$1 >= Yo && t$1 <= Zo ? t$1 - (Yo - 10) : t$1 >= Jo && t$1 <= Wo ? t$1 - (Jo - 10) : void 0;
}
function $o(t$1) {
	if ("string" != typeof t$1) throw Error("hex string expected, got " + typeof t$1);
	if (Go) return Uint8Array.fromHex(t$1);
	const e$1 = t$1.length, r$1 = e$1 / 2;
	if (e$1 % 2) throw Error("hex string expected, got unpadded hex of length " + e$1);
	const n$1 = new Uint8Array(r$1);
	for (let e$2 = 0, i$1 = 0; e$2 < r$1; e$2++, i$1 += 2) {
		const r$2 = Xo(t$1.charCodeAt(i$1)), s$1 = Xo(t$1.charCodeAt(i$1 + 1));
		if (void 0 === r$2 || void 0 === s$1) {
			const e$3 = t$1[i$1] + t$1[i$1 + 1];
			throw Error("hex string expected, got non-hex character \"" + e$3 + "\" at index " + i$1);
		}
		n$1[e$2] = 16 * r$2 + s$1;
	}
	return n$1;
}
function tc(t$1) {
	return "string" == typeof t$1 && (t$1 = function(t$2) {
		if ("string" != typeof t$2) throw Error("string expected");
		return new Uint8Array(new TextEncoder().encode(t$2));
	}(t$1)), Ro(t$1), t$1;
}
function ec(...t$1) {
	let e$1 = 0;
	for (let r$2 = 0; r$2 < t$1.length; r$2++) {
		const n$1 = t$1[r$2];
		Ro(n$1), e$1 += n$1.length;
	}
	const r$1 = new Uint8Array(e$1);
	for (let e$2 = 0, n$1 = 0; e$2 < t$1.length; e$2++) {
		const i$1 = t$1[e$2];
		r$1.set(i$1, n$1), n$1 += i$1.length;
	}
	return r$1;
}
var rc = class {};
function nc(t$1) {
	const e$1 = (e$2) => t$1().update(tc(e$2)).digest(), r$1 = t$1();
	return e$1.outputLen = r$1.outputLen, e$1.blockLen = r$1.blockLen, e$1.create = () => t$1(), e$1;
}
const ic = nc;
function sc(t$1 = 32) {
	if (Po && "function" == typeof Po.getRandomValues) return Po.getRandomValues(new Uint8Array(t$1));
	if (Po && "function" == typeof Po.randomBytes) return Uint8Array.from(Po.randomBytes(t$1));
	throw Error("crypto.getRandomValues must be defined");
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ac = /* @__PURE__ */ BigInt(0), oc = /* @__PURE__ */ BigInt(1);
function cc(t$1, e$1 = "") {
	if ("boolean" != typeof t$1) throw Error((e$1 && `"${e$1}"`) + "expected boolean, got type=" + typeof t$1);
	return t$1;
}
function uc(t$1, e$1, r$1 = "") {
	const n$1 = xo(t$1), i$1 = t$1?.length, s$1 = void 0 !== e$1;
	if (!n$1 || s$1 && i$1 !== e$1) throw Error((r$1 && `"${r$1}" `) + "expected Uint8Array" + (s$1 ? " of length " + e$1 : "") + ", got " + (n$1 ? "length=" + i$1 : "type=" + typeof t$1));
	return t$1;
}
function hc(t$1) {
	const e$1 = t$1.toString(16);
	return 1 & e$1.length ? "0" + e$1 : e$1;
}
function fc(t$1) {
	if ("string" != typeof t$1) throw Error("hex string expected, got " + typeof t$1);
	return "" === t$1 ? ac : BigInt("0x" + t$1);
}
function lc(t$1) {
	return fc(jo(t$1));
}
function yc(t$1) {
	return Ro(t$1), fc(jo(Uint8Array.from(t$1).reverse()));
}
function gc(t$1, e$1) {
	return $o(t$1.toString(16).padStart(2 * e$1, "0"));
}
function pc(t$1, e$1) {
	return gc(t$1, e$1).reverse();
}
function dc(t$1, e$1, r$1) {
	let n$1;
	if ("string" == typeof e$1) try {
		n$1 = $o(e$1);
	} catch (e$2) {
		throw Error(t$1 + " must be hex string or Uint8Array, cause: " + e$2);
	}
else {
		if (!xo(e$1)) throw Error(t$1 + " must be hex string or Uint8Array");
		n$1 = Uint8Array.from(e$1);
	}
	const i$1 = n$1.length;
	if ("number" == typeof r$1 && i$1 !== r$1) throw Error(t$1 + " of length " + r$1 + " expected, got " + i$1);
	return n$1;
}
function Ac(t$1) {
	return Uint8Array.from(t$1);
}
const wc = (t$1) => "bigint" == typeof t$1 && ac <= t$1;
function mc(t$1, e$1, r$1, n$1) {
	if (!function(t$2, e$2, r$2) {
		return wc(t$2) && wc(e$2) && wc(r$2) && e$2 <= t$2 && t$2 < r$2;
	}(e$1, r$1, n$1)) throw Error("expected valid " + t$1 + ": " + r$1 + " <= n < " + n$1 + ", got " + e$1);
}
function bc(t$1) {
	let e$1;
	for (e$1 = 0; t$1 > ac; t$1 >>= oc, e$1 += 1);
	return e$1;
}
const kc = (t$1) => (oc << BigInt(t$1)) - oc;
function Ec(t$1, e$1, r$1 = {}) {
	if (!t$1 || "object" != typeof t$1) throw Error("expected valid options object");
	function n$1(e$2, r$2, n$2) {
		const i$1 = t$1[e$2];
		if (n$2 && void 0 === i$1) return;
		const s$1 = typeof i$1;
		if (s$1 !== r$2 || null === i$1) throw Error(`param "${e$2}" is invalid: expected ${r$2}, got ${s$1}`);
	}
	Object.entries(e$1).forEach(([t$2, e$2]) => n$1(t$2, e$2, !1)), Object.entries(r$1).forEach(([t$2, e$2]) => n$1(t$2, e$2, !0));
}
function vc(t$1) {
	const e$1 = new WeakMap();
	return (r$1, ...n$1) => {
		const i$1 = e$1.get(r$1);
		if (void 0 !== i$1) return i$1;
		const s$1 = t$1(r$1, ...n$1);
		return e$1.set(r$1, s$1), s$1;
	};
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Bc = BigInt(0), Ic = BigInt(1), Sc = /* @__PURE__ */ BigInt(2), Kc = /* @__PURE__ */ BigInt(3), Cc = /* @__PURE__ */ BigInt(4), Dc = /* @__PURE__ */ BigInt(5), Uc = /* @__PURE__ */ BigInt(7), Pc = /* @__PURE__ */ BigInt(8), xc = /* @__PURE__ */ BigInt(9), Qc = /* @__PURE__ */ BigInt(16);
function Rc(t$1, e$1) {
	const r$1 = t$1 % e$1;
	return r$1 >= Bc ? r$1 : e$1 + r$1;
}
function Tc(t$1, e$1, r$1) {
	let n$1 = t$1;
	for (; e$1-- > Bc;) n$1 *= n$1, n$1 %= r$1;
	return n$1;
}
function Mc(t$1, e$1) {
	if (t$1 === Bc) throw Error("invert: expected non-zero number");
	if (e$1 <= Bc) throw Error("invert: expected positive modulus, got " + e$1);
	let r$1 = Rc(t$1, e$1), n$1 = e$1, i$1 = Bc, s$1 = Ic;
	for (; r$1 !== Bc;) {
		const t$2 = n$1 % r$1, e$2 = i$1 - s$1 * (n$1 / r$1);
		n$1 = r$1, r$1 = t$2, i$1 = s$1, s$1 = e$2;
	}
	if (n$1 !== Ic) throw Error("invert: does not exist");
	return Rc(i$1, e$1);
}
function Fc(t$1, e$1, r$1) {
	if (!t$1.eql(t$1.sqr(e$1), r$1)) throw Error("Cannot find square root");
}
function Nc(t$1, e$1) {
	const r$1 = (t$1.ORDER + Ic) / Cc, n$1 = t$1.pow(e$1, r$1);
	return Fc(t$1, n$1, e$1), n$1;
}
function Lc(t$1, e$1) {
	const r$1 = (t$1.ORDER - Dc) / Pc, n$1 = t$1.mul(e$1, Sc), i$1 = t$1.pow(n$1, r$1), s$1 = t$1.mul(e$1, i$1), a$1 = t$1.mul(t$1.mul(s$1, Sc), i$1), o$1 = t$1.mul(s$1, t$1.sub(a$1, t$1.ONE));
	return Fc(t$1, o$1, e$1), o$1;
}
function Oc(t$1) {
	if (t$1 < Kc) throw Error("sqrt is not defined for small field");
	let e$1 = t$1 - Ic, r$1 = 0;
	for (; e$1 % Sc === Bc;) e$1 /= Sc, r$1++;
	let n$1 = Sc;
	const i$1 = Vc(t$1);
	for (; 1 === _c(i$1, n$1);) if (n$1++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (1 === r$1) return Nc;
	let s$1 = i$1.pow(n$1, e$1);
	const a$1 = (e$1 + Ic) / Sc;
	return function(t$2, n$2) {
		if (t$2.is0(n$2)) return n$2;
		if (1 !== _c(t$2, n$2)) throw Error("Cannot find square root");
		let i$2 = r$1, o$1 = t$2.mul(t$2.ONE, s$1), c$1 = t$2.pow(n$2, e$1), u$1 = t$2.pow(n$2, a$1);
		for (; !t$2.eql(c$1, t$2.ONE);) {
			if (t$2.is0(c$1)) return t$2.ZERO;
			let e$2 = 1, r$2 = t$2.sqr(c$1);
			for (; !t$2.eql(r$2, t$2.ONE);) if (e$2++, r$2 = t$2.sqr(r$2), e$2 === i$2) throw Error("Cannot find square root");
			const n$3 = Ic << BigInt(i$2 - e$2 - 1), s$2 = t$2.pow(o$1, n$3);
			i$2 = e$2, o$1 = t$2.sqr(s$2), c$1 = t$2.mul(c$1, o$1), u$1 = t$2.mul(u$1, s$2);
		}
		return u$1;
	};
}
function Hc(t$1) {
	return t$1 % Cc === Kc ? Nc : t$1 % Pc === Dc ? Lc : t$1 % Qc === xc ? function(t$2) {
		const e$1 = Vc(t$2), r$1 = Oc(t$2), n$1 = r$1(e$1, e$1.neg(e$1.ONE)), i$1 = r$1(e$1, n$1), s$1 = r$1(e$1, e$1.neg(n$1)), a$1 = (t$2 + Uc) / Qc;
		return (t$3, e$2) => {
			let r$2 = t$3.pow(e$2, a$1), o$1 = t$3.mul(r$2, n$1);
			const c$1 = t$3.mul(r$2, i$1), u$1 = t$3.mul(r$2, s$1), h$1 = t$3.eql(t$3.sqr(o$1), e$2), f$1 = t$3.eql(t$3.sqr(c$1), e$2);
			r$2 = t$3.cmov(r$2, o$1, h$1), o$1 = t$3.cmov(u$1, c$1, f$1);
			const l$1 = t$3.eql(t$3.sqr(o$1), e$2), y$1 = t$3.cmov(r$2, o$1, l$1);
			return Fc(t$3, y$1, e$2), y$1;
		};
	}(t$1) : Oc(t$1);
}
const zc = [
	"create",
	"isValid",
	"is0",
	"neg",
	"inv",
	"sqrt",
	"sqr",
	"eql",
	"add",
	"sub",
	"mul",
	"pow",
	"div",
	"addN",
	"subN",
	"mulN",
	"sqrN"
];
function Gc(t$1, e$1, r$1 = !1) {
	const n$1 = Array(e$1.length).fill(r$1 ? t$1.ZERO : void 0), i$1 = e$1.reduce((e$2, r$2, i$2) => t$1.is0(r$2) ? e$2 : (n$1[i$2] = e$2, t$1.mul(e$2, r$2)), t$1.ONE), s$1 = t$1.inv(i$1);
	return e$1.reduceRight((e$2, r$2, i$2) => t$1.is0(r$2) ? e$2 : (n$1[i$2] = t$1.mul(e$2, n$1[i$2]), t$1.mul(e$2, r$2)), s$1), n$1;
}
function _c(t$1, e$1) {
	const r$1 = (t$1.ORDER - Ic) / Sc, n$1 = t$1.pow(e$1, r$1), i$1 = t$1.eql(n$1, t$1.ONE), s$1 = t$1.eql(n$1, t$1.ZERO), a$1 = t$1.eql(n$1, t$1.neg(t$1.ONE));
	if (!i$1 && !s$1 && !a$1) throw Error("invalid Legendre symbol result");
	return i$1 ? 1 : s$1 ? 0 : -1;
}
function jc(t$1, e$1) {
	void 0 !== e$1 && Qo(e$1);
	const r$1 = void 0 !== e$1 ? e$1 : t$1.toString(2).length;
	return {
		nBitLength: r$1,
		nByteLength: Math.ceil(r$1 / 8)
	};
}
function Vc(t$1, e$1, r$1 = !1, n$1 = {}) {
	if (t$1 <= Bc) throw Error("invalid field: expected ORDER > 0, got " + t$1);
	let i$1, s$1, a$1, o$1 = !1;
	if ("object" == typeof e$1 && null != e$1) {
		if (n$1.sqrt || r$1) throw Error("cannot specify opts in two arguments");
		const t$2 = e$1;
		t$2.BITS && (i$1 = t$2.BITS), t$2.sqrt && (s$1 = t$2.sqrt), "boolean" == typeof t$2.isLE && (r$1 = t$2.isLE), "boolean" == typeof t$2.modFromBytes && (o$1 = t$2.modFromBytes), a$1 = t$2.allowedLengths;
	} else "number" == typeof e$1 && (i$1 = e$1), n$1.sqrt && (s$1 = n$1.sqrt);
	const { nBitLength: c$1, nByteLength: u$1 } = jc(t$1, i$1);
	if (u$1 > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
	let h$1;
	const f$1 = Object.freeze({
		ORDER: t$1,
		isLE: r$1,
		BITS: c$1,
		BYTES: u$1,
		MASK: kc(c$1),
		ZERO: Bc,
		ONE: Ic,
		allowedLengths: a$1,
		create: (e$2) => Rc(e$2, t$1),
		isValid: (e$2) => {
			if ("bigint" != typeof e$2) throw Error("invalid field element: expected bigint, got " + typeof e$2);
			return Bc <= e$2 && e$2 < t$1;
		},
		is0: (t$2) => t$2 === Bc,
		isValidNot0: (t$2) => !f$1.is0(t$2) && f$1.isValid(t$2),
		isOdd: (t$2) => (t$2 & Ic) === Ic,
		neg: (e$2) => Rc(-e$2, t$1),
		eql: (t$2, e$2) => t$2 === e$2,
		sqr: (e$2) => Rc(e$2 * e$2, t$1),
		add: (e$2, r$2) => Rc(e$2 + r$2, t$1),
		sub: (e$2, r$2) => Rc(e$2 - r$2, t$1),
		mul: (e$2, r$2) => Rc(e$2 * r$2, t$1),
		pow: (t$2, e$2) => function(t$3, e$3, r$2) {
			if (r$2 < Bc) throw Error("invalid exponent, negatives unsupported");
			if (r$2 === Bc) return t$3.ONE;
			if (r$2 === Ic) return e$3;
			let n$2 = t$3.ONE, i$2 = e$3;
			for (; r$2 > Bc;) r$2 & Ic && (n$2 = t$3.mul(n$2, i$2)), i$2 = t$3.sqr(i$2), r$2 >>= Ic;
			return n$2;
		}(f$1, t$2, e$2),
		div: (e$2, r$2) => Rc(e$2 * Mc(r$2, t$1), t$1),
		sqrN: (t$2) => t$2 * t$2,
		addN: (t$2, e$2) => t$2 + e$2,
		subN: (t$2, e$2) => t$2 - e$2,
		mulN: (t$2, e$2) => t$2 * e$2,
		inv: (e$2) => Mc(e$2, t$1),
		sqrt: s$1 || ((e$2) => (h$1 || (h$1 = Hc(t$1)), h$1(f$1, e$2))),
		toBytes: (t$2) => r$1 ? pc(t$2, u$1) : gc(t$2, u$1),
		fromBytes: (e$2, n$2 = !0) => {
			if (a$1) {
				if (!a$1.includes(e$2.length) || e$2.length > u$1) throw Error("Field.fromBytes: expected " + a$1 + " bytes, got " + e$2.length);
				const t$2 = new Uint8Array(u$1);
				t$2.set(e$2, r$1 ? 0 : t$2.length - e$2.length), e$2 = t$2;
			}
			if (e$2.length !== u$1) throw Error("Field.fromBytes: expected " + u$1 + " bytes, got " + e$2.length);
			let i$2 = r$1 ? yc(e$2) : lc(e$2);
			if (o$1 && (i$2 = Rc(i$2, t$1)), !n$2 && !f$1.isValid(i$2)) throw Error("invalid field element: outside of range 0..ORDER");
			return i$2;
		},
		invertBatch: (t$2) => Gc(f$1, t$2),
		cmov: (t$2, e$2, r$2) => r$2 ? e$2 : t$2
	});
	return Object.freeze(f$1);
}
function qc(t$1) {
	if ("bigint" != typeof t$1) throw Error("field order must be bigint");
	const e$1 = t$1.toString(2).length;
	return Math.ceil(e$1 / 8);
}
function Yc(t$1) {
	const e$1 = qc(t$1);
	return e$1 + Math.ceil(e$1 / 2);
}
function Zc(t$1, e$1, r$1) {
	return t$1 & e$1 ^ ~t$1 & r$1;
}
function Jc(t$1, e$1, r$1) {
	return t$1 & e$1 ^ t$1 & r$1 ^ e$1 & r$1;
}
var Wc = class extends rc {
	constructor(t$1, e$1, r$1, n$1) {
		super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t$1, this.outputLen = e$1, this.padOffset = r$1, this.isLE = n$1, this.buffer = new Uint8Array(t$1), this.view = Lo(this.buffer);
	}
	update(t$1) {
		Mo(this), Ro(t$1 = tc(t$1));
		const { view: e$1, buffer: r$1, blockLen: n$1 } = this, i$1 = t$1.length;
		for (let s$1 = 0; s$1 < i$1;) {
			const a$1 = Math.min(n$1 - this.pos, i$1 - s$1);
			if (a$1 !== n$1) r$1.set(t$1.subarray(s$1, s$1 + a$1), this.pos), this.pos += a$1, s$1 += a$1, this.pos === n$1 && (this.process(e$1, 0), this.pos = 0);
else {
				const e$2 = Lo(t$1);
				for (; n$1 <= i$1 - s$1; s$1 += n$1) this.process(e$2, s$1);
			}
		}
		return this.length += t$1.length, this.roundClean(), this;
	}
	digestInto(t$1) {
		Mo(this), Fo(t$1, this), this.finished = !0;
		const { buffer: e$1, view: r$1, blockLen: n$1, isLE: i$1 } = this;
		let { pos: s$1 } = this;
		e$1[s$1++] = 128, No(this.buffer.subarray(s$1)), this.padOffset > n$1 - s$1 && (this.process(r$1, 0), s$1 = 0);
		for (let t$2 = s$1; t$2 < n$1; t$2++) e$1[t$2] = 0;
		!function(t$2, e$2, r$2, n$2) {
			if ("function" == typeof t$2.setBigUint64) return t$2.setBigUint64(e$2, r$2, n$2);
			const i$2 = BigInt(32), s$2 = BigInt(4294967295), a$2 = Number(r$2 >> i$2 & s$2), o$2 = Number(r$2 & s$2), c$2 = n$2 ? 4 : 0, u$2 = n$2 ? 0 : 4;
			t$2.setUint32(e$2 + c$2, a$2, n$2), t$2.setUint32(e$2 + u$2, o$2, n$2);
		}(r$1, n$1 - 8, BigInt(8 * this.length), i$1), this.process(r$1, 0);
		const a$1 = Lo(t$1), o$1 = this.outputLen;
		if (o$1 % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
		const c$1 = o$1 / 4, u$1 = this.get();
		if (c$1 > u$1.length) throw Error("_sha2: outputLen bigger than state");
		for (let t$2 = 0; t$2 < c$1; t$2++) a$1.setUint32(4 * t$2, u$1[t$2], i$1);
	}
	digest() {
		const { buffer: t$1, outputLen: e$1 } = this;
		this.digestInto(t$1);
		const r$1 = t$1.slice(0, e$1);
		return this.destroy(), r$1;
	}
	_cloneInto(t$1) {
		t$1 || (t$1 = new this.constructor()), t$1.set(...this.get());
		const { blockLen: e$1, buffer: r$1, length: n$1, finished: i$1, destroyed: s$1, pos: a$1 } = this;
		return t$1.destroyed = s$1, t$1.finished = i$1, t$1.length = n$1, t$1.pos = a$1, n$1 % e$1 && t$1.buffer.set(r$1), t$1;
	}
	clone() {
		return this._cloneInto();
	}
};
const Xc = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), $c = /* @__PURE__ */ Uint32Array.from([
	3238371032,
	914150663,
	812702999,
	4144912697,
	4290775857,
	1750603025,
	1694076839,
	3204075428
]), tu = /* @__PURE__ */ Uint32Array.from([
	3418070365,
	3238371032,
	1654270250,
	914150663,
	2438529370,
	812702999,
	355462360,
	4144912697,
	1731405415,
	4290775857,
	2394180231,
	1750603025,
	3675008525,
	1694076839,
	1203062813,
	3204075428
]), eu = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	4089235720,
	3144134277,
	2227873595,
	1013904242,
	4271175723,
	2773480762,
	1595750129,
	1359893119,
	2917565137,
	2600822924,
	725511199,
	528734635,
	4215389547,
	1541459225,
	327033209
]), ru = /* @__PURE__ */ BigInt(4294967295), nu = /* @__PURE__ */ BigInt(32);
function iu(t$1, e$1 = !1) {
	return e$1 ? {
		h: Number(t$1 & ru),
		l: Number(t$1 >> nu & ru)
	} : {
		h: 0 | Number(t$1 >> nu & ru),
		l: 0 | Number(t$1 & ru)
	};
}
function su(t$1, e$1 = !1) {
	const r$1 = t$1.length;
	let n$1 = new Uint32Array(r$1), i$1 = new Uint32Array(r$1);
	for (let s$1 = 0; s$1 < r$1; s$1++) {
		const { h: r$2, l: a$1 } = iu(t$1[s$1], e$1);
		[n$1[s$1], i$1[s$1]] = [r$2, a$1];
	}
	return [n$1, i$1];
}
const au = (t$1, e$1, r$1) => t$1 >>> r$1, ou = (t$1, e$1, r$1) => t$1 << 32 - r$1 | e$1 >>> r$1, cu = (t$1, e$1, r$1) => t$1 >>> r$1 | e$1 << 32 - r$1, uu = (t$1, e$1, r$1) => t$1 << 32 - r$1 | e$1 >>> r$1, hu = (t$1, e$1, r$1) => t$1 << 64 - r$1 | e$1 >>> r$1 - 32, fu = (t$1, e$1, r$1) => t$1 >>> r$1 - 32 | e$1 << 64 - r$1;
function lu(t$1, e$1, r$1, n$1) {
	const i$1 = (e$1 >>> 0) + (n$1 >>> 0);
	return {
		h: t$1 + r$1 + (i$1 / 4294967296 | 0) | 0,
		l: 0 | i$1
	};
}
const yu = (t$1, e$1, r$1) => (t$1 >>> 0) + (e$1 >>> 0) + (r$1 >>> 0), gu = (t$1, e$1, r$1, n$1) => e$1 + r$1 + n$1 + (t$1 / 4294967296 | 0) | 0, pu = (t$1, e$1, r$1, n$1) => (t$1 >>> 0) + (e$1 >>> 0) + (r$1 >>> 0) + (n$1 >>> 0), du = (t$1, e$1, r$1, n$1, i$1) => e$1 + r$1 + n$1 + i$1 + (t$1 / 4294967296 | 0) | 0, Au = (t$1, e$1, r$1, n$1, i$1) => (t$1 >>> 0) + (e$1 >>> 0) + (r$1 >>> 0) + (n$1 >>> 0) + (i$1 >>> 0), wu = (t$1, e$1, r$1, n$1, i$1, s$1) => e$1 + r$1 + n$1 + i$1 + s$1 + (t$1 / 4294967296 | 0) | 0, mu = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]), bu = /* @__PURE__ */ new Uint32Array(64);
var ku = class extends Wc {
	constructor(t$1 = 32) {
		super(64, t$1, 8, !1), this.A = 0 | Xc[0], this.B = 0 | Xc[1], this.C = 0 | Xc[2], this.D = 0 | Xc[3], this.E = 0 | Xc[4], this.F = 0 | Xc[5], this.G = 0 | Xc[6], this.H = 0 | Xc[7];
	}
	get() {
		const { A: t$1, B: e$1, C: r$1, D: n$1, E: i$1, F: s$1, G: a$1, H: o$1 } = this;
		return [
			t$1,
			e$1,
			r$1,
			n$1,
			i$1,
			s$1,
			a$1,
			o$1
		];
	}
	set(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1) {
		this.A = 0 | t$1, this.B = 0 | e$1, this.C = 0 | r$1, this.D = 0 | n$1, this.E = 0 | i$1, this.F = 0 | s$1, this.G = 0 | a$1, this.H = 0 | o$1;
	}
	process(t$1, e$1) {
		for (let r$2 = 0; r$2 < 16; r$2++, e$1 += 4) bu[r$2] = t$1.getUint32(e$1, !1);
		for (let t$2 = 16; t$2 < 64; t$2++) {
			const e$2 = bu[t$2 - 15], r$2 = bu[t$2 - 2], n$2 = Oo(e$2, 7) ^ Oo(e$2, 18) ^ e$2 >>> 3, i$2 = Oo(r$2, 17) ^ Oo(r$2, 19) ^ r$2 >>> 10;
			bu[t$2] = i$2 + bu[t$2 - 7] + n$2 + bu[t$2 - 16] | 0;
		}
		let { A: r$1, B: n$1, C: i$1, D: s$1, E: a$1, F: o$1, G: c$1, H: u$1 } = this;
		for (let t$2 = 0; t$2 < 64; t$2++) {
			const e$2 = u$1 + (Oo(a$1, 6) ^ Oo(a$1, 11) ^ Oo(a$1, 25)) + Zc(a$1, o$1, c$1) + mu[t$2] + bu[t$2] | 0, h$1 = (Oo(r$1, 2) ^ Oo(r$1, 13) ^ Oo(r$1, 22)) + Jc(r$1, n$1, i$1) | 0;
			u$1 = c$1, c$1 = o$1, o$1 = a$1, a$1 = s$1 + e$2 | 0, s$1 = i$1, i$1 = n$1, n$1 = r$1, r$1 = e$2 + h$1 | 0;
		}
		r$1 = r$1 + this.A | 0, n$1 = n$1 + this.B | 0, i$1 = i$1 + this.C | 0, s$1 = s$1 + this.D | 0, a$1 = a$1 + this.E | 0, o$1 = o$1 + this.F | 0, c$1 = c$1 + this.G | 0, u$1 = u$1 + this.H | 0, this.set(r$1, n$1, i$1, s$1, a$1, o$1, c$1, u$1);
	}
	roundClean() {
		No(bu);
	}
	destroy() {
		this.set(0, 0, 0, 0, 0, 0, 0, 0), No(this.buffer);
	}
};
var Eu = class extends ku {
	constructor() {
		super(28), this.A = 0 | $c[0], this.B = 0 | $c[1], this.C = 0 | $c[2], this.D = 0 | $c[3], this.E = 0 | $c[4], this.F = 0 | $c[5], this.G = 0 | $c[6], this.H = 0 | $c[7];
	}
};
const vu = /* @__PURE__ */ (() => su([
	"0x428a2f98d728ae22",
	"0x7137449123ef65cd",
	"0xb5c0fbcfec4d3b2f",
	"0xe9b5dba58189dbbc",
	"0x3956c25bf348b538",
	"0x59f111f1b605d019",
	"0x923f82a4af194f9b",
	"0xab1c5ed5da6d8118",
	"0xd807aa98a3030242",
	"0x12835b0145706fbe",
	"0x243185be4ee4b28c",
	"0x550c7dc3d5ffb4e2",
	"0x72be5d74f27b896f",
	"0x80deb1fe3b1696b1",
	"0x9bdc06a725c71235",
	"0xc19bf174cf692694",
	"0xe49b69c19ef14ad2",
	"0xefbe4786384f25e3",
	"0x0fc19dc68b8cd5b5",
	"0x240ca1cc77ac9c65",
	"0x2de92c6f592b0275",
	"0x4a7484aa6ea6e483",
	"0x5cb0a9dcbd41fbd4",
	"0x76f988da831153b5",
	"0x983e5152ee66dfab",
	"0xa831c66d2db43210",
	"0xb00327c898fb213f",
	"0xbf597fc7beef0ee4",
	"0xc6e00bf33da88fc2",
	"0xd5a79147930aa725",
	"0x06ca6351e003826f",
	"0x142929670a0e6e70",
	"0x27b70a8546d22ffc",
	"0x2e1b21385c26c926",
	"0x4d2c6dfc5ac42aed",
	"0x53380d139d95b3df",
	"0x650a73548baf63de",
	"0x766a0abb3c77b2a8",
	"0x81c2c92e47edaee6",
	"0x92722c851482353b",
	"0xa2bfe8a14cf10364",
	"0xa81a664bbc423001",
	"0xc24b8b70d0f89791",
	"0xc76c51a30654be30",
	"0xd192e819d6ef5218",
	"0xd69906245565a910",
	"0xf40e35855771202a",
	"0x106aa07032bbd1b8",
	"0x19a4c116b8d2d0c8",
	"0x1e376c085141ab53",
	"0x2748774cdf8eeb99",
	"0x34b0bcb5e19b48a8",
	"0x391c0cb3c5c95a63",
	"0x4ed8aa4ae3418acb",
	"0x5b9cca4f7763e373",
	"0x682e6ff3d6b2b8a3",
	"0x748f82ee5defb2fc",
	"0x78a5636f43172f60",
	"0x84c87814a1f0ab72",
	"0x8cc702081a6439ec",
	"0x90befffa23631e28",
	"0xa4506cebde82bde9",
	"0xbef9a3f7b2c67915",
	"0xc67178f2e372532b",
	"0xca273eceea26619c",
	"0xd186b8c721c0c207",
	"0xeada7dd6cde0eb1e",
	"0xf57d4f7fee6ed178",
	"0x06f067aa72176fba",
	"0x0a637dc5a2c898a6",
	"0x113f9804bef90dae",
	"0x1b710b35131c471b",
	"0x28db77f523047d84",
	"0x32caab7b40c72493",
	"0x3c9ebe0a15c9bebc",
	"0x431d67c49c100d4c",
	"0x4cc5d4becb3e42b6",
	"0x597f299cfc657e2a",
	"0x5fcb6fab3ad6faec",
	"0x6c44198c4a475817"
].map((t$1) => BigInt(t$1))))(), Bu = /* @__PURE__ */ (() => vu[0])(), Iu = /* @__PURE__ */ (() => vu[1])(), Su = /* @__PURE__ */ new Uint32Array(80), Ku = /* @__PURE__ */ new Uint32Array(80);
var Cu = class extends Wc {
	constructor(t$1 = 64) {
		super(128, t$1, 16, !1), this.Ah = 0 | eu[0], this.Al = 0 | eu[1], this.Bh = 0 | eu[2], this.Bl = 0 | eu[3], this.Ch = 0 | eu[4], this.Cl = 0 | eu[5], this.Dh = 0 | eu[6], this.Dl = 0 | eu[7], this.Eh = 0 | eu[8], this.El = 0 | eu[9], this.Fh = 0 | eu[10], this.Fl = 0 | eu[11], this.Gh = 0 | eu[12], this.Gl = 0 | eu[13], this.Hh = 0 | eu[14], this.Hl = 0 | eu[15];
	}
	get() {
		const { Ah: t$1, Al: e$1, Bh: r$1, Bl: n$1, Ch: i$1, Cl: s$1, Dh: a$1, Dl: o$1, Eh: c$1, El: u$1, Fh: h$1, Fl: f$1, Gh: l$1, Gl: y$1, Hh: g$1, Hl: p$1 } = this;
		return [
			t$1,
			e$1,
			r$1,
			n$1,
			i$1,
			s$1,
			a$1,
			o$1,
			c$1,
			u$1,
			h$1,
			f$1,
			l$1,
			y$1,
			g$1,
			p$1
		];
	}
	set(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1, c$1, u$1, h$1, f$1, l$1, y$1, g$1, p$1) {
		this.Ah = 0 | t$1, this.Al = 0 | e$1, this.Bh = 0 | r$1, this.Bl = 0 | n$1, this.Ch = 0 | i$1, this.Cl = 0 | s$1, this.Dh = 0 | a$1, this.Dl = 0 | o$1, this.Eh = 0 | c$1, this.El = 0 | u$1, this.Fh = 0 | h$1, this.Fl = 0 | f$1, this.Gh = 0 | l$1, this.Gl = 0 | y$1, this.Hh = 0 | g$1, this.Hl = 0 | p$1;
	}
	process(t$1, e$1) {
		for (let r$2 = 0; r$2 < 16; r$2++, e$1 += 4) Su[r$2] = t$1.getUint32(e$1), Ku[r$2] = t$1.getUint32(e$1 += 4);
		for (let t$2 = 16; t$2 < 80; t$2++) {
			const e$2 = 0 | Su[t$2 - 15], r$2 = 0 | Ku[t$2 - 15], n$2 = cu(e$2, r$2, 1) ^ cu(e$2, r$2, 8) ^ au(e$2, 0, 7), i$2 = uu(e$2, r$2, 1) ^ uu(e$2, r$2, 8) ^ ou(e$2, r$2, 7), s$2 = 0 | Su[t$2 - 2], a$2 = 0 | Ku[t$2 - 2], o$2 = cu(s$2, a$2, 19) ^ hu(s$2, a$2, 61) ^ au(s$2, 0, 6), c$2 = uu(s$2, a$2, 19) ^ fu(s$2, a$2, 61) ^ ou(s$2, a$2, 6), u$2 = pu(i$2, c$2, Ku[t$2 - 7], Ku[t$2 - 16]), h$2 = du(u$2, n$2, o$2, Su[t$2 - 7], Su[t$2 - 16]);
			Su[t$2] = 0 | h$2, Ku[t$2] = 0 | u$2;
		}
		let { Ah: r$1, Al: n$1, Bh: i$1, Bl: s$1, Ch: a$1, Cl: o$1, Dh: c$1, Dl: u$1, Eh: h$1, El: f$1, Fh: l$1, Fl: y$1, Gh: g$1, Gl: p$1, Hh: d$1, Hl: A$1 } = this;
		for (let t$2 = 0; t$2 < 80; t$2++) {
			const e$2 = cu(h$1, f$1, 14) ^ cu(h$1, f$1, 18) ^ hu(h$1, f$1, 41), w$1 = uu(h$1, f$1, 14) ^ uu(h$1, f$1, 18) ^ fu(h$1, f$1, 41), m$1 = h$1 & l$1 ^ ~h$1 & g$1, b$1 = Au(A$1, w$1, f$1 & y$1 ^ ~f$1 & p$1, Iu[t$2], Ku[t$2]), k$1 = wu(b$1, d$1, e$2, m$1, Bu[t$2], Su[t$2]), E$1 = 0 | b$1, v$1 = cu(r$1, n$1, 28) ^ hu(r$1, n$1, 34) ^ hu(r$1, n$1, 39), B$1 = uu(r$1, n$1, 28) ^ fu(r$1, n$1, 34) ^ fu(r$1, n$1, 39), I$1 = r$1 & i$1 ^ r$1 & a$1 ^ i$1 & a$1, S$1 = n$1 & s$1 ^ n$1 & o$1 ^ s$1 & o$1;
			d$1 = 0 | g$1, A$1 = 0 | p$1, g$1 = 0 | l$1, p$1 = 0 | y$1, l$1 = 0 | h$1, y$1 = 0 | f$1, {h: h$1, l: f$1} = lu(0 | c$1, 0 | u$1, 0 | k$1, 0 | E$1), c$1 = 0 | a$1, u$1 = 0 | o$1, a$1 = 0 | i$1, o$1 = 0 | s$1, i$1 = 0 | r$1, s$1 = 0 | n$1;
			const K$1 = yu(E$1, B$1, S$1);
			r$1 = gu(K$1, k$1, v$1, I$1), n$1 = 0 | K$1;
		}
		({h: r$1, l: n$1} = lu(0 | this.Ah, 0 | this.Al, 0 | r$1, 0 | n$1)), {h: i$1, l: s$1} = lu(0 | this.Bh, 0 | this.Bl, 0 | i$1, 0 | s$1), {h: a$1, l: o$1} = lu(0 | this.Ch, 0 | this.Cl, 0 | a$1, 0 | o$1), {h: c$1, l: u$1} = lu(0 | this.Dh, 0 | this.Dl, 0 | c$1, 0 | u$1), {h: h$1, l: f$1} = lu(0 | this.Eh, 0 | this.El, 0 | h$1, 0 | f$1), {h: l$1, l: y$1} = lu(0 | this.Fh, 0 | this.Fl, 0 | l$1, 0 | y$1), {h: g$1, l: p$1} = lu(0 | this.Gh, 0 | this.Gl, 0 | g$1, 0 | p$1), {h: d$1, l: A$1} = lu(0 | this.Hh, 0 | this.Hl, 0 | d$1, 0 | A$1), this.set(r$1, n$1, i$1, s$1, a$1, o$1, c$1, u$1, h$1, f$1, l$1, y$1, g$1, p$1, d$1, A$1);
	}
	roundClean() {
		No(Su, Ku);
	}
	destroy() {
		No(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
};
var Du = class extends Cu {
	constructor() {
		super(48), this.Ah = 0 | tu[0], this.Al = 0 | tu[1], this.Bh = 0 | tu[2], this.Bl = 0 | tu[3], this.Ch = 0 | tu[4], this.Cl = 0 | tu[5], this.Dh = 0 | tu[6], this.Dl = 0 | tu[7], this.Eh = 0 | tu[8], this.El = 0 | tu[9], this.Fh = 0 | tu[10], this.Fl = 0 | tu[11], this.Gh = 0 | tu[12], this.Gl = 0 | tu[13], this.Hh = 0 | tu[14], this.Hl = 0 | tu[15];
	}
};
const Uu = /* @__PURE__ */ nc(() => new ku()), Pu = /* @__PURE__ */ nc(() => new Eu()), xu = /* @__PURE__ */ nc(() => new Cu()), Qu = /* @__PURE__ */ nc(() => new Du());
var Ru = class extends rc {
	constructor(t$1, e$1) {
		super(), this.finished = !1, this.destroyed = !1, To(t$1);
		const r$1 = tc(e$1);
		if (this.iHash = t$1.create(), "function" != typeof this.iHash.update) throw Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
		const n$1 = this.blockLen, i$1 = new Uint8Array(n$1);
		i$1.set(r$1.length > n$1 ? t$1.create().update(r$1).digest() : r$1);
		for (let t$2 = 0; t$2 < i$1.length; t$2++) i$1[t$2] ^= 54;
		this.iHash.update(i$1), this.oHash = t$1.create();
		for (let t$2 = 0; t$2 < i$1.length; t$2++) i$1[t$2] ^= 106;
		this.oHash.update(i$1), No(i$1);
	}
	update(t$1) {
		return Mo(this), this.iHash.update(t$1), this;
	}
	digestInto(t$1) {
		Mo(this), Ro(t$1, this.outputLen), this.finished = !0, this.iHash.digestInto(t$1), this.oHash.update(t$1), this.oHash.digestInto(t$1), this.destroy();
	}
	digest() {
		const t$1 = new Uint8Array(this.oHash.outputLen);
		return this.digestInto(t$1), t$1;
	}
	_cloneInto(t$1) {
		t$1 || (t$1 = Object.create(Object.getPrototypeOf(this), {}));
		const { oHash: e$1, iHash: r$1, finished: n$1, destroyed: i$1, blockLen: s$1, outputLen: a$1 } = this;
		return t$1.finished = n$1, t$1.destroyed = i$1, t$1.blockLen = s$1, t$1.outputLen = a$1, t$1.oHash = e$1._cloneInto(t$1.oHash), t$1.iHash = r$1._cloneInto(t$1.iHash), t$1;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
	}
};
const Tu = (t$1, e$1, r$1) => new Ru(t$1, e$1).update(r$1).digest();
Tu.create = (t$1, e$1) => new Ru(t$1, e$1);
const Mu = BigInt(0), Fu = BigInt(1);
function Nu(t$1, e$1) {
	const r$1 = e$1.negate();
	return t$1 ? r$1 : e$1;
}
function Lu(t$1, e$1) {
	const r$1 = Gc(t$1.Fp, e$1.map((t$2) => t$2.Z));
	return e$1.map((e$2, n$1) => t$1.fromAffine(e$2.toAffine(r$1[n$1])));
}
function Ou(t$1, e$1) {
	if (!Number.isSafeInteger(t$1) || t$1 <= 0 || t$1 > e$1) throw Error("invalid window size, expected [1.." + e$1 + "], got W=" + t$1);
}
function Hu(t$1, e$1) {
	Ou(t$1, e$1);
	const r$1 = 2 ** t$1;
	return {
		windows: Math.ceil(e$1 / t$1) + 1,
		windowSize: 2 ** (t$1 - 1),
		mask: kc(t$1),
		maxNumber: r$1,
		shiftBy: BigInt(t$1)
	};
}
function zu(t$1, e$1, r$1) {
	const { windowSize: n$1, mask: i$1, maxNumber: s$1, shiftBy: a$1 } = r$1;
	let o$1 = Number(t$1 & i$1), c$1 = t$1 >> a$1;
	o$1 > n$1 && (o$1 -= s$1, c$1 += Fu);
	const u$1 = e$1 * n$1;
	return {
		nextN: c$1,
		offset: u$1 + Math.abs(o$1) - 1,
		isZero: 0 === o$1,
		isNeg: o$1 < 0,
		isNegF: e$1 % 2 != 0,
		offsetF: u$1
	};
}
const Gu = new WeakMap(), _u = new WeakMap();
function ju(t$1) {
	return _u.get(t$1) || 1;
}
function Vu(t$1) {
	if (t$1 !== Mu) throw Error("invalid wNAF");
}
var qu = class {
	constructor(t$1, e$1) {
		this.BASE = t$1.BASE, this.ZERO = t$1.ZERO, this.Fn = t$1.Fn, this.bits = e$1;
	}
	_unsafeLadder(t$1, e$1, r$1 = this.ZERO) {
		let n$1 = t$1;
		for (; e$1 > Mu;) e$1 & Fu && (r$1 = r$1.add(n$1)), n$1 = n$1.double(), e$1 >>= Fu;
		return r$1;
	}
	precomputeWindow(t$1, e$1) {
		const { windows: r$1, windowSize: n$1 } = Hu(e$1, this.bits), i$1 = [];
		let s$1 = t$1, a$1 = s$1;
		for (let t$2 = 0; t$2 < r$1; t$2++) {
			a$1 = s$1, i$1.push(a$1);
			for (let t$3 = 1; t$3 < n$1; t$3++) a$1 = a$1.add(s$1), i$1.push(a$1);
			s$1 = a$1.double();
		}
		return i$1;
	}
	wNAF(t$1, e$1, r$1) {
		if (!this.Fn.isValid(r$1)) throw Error("invalid scalar");
		let n$1 = this.ZERO, i$1 = this.BASE;
		const s$1 = Hu(t$1, this.bits);
		for (let t$2 = 0; t$2 < s$1.windows; t$2++) {
			const { nextN: a$1, offset: o$1, isZero: c$1, isNeg: u$1, isNegF: h$1, offsetF: f$1 } = zu(r$1, t$2, s$1);
			r$1 = a$1, c$1 ? i$1 = i$1.add(Nu(h$1, e$1[f$1])) : n$1 = n$1.add(Nu(u$1, e$1[o$1]));
		}
		return Vu(r$1), {
			p: n$1,
			f: i$1
		};
	}
	wNAFUnsafe(t$1, e$1, r$1, n$1 = this.ZERO) {
		const i$1 = Hu(t$1, this.bits);
		for (let t$2 = 0; t$2 < i$1.windows && r$1 !== Mu; t$2++) {
			const { nextN: s$1, offset: a$1, isZero: o$1, isNeg: c$1 } = zu(r$1, t$2, i$1);
			if (r$1 = s$1, !o$1) {
				const t$3 = e$1[a$1];
				n$1 = n$1.add(c$1 ? t$3.negate() : t$3);
			}
		}
		return Vu(r$1), n$1;
	}
	getPrecomputes(t$1, e$1, r$1) {
		let n$1 = Gu.get(e$1);
		return n$1 || (n$1 = this.precomputeWindow(e$1, t$1), 1 !== t$1 && ("function" == typeof r$1 && (n$1 = r$1(n$1)), Gu.set(e$1, n$1))), n$1;
	}
	cached(t$1, e$1, r$1) {
		const n$1 = ju(t$1);
		return this.wNAF(n$1, this.getPrecomputes(n$1, t$1, r$1), e$1);
	}
	unsafe(t$1, e$1, r$1, n$1) {
		const i$1 = ju(t$1);
		return 1 === i$1 ? this._unsafeLadder(t$1, e$1, n$1) : this.wNAFUnsafe(i$1, this.getPrecomputes(i$1, t$1, r$1), e$1, n$1);
	}
	createCache(t$1, e$1) {
		Ou(e$1, this.bits), _u.set(t$1, e$1), Gu.delete(t$1);
	}
	hasCache(t$1) {
		return 1 !== ju(t$1);
	}
};
function Yu(t$1, e$1, r$1, n$1) {
	!function(t$2, e$2) {
		if (!Array.isArray(t$2)) throw Error("array expected");
		t$2.forEach((t$3, r$2) => {
			if (!(t$3 instanceof e$2)) throw Error("invalid point at index " + r$2);
		});
	}(r$1, t$1), function(t$2, e$2) {
		if (!Array.isArray(t$2)) throw Error("array of scalars expected");
		t$2.forEach((t$3, r$2) => {
			if (!e$2.isValid(t$3)) throw Error("invalid scalar at index " + r$2);
		});
	}(n$1, e$1);
	const i$1 = r$1.length, s$1 = n$1.length;
	if (i$1 !== s$1) throw Error("arrays of points and scalars must have equal length");
	const a$1 = t$1.ZERO, o$1 = bc(BigInt(i$1));
	let c$1 = 1;
	o$1 > 12 ? c$1 = o$1 - 3 : o$1 > 4 ? c$1 = o$1 - 2 : o$1 > 0 && (c$1 = 2);
	const u$1 = kc(c$1), h$1 = Array(Number(u$1) + 1).fill(a$1);
	let f$1 = a$1;
	for (let t$2 = Math.floor((e$1.BITS - 1) / c$1) * c$1; t$2 >= 0; t$2 -= c$1) {
		h$1.fill(a$1);
		for (let e$3 = 0; e$3 < s$1; e$3++) {
			const i$2 = n$1[e$3], s$2 = Number(i$2 >> BigInt(t$2) & u$1);
			h$1[s$2] = h$1[s$2].add(r$1[e$3]);
		}
		let e$2 = a$1;
		for (let t$3 = h$1.length - 1, r$2 = a$1; t$3 > 0; t$3--) r$2 = r$2.add(h$1[t$3]), e$2 = e$2.add(r$2);
		if (f$1 = f$1.add(e$2), 0 !== t$2) for (let t$3 = 0; t$3 < c$1; t$3++) f$1 = f$1.double();
	}
	return f$1;
}
function Zu(t$1, e$1, r$1) {
	if (e$1) {
		if (e$1.ORDER !== t$1) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
		return function(t$2) {
			Ec(t$2, zc.reduce((t$3, e$2) => (t$3[e$2] = "function", t$3), {
				ORDER: "bigint",
				MASK: "bigint",
				BYTES: "number",
				BITS: "number"
			}));
		}(e$1), e$1;
	}
	return Vc(t$1, { isLE: r$1 });
}
function Ju(t$1, e$1, r$1 = {}, n$1) {
	if (void 0 === n$1 && (n$1 = "edwards" === t$1), !e$1 || "object" != typeof e$1) throw Error(`expected valid ${t$1} CURVE object`);
	for (const t$2 of [
		"p",
		"n",
		"h"
	]) {
		const r$2 = e$1[t$2];
		if (!("bigint" == typeof r$2 && r$2 > Mu)) throw Error(`CURVE.${t$2} must be positive bigint`);
	}
	const i$1 = Zu(e$1.p, r$1.Fp, n$1), s$1 = Zu(e$1.n, r$1.Fn, n$1), a$1 = [
		"Gx",
		"Gy",
		"a",
		"weierstrass" === t$1 ? "b" : "d"
	];
	for (const t$2 of a$1) if (!i$1.isValid(e$1[t$2])) throw Error(`CURVE.${t$2} must be valid field element of CURVE.Fp`);
	return {
		CURVE: e$1 = Object.freeze(Object.assign({}, e$1)),
		Fp: i$1,
		Fn: s$1
	};
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Wu = (t$1, e$1) => (t$1 + (t$1 >= 0 ? e$1 : -e$1) / nh) / e$1;
function Xu(t$1) {
	if (![
		"compact",
		"recovered",
		"der"
	].includes(t$1)) throw Error("Signature format must be \"compact\", \"recovered\", or \"der\"");
	return t$1;
}
function $u(t$1, e$1) {
	const r$1 = {};
	for (let n$1 of Object.keys(e$1)) r$1[n$1] = void 0 === t$1[n$1] ? e$1[n$1] : t$1[n$1];
	return cc(r$1.lowS, "lowS"), cc(r$1.prehash, "prehash"), void 0 !== r$1.format && Xu(r$1.format), r$1;
}
const th = {
	Err: class extends Error {
		constructor(t$1 = "") {
			super(t$1);
		}
	},
	_tlv: {
		encode: (t$1, e$1) => {
			const { Err: r$1 } = th;
			if (t$1 < 0 || t$1 > 256) throw new r$1("tlv.encode: wrong tag");
			if (1 & e$1.length) throw new r$1("tlv.encode: unpadded data");
			const n$1 = e$1.length / 2, i$1 = hc(n$1);
			if (i$1.length / 2 & 128) throw new r$1("tlv.encode: long form length too big");
			const s$1 = n$1 > 127 ? hc(i$1.length / 2 | 128) : "";
			return hc(t$1) + s$1 + i$1 + e$1;
		},
		decode(t$1, e$1) {
			const { Err: r$1 } = th;
			let n$1 = 0;
			if (t$1 < 0 || t$1 > 256) throw new r$1("tlv.encode: wrong tag");
			if (e$1.length < 2 || e$1[n$1++] !== t$1) throw new r$1("tlv.decode: wrong tlv");
			const i$1 = e$1[n$1++];
			let s$1 = 0;
			if (!!(128 & i$1)) {
				const t$2 = 127 & i$1;
				if (!t$2) throw new r$1("tlv.decode(long): indefinite length not supported");
				if (t$2 > 4) throw new r$1("tlv.decode(long): byte length is too big");
				const a$2 = e$1.subarray(n$1, n$1 + t$2);
				if (a$2.length !== t$2) throw new r$1("tlv.decode: length bytes not complete");
				if (0 === a$2[0]) throw new r$1("tlv.decode(long): zero leftmost byte");
				for (const t$3 of a$2) s$1 = s$1 << 8 | t$3;
				if (n$1 += t$2, s$1 < 128) throw new r$1("tlv.decode(long): not minimal encoding");
			} else s$1 = i$1;
			const a$1 = e$1.subarray(n$1, n$1 + s$1);
			if (a$1.length !== s$1) throw new r$1("tlv.decode: wrong value length");
			return {
				v: a$1,
				l: e$1.subarray(n$1 + s$1)
			};
		}
	},
	_int: {
		encode(t$1) {
			const { Err: e$1 } = th;
			if (t$1 < eh) throw new e$1("integer: negative integers are not allowed");
			let r$1 = hc(t$1);
			if (8 & Number.parseInt(r$1[0], 16) && (r$1 = "00" + r$1), 1 & r$1.length) throw new e$1("unexpected DER parsing assertion: unpadded hex");
			return r$1;
		},
		decode(t$1) {
			const { Err: e$1 } = th;
			if (128 & t$1[0]) throw new e$1("invalid signature integer: negative");
			if (0 === t$1[0] && !(128 & t$1[1])) throw new e$1("invalid signature integer: unnecessary leading zero");
			return lc(t$1);
		}
	},
	toSig(t$1) {
		const { Err: e$1, _int: r$1, _tlv: n$1 } = th, i$1 = dc("signature", t$1), { v: s$1, l: a$1 } = n$1.decode(48, i$1);
		if (a$1.length) throw new e$1("invalid signature: left bytes after parsing");
		const { v: o$1, l: c$1 } = n$1.decode(2, s$1), { v: u$1, l: h$1 } = n$1.decode(2, c$1);
		if (h$1.length) throw new e$1("invalid signature: left bytes after parsing");
		return {
			r: r$1.decode(o$1),
			s: r$1.decode(u$1)
		};
	},
	hexFromSig(t$1) {
		const { _tlv: e$1, _int: r$1 } = th, n$1 = e$1.encode(2, r$1.encode(t$1.r)) + e$1.encode(2, r$1.encode(t$1.s));
		return e$1.encode(48, n$1);
	}
}, eh = BigInt(0), rh = BigInt(1), nh = BigInt(2), ih = BigInt(3), sh = BigInt(4);
function ah(t$1, e$1) {
	const { BYTES: r$1 } = t$1;
	let n$1;
	if ("bigint" == typeof e$1) n$1 = e$1;
else {
		let i$1 = dc("private key", e$1);
		try {
			n$1 = t$1.fromBytes(i$1);
		} catch (t$2) {
			throw Error(`invalid private key: expected ui8a of size ${r$1}, got ${typeof e$1}`);
		}
	}
	if (!t$1.isValidNot0(n$1)) throw Error("invalid private key: out of range [1..N-1]");
	return n$1;
}
function oh(t$1, e$1 = {}) {
	const r$1 = Ju("weierstrass", t$1, e$1), { Fp: n$1, Fn: i$1 } = r$1;
	let s$1 = r$1.CURVE;
	const { h: a$1, n: o$1 } = s$1;
	Ec(e$1, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object",
		wrapPrivateKey: "boolean"
	});
	const { endo: c$1 } = e$1;
	if (c$1 && (!n$1.is0(s$1.a) || "bigint" != typeof c$1.beta || !Array.isArray(c$1.basises))) throw Error("invalid endo: expected \"beta\": bigint and \"basises\": array");
	const u$1 = uh(n$1, i$1);
	function h$1() {
		if (!n$1.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
	}
	const f$1 = e$1.toBytes || function(t$2, e$2, r$2) {
		const { x: i$2, y: s$2 } = e$2.toAffine(), a$2 = n$1.toBytes(i$2);
		if (cc(r$2, "isCompressed"), r$2) {
			h$1();
			return ec(ch(!n$1.isOdd(s$2)), a$2);
		}
		return ec(Uint8Array.of(4), a$2, n$1.toBytes(s$2));
	}, l$1 = e$1.fromBytes || function(t$2) {
		uc(t$2, void 0, "Point");
		const { publicKey: e$2, publicKeyUncompressed: r$2 } = u$1, i$2 = t$2.length, s$2 = t$2[0], a$2 = t$2.subarray(1);
		if (i$2 !== e$2 || 2 !== s$2 && 3 !== s$2) {
			if (i$2 === r$2 && 4 === s$2) {
				const t$3 = n$1.BYTES, e$3 = n$1.fromBytes(a$2.subarray(0, t$3)), r$3 = n$1.fromBytes(a$2.subarray(t$3, 2 * t$3));
				if (!g$1(e$3, r$3)) throw Error("bad point: is not on curve");
				return {
					x: e$3,
					y: r$3
				};
			}
			throw Error(`bad point: got length ${i$2}, expected compressed=${e$2} or uncompressed=${r$2}`);
		}
		{
			const t$3 = n$1.fromBytes(a$2);
			if (!n$1.isValid(t$3)) throw Error("bad point: is not on curve, wrong x");
			const e$3 = y$1(t$3);
			let r$3;
			try {
				r$3 = n$1.sqrt(e$3);
			} catch (t$4) {
				const e$4 = t$4 instanceof Error ? ": " + t$4.message : "";
				throw Error("bad point: is not on curve, sqrt error" + e$4);
			}
			h$1();
			return !(1 & ~s$2) !== n$1.isOdd(r$3) && (r$3 = n$1.neg(r$3)), {
				x: t$3,
				y: r$3
			};
		}
	};
	function y$1(t$2) {
		const e$2 = n$1.sqr(t$2), r$2 = n$1.mul(e$2, t$2);
		return n$1.add(n$1.add(r$2, n$1.mul(t$2, s$1.a)), s$1.b);
	}
	function g$1(t$2, e$2) {
		const r$2 = n$1.sqr(e$2), i$2 = y$1(t$2);
		return n$1.eql(r$2, i$2);
	}
	if (!g$1(s$1.Gx, s$1.Gy)) throw Error("bad curve params: generator point");
	const p$1 = n$1.mul(n$1.pow(s$1.a, ih), sh), d$1 = n$1.mul(n$1.sqr(s$1.b), BigInt(27));
	if (n$1.is0(n$1.add(p$1, d$1))) throw Error("bad curve params: a or b");
	function A$1(t$2, e$2, r$2 = !1) {
		if (!n$1.isValid(e$2) || r$2 && n$1.is0(e$2)) throw Error("bad point coordinate " + t$2);
		return e$2;
	}
	function w$1(t$2) {
		if (!(t$2 instanceof v$1)) throw Error("ProjectivePoint expected");
	}
	function m$1(t$2) {
		if (!c$1 || !c$1.basises) throw Error("no endo");
		return function(t$3, e$2, r$2) {
			const [[n$2, i$2], [s$2, a$2]] = e$2, o$2 = Wu(a$2 * t$3, r$2), c$2 = Wu(-i$2 * t$3, r$2);
			let u$2 = t$3 - o$2 * n$2 - c$2 * s$2, h$2 = -o$2 * i$2 - c$2 * a$2;
			const f$2 = u$2 < eh, l$2 = h$2 < eh;
			f$2 && (u$2 = -u$2), l$2 && (h$2 = -h$2);
			const y$2 = kc(Math.ceil(bc(r$2) / 2)) + rh;
			if (u$2 < eh || u$2 >= y$2 || h$2 < eh || h$2 >= y$2) throw Error("splitScalar (endomorphism): failed, k=" + t$3);
			return {
				k1neg: f$2,
				k1: u$2,
				k2neg: l$2,
				k2: h$2
			};
		}(t$2, c$1.basises, i$1.ORDER);
	}
	const b$1 = vc((t$2, e$2) => {
		const { X: r$2, Y: i$2, Z: s$2 } = t$2;
		if (n$1.eql(s$2, n$1.ONE)) return {
			x: r$2,
			y: i$2
		};
		const a$2 = t$2.is0();
		null == e$2 && (e$2 = a$2 ? n$1.ONE : n$1.inv(s$2));
		const o$2 = n$1.mul(r$2, e$2), c$2 = n$1.mul(i$2, e$2), u$2 = n$1.mul(s$2, e$2);
		if (a$2) return {
			x: n$1.ZERO,
			y: n$1.ZERO
		};
		if (!n$1.eql(u$2, n$1.ONE)) throw Error("invZ was invalid");
		return {
			x: o$2,
			y: c$2
		};
	}), k$1 = vc((t$2) => {
		if (t$2.is0()) {
			if (e$1.allowInfinityPoint && !n$1.is0(t$2.Y)) return;
			throw Error("bad point: ZERO");
		}
		const { x: r$2, y: i$2 } = t$2.toAffine();
		if (!n$1.isValid(r$2) || !n$1.isValid(i$2)) throw Error("bad point: x or y not field elements");
		if (!g$1(r$2, i$2)) throw Error("bad point: equation left != right");
		if (!t$2.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
		return !0;
	});
	function E$1(t$2, e$2, r$2, i$2, s$2) {
		return r$2 = new v$1(n$1.mul(r$2.X, t$2), r$2.Y, r$2.Z), e$2 = Nu(i$2, e$2), r$2 = Nu(s$2, r$2), e$2.add(r$2);
	}
	class v$1 {
		constructor(t$2, e$2, r$2) {
			this.X = A$1("x", t$2), this.Y = A$1("y", e$2, !0), this.Z = A$1("z", r$2), Object.freeze(this);
		}
		static CURVE() {
			return s$1;
		}
		static fromAffine(t$2) {
			const { x: e$2, y: r$2 } = t$2 || {};
			if (!t$2 || !n$1.isValid(e$2) || !n$1.isValid(r$2)) throw Error("invalid affine point");
			if (t$2 instanceof v$1) throw Error("projective point not allowed");
			return n$1.is0(e$2) && n$1.is0(r$2) ? v$1.ZERO : new v$1(e$2, r$2, n$1.ONE);
		}
		static fromBytes(t$2) {
			const e$2 = v$1.fromAffine(l$1(uc(t$2, void 0, "point")));
			return e$2.assertValidity(), e$2;
		}
		static fromHex(t$2) {
			return v$1.fromBytes(dc("pointHex", t$2));
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(t$2 = 8, e$2 = !0) {
			return I$1.createCache(this, t$2), e$2 || this.multiply(ih), this;
		}
		assertValidity() {
			k$1(this);
		}
		hasEvenY() {
			const { y: t$2 } = this.toAffine();
			if (!n$1.isOdd) throw Error("Field doesn't support isOdd");
			return !n$1.isOdd(t$2);
		}
		equals(t$2) {
			w$1(t$2);
			const { X: e$2, Y: r$2, Z: i$2 } = this, { X: s$2, Y: a$2, Z: o$2 } = t$2, c$2 = n$1.eql(n$1.mul(e$2, o$2), n$1.mul(s$2, i$2)), u$2 = n$1.eql(n$1.mul(r$2, o$2), n$1.mul(a$2, i$2));
			return c$2 && u$2;
		}
		negate() {
			return new v$1(this.X, n$1.neg(this.Y), this.Z);
		}
		double() {
			const { a: t$2, b: e$2 } = s$1, r$2 = n$1.mul(e$2, ih), { X: i$2, Y: a$2, Z: o$2 } = this;
			let c$2 = n$1.ZERO, u$2 = n$1.ZERO, h$2 = n$1.ZERO, f$2 = n$1.mul(i$2, i$2), l$2 = n$1.mul(a$2, a$2), y$2 = n$1.mul(o$2, o$2), g$2 = n$1.mul(i$2, a$2);
			return g$2 = n$1.add(g$2, g$2), h$2 = n$1.mul(i$2, o$2), h$2 = n$1.add(h$2, h$2), c$2 = n$1.mul(t$2, h$2), u$2 = n$1.mul(r$2, y$2), u$2 = n$1.add(c$2, u$2), c$2 = n$1.sub(l$2, u$2), u$2 = n$1.add(l$2, u$2), u$2 = n$1.mul(c$2, u$2), c$2 = n$1.mul(g$2, c$2), h$2 = n$1.mul(r$2, h$2), y$2 = n$1.mul(t$2, y$2), g$2 = n$1.sub(f$2, y$2), g$2 = n$1.mul(t$2, g$2), g$2 = n$1.add(g$2, h$2), h$2 = n$1.add(f$2, f$2), f$2 = n$1.add(h$2, f$2), f$2 = n$1.add(f$2, y$2), f$2 = n$1.mul(f$2, g$2), u$2 = n$1.add(u$2, f$2), y$2 = n$1.mul(a$2, o$2), y$2 = n$1.add(y$2, y$2), f$2 = n$1.mul(y$2, g$2), c$2 = n$1.sub(c$2, f$2), h$2 = n$1.mul(y$2, l$2), h$2 = n$1.add(h$2, h$2), h$2 = n$1.add(h$2, h$2), new v$1(c$2, u$2, h$2);
		}
		add(t$2) {
			w$1(t$2);
			const { X: e$2, Y: r$2, Z: i$2 } = this, { X: a$2, Y: o$2, Z: c$2 } = t$2;
			let u$2 = n$1.ZERO, h$2 = n$1.ZERO, f$2 = n$1.ZERO;
			const l$2 = s$1.a, y$2 = n$1.mul(s$1.b, ih);
			let g$2 = n$1.mul(e$2, a$2), p$2 = n$1.mul(r$2, o$2), d$2 = n$1.mul(i$2, c$2), A$2 = n$1.add(e$2, r$2), m$2 = n$1.add(a$2, o$2);
			A$2 = n$1.mul(A$2, m$2), m$2 = n$1.add(g$2, p$2), A$2 = n$1.sub(A$2, m$2), m$2 = n$1.add(e$2, i$2);
			let b$2 = n$1.add(a$2, c$2);
			return m$2 = n$1.mul(m$2, b$2), b$2 = n$1.add(g$2, d$2), m$2 = n$1.sub(m$2, b$2), b$2 = n$1.add(r$2, i$2), u$2 = n$1.add(o$2, c$2), b$2 = n$1.mul(b$2, u$2), u$2 = n$1.add(p$2, d$2), b$2 = n$1.sub(b$2, u$2), f$2 = n$1.mul(l$2, m$2), u$2 = n$1.mul(y$2, d$2), f$2 = n$1.add(u$2, f$2), u$2 = n$1.sub(p$2, f$2), f$2 = n$1.add(p$2, f$2), h$2 = n$1.mul(u$2, f$2), p$2 = n$1.add(g$2, g$2), p$2 = n$1.add(p$2, g$2), d$2 = n$1.mul(l$2, d$2), m$2 = n$1.mul(y$2, m$2), p$2 = n$1.add(p$2, d$2), d$2 = n$1.sub(g$2, d$2), d$2 = n$1.mul(l$2, d$2), m$2 = n$1.add(m$2, d$2), g$2 = n$1.mul(p$2, m$2), h$2 = n$1.add(h$2, g$2), g$2 = n$1.mul(b$2, m$2), u$2 = n$1.mul(A$2, u$2), u$2 = n$1.sub(u$2, g$2), g$2 = n$1.mul(A$2, p$2), f$2 = n$1.mul(b$2, f$2), f$2 = n$1.add(f$2, g$2), new v$1(u$2, h$2, f$2);
		}
		subtract(t$2) {
			return this.add(t$2.negate());
		}
		is0() {
			return this.equals(v$1.ZERO);
		}
		multiply(t$2) {
			const { endo: r$2 } = e$1;
			if (!i$1.isValidNot0(t$2)) throw Error("invalid scalar: out of range");
			let n$2, s$2;
			const a$2 = (t$3) => I$1.cached(this, t$3, (t$4) => Lu(v$1, t$4));
			if (r$2) {
				const { k1neg: e$2, k1: i$2, k2neg: o$2, k2: c$2 } = m$1(t$2), { p: u$2, f: h$2 } = a$2(i$2), { p: f$2, f: l$2 } = a$2(c$2);
				s$2 = h$2.add(l$2), n$2 = E$1(r$2.beta, u$2, f$2, e$2, o$2);
			} else {
				const { p: e$2, f: r$3 } = a$2(t$2);
				n$2 = e$2, s$2 = r$3;
			}
			return Lu(v$1, [n$2, s$2])[0];
		}
		multiplyUnsafe(t$2) {
			const { endo: r$2 } = e$1, n$2 = this;
			if (!i$1.isValid(t$2)) throw Error("invalid scalar: out of range");
			if (t$2 === eh || n$2.is0()) return v$1.ZERO;
			if (t$2 === rh) return n$2;
			if (I$1.hasCache(this)) return this.multiply(t$2);
			if (r$2) {
				const { k1neg: e$2, k1: i$2, k2neg: s$2, k2: a$2 } = m$1(t$2), { p1: o$2, p2: c$2 } = function(t$3, e$3, r$3, n$3) {
					let i$3 = e$3, s$3 = t$3.ZERO, a$3 = t$3.ZERO;
					for (; r$3 > Mu || n$3 > Mu;) r$3 & Fu && (s$3 = s$3.add(i$3)), n$3 & Fu && (a$3 = a$3.add(i$3)), i$3 = i$3.double(), r$3 >>= Fu, n$3 >>= Fu;
					return {
						p1: s$3,
						p2: a$3
					};
				}(v$1, n$2, i$2, a$2);
				return E$1(r$2.beta, o$2, c$2, e$2, s$2);
			}
			return I$1.unsafe(n$2, t$2);
		}
		multiplyAndAddUnsafe(t$2, e$2, r$2) {
			const n$2 = this.multiplyUnsafe(e$2).add(t$2.multiplyUnsafe(r$2));
			return n$2.is0() ? void 0 : n$2;
		}
		toAffine(t$2) {
			return b$1(this, t$2);
		}
		isTorsionFree() {
			const { isTorsionFree: t$2 } = e$1;
			return a$1 === rh || (t$2 ? t$2(v$1, this) : I$1.unsafe(this, o$1).is0());
		}
		clearCofactor() {
			const { clearCofactor: t$2 } = e$1;
			return a$1 === rh ? this : t$2 ? t$2(v$1, this) : this.multiplyUnsafe(a$1);
		}
		isSmallOrder() {
			return this.multiplyUnsafe(a$1).is0();
		}
		toBytes(t$2 = !0) {
			return cc(t$2, "isCompressed"), this.assertValidity(), f$1(v$1, this, t$2);
		}
		toHex(t$2 = !0) {
			return jo(this.toBytes(t$2));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
		get px() {
			return this.X;
		}
		get py() {
			return this.X;
		}
		get pz() {
			return this.Z;
		}
		toRawBytes(t$2 = !0) {
			return this.toBytes(t$2);
		}
		_setWindowSize(t$2) {
			this.precompute(t$2);
		}
		static normalizeZ(t$2) {
			return Lu(v$1, t$2);
		}
		static msm(t$2, e$2) {
			return Yu(v$1, i$1, t$2, e$2);
		}
		static fromPrivateKey(t$2) {
			return v$1.BASE.multiply(ah(i$1, t$2));
		}
	}
	v$1.BASE = new v$1(s$1.Gx, s$1.Gy, n$1.ONE), v$1.ZERO = new v$1(n$1.ZERO, n$1.ONE, n$1.ZERO), v$1.Fp = n$1, v$1.Fn = i$1;
	const B$1 = i$1.BITS, I$1 = new qu(v$1, e$1.endo ? Math.ceil(B$1 / 2) : B$1);
	return v$1.BASE.precompute(8), v$1;
}
function ch(t$1) {
	return Uint8Array.of(t$1 ? 2 : 3);
}
function uh(t$1, e$1) {
	return {
		secretKey: e$1.BYTES,
		publicKey: 1 + t$1.BYTES,
		publicKeyUncompressed: 1 + 2 * t$1.BYTES,
		publicKeyHasPrefix: !0,
		signature: 2 * e$1.BYTES
	};
}
function hh(t$1, e$1 = {}) {
	const { Fn: r$1 } = t$1, n$1 = e$1.randomBytes || sc, i$1 = Object.assign(uh(t$1.Fp, r$1), { seed: Yc(r$1.ORDER) });
	function s$1(t$2) {
		try {
			return !!ah(r$1, t$2);
		} catch (t$3) {
			return !1;
		}
	}
	function a$1(t$2 = n$1(i$1.seed)) {
		return function(t$3, e$2, r$2 = !1) {
			const n$2 = t$3.length, i$2 = qc(e$2), s$2 = Yc(e$2);
			if (n$2 < 16 || n$2 < s$2 || n$2 > 1024) throw Error("expected " + s$2 + "-1024 bytes of input, got " + n$2);
			const a$2 = Rc(r$2 ? yc(t$3) : lc(t$3), e$2 - Ic) + Ic;
			return r$2 ? pc(a$2, i$2) : gc(a$2, i$2);
		}(uc(t$2, i$1.seed, "seed"), r$1.ORDER);
	}
	function o$1(e$2, n$2 = !0) {
		return t$1.BASE.multiply(ah(r$1, e$2)).toBytes(n$2);
	}
	function c$1(e$2) {
		if ("bigint" == typeof e$2) return !1;
		if (e$2 instanceof t$1) return !0;
		const { secretKey: n$2, publicKey: s$2, publicKeyUncompressed: a$2 } = i$1;
		if (r$1.allowedLengths || n$2 === s$2) return;
		const o$2 = dc("key", e$2).length;
		return o$2 === s$2 || o$2 === a$2;
	}
	const u$1 = {
		isValidSecretKey: s$1,
		isValidPublicKey: function(e$2, r$2) {
			const { publicKey: n$2, publicKeyUncompressed: s$2 } = i$1;
			try {
				const i$2 = e$2.length;
				return (!0 !== r$2 || i$2 === n$2) && (!1 !== r$2 || i$2 === s$2) && !!t$1.fromBytes(e$2);
			} catch (t$2) {
				return !1;
			}
		},
		randomSecretKey: a$1,
		isValidPrivateKey: s$1,
		randomPrivateKey: a$1,
		normPrivateKeyToScalar: (t$2) => ah(r$1, t$2),
		precompute: (e$2 = 8, r$2 = t$1.BASE) => r$2.precompute(e$2, !1)
	};
	return Object.freeze({
		getPublicKey: o$1,
		getSharedSecret: function(e$2, n$2, i$2 = !0) {
			if (!0 === c$1(e$2)) throw Error("first arg must be private key");
			if (!1 === c$1(n$2)) throw Error("second arg must be public key");
			const s$2 = ah(r$1, e$2);
			return t$1.fromHex(n$2).multiply(s$2).toBytes(i$2);
		},
		keygen: function(t$2) {
			const e$2 = a$1(t$2);
			return {
				secretKey: e$2,
				publicKey: o$1(e$2)
			};
		},
		Point: t$1,
		utils: u$1,
		lengths: i$1
	});
}
function fh(t$1, e$1, r$1 = {}) {
	To(e$1), Ec(r$1, {}, {
		hmac: "function",
		lowS: "boolean",
		randomBytes: "function",
		bits2int: "function",
		bits2int_modN: "function"
	});
	const n$1 = r$1.randomBytes || sc, i$1 = r$1.hmac || ((t$2, ...r$2) => Tu(e$1, t$2, ec(...r$2))), { Fp: s$1, Fn: a$1 } = t$1, { ORDER: o$1, BITS: c$1 } = a$1, { keygen: u$1, getPublicKey: h$1, getSharedSecret: f$1, utils: l$1, lengths: y$1 } = hh(t$1, r$1), g$1 = {
		prehash: !1,
		lowS: "boolean" == typeof r$1.lowS && r$1.lowS,
		format: void 0,
		extraEntropy: !1
	}, p$1 = "compact";
	function d$1(t$2) {
		return t$2 > o$1 >> rh;
	}
	function A$1(t$2, e$2) {
		if (!a$1.isValidNot0(e$2)) throw Error(`invalid signature ${t$2}: out of range 1..Point.Fn.ORDER`);
		return e$2;
	}
	class w$1 {
		constructor(t$2, e$2, r$2) {
			this.r = A$1("r", t$2), this.s = A$1("s", e$2), null != r$2 && (this.recovery = r$2), Object.freeze(this);
		}
		static fromBytes(t$2, e$2 = p$1) {
			let r$2;
			if (function(t$3, e$3) {
				Xu(e$3);
				const r$3 = y$1.signature;
				uc(t$3, "compact" === e$3 ? r$3 : "recovered" === e$3 ? r$3 + 1 : void 0, e$3 + " signature");
			}(t$2, e$2), "der" === e$2) {
				const { r: e$3, s: r$3 } = th.toSig(uc(t$2));
				return new w$1(e$3, r$3);
			}
			"recovered" === e$2 && (r$2 = t$2[0], e$2 = "compact", t$2 = t$2.subarray(1));
			const n$2 = a$1.BYTES, i$2 = t$2.subarray(0, n$2), s$2 = t$2.subarray(n$2, 2 * n$2);
			return new w$1(a$1.fromBytes(i$2), a$1.fromBytes(s$2), r$2);
		}
		static fromHex(t$2, e$2) {
			return this.fromBytes($o(t$2), e$2);
		}
		addRecoveryBit(t$2) {
			return new w$1(this.r, this.s, t$2);
		}
		recoverPublicKey(e$2) {
			const r$2 = s$1.ORDER, { r: n$2, s: i$2, recovery: c$2 } = this;
			if (null == c$2 || ![
				0,
				1,
				2,
				3
			].includes(c$2)) throw Error("recovery id invalid");
			if (o$1 * nh < r$2 && c$2 > 1) throw Error("recovery id is ambiguous for h>1 curve");
			const u$2 = 2 === c$2 || 3 === c$2 ? n$2 + o$1 : n$2;
			if (!s$1.isValid(u$2)) throw Error("recovery id 2 or 3 invalid");
			const h$2 = s$1.toBytes(u$2), f$2 = t$1.fromBytes(ec(ch(!(1 & c$2)), h$2)), l$2 = a$1.inv(u$2), y$2 = b$1(dc("msgHash", e$2)), g$2 = a$1.create(-y$2 * l$2), p$2 = a$1.create(i$2 * l$2), d$2 = t$1.BASE.multiplyUnsafe(g$2).add(f$2.multiplyUnsafe(p$2));
			if (d$2.is0()) throw Error("point at infinify");
			return d$2.assertValidity(), d$2;
		}
		hasHighS() {
			return d$1(this.s);
		}
		toBytes(t$2 = p$1) {
			if (Xu(t$2), "der" === t$2) return $o(th.hexFromSig(this));
			const e$2 = a$1.toBytes(this.r), r$2 = a$1.toBytes(this.s);
			if ("recovered" === t$2) {
				if (null == this.recovery) throw Error("recovery bit must be present");
				return ec(Uint8Array.of(this.recovery), e$2, r$2);
			}
			return ec(e$2, r$2);
		}
		toHex(t$2) {
			return jo(this.toBytes(t$2));
		}
		assertValidity() {}
		static fromCompact(t$2) {
			return w$1.fromBytes(dc("sig", t$2), "compact");
		}
		static fromDER(t$2) {
			return w$1.fromBytes(dc("sig", t$2), "der");
		}
		normalizeS() {
			return this.hasHighS() ? new w$1(this.r, a$1.neg(this.s), this.recovery) : this;
		}
		toDERRawBytes() {
			return this.toBytes("der");
		}
		toDERHex() {
			return jo(this.toBytes("der"));
		}
		toCompactRawBytes() {
			return this.toBytes("compact");
		}
		toCompactHex() {
			return jo(this.toBytes("compact"));
		}
	}
	const m$1 = r$1.bits2int || function(t$2) {
		if (t$2.length > 8192) throw Error("input is too large");
		const e$2 = lc(t$2), r$2 = 8 * t$2.length - c$1;
		return r$2 > 0 ? e$2 >> BigInt(r$2) : e$2;
	}, b$1 = r$1.bits2int_modN || function(t$2) {
		return a$1.create(m$1(t$2));
	}, k$1 = kc(c$1);
	function E$1(t$2) {
		return mc("num < 2^" + c$1, t$2, eh, k$1), a$1.toBytes(t$2);
	}
	function v$1(t$2, r$2) {
		return uc(t$2, void 0, "message"), r$2 ? uc(e$1(t$2), void 0, "prehashed message") : t$2;
	}
	return Object.freeze({
		keygen: u$1,
		getPublicKey: h$1,
		getSharedSecret: f$1,
		utils: l$1,
		lengths: y$1,
		Point: t$1,
		sign: function(r$2, s$2, o$2 = {}) {
			r$2 = dc("message", r$2);
			const { seed: c$2, k2sig: u$2 } = function(e$2, r$3, i$2) {
				if (["recovered", "canonical"].some((t$2) => t$2 in i$2)) throw Error("sign() legacy options not supported");
				const { lowS: s$3, prehash: o$3, extraEntropy: c$3 } = $u(i$2, g$1);
				e$2 = v$1(e$2, o$3);
				const u$3 = b$1(e$2), h$3 = ah(a$1, r$3), f$2 = [E$1(h$3), E$1(u$3)];
				if (null != c$3 && !1 !== c$3) {
					const t$2 = !0 === c$3 ? n$1(y$1.secretKey) : c$3;
					f$2.push(dc("extraEntropy", t$2));
				}
				const l$2 = ec(...f$2), p$2 = u$3;
				return {
					seed: l$2,
					k2sig: function(e$3) {
						const r$4 = m$1(e$3);
						if (!a$1.isValidNot0(r$4)) return;
						const n$2 = a$1.inv(r$4), i$3 = t$1.BASE.multiply(r$4).toAffine(), o$4 = a$1.create(i$3.x);
						if (o$4 === eh) return;
						const c$4 = a$1.create(n$2 * a$1.create(p$2 + o$4 * h$3));
						if (c$4 === eh) return;
						let u$4 = (i$3.x === o$4 ? 0 : 2) | Number(i$3.y & rh), f$3 = c$4;
						return s$3 && d$1(c$4) && (f$3 = a$1.neg(c$4), u$4 ^= 1), new w$1(o$4, f$3, u$4);
					}
				};
			}(r$2, s$2, o$2), h$2 = function(t$2, e$2, r$3) {
				if ("number" != typeof t$2 || t$2 < 2) throw Error("hashLen must be a number");
				if ("number" != typeof e$2 || e$2 < 2) throw Error("qByteLen must be a number");
				if ("function" != typeof r$3) throw Error("hmacFn must be a function");
				const n$2 = (t$3) => new Uint8Array(t$3), i$2 = (t$3) => Uint8Array.of(t$3);
				let s$3 = n$2(t$2), a$2 = n$2(t$2), o$3 = 0;
				const c$3 = () => {
					s$3.fill(1), a$2.fill(0), o$3 = 0;
				}, u$3 = (...t$3) => r$3(a$2, s$3, ...t$3), h$3 = (t$3 = n$2(0)) => {
					a$2 = u$3(i$2(0), t$3), s$3 = u$3(), 0 !== t$3.length && (a$2 = u$3(i$2(1), t$3), s$3 = u$3());
				}, f$2 = () => {
					if (o$3++ >= 1e3) throw Error("drbg: tried 1000 values");
					let t$3 = 0;
					const r$4 = [];
					for (; t$3 < e$2;) {
						s$3 = u$3();
						const e$3 = s$3.slice();
						r$4.push(e$3), t$3 += s$3.length;
					}
					return ec(...r$4);
				};
				return (t$3, e$3) => {
					let r$4;
					for (c$3(), h$3(t$3); !(r$4 = e$3(f$2()));) h$3();
					return c$3(), r$4;
				};
			}(e$1.outputLen, a$1.BYTES, i$1);
			return h$2(c$2, u$2);
		},
		verify: function(e$2, r$2, n$2, i$2 = {}) {
			const { lowS: s$2, prehash: o$2, format: c$2 } = $u(i$2, g$1);
			if (n$2 = dc("publicKey", n$2), r$2 = v$1(dc("message", r$2), o$2), "strict" in i$2) throw Error("options.strict was renamed to lowS");
			const u$2 = void 0 === c$2 ? function(t$2) {
				let e$3;
				const r$3 = "string" == typeof t$2 || xo(t$2), n$3 = !r$3 && null !== t$2 && "object" == typeof t$2 && "bigint" == typeof t$2.r && "bigint" == typeof t$2.s;
				if (!r$3 && !n$3) throw Error("invalid signature, expected Uint8Array, hex string or Signature instance");
				if (n$3) e$3 = new w$1(t$2.r, t$2.s);
else if (r$3) {
					try {
						e$3 = w$1.fromBytes(dc("sig", t$2), "der");
					} catch (t$3) {
						if (!(t$3 instanceof th.Err)) throw t$3;
					}
					if (!e$3) try {
						e$3 = w$1.fromBytes(dc("sig", t$2), "compact");
					} catch (t$3) {
						return !1;
					}
				}
				return e$3 || !1;
			}(e$2) : w$1.fromBytes(dc("sig", e$2), c$2);
			if (!1 === u$2) return !1;
			try {
				const e$3 = t$1.fromBytes(n$2);
				if (s$2 && u$2.hasHighS()) return !1;
				const { r: i$3, s: o$3 } = u$2, c$3 = b$1(r$2), h$2 = a$1.inv(o$3), f$2 = a$1.create(c$3 * h$2), l$2 = a$1.create(i$3 * h$2), y$2 = t$1.BASE.multiplyUnsafe(f$2).add(e$3.multiplyUnsafe(l$2));
				if (y$2.is0()) return !1;
				return a$1.create(y$2.x) === i$3;
			} catch (t$2) {
				return !1;
			}
		},
		recoverPublicKey: function(t$2, e$2, r$2 = {}) {
			const { prehash: n$2 } = $u(r$2, g$1);
			return e$2 = v$1(e$2, n$2), w$1.fromBytes(t$2, "recovered").recoverPublicKey(e$2).toBytes();
		},
		Signature: w$1,
		hash: e$1
	});
}
function lh(t$1) {
	const { CURVE: e$1, curveOpts: r$1 } = function(t$2) {
		const e$2 = {
			a: t$2.a,
			b: t$2.b,
			p: t$2.Fp.ORDER,
			n: t$2.n,
			h: t$2.h,
			Gx: t$2.Gx,
			Gy: t$2.Gy
		}, r$2 = t$2.Fp;
		let n$2 = t$2.allowedPrivateKeyLengths ? Array.from(new Set(t$2.allowedPrivateKeyLengths.map((t$3) => Math.ceil(t$3 / 2)))) : void 0;
		return {
			CURVE: e$2,
			curveOpts: {
				Fp: r$2,
				Fn: Vc(e$2.n, {
					BITS: t$2.nBitLength,
					allowedLengths: n$2,
					modFromBytes: t$2.wrapPrivateKey
				}),
				allowInfinityPoint: t$2.allowInfinityPoint,
				endo: t$2.endo,
				isTorsionFree: t$2.isTorsionFree,
				clearCofactor: t$2.clearCofactor,
				fromBytes: t$2.fromBytes,
				toBytes: t$2.toBytes
			}
		};
	}(t$1), n$1 = {
		hmac: t$1.hmac,
		randomBytes: t$1.randomBytes,
		lowS: t$1.lowS,
		bits2int: t$1.bits2int,
		bits2int_modN: t$1.bits2int_modN
	};
	return {
		CURVE: e$1,
		curveOpts: r$1,
		hash: t$1.hash,
		ecdsaOpts: n$1
	};
}
function yh(t$1) {
	const { CURVE: e$1, curveOpts: r$1, hash: n$1, ecdsaOpts: i$1 } = lh(t$1);
	return function(t$2, e$2) {
		const r$2 = e$2.Point;
		return Object.assign({}, e$2, {
			ProjectivePoint: r$2,
			CURVE: Object.assign({}, t$2, jc(r$2.Fn.ORDER, r$2.Fn.BITS))
		});
	}(t$1, fh(oh(e$1, r$1), n$1, i$1));
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function gh(t$1, e$1) {
	const r$1 = (e$2) => yh({
		...t$1,
		hash: e$2
	});
	return {
		...r$1(e$1),
		create: r$1
	};
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ph = {
	p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),
	n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
	h: BigInt(1),
	a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),
	b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),
	Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
	Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
}, dh = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"),
	n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
	h: BigInt(1),
	a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"),
	b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"),
	Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
	Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f")
}, Ah = {
	p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
	n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
	h: BigInt(1),
	a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"),
	b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
	Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
	Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650")
}, wh = Vc(ph.p), mh = Vc(dh.p), bh = Vc(Ah.p), kh = gh({
	...ph,
	Fp: wh,
	lowS: !1
}, Uu), Eh = gh({
	...dh,
	Fp: mh,
	lowS: !1
}, Qu), vh = gh({
	...Ah,
	Fp: bh,
	lowS: !1,
	allowedPrivateKeyLengths: [
		130,
		131,
		132
	]
}, xu), Bh = BigInt(0), Ih = BigInt(1), Sh = BigInt(2), Kh = BigInt(7), Ch = BigInt(256), Dh = BigInt(113), Uh = [], Ph = [], xh = [];
for (let t$1 = 0, e$1 = Ih, r$1 = 1, n$1 = 0; t$1 < 24; t$1++) {
	[r$1, n$1] = [n$1, (2 * r$1 + 3 * n$1) % 5], Uh.push(2 * (5 * n$1 + r$1)), Ph.push((t$1 + 1) * (t$1 + 2) / 2 % 64);
	let i$1 = Bh;
	for (let t$2 = 0; t$2 < 7; t$2++) e$1 = (e$1 << Ih ^ (e$1 >> Kh) * Dh) % Ch, e$1 & Sh && (i$1 ^= Ih << (Ih << /* @__PURE__ */ BigInt(t$2)) - Ih);
	xh.push(i$1);
}
const Qh = su(xh, !0), Rh = Qh[0], Th = Qh[1], Mh = (t$1, e$1, r$1) => r$1 > 32 ? ((t$2, e$2, r$2) => e$2 << r$2 - 32 | t$2 >>> 64 - r$2)(t$1, e$1, r$1) : ((t$2, e$2, r$2) => t$2 << r$2 | e$2 >>> 32 - r$2)(t$1, e$1, r$1), Fh = (t$1, e$1, r$1) => r$1 > 32 ? ((t$2, e$2, r$2) => t$2 << r$2 - 32 | e$2 >>> 64 - r$2)(t$1, e$1, r$1) : ((t$2, e$2, r$2) => e$2 << r$2 | t$2 >>> 32 - r$2)(t$1, e$1, r$1);
var Nh = class Nh extends rc {
	constructor(t$1, e$1, r$1, n$1 = !1, i$1 = 24) {
		if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = t$1, this.suffix = e$1, this.outputLen = r$1, this.enableXOF = n$1, this.rounds = i$1, Qo(r$1), !(0 < t$1 && t$1 < 200)) throw Error("only keccak-f1600 function is supported");
		var s$1;
		this.state = new Uint8Array(200), this.state32 = (s$1 = this.state, new Uint32Array(s$1.buffer, s$1.byteOffset, Math.floor(s$1.byteLength / 4)));
	}
	clone() {
		return this._cloneInto();
	}
	keccak() {
		zo(this.state32), function(t$1, e$1 = 24) {
			const r$1 = new Uint32Array(10);
			for (let n$1 = 24 - e$1; n$1 < 24; n$1++) {
				for (let e$3 = 0; e$3 < 10; e$3++) r$1[e$3] = t$1[e$3] ^ t$1[e$3 + 10] ^ t$1[e$3 + 20] ^ t$1[e$3 + 30] ^ t$1[e$3 + 40];
				for (let e$3 = 0; e$3 < 10; e$3 += 2) {
					const n$2 = (e$3 + 8) % 10, i$2 = (e$3 + 2) % 10, s$1 = r$1[i$2], a$1 = r$1[i$2 + 1], o$1 = Mh(s$1, a$1, 1) ^ r$1[n$2], c$1 = Fh(s$1, a$1, 1) ^ r$1[n$2 + 1];
					for (let r$2 = 0; r$2 < 50; r$2 += 10) t$1[e$3 + r$2] ^= o$1, t$1[e$3 + r$2 + 1] ^= c$1;
				}
				let e$2 = t$1[2], i$1 = t$1[3];
				for (let r$2 = 0; r$2 < 24; r$2++) {
					const n$2 = Ph[r$2], s$1 = Mh(e$2, i$1, n$2), a$1 = Fh(e$2, i$1, n$2), o$1 = Uh[r$2];
					e$2 = t$1[o$1], i$1 = t$1[o$1 + 1], t$1[o$1] = s$1, t$1[o$1 + 1] = a$1;
				}
				for (let e$3 = 0; e$3 < 50; e$3 += 10) {
					for (let n$2 = 0; n$2 < 10; n$2++) r$1[n$2] = t$1[e$3 + n$2];
					for (let n$2 = 0; n$2 < 10; n$2++) t$1[e$3 + n$2] ^= ~r$1[(n$2 + 2) % 10] & r$1[(n$2 + 4) % 10];
				}
				t$1[0] ^= Rh[n$1], t$1[1] ^= Th[n$1];
			}
			No(r$1);
		}(this.state32, this.rounds), zo(this.state32), this.posOut = 0, this.pos = 0;
	}
	update(t$1) {
		Mo(this), Ro(t$1 = tc(t$1));
		const { blockLen: e$1, state: r$1 } = this, n$1 = t$1.length;
		for (let i$1 = 0; i$1 < n$1;) {
			const s$1 = Math.min(e$1 - this.pos, n$1 - i$1);
			for (let e$2 = 0; e$2 < s$1; e$2++) r$1[this.pos++] ^= t$1[i$1++];
			this.pos === e$1 && this.keccak();
		}
		return this;
	}
	finish() {
		if (this.finished) return;
		this.finished = !0;
		const { state: t$1, suffix: e$1, pos: r$1, blockLen: n$1 } = this;
		t$1[r$1] ^= e$1, 128 & e$1 && r$1 === n$1 - 1 && this.keccak(), t$1[n$1 - 1] ^= 128, this.keccak();
	}
	writeInto(t$1) {
		Mo(this, !1), Ro(t$1), this.finish();
		const e$1 = this.state, { blockLen: r$1 } = this;
		for (let n$1 = 0, i$1 = t$1.length; n$1 < i$1;) {
			this.posOut >= r$1 && this.keccak();
			const s$1 = Math.min(r$1 - this.posOut, i$1 - n$1);
			t$1.set(e$1.subarray(this.posOut, this.posOut + s$1), n$1), this.posOut += s$1, n$1 += s$1;
		}
		return t$1;
	}
	xofInto(t$1) {
		if (!this.enableXOF) throw Error("XOF is not possible for this instance");
		return this.writeInto(t$1);
	}
	xof(t$1) {
		return Qo(t$1), this.xofInto(new Uint8Array(t$1));
	}
	digestInto(t$1) {
		if (Fo(t$1, this), this.finished) throw Error("digest() was already called");
		return this.writeInto(t$1), this.destroy(), t$1;
	}
	digest() {
		return this.digestInto(new Uint8Array(this.outputLen));
	}
	destroy() {
		this.destroyed = !0, No(this.state);
	}
	_cloneInto(t$1) {
		const { blockLen: e$1, suffix: r$1, outputLen: n$1, rounds: i$1, enableXOF: s$1 } = this;
		return t$1 || (t$1 = new Nh(e$1, r$1, n$1, s$1, i$1)), t$1.state32.set(this.state32), t$1.pos = this.pos, t$1.posOut = this.posOut, t$1.finished = this.finished, t$1.rounds = i$1, t$1.suffix = r$1, t$1.outputLen = n$1, t$1.enableXOF = s$1, t$1.destroyed = this.destroyed, t$1;
	}
};
const Lh = (t$1, e$1, r$1) => nc(() => new Nh(e$1, t$1, r$1)), Oh = /* @__PURE__ */ (() => Lh(6, 136, 32))(), Hh = /* @__PURE__ */ (() => Lh(6, 72, 64))(), zh = (t$1, e$1, r$1) => function(t$2) {
	const e$2 = (e$3, r$3) => t$2(r$3).update(tc(e$3)).digest(), r$2 = t$2({});
	return e$2.outputLen = r$2.outputLen, e$2.blockLen = r$2.blockLen, e$2.create = (e$3) => t$2(e$3), e$2;
}((n$1 = {}) => new Nh(e$1, t$1, void 0 === n$1.dkLen ? r$1 : n$1.dkLen, !0)), Gh = /* @__PURE__ */ (() => zh(31, 136, 32))(), _h = BigInt(0), jh = BigInt(1), Vh = BigInt(2), qh = BigInt(8);
function Yh(t$1, e$1 = {}) {
	const r$1 = Ju("edwards", t$1, e$1, e$1.FpFnLE), { Fp: n$1, Fn: i$1 } = r$1;
	let s$1 = r$1.CURVE;
	const { h: a$1 } = s$1;
	Ec(e$1, {}, { uvRatio: "function" });
	const o$1 = Vh << BigInt(8 * i$1.BYTES) - jh, c$1 = (t$2) => n$1.create(t$2), u$1 = e$1.uvRatio || ((t$2, e$2) => {
		try {
			return {
				isValid: !0,
				value: n$1.sqrt(n$1.div(t$2, e$2))
			};
		} catch (t$3) {
			return {
				isValid: !1,
				value: _h
			};
		}
	});
	if (!function(t$2, e$2, r$2, n$2) {
		const i$2 = t$2.sqr(r$2), s$2 = t$2.sqr(n$2), a$2 = t$2.add(t$2.mul(e$2.a, i$2), s$2), o$2 = t$2.add(t$2.ONE, t$2.mul(e$2.d, t$2.mul(i$2, s$2)));
		return t$2.eql(a$2, o$2);
	}(n$1, s$1, s$1.Gx, s$1.Gy)) throw Error("bad curve params: generator point");
	function h$1(t$2, e$2, r$2 = !1) {
		return mc("coordinate " + t$2, e$2, r$2 ? jh : _h, o$1), e$2;
	}
	function f$1(t$2) {
		if (!(t$2 instanceof g$1)) throw Error("ExtendedPoint expected");
	}
	const l$1 = vc((t$2, e$2) => {
		const { X: r$2, Y: i$2, Z: s$2 } = t$2, a$2 = t$2.is0();
		null == e$2 && (e$2 = a$2 ? qh : n$1.inv(s$2));
		const o$2 = c$1(r$2 * e$2), u$2 = c$1(i$2 * e$2), h$2 = n$1.mul(s$2, e$2);
		if (a$2) return {
			x: _h,
			y: jh
		};
		if (h$2 !== jh) throw Error("invZ was invalid");
		return {
			x: o$2,
			y: u$2
		};
	}), y$1 = vc((t$2) => {
		const { a: e$2, d: r$2 } = s$1;
		if (t$2.is0()) throw Error("bad point: ZERO");
		const { X: n$2, Y: i$2, Z: a$2, T: o$2 } = t$2, u$2 = c$1(n$2 * n$2), h$2 = c$1(i$2 * i$2), f$2 = c$1(a$2 * a$2), l$2 = c$1(f$2 * f$2), y$2 = c$1(u$2 * e$2);
		if (c$1(f$2 * c$1(y$2 + h$2)) !== c$1(l$2 + c$1(r$2 * c$1(u$2 * h$2)))) throw Error("bad point: equation left != right (1)");
		if (c$1(n$2 * i$2) !== c$1(a$2 * o$2)) throw Error("bad point: equation left != right (2)");
		return !0;
	});
	class g$1 {
		constructor(t$2, e$2, r$2, n$2) {
			this.X = h$1("x", t$2), this.Y = h$1("y", e$2), this.Z = h$1("z", r$2, !0), this.T = h$1("t", n$2), Object.freeze(this);
		}
		static CURVE() {
			return s$1;
		}
		static fromAffine(t$2) {
			if (t$2 instanceof g$1) throw Error("extended point not allowed");
			const { x: e$2, y: r$2 } = t$2 || {};
			return h$1("x", e$2), h$1("y", r$2), new g$1(e$2, r$2, jh, c$1(e$2 * r$2));
		}
		static fromBytes(t$2, e$2 = !1) {
			const r$2 = n$1.BYTES, { a: i$2, d: a$2 } = s$1;
			t$2 = Ac(uc(t$2, r$2, "point")), cc(e$2, "zip215");
			const h$2 = Ac(t$2), f$2 = t$2[r$2 - 1];
			h$2[r$2 - 1] = -129 & f$2;
			const l$2 = yc(h$2), y$2 = e$2 ? o$1 : n$1.ORDER;
			mc("point.y", l$2, _h, y$2);
			const p$2 = c$1(l$2 * l$2), d$1 = c$1(p$2 - jh), A$1 = c$1(a$2 * p$2 - i$2);
			let { isValid: w$1, value: m$1 } = u$1(d$1, A$1);
			if (!w$1) throw Error("bad point: invalid y coordinate");
			const b$1 = (m$1 & jh) === jh, k$1 = !!(128 & f$2);
			if (!e$2 && m$1 === _h && k$1) throw Error("bad point: x=0 and x_0=1");
			return k$1 !== b$1 && (m$1 = c$1(-m$1)), g$1.fromAffine({
				x: m$1,
				y: l$2
			});
		}
		static fromHex(t$2, e$2 = !1) {
			return g$1.fromBytes(dc("point", t$2), e$2);
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(t$2 = 8, e$2 = !0) {
			return p$1.createCache(this, t$2), e$2 || this.multiply(Vh), this;
		}
		assertValidity() {
			y$1(this);
		}
		equals(t$2) {
			f$1(t$2);
			const { X: e$2, Y: r$2, Z: n$2 } = this, { X: i$2, Y: s$2, Z: a$2 } = t$2, o$2 = c$1(e$2 * a$2), u$2 = c$1(i$2 * n$2), h$2 = c$1(r$2 * a$2), l$2 = c$1(s$2 * n$2);
			return o$2 === u$2 && h$2 === l$2;
		}
		is0() {
			return this.equals(g$1.ZERO);
		}
		negate() {
			return new g$1(c$1(-this.X), this.Y, this.Z, c$1(-this.T));
		}
		double() {
			const { a: t$2 } = s$1, { X: e$2, Y: r$2, Z: n$2 } = this, i$2 = c$1(e$2 * e$2), a$2 = c$1(r$2 * r$2), o$2 = c$1(Vh * c$1(n$2 * n$2)), u$2 = c$1(t$2 * i$2), h$2 = e$2 + r$2, f$2 = c$1(c$1(h$2 * h$2) - i$2 - a$2), l$2 = u$2 + a$2, y$2 = l$2 - o$2, p$2 = u$2 - a$2, d$1 = c$1(f$2 * y$2), A$1 = c$1(l$2 * p$2), w$1 = c$1(f$2 * p$2), m$1 = c$1(y$2 * l$2);
			return new g$1(d$1, A$1, m$1, w$1);
		}
		add(t$2) {
			f$1(t$2);
			const { a: e$2, d: r$2 } = s$1, { X: n$2, Y: i$2, Z: a$2, T: o$2 } = this, { X: u$2, Y: h$2, Z: l$2, T: y$2 } = t$2, p$2 = c$1(n$2 * u$2), d$1 = c$1(i$2 * h$2), A$1 = c$1(o$2 * r$2 * y$2), w$1 = c$1(a$2 * l$2), m$1 = c$1((n$2 + i$2) * (u$2 + h$2) - p$2 - d$1), b$1 = w$1 - A$1, k$1 = w$1 + A$1, E$1 = c$1(d$1 - e$2 * p$2), v$1 = c$1(m$1 * b$1), B$1 = c$1(k$1 * E$1), I$1 = c$1(m$1 * E$1), S$1 = c$1(b$1 * k$1);
			return new g$1(v$1, B$1, S$1, I$1);
		}
		subtract(t$2) {
			return this.add(t$2.negate());
		}
		multiply(t$2) {
			if (!i$1.isValidNot0(t$2)) throw Error("invalid scalar: expected 1 <= sc < curve.n");
			const { p: e$2, f: r$2 } = p$1.cached(this, t$2, (t$3) => Lu(g$1, t$3));
			return Lu(g$1, [e$2, r$2])[0];
		}
		multiplyUnsafe(t$2, e$2 = g$1.ZERO) {
			if (!i$1.isValid(t$2)) throw Error("invalid scalar: expected 0 <= sc < curve.n");
			return t$2 === _h ? g$1.ZERO : this.is0() || t$2 === jh ? this : p$1.unsafe(this, t$2, (t$3) => Lu(g$1, t$3), e$2);
		}
		isSmallOrder() {
			return this.multiplyUnsafe(a$1).is0();
		}
		isTorsionFree() {
			return p$1.unsafe(this, s$1.n).is0();
		}
		toAffine(t$2) {
			return l$1(this, t$2);
		}
		clearCofactor() {
			return a$1 === jh ? this : this.multiplyUnsafe(a$1);
		}
		toBytes() {
			const { x: t$2, y: e$2 } = this.toAffine(), r$2 = n$1.toBytes(e$2);
			return r$2[r$2.length - 1] |= t$2 & jh ? 128 : 0, r$2;
		}
		toHex() {
			return jo(this.toBytes());
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
		get ex() {
			return this.X;
		}
		get ey() {
			return this.Y;
		}
		get ez() {
			return this.Z;
		}
		get et() {
			return this.T;
		}
		static normalizeZ(t$2) {
			return Lu(g$1, t$2);
		}
		static msm(t$2, e$2) {
			return Yu(g$1, i$1, t$2, e$2);
		}
		_setWindowSize(t$2) {
			this.precompute(t$2);
		}
		toRawBytes() {
			return this.toBytes();
		}
	}
	g$1.BASE = new g$1(s$1.Gx, s$1.Gy, jh, c$1(s$1.Gx * s$1.Gy)), g$1.ZERO = new g$1(_h, jh, jh, _h), g$1.Fp = n$1, g$1.Fn = i$1;
	const p$1 = new qu(g$1, i$1.BITS);
	return g$1.BASE.precompute(8), g$1;
}
function Zh(t$1, e$1, r$1 = {}) {
	if ("function" != typeof e$1) throw Error("\"hash\" function param is required");
	Ec(r$1, {}, {
		adjustScalarBytes: "function",
		randomBytes: "function",
		domain: "function",
		prehash: "function",
		mapToCurve: "function"
	});
	const { prehash: n$1 } = r$1, { BASE: i$1, Fp: s$1, Fn: a$1 } = t$1, o$1 = r$1.randomBytes || sc, c$1 = r$1.adjustScalarBytes || ((t$2) => t$2), u$1 = r$1.domain || ((t$2, e$2, r$2) => {
		if (cc(r$2, "phflag"), e$2.length || r$2) throw Error("Contexts/pre-hash are not supported");
		return t$2;
	});
	function h$1(t$2) {
		return a$1.create(yc(t$2));
	}
	function f$1(t$2) {
		const { head: r$2, prefix: n$2, scalar: s$2 } = function(t$3) {
			const r$3 = d$1.secretKey;
			t$3 = dc("private key", t$3, r$3);
			const n$3 = dc("hashed private key", e$1(t$3), 2 * r$3), i$2 = c$1(n$3.slice(0, r$3));
			return {
				head: i$2,
				prefix: n$3.slice(r$3, 2 * r$3),
				scalar: h$1(i$2)
			};
		}(t$2), a$2 = i$1.multiply(s$2), o$2 = a$2.toBytes();
		return {
			head: r$2,
			prefix: n$2,
			scalar: s$2,
			point: a$2,
			pointBytes: o$2
		};
	}
	function l$1(t$2) {
		return f$1(t$2).pointBytes;
	}
	function y$1(t$2 = Uint8Array.of(), ...r$2) {
		const i$2 = ec(...r$2);
		return h$1(e$1(u$1(i$2, dc("context", t$2), !!n$1)));
	}
	const g$1 = { zip215: !0 };
	const p$1 = s$1.BYTES, d$1 = {
		secretKey: p$1,
		publicKey: p$1,
		signature: 2 * p$1,
		seed: p$1
	};
	function A$1(t$2 = o$1(d$1.seed)) {
		return uc(t$2, d$1.seed, "seed");
	}
	const w$1 = {
		getExtendedPublicKey: f$1,
		randomSecretKey: A$1,
		isValidSecretKey: function(t$2) {
			return xo(t$2) && t$2.length === a$1.BYTES;
		},
		isValidPublicKey: function(e$2, r$2) {
			try {
				return !!t$1.fromBytes(e$2, r$2);
			} catch (t$2) {
				return !1;
			}
		},
		toMontgomery(e$2) {
			const { y: r$2 } = t$1.fromBytes(e$2), n$2 = d$1.publicKey, i$2 = 32 === n$2;
			if (!i$2 && 57 !== n$2) throw Error("only defined for 25519 and 448");
			const a$2 = i$2 ? s$1.div(jh + r$2, jh - r$2) : s$1.div(r$2 - jh, r$2 + jh);
			return s$1.toBytes(a$2);
		},
		toMontgomeryPriv(t$2) {
			const r$2 = d$1.secretKey;
			uc(t$2, r$2);
			const n$2 = e$1(t$2.subarray(0, r$2));
			return c$1(n$2).subarray(0, r$2);
		},
		randomPrivateKey: A$1,
		precompute: (e$2 = 8, r$2 = t$1.BASE) => r$2.precompute(e$2, !1)
	};
	return Object.freeze({
		keygen: function(t$2) {
			const e$2 = w$1.randomSecretKey(t$2);
			return {
				secretKey: e$2,
				publicKey: l$1(e$2)
			};
		},
		getPublicKey: l$1,
		sign: function(t$2, e$2, r$2 = {}) {
			t$2 = dc("message", t$2), n$1 && (t$2 = n$1(t$2));
			const { prefix: s$2, scalar: o$2, pointBytes: c$2 } = f$1(e$2), u$2 = y$1(r$2.context, s$2, t$2), h$2 = i$1.multiply(u$2).toBytes(), l$2 = y$1(r$2.context, h$2, c$2, t$2), g$2 = a$1.create(u$2 + l$2 * o$2);
			if (!a$1.isValid(g$2)) throw Error("sign failed: invalid s");
			return uc(ec(h$2, a$1.toBytes(g$2)), d$1.signature, "result");
		},
		verify: function(e$2, r$2, s$2, a$2 = g$1) {
			const { context: o$2, zip215: c$2 } = a$2, u$2 = d$1.signature;
			e$2 = dc("signature", e$2, u$2), r$2 = dc("message", r$2), s$2 = dc("publicKey", s$2, d$1.publicKey), void 0 !== c$2 && cc(c$2, "zip215"), n$1 && (r$2 = n$1(r$2));
			const h$2 = u$2 / 2, f$2 = e$2.subarray(0, h$2), l$2 = yc(e$2.subarray(h$2, u$2));
			let p$2, A$2, w$2;
			try {
				p$2 = t$1.fromBytes(s$2, c$2), A$2 = t$1.fromBytes(f$2, c$2), w$2 = i$1.multiplyUnsafe(l$2);
			} catch (t$2) {
				return !1;
			}
			if (!c$2 && p$2.isSmallOrder()) return !1;
			const m$1 = y$1(o$2, A$2.toBytes(), p$2.toBytes(), r$2);
			return A$2.add(p$2.multiplyUnsafe(m$1)).subtract(w$2).clearCofactor().is0();
		},
		utils: w$1,
		Point: t$1,
		lengths: d$1
	});
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Jh = BigInt(0), Wh = BigInt(1), Xh = BigInt(2);
function $h(t$1) {
	const e$1 = (Ec(r$1 = t$1, {
		adjustScalarBytes: "function",
		powPminus2: "function"
	}), Object.freeze({ ...r$1 }));
	var r$1;
	const { P: n$1, type: i$1, adjustScalarBytes: s$1, powPminus2: a$1, randomBytes: o$1 } = e$1, c$1 = "x25519" === i$1;
	if (!c$1 && "x448" !== i$1) throw Error("invalid type");
	const u$1 = o$1 || sc, h$1 = c$1 ? 255 : 448, f$1 = c$1 ? 32 : 56, l$1 = c$1 ? BigInt(9) : BigInt(5), y$1 = c$1 ? BigInt(121665) : BigInt(39081), g$1 = c$1 ? Xh ** BigInt(254) : Xh ** BigInt(447), p$1 = c$1 ? BigInt(8) * Xh ** BigInt(251) - Wh : BigInt(4) * Xh ** BigInt(445) - Wh, d$1 = g$1 + p$1 + Wh, A$1 = (t$2) => Rc(t$2, n$1), w$1 = m$1(l$1);
	function m$1(t$2) {
		return pc(A$1(t$2), f$1);
	}
	function b$1(t$2, e$2) {
		const r$2 = function(t$3, e$3) {
			mc("u", t$3, Jh, n$1), mc("scalar", e$3, g$1, d$1);
			const r$3 = e$3, i$2 = t$3;
			let s$2 = Wh, o$2 = Jh, c$2 = t$3, u$2 = Wh, f$2 = Jh;
			for (let t$4 = BigInt(h$1 - 1); t$4 >= Jh; t$4--) {
				const e$4 = r$3 >> t$4 & Wh;
				f$2 ^= e$4, {x_2: s$2, x_3: c$2} = E$1(f$2, s$2, c$2), {x_2: o$2, x_3: u$2} = E$1(f$2, o$2, u$2), f$2 = e$4;
				const n$2 = s$2 + o$2, a$2 = A$1(n$2 * n$2), h$2 = s$2 - o$2, l$3 = A$1(h$2 * h$2), g$2 = a$2 - l$3, p$2 = c$2 + u$2, d$2 = A$1((c$2 - u$2) * n$2), w$2 = A$1(p$2 * h$2), m$2 = d$2 + w$2, b$2 = d$2 - w$2;
				c$2 = A$1(m$2 * m$2), u$2 = A$1(i$2 * A$1(b$2 * b$2)), s$2 = A$1(a$2 * l$3), o$2 = A$1(g$2 * (a$2 + A$1(y$1 * g$2)));
			}
			({x_2: s$2, x_3: c$2} = E$1(f$2, s$2, c$2)), {x_2: o$2, x_3: u$2} = E$1(f$2, o$2, u$2);
			const l$2 = a$1(o$2);
			return A$1(s$2 * l$2);
		}(function(t$3) {
			const e$3 = dc("u coordinate", t$3, f$1);
			return c$1 && (e$3[31] &= 127), A$1(yc(e$3));
		}(e$2), function(t$3) {
			return yc(s$1(dc("scalar", t$3, f$1)));
		}(t$2));
		if (r$2 === Jh) throw Error("invalid private or public key received");
		return m$1(r$2);
	}
	function k$1(t$2) {
		return b$1(t$2, w$1);
	}
	function E$1(t$2, e$2, r$2) {
		const n$2 = A$1(t$2 * (e$2 - r$2));
		return {
			x_2: e$2 = A$1(e$2 - n$2),
			x_3: r$2 = A$1(r$2 + n$2)
		};
	}
	const v$1 = {
		secretKey: f$1,
		publicKey: f$1,
		seed: f$1
	}, B$1 = (t$2 = u$1(f$1)) => (Ro(t$2, v$1.seed), t$2);
	return {
		keygen: function(t$2) {
			const e$2 = B$1(t$2);
			return {
				secretKey: e$2,
				publicKey: k$1(e$2)
			};
		},
		getSharedSecret: (t$2, e$2) => b$1(t$2, e$2),
		getPublicKey: (t$2) => k$1(t$2),
		scalarMult: b$1,
		scalarMultBase: k$1,
		utils: {
			randomSecretKey: B$1,
			randomPrivateKey: B$1
		},
		GuBytes: w$1.slice(),
		lengths: v$1
	};
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const tf = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
	n: BigInt("0x3fffffffffffffffffffffffffffffffffffffffffffffffffffffff7cca23e9c44edb49aed63690216cc2728dc58f552378c292ab5844f3"),
	h: BigInt(4),
	a: BigInt(1),
	d: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffff6756"),
	Gx: BigInt("0x4f1970c66bed0ded221d15a622bf36da9e146570470f1767ea6de324a3d3a46412ae1af72ab66511433b80e18b00938e2626a82bc70cc05e"),
	Gy: BigInt("0x693f46716eb6bc248876203756c9c7624bea73736ca3984087789c1e05a0c2d73ad3ff1ce67c39c4fdbd132c4ed7c8ad9808795bf230fa14")
}, ef = Object.assign({}, tf, {
	d: BigInt("0xd78b4bdc7f0daf19f24f38c29373a2ccad46157242a50f37809b1da3412a12e79ccc9c81264cfe9ad080997058fb61c4243cc32dbaa156b9"),
	Gx: BigInt("0x79a70b2b70400553ae7c9df416c792c61128751ac92969240c25a07d728bdc93e21f7787ed6972249de732f38496cd11698713093e9c04fc"),
	Gy: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000000000000000000000000000000000000000000000000001")
}), rf = /* @__PURE__ */ nc(() => Gh.create({ dkLen: 114 })), nf = BigInt(1), sf = BigInt(2), af = BigInt(3);
BigInt(4);
const of = BigInt(11), cf = BigInt(22), uf = BigInt(44), hf = BigInt(88), ff = BigInt(223);
function lf(t$1) {
	const e$1 = tf.p, r$1 = t$1 * t$1 * t$1 % e$1, n$1 = r$1 * r$1 * t$1 % e$1, i$1 = Tc(n$1, af, e$1) * n$1 % e$1, s$1 = Tc(i$1, af, e$1) * n$1 % e$1, a$1 = Tc(s$1, sf, e$1) * r$1 % e$1, o$1 = Tc(a$1, of, e$1) * a$1 % e$1, c$1 = Tc(o$1, cf, e$1) * o$1 % e$1, u$1 = Tc(c$1, uf, e$1) * c$1 % e$1, h$1 = Tc(u$1, hf, e$1) * u$1 % e$1, f$1 = Tc(h$1, uf, e$1) * c$1 % e$1, l$1 = Tc(f$1, sf, e$1) * r$1 % e$1, y$1 = Tc(l$1, nf, e$1) * t$1 % e$1;
	return Tc(y$1, ff, e$1) * l$1 % e$1;
}
function yf(t$1) {
	return t$1[0] &= 252, t$1[55] |= 128, t$1[56] = 0, t$1;
}
function gf(t$1, e$1) {
	const r$1 = tf.p, n$1 = Rc(t$1 * t$1 * e$1, r$1), i$1 = Rc(n$1 * t$1, r$1), s$1 = Rc(i$1 * n$1 * e$1, r$1), a$1 = Rc(i$1 * lf(s$1), r$1), o$1 = Rc(a$1 * a$1, r$1);
	return {
		isValid: Rc(o$1 * e$1, r$1) === t$1,
		value: a$1
	};
}
const pf = /* @__PURE__ */ (() => Vc(tf.p, {
	BITS: 456,
	isLE: !0
}))(), df = /* @__PURE__ */ (() => Vc(tf.n, {
	BITS: 456,
	isLE: !0
}))();
function Af(t$1, e$1, r$1) {
	if (e$1.length > 255) throw Error("context must be smaller than 255, got: " + e$1.length);
	return ec((n$1 = "SigEd448", Uint8Array.from(n$1, (t$2, e$2) => {
		const r$2 = t$2.charCodeAt(0);
		if (1 !== t$2.length || r$2 > 127) throw Error(`string contains non-ASCII character "${n$1[e$2]}" with code ${r$2} at position ${e$2}`);
		return r$2;
	})), new Uint8Array([r$1 ? 1 : 0, e$1.length]), e$1, t$1);
	var n$1;
}
const wf = function(t$1) {
	const { CURVE: e$1, curveOpts: r$1, hash: n$1, eddsaOpts: i$1 } = function(t$2) {
		const e$2 = {
			a: t$2.a,
			d: t$2.d,
			p: t$2.Fp.ORDER,
			n: t$2.n,
			h: t$2.h,
			Gx: t$2.Gx,
			Gy: t$2.Gy
		}, r$2 = {
			Fp: t$2.Fp,
			Fn: Vc(e$2.n, t$2.nBitLength, !0),
			uvRatio: t$2.uvRatio
		}, n$2 = {
			randomBytes: t$2.randomBytes,
			adjustScalarBytes: t$2.adjustScalarBytes,
			domain: t$2.domain,
			prehash: t$2.prehash,
			mapToCurve: t$2.mapToCurve
		};
		return {
			CURVE: e$2,
			curveOpts: r$2,
			hash: t$2.hash,
			eddsaOpts: n$2
		};
	}(t$1);
	return function(t$2, e$2) {
		const r$2 = e$2.Point;
		return Object.assign({}, e$2, {
			ExtendedPoint: r$2,
			CURVE: t$2,
			nBitLength: r$2.Fn.BITS,
			nByteLength: r$2.Fn.BYTES
		});
	}(t$1, Zh(Yh(e$1, r$1), n$1, i$1));
}(
	/* @__PURE__ */ (() => ({
		...tf,
		Fp: pf,
		Fn: df,
		nBitLength: df.BITS,
		hash: rf,
		adjustScalarBytes: yf,
		domain: Af,
		uvRatio: gf
	}))()
);
Yh(ef);
const mf = /* @__PURE__ */ (() => {
	const t$1 = tf.p;
	return $h({
		P: t$1,
		type: "x448",
		powPminus2: (e$1) => Rc(Tc(lf(e$1), sf, t$1) * e$1, t$1),
		adjustScalarBytes: yf
	});
})(), bf = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
	n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
	h: BigInt(1),
	a: BigInt(0),
	b: BigInt(7),
	Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
	Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
}, kf = {
	beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
	basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]
}, Ef = /* @__PURE__ */ BigInt(2);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const vf = Vc(bf.p, { sqrt: function(t$1) {
	const e$1 = bf.p, r$1 = BigInt(3), n$1 = BigInt(6), i$1 = BigInt(11), s$1 = BigInt(22), a$1 = BigInt(23), o$1 = BigInt(44), c$1 = BigInt(88), u$1 = t$1 * t$1 * t$1 % e$1, h$1 = u$1 * u$1 * t$1 % e$1, f$1 = Tc(h$1, r$1, e$1) * h$1 % e$1, l$1 = Tc(f$1, r$1, e$1) * h$1 % e$1, y$1 = Tc(l$1, Ef, e$1) * u$1 % e$1, g$1 = Tc(y$1, i$1, e$1) * y$1 % e$1, p$1 = Tc(g$1, s$1, e$1) * g$1 % e$1, d$1 = Tc(p$1, o$1, e$1) * p$1 % e$1, A$1 = Tc(d$1, c$1, e$1) * d$1 % e$1, w$1 = Tc(A$1, o$1, e$1) * p$1 % e$1, m$1 = Tc(w$1, r$1, e$1) * h$1 % e$1, b$1 = Tc(m$1, a$1, e$1) * g$1 % e$1, k$1 = Tc(b$1, n$1, e$1) * u$1 % e$1, E$1 = Tc(k$1, Ef, e$1);
	if (!vf.eql(vf.sqr(E$1), t$1)) throw Error("Cannot find square root");
	return E$1;
} }), Bf = gh({
	...bf,
	Fp: vf,
	lowS: !0,
	endo: kf
}, Uu), If = Uu, Sf = Pu, Kf = Vc(BigInt("0xa9fb57dba1eea9bc3e660a909d838d726e3bf623d52620282013481d1f6e5377")), Cf = gh({
	a: Kf.create(BigInt("0x7d5a0975fc2c3057eef67530417affe7fb8055c126dc5c6ce94a4b44f330b5d9")),
	b: BigInt("0x26dc5c6ce94a4b44f330b5d9bbd77cbf958416295cf7e1ce6bccdc18ff8c07b6"),
	Fp: Kf,
	n: BigInt("0xa9fb57dba1eea9bc3e660a909d838d718c397aa3b561a6f7901e0e82974856a7"),
	Gx: BigInt("0x8bd2aeb9cb7e57cb2c4b482ffc81b7afb9de27e1e3bd23c23a4453bd9ace3262"),
	Gy: BigInt("0x547ef835c3dac4fd97f8461a14611dc9c27745132ded8e545c1d54c72f046997"),
	h: BigInt(1),
	lowS: !1
}, If), Df = xu, Uf = Qu, Pf = Vc(BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b412b1da197fb71123acd3a729901d1a71874700133107ec53")), xf = gh({
	a: Pf.create(BigInt("0x7bc382c63d8c150c3c72080ace05afa0c2bea28e4fb22787139165efba91f90f8aa5814a503ad4eb04a8c7dd22ce2826")),
	b: BigInt("0x04a8c7dd22ce28268b39b55416f0447c2fb77de107dcd2a62e880ea53eeb62d57cb4390295dbc9943ab78696fa504c11"),
	Fp: Pf,
	n: BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b31f166e6cac0425a7cf3ab6af6b7fc3103b883202e9046565"),
	Gx: BigInt("0x1d1c64f068cf45ffa2a63a81b7c13f6b8847a3e77ef14fe3db7fcafe0cbd10e8e826e03436d646aaef87b2e247d4af1e"),
	Gy: BigInt("0x8abe1d7520f9c2a45cb1eb8e95cfd55262b70b29feec5864e19c054ff99129280e4646217791811142820341263c5315"),
	h: BigInt(1),
	lowS: !1
}, Uf), Qf = Vc(BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca703308717d4d9b009bc66842aecda12ae6a380e62881ff2f2d82c68528aa6056583a48f3")), Rf = gh({
	a: Qf.create(BigInt("0x7830a3318b603b89e2327145ac234cc594cbdd8d3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94ca")),
	b: BigInt("0x3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94cadc083e67984050b75ebae5dd2809bd638016f723"),
	Fp: Qf,
	n: BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca70330870553e5c414ca92619418661197fac10471db1d381085ddaddb58796829ca90069"),
	Gx: BigInt("0x81aee4bdd82ed9645a21322e9c4c6a9385ed9f70b5d916c1b43b62eef4d0098eff3b1f78e2d0d48d50d1687b93b97d5f7c6d5047406a5e688b352209bcb9f822"),
	Gy: BigInt("0x7dde385d566332ecc0eabfa9cf7822fdf209f70024a57b1aa000c55b881f8111b2dcde494a5f485e5bca4bd88a2763aed1ca2b2fa8f0540678cd1e0f3ad80892"),
	h: BigInt(1),
	lowS: !1
}, Df), Tf = new Map(Object.entries({
	nistP256: kh,
	nistP384: Eh,
	nistP521: vh,
	brainpoolP256r1: Cf,
	brainpoolP384r1: xf,
	brainpoolP512r1: Rf,
	secp256k1: Bf,
	x448: mf,
	ed448: wf
}));
var Mf = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	nobleCurves: Tf
});
const Ff = /* @__PURE__ */ Uint32Array.from([
	1732584193,
	4023233417,
	2562383102,
	271733878,
	3285377520
]), Nf = /* @__PURE__ */ new Uint32Array(80);
var Lf = class extends Wc {
	constructor() {
		super(64, 20, 8, !1), this.A = 0 | Ff[0], this.B = 0 | Ff[1], this.C = 0 | Ff[2], this.D = 0 | Ff[3], this.E = 0 | Ff[4];
	}
	get() {
		const { A: t$1, B: e$1, C: r$1, D: n$1, E: i$1 } = this;
		return [
			t$1,
			e$1,
			r$1,
			n$1,
			i$1
		];
	}
	set(t$1, e$1, r$1, n$1, i$1) {
		this.A = 0 | t$1, this.B = 0 | e$1, this.C = 0 | r$1, this.D = 0 | n$1, this.E = 0 | i$1;
	}
	process(t$1, e$1) {
		for (let r$2 = 0; r$2 < 16; r$2++, e$1 += 4) Nf[r$2] = t$1.getUint32(e$1, !1);
		for (let t$2 = 16; t$2 < 80; t$2++) Nf[t$2] = Ho(Nf[t$2 - 3] ^ Nf[t$2 - 8] ^ Nf[t$2 - 14] ^ Nf[t$2 - 16], 1);
		let { A: r$1, B: n$1, C: i$1, D: s$1, E: a$1 } = this;
		for (let t$2 = 0; t$2 < 80; t$2++) {
			let e$2, o$1;
			t$2 < 20 ? (e$2 = Zc(n$1, i$1, s$1), o$1 = 1518500249) : t$2 < 40 ? (e$2 = n$1 ^ i$1 ^ s$1, o$1 = 1859775393) : t$2 < 60 ? (e$2 = Jc(n$1, i$1, s$1), o$1 = 2400959708) : (e$2 = n$1 ^ i$1 ^ s$1, o$1 = 3395469782);
			const c$1 = Ho(r$1, 5) + e$2 + a$1 + o$1 + Nf[t$2] | 0;
			a$1 = s$1, s$1 = i$1, i$1 = Ho(n$1, 30), n$1 = r$1, r$1 = c$1;
		}
		r$1 = r$1 + this.A | 0, n$1 = n$1 + this.B | 0, i$1 = i$1 + this.C | 0, s$1 = s$1 + this.D | 0, a$1 = a$1 + this.E | 0, this.set(r$1, n$1, i$1, s$1, a$1);
	}
	roundClean() {
		No(Nf);
	}
	destroy() {
		this.set(0, 0, 0, 0, 0), No(this.buffer);
	}
};
const Of = /* @__PURE__ */ nc(() => new Lf()), Hf = /* @__PURE__ */ Uint8Array.from([
	7,
	4,
	13,
	1,
	10,
	6,
	15,
	3,
	12,
	0,
	9,
	5,
	2,
	14,
	11,
	8
]), zf = /* @__PURE__ */ (() => Uint8Array.from(Array(16).fill(0).map((t$1, e$1) => e$1)))(), Gf = /* @__PURE__ */ (() => zf.map((t$1) => (9 * t$1 + 5) % 16))(), _f = /* @__PURE__ */ (() => {
	const t$1 = [[zf], [Gf]];
	for (let e$1 = 0; e$1 < 4; e$1++) for (let r$1 of t$1) r$1.push(r$1[e$1].map((t$2) => Hf[t$2]));
	return t$1;
})(), jf = /* @__PURE__ */ (() => _f[0])(), Vf = /* @__PURE__ */ (() => _f[1])(), qf = /* @__PURE__ */ [
	[
		11,
		14,
		15,
		12,
		5,
		8,
		7,
		9,
		11,
		13,
		14,
		15,
		6,
		7,
		9,
		8
	],
	[
		12,
		13,
		11,
		15,
		6,
		9,
		9,
		7,
		12,
		15,
		11,
		13,
		7,
		8,
		7,
		7
	],
	[
		13,
		15,
		14,
		11,
		7,
		7,
		6,
		8,
		13,
		14,
		13,
		12,
		5,
		5,
		6,
		9
	],
	[
		14,
		11,
		12,
		14,
		8,
		6,
		5,
		5,
		15,
		12,
		15,
		14,
		9,
		9,
		8,
		6
	],
	[
		15,
		12,
		13,
		13,
		9,
		5,
		8,
		6,
		14,
		11,
		12,
		11,
		8,
		6,
		5,
		5
	]
].map((t$1) => Uint8Array.from(t$1)), Yf = /* @__PURE__ */ jf.map((t$1, e$1) => t$1.map((t$2) => qf[e$1][t$2])), Zf = /* @__PURE__ */ Vf.map((t$1, e$1) => t$1.map((t$2) => qf[e$1][t$2])), Jf = /* @__PURE__ */ Uint32Array.from([
	0,
	1518500249,
	1859775393,
	2400959708,
	2840853838
]), Wf = /* @__PURE__ */ Uint32Array.from([
	1352829926,
	1548603684,
	1836072691,
	2053994217,
	0
]);
function Xf(t$1, e$1, r$1, n$1) {
	return 0 === t$1 ? e$1 ^ r$1 ^ n$1 : 1 === t$1 ? e$1 & r$1 | ~e$1 & n$1 : 2 === t$1 ? (e$1 | ~r$1) ^ n$1 : 3 === t$1 ? e$1 & n$1 | r$1 & ~n$1 : e$1 ^ (r$1 | ~n$1);
}
const $f = /* @__PURE__ */ new Uint32Array(16);
var tl = class extends Wc {
	constructor() {
		super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
	}
	get() {
		const { h0: t$1, h1: e$1, h2: r$1, h3: n$1, h4: i$1 } = this;
		return [
			t$1,
			e$1,
			r$1,
			n$1,
			i$1
		];
	}
	set(t$1, e$1, r$1, n$1, i$1) {
		this.h0 = 0 | t$1, this.h1 = 0 | e$1, this.h2 = 0 | r$1, this.h3 = 0 | n$1, this.h4 = 0 | i$1;
	}
	process(t$1, e$1) {
		for (let r$2 = 0; r$2 < 16; r$2++, e$1 += 4) $f[r$2] = t$1.getUint32(e$1, !0);
		let r$1 = 0 | this.h0, n$1 = r$1, i$1 = 0 | this.h1, s$1 = i$1, a$1 = 0 | this.h2, o$1 = a$1, c$1 = 0 | this.h3, u$1 = c$1, h$1 = 0 | this.h4, f$1 = h$1;
		for (let t$2 = 0; t$2 < 5; t$2++) {
			const e$2 = 4 - t$2, l$1 = Jf[t$2], y$1 = Wf[t$2], g$1 = jf[t$2], p$1 = Vf[t$2], d$1 = Yf[t$2], A$1 = Zf[t$2];
			for (let e$3 = 0; e$3 < 16; e$3++) {
				const n$2 = Ho(r$1 + Xf(t$2, i$1, a$1, c$1) + $f[g$1[e$3]] + l$1, d$1[e$3]) + h$1 | 0;
				r$1 = h$1, h$1 = c$1, c$1 = 0 | Ho(a$1, 10), a$1 = i$1, i$1 = n$2;
			}
			for (let t$3 = 0; t$3 < 16; t$3++) {
				const r$2 = Ho(n$1 + Xf(e$2, s$1, o$1, u$1) + $f[p$1[t$3]] + y$1, A$1[t$3]) + f$1 | 0;
				n$1 = f$1, f$1 = u$1, u$1 = 0 | Ho(o$1, 10), o$1 = s$1, s$1 = r$2;
			}
		}
		this.set(this.h1 + a$1 + u$1 | 0, this.h2 + c$1 + f$1 | 0, this.h3 + h$1 + n$1 | 0, this.h4 + r$1 + s$1 | 0, this.h0 + i$1 + o$1 | 0);
	}
	roundClean() {
		No($f);
	}
	destroy() {
		this.destroyed = !0, No(this.buffer), this.set(0, 0, 0, 0, 0);
	}
};
const el = Of, rl = /* @__PURE__ */ nc(() => new tl()), nl = Array.from({ length: 64 }, (t$1, e$1) => Math.floor(4294967296 * Math.abs(Math.sin(e$1 + 1)))), il = (t$1, e$1, r$1) => t$1 & e$1 ^ ~t$1 & r$1, sl = /* @__PURE__ */ new Uint32Array([
	1732584193,
	4023233417,
	2562383102,
	271733878
]), al = /* @__PURE__ */ new Uint32Array(16);
var ol = class extends Wc {
	constructor() {
		super(64, 16, 8, !0), this.A = 0 | sl[0], this.B = 0 | sl[1], this.C = 0 | sl[2], this.D = 0 | sl[3];
	}
	get() {
		const { A: t$1, B: e$1, C: r$1, D: n$1 } = this;
		return [
			t$1,
			e$1,
			r$1,
			n$1
		];
	}
	set(t$1, e$1, r$1, n$1) {
		this.A = 0 | t$1, this.B = 0 | e$1, this.C = 0 | r$1, this.D = 0 | n$1;
	}
	process(t$1, e$1) {
		for (let r$2 = 0; r$2 < 16; r$2++, e$1 += 4) al[r$2] = t$1.getUint32(e$1, !0);
		let { A: r$1, B: n$1, C: i$1, D: s$1 } = this;
		for (let t$2 = 0; t$2 < 64; t$2++) {
			let e$2, a$1, o$1;
			t$2 < 16 ? (e$2 = il(n$1, i$1, s$1), a$1 = t$2, o$1 = [
				7,
				12,
				17,
				22
			]) : t$2 < 32 ? (e$2 = il(s$1, n$1, i$1), a$1 = (5 * t$2 + 1) % 16, o$1 = [
				5,
				9,
				14,
				20
			]) : t$2 < 48 ? (e$2 = n$1 ^ i$1 ^ s$1, a$1 = (3 * t$2 + 5) % 16, o$1 = [
				4,
				11,
				16,
				23
			]) : (e$2 = i$1 ^ (n$1 | ~s$1), a$1 = 7 * t$2 % 16, o$1 = [
				6,
				10,
				15,
				21
			]), e$2 = e$2 + r$1 + nl[t$2] + al[a$1], r$1 = s$1, s$1 = i$1, i$1 = n$1, n$1 += Ho(e$2, o$1[t$2 % 4]);
		}
		r$1 = r$1 + this.A | 0, n$1 = n$1 + this.B | 0, i$1 = i$1 + this.C | 0, s$1 = s$1 + this.D | 0, this.set(r$1, n$1, i$1, s$1);
	}
	roundClean() {
		al.fill(0);
	}
	destroy() {
		this.set(0, 0, 0, 0), this.buffer.fill(0);
	}
};
const cl = new Map(Object.entries({
	md5: /* @__PURE__ */ ic(() => new ol()),
	sha1: el,
	sha224: Sf,
	sha256: If,
	sha384: Uf,
	sha512: Df,
	sha3_256: Oh,
	sha3_512: Hh,
	ripemd160: rl
}));
var ul = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	nobleHashes: cl
});
const hl = "object" == typeof t && "crypto" in t ? t.crypto : void 0, fl = {};
var ll = function(t$1) {
	var e$1, r$1 = new Float64Array(16);
	if (t$1) for (e$1 = 0; e$1 < t$1.length; e$1++) r$1[e$1] = t$1[e$1];
	return r$1;
}, yl = function() {
	throw Error("no PRNG");
}, gl = new Uint8Array(32);
gl[0] = 9;
var pl = ll(), dl = ll([1]), Al = ll([56129, 1]), wl = ll([
	30883,
	4953,
	19914,
	30187,
	55467,
	16705,
	2637,
	112,
	59544,
	30585,
	16505,
	36039,
	65139,
	11119,
	27886,
	20995
]), ml = ll([
	61785,
	9906,
	39828,
	60374,
	45398,
	33411,
	5274,
	224,
	53552,
	61171,
	33010,
	6542,
	64743,
	22239,
	55772,
	9222
]), bl = ll([
	54554,
	36645,
	11616,
	51542,
	42930,
	38181,
	51040,
	26924,
	56412,
	64982,
	57905,
	49316,
	21502,
	52590,
	14035,
	8553
]), kl = ll([
	26200,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214,
	26214
]), El = ll([
	41136,
	18958,
	6951,
	50414,
	58488,
	44335,
	6150,
	12099,
	55207,
	15867,
	153,
	11085,
	57099,
	20417,
	9344,
	11139
]);
function vl(t$1, e$1, r$1, n$1) {
	t$1[e$1] = r$1 >> 24 & 255, t$1[e$1 + 1] = r$1 >> 16 & 255, t$1[e$1 + 2] = r$1 >> 8 & 255, t$1[e$1 + 3] = 255 & r$1, t$1[e$1 + 4] = n$1 >> 24 & 255, t$1[e$1 + 5] = n$1 >> 16 & 255, t$1[e$1 + 6] = n$1 >> 8 & 255, t$1[e$1 + 7] = 255 & n$1;
}
function Bl(t$1, e$1, r$1, n$1) {
	return function(t$2, e$2, r$2, n$2, i$1) {
		var s$1, a$1 = 0;
		for (s$1 = 0; s$1 < i$1; s$1++) a$1 |= t$2[e$2 + s$1] ^ r$2[n$2 + s$1];
		return (1 & a$1 - 1 >>> 8) - 1;
	}(t$1, e$1, r$1, n$1, 32);
}
function Il(t$1, e$1) {
	var r$1;
	for (r$1 = 0; r$1 < 16; r$1++) t$1[r$1] = 0 | e$1[r$1];
}
function Sl(t$1) {
	var e$1, r$1, n$1 = 1;
	for (e$1 = 0; e$1 < 16; e$1++) r$1 = t$1[e$1] + n$1 + 65535, n$1 = Math.floor(r$1 / 65536), t$1[e$1] = r$1 - 65536 * n$1;
	t$1[0] += n$1 - 1 + 37 * (n$1 - 1);
}
function Kl(t$1, e$1, r$1) {
	for (var n$1, i$1 = ~(r$1 - 1), s$1 = 0; s$1 < 16; s$1++) n$1 = i$1 & (t$1[s$1] ^ e$1[s$1]), t$1[s$1] ^= n$1, e$1[s$1] ^= n$1;
}
function Cl(t$1, e$1) {
	var r$1, n$1, i$1, s$1 = ll(), a$1 = ll();
	for (r$1 = 0; r$1 < 16; r$1++) a$1[r$1] = e$1[r$1];
	for (Sl(a$1), Sl(a$1), Sl(a$1), n$1 = 0; n$1 < 2; n$1++) {
		for (s$1[0] = a$1[0] - 65517, r$1 = 1; r$1 < 15; r$1++) s$1[r$1] = a$1[r$1] - 65535 - (s$1[r$1 - 1] >> 16 & 1), s$1[r$1 - 1] &= 65535;
		s$1[15] = a$1[15] - 32767 - (s$1[14] >> 16 & 1), i$1 = s$1[15] >> 16 & 1, s$1[14] &= 65535, Kl(a$1, s$1, 1 - i$1);
	}
	for (r$1 = 0; r$1 < 16; r$1++) t$1[2 * r$1] = 255 & a$1[r$1], t$1[2 * r$1 + 1] = a$1[r$1] >> 8;
}
function Dl(t$1, e$1) {
	var r$1 = new Uint8Array(32), n$1 = new Uint8Array(32);
	return Cl(r$1, t$1), Cl(n$1, e$1), Bl(r$1, 0, n$1, 0);
}
function Ul(t$1) {
	var e$1 = new Uint8Array(32);
	return Cl(e$1, t$1), 1 & e$1[0];
}
function Pl(t$1, e$1) {
	var r$1;
	for (r$1 = 0; r$1 < 16; r$1++) t$1[r$1] = e$1[2 * r$1] + (e$1[2 * r$1 + 1] << 8);
	t$1[15] &= 32767;
}
function xl(t$1, e$1, r$1) {
	for (var n$1 = 0; n$1 < 16; n$1++) t$1[n$1] = e$1[n$1] + r$1[n$1];
}
function Ql(t$1, e$1, r$1) {
	for (var n$1 = 0; n$1 < 16; n$1++) t$1[n$1] = e$1[n$1] - r$1[n$1];
}
function Rl(t$1, e$1, r$1) {
	var n$1, i$1, s$1 = 0, a$1 = 0, o$1 = 0, c$1 = 0, u$1 = 0, h$1 = 0, f$1 = 0, l$1 = 0, y$1 = 0, g$1 = 0, p$1 = 0, d$1 = 0, A$1 = 0, w$1 = 0, m$1 = 0, b$1 = 0, k$1 = 0, E$1 = 0, v$1 = 0, B$1 = 0, I$1 = 0, S$1 = 0, K$1 = 0, C$1 = 0, D$1 = 0, U$1 = 0, P$1 = 0, x$1 = 0, Q$1 = 0, R$1 = 0, T$1 = 0, M$1 = r$1[0], F$1 = r$1[1], N$1 = r$1[2], L$1 = r$1[3], O$1 = r$1[4], H$1 = r$1[5], z$1 = r$1[6], G$1 = r$1[7], _$1 = r$1[8], j$1 = r$1[9], V$1 = r$1[10], q$1 = r$1[11], Y$1 = r$1[12], Z$1 = r$1[13], J$1 = r$1[14], W$1 = r$1[15];
	s$1 += (n$1 = e$1[0]) * M$1, a$1 += n$1 * F$1, o$1 += n$1 * N$1, c$1 += n$1 * L$1, u$1 += n$1 * O$1, h$1 += n$1 * H$1, f$1 += n$1 * z$1, l$1 += n$1 * G$1, y$1 += n$1 * _$1, g$1 += n$1 * j$1, p$1 += n$1 * V$1, d$1 += n$1 * q$1, A$1 += n$1 * Y$1, w$1 += n$1 * Z$1, m$1 += n$1 * J$1, b$1 += n$1 * W$1, a$1 += (n$1 = e$1[1]) * M$1, o$1 += n$1 * F$1, c$1 += n$1 * N$1, u$1 += n$1 * L$1, h$1 += n$1 * O$1, f$1 += n$1 * H$1, l$1 += n$1 * z$1, y$1 += n$1 * G$1, g$1 += n$1 * _$1, p$1 += n$1 * j$1, d$1 += n$1 * V$1, A$1 += n$1 * q$1, w$1 += n$1 * Y$1, m$1 += n$1 * Z$1, b$1 += n$1 * J$1, k$1 += n$1 * W$1, o$1 += (n$1 = e$1[2]) * M$1, c$1 += n$1 * F$1, u$1 += n$1 * N$1, h$1 += n$1 * L$1, f$1 += n$1 * O$1, l$1 += n$1 * H$1, y$1 += n$1 * z$1, g$1 += n$1 * G$1, p$1 += n$1 * _$1, d$1 += n$1 * j$1, A$1 += n$1 * V$1, w$1 += n$1 * q$1, m$1 += n$1 * Y$1, b$1 += n$1 * Z$1, k$1 += n$1 * J$1, E$1 += n$1 * W$1, c$1 += (n$1 = e$1[3]) * M$1, u$1 += n$1 * F$1, h$1 += n$1 * N$1, f$1 += n$1 * L$1, l$1 += n$1 * O$1, y$1 += n$1 * H$1, g$1 += n$1 * z$1, p$1 += n$1 * G$1, d$1 += n$1 * _$1, A$1 += n$1 * j$1, w$1 += n$1 * V$1, m$1 += n$1 * q$1, b$1 += n$1 * Y$1, k$1 += n$1 * Z$1, E$1 += n$1 * J$1, v$1 += n$1 * W$1, u$1 += (n$1 = e$1[4]) * M$1, h$1 += n$1 * F$1, f$1 += n$1 * N$1, l$1 += n$1 * L$1, y$1 += n$1 * O$1, g$1 += n$1 * H$1, p$1 += n$1 * z$1, d$1 += n$1 * G$1, A$1 += n$1 * _$1, w$1 += n$1 * j$1, m$1 += n$1 * V$1, b$1 += n$1 * q$1, k$1 += n$1 * Y$1, E$1 += n$1 * Z$1, v$1 += n$1 * J$1, B$1 += n$1 * W$1, h$1 += (n$1 = e$1[5]) * M$1, f$1 += n$1 * F$1, l$1 += n$1 * N$1, y$1 += n$1 * L$1, g$1 += n$1 * O$1, p$1 += n$1 * H$1, d$1 += n$1 * z$1, A$1 += n$1 * G$1, w$1 += n$1 * _$1, m$1 += n$1 * j$1, b$1 += n$1 * V$1, k$1 += n$1 * q$1, E$1 += n$1 * Y$1, v$1 += n$1 * Z$1, B$1 += n$1 * J$1, I$1 += n$1 * W$1, f$1 += (n$1 = e$1[6]) * M$1, l$1 += n$1 * F$1, y$1 += n$1 * N$1, g$1 += n$1 * L$1, p$1 += n$1 * O$1, d$1 += n$1 * H$1, A$1 += n$1 * z$1, w$1 += n$1 * G$1, m$1 += n$1 * _$1, b$1 += n$1 * j$1, k$1 += n$1 * V$1, E$1 += n$1 * q$1, v$1 += n$1 * Y$1, B$1 += n$1 * Z$1, I$1 += n$1 * J$1, S$1 += n$1 * W$1, l$1 += (n$1 = e$1[7]) * M$1, y$1 += n$1 * F$1, g$1 += n$1 * N$1, p$1 += n$1 * L$1, d$1 += n$1 * O$1, A$1 += n$1 * H$1, w$1 += n$1 * z$1, m$1 += n$1 * G$1, b$1 += n$1 * _$1, k$1 += n$1 * j$1, E$1 += n$1 * V$1, v$1 += n$1 * q$1, B$1 += n$1 * Y$1, I$1 += n$1 * Z$1, S$1 += n$1 * J$1, K$1 += n$1 * W$1, y$1 += (n$1 = e$1[8]) * M$1, g$1 += n$1 * F$1, p$1 += n$1 * N$1, d$1 += n$1 * L$1, A$1 += n$1 * O$1, w$1 += n$1 * H$1, m$1 += n$1 * z$1, b$1 += n$1 * G$1, k$1 += n$1 * _$1, E$1 += n$1 * j$1, v$1 += n$1 * V$1, B$1 += n$1 * q$1, I$1 += n$1 * Y$1, S$1 += n$1 * Z$1, K$1 += n$1 * J$1, C$1 += n$1 * W$1, g$1 += (n$1 = e$1[9]) * M$1, p$1 += n$1 * F$1, d$1 += n$1 * N$1, A$1 += n$1 * L$1, w$1 += n$1 * O$1, m$1 += n$1 * H$1, b$1 += n$1 * z$1, k$1 += n$1 * G$1, E$1 += n$1 * _$1, v$1 += n$1 * j$1, B$1 += n$1 * V$1, I$1 += n$1 * q$1, S$1 += n$1 * Y$1, K$1 += n$1 * Z$1, C$1 += n$1 * J$1, D$1 += n$1 * W$1, p$1 += (n$1 = e$1[10]) * M$1, d$1 += n$1 * F$1, A$1 += n$1 * N$1, w$1 += n$1 * L$1, m$1 += n$1 * O$1, b$1 += n$1 * H$1, k$1 += n$1 * z$1, E$1 += n$1 * G$1, v$1 += n$1 * _$1, B$1 += n$1 * j$1, I$1 += n$1 * V$1, S$1 += n$1 * q$1, K$1 += n$1 * Y$1, C$1 += n$1 * Z$1, D$1 += n$1 * J$1, U$1 += n$1 * W$1, d$1 += (n$1 = e$1[11]) * M$1, A$1 += n$1 * F$1, w$1 += n$1 * N$1, m$1 += n$1 * L$1, b$1 += n$1 * O$1, k$1 += n$1 * H$1, E$1 += n$1 * z$1, v$1 += n$1 * G$1, B$1 += n$1 * _$1, I$1 += n$1 * j$1, S$1 += n$1 * V$1, K$1 += n$1 * q$1, C$1 += n$1 * Y$1, D$1 += n$1 * Z$1, U$1 += n$1 * J$1, P$1 += n$1 * W$1, A$1 += (n$1 = e$1[12]) * M$1, w$1 += n$1 * F$1, m$1 += n$1 * N$1, b$1 += n$1 * L$1, k$1 += n$1 * O$1, E$1 += n$1 * H$1, v$1 += n$1 * z$1, B$1 += n$1 * G$1, I$1 += n$1 * _$1, S$1 += n$1 * j$1, K$1 += n$1 * V$1, C$1 += n$1 * q$1, D$1 += n$1 * Y$1, U$1 += n$1 * Z$1, P$1 += n$1 * J$1, x$1 += n$1 * W$1, w$1 += (n$1 = e$1[13]) * M$1, m$1 += n$1 * F$1, b$1 += n$1 * N$1, k$1 += n$1 * L$1, E$1 += n$1 * O$1, v$1 += n$1 * H$1, B$1 += n$1 * z$1, I$1 += n$1 * G$1, S$1 += n$1 * _$1, K$1 += n$1 * j$1, C$1 += n$1 * V$1, D$1 += n$1 * q$1, U$1 += n$1 * Y$1, P$1 += n$1 * Z$1, x$1 += n$1 * J$1, Q$1 += n$1 * W$1, m$1 += (n$1 = e$1[14]) * M$1, b$1 += n$1 * F$1, k$1 += n$1 * N$1, E$1 += n$1 * L$1, v$1 += n$1 * O$1, B$1 += n$1 * H$1, I$1 += n$1 * z$1, S$1 += n$1 * G$1, K$1 += n$1 * _$1, C$1 += n$1 * j$1, D$1 += n$1 * V$1, U$1 += n$1 * q$1, P$1 += n$1 * Y$1, x$1 += n$1 * Z$1, Q$1 += n$1 * J$1, R$1 += n$1 * W$1, b$1 += (n$1 = e$1[15]) * M$1, a$1 += 38 * (E$1 += n$1 * N$1), o$1 += 38 * (v$1 += n$1 * L$1), c$1 += 38 * (B$1 += n$1 * O$1), u$1 += 38 * (I$1 += n$1 * H$1), h$1 += 38 * (S$1 += n$1 * z$1), f$1 += 38 * (K$1 += n$1 * G$1), l$1 += 38 * (C$1 += n$1 * _$1), y$1 += 38 * (D$1 += n$1 * j$1), g$1 += 38 * (U$1 += n$1 * V$1), p$1 += 38 * (P$1 += n$1 * q$1), d$1 += 38 * (x$1 += n$1 * Y$1), A$1 += 38 * (Q$1 += n$1 * Z$1), w$1 += 38 * (R$1 += n$1 * J$1), m$1 += 38 * (T$1 += n$1 * W$1), s$1 = (n$1 = (s$1 += 38 * (k$1 += n$1 * F$1)) + (i$1 = 1) + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), a$1 = (n$1 = a$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), o$1 = (n$1 = o$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), c$1 = (n$1 = c$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), u$1 = (n$1 = u$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), h$1 = (n$1 = h$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), f$1 = (n$1 = f$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), l$1 = (n$1 = l$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), y$1 = (n$1 = y$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), g$1 = (n$1 = g$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), p$1 = (n$1 = p$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), d$1 = (n$1 = d$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), A$1 = (n$1 = A$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), w$1 = (n$1 = w$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), m$1 = (n$1 = m$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), b$1 = (n$1 = b$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), s$1 = (n$1 = (s$1 += i$1 - 1 + 37 * (i$1 - 1)) + (i$1 = 1) + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), a$1 = (n$1 = a$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), o$1 = (n$1 = o$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), c$1 = (n$1 = c$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), u$1 = (n$1 = u$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), h$1 = (n$1 = h$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), f$1 = (n$1 = f$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), l$1 = (n$1 = l$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), y$1 = (n$1 = y$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), g$1 = (n$1 = g$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), p$1 = (n$1 = p$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), d$1 = (n$1 = d$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), A$1 = (n$1 = A$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), w$1 = (n$1 = w$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), m$1 = (n$1 = m$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), b$1 = (n$1 = b$1 + i$1 + 65535) - 65536 * (i$1 = Math.floor(n$1 / 65536)), s$1 += i$1 - 1 + 37 * (i$1 - 1), t$1[0] = s$1, t$1[1] = a$1, t$1[2] = o$1, t$1[3] = c$1, t$1[4] = u$1, t$1[5] = h$1, t$1[6] = f$1, t$1[7] = l$1, t$1[8] = y$1, t$1[9] = g$1, t$1[10] = p$1, t$1[11] = d$1, t$1[12] = A$1, t$1[13] = w$1, t$1[14] = m$1, t$1[15] = b$1;
}
function Tl(t$1, e$1) {
	Rl(t$1, e$1, e$1);
}
function Ml(t$1, e$1) {
	var r$1, n$1 = ll();
	for (r$1 = 0; r$1 < 16; r$1++) n$1[r$1] = e$1[r$1];
	for (r$1 = 253; r$1 >= 0; r$1--) Tl(n$1, n$1), 2 !== r$1 && 4 !== r$1 && Rl(n$1, n$1, e$1);
	for (r$1 = 0; r$1 < 16; r$1++) t$1[r$1] = n$1[r$1];
}
function Fl(t$1, e$1, r$1) {
	var n$1, i$1, s$1 = new Uint8Array(32), a$1 = new Float64Array(80), o$1 = ll(), c$1 = ll(), u$1 = ll(), h$1 = ll(), f$1 = ll(), l$1 = ll();
	for (i$1 = 0; i$1 < 31; i$1++) s$1[i$1] = e$1[i$1];
	for (s$1[31] = 127 & e$1[31] | 64, s$1[0] &= 248, Pl(a$1, r$1), i$1 = 0; i$1 < 16; i$1++) c$1[i$1] = a$1[i$1], h$1[i$1] = o$1[i$1] = u$1[i$1] = 0;
	for (o$1[0] = h$1[0] = 1, i$1 = 254; i$1 >= 0; --i$1) Kl(o$1, c$1, n$1 = s$1[i$1 >>> 3] >>> (7 & i$1) & 1), Kl(u$1, h$1, n$1), xl(f$1, o$1, u$1), Ql(o$1, o$1, u$1), xl(u$1, c$1, h$1), Ql(c$1, c$1, h$1), Tl(h$1, f$1), Tl(l$1, o$1), Rl(o$1, u$1, o$1), Rl(u$1, c$1, f$1), xl(f$1, o$1, u$1), Ql(o$1, o$1, u$1), Tl(c$1, o$1), Ql(u$1, h$1, l$1), Rl(o$1, u$1, Al), xl(o$1, o$1, h$1), Rl(u$1, u$1, o$1), Rl(o$1, h$1, l$1), Rl(h$1, c$1, a$1), Tl(c$1, f$1), Kl(o$1, c$1, n$1), Kl(u$1, h$1, n$1);
	for (i$1 = 0; i$1 < 16; i$1++) a$1[i$1 + 16] = o$1[i$1], a$1[i$1 + 32] = u$1[i$1], a$1[i$1 + 48] = c$1[i$1], a$1[i$1 + 64] = h$1[i$1];
	var y$1 = a$1.subarray(32), g$1 = a$1.subarray(16);
	return Ml(y$1, y$1), Rl(g$1, g$1, y$1), Cl(t$1, g$1), 0;
}
function Nl(t$1, e$1) {
	return Fl(t$1, e$1, gl);
}
var Ll = [
	1116352408,
	3609767458,
	1899447441,
	602891725,
	3049323471,
	3964484399,
	3921009573,
	2173295548,
	961987163,
	4081628472,
	1508970993,
	3053834265,
	2453635748,
	2937671579,
	2870763221,
	3664609560,
	3624381080,
	2734883394,
	310598401,
	1164996542,
	607225278,
	1323610764,
	1426881987,
	3590304994,
	1925078388,
	4068182383,
	2162078206,
	991336113,
	2614888103,
	633803317,
	3248222580,
	3479774868,
	3835390401,
	2666613458,
	4022224774,
	944711139,
	264347078,
	2341262773,
	604807628,
	2007800933,
	770255983,
	1495990901,
	1249150122,
	1856431235,
	1555081692,
	3175218132,
	1996064986,
	2198950837,
	2554220882,
	3999719339,
	2821834349,
	766784016,
	2952996808,
	2566594879,
	3210313671,
	3203337956,
	3336571891,
	1034457026,
	3584528711,
	2466948901,
	113926993,
	3758326383,
	338241895,
	168717936,
	666307205,
	1188179964,
	773529912,
	1546045734,
	1294757372,
	1522805485,
	1396182291,
	2643833823,
	1695183700,
	2343527390,
	1986661051,
	1014477480,
	2177026350,
	1206759142,
	2456956037,
	344077627,
	2730485921,
	1290863460,
	2820302411,
	3158454273,
	3259730800,
	3505952657,
	3345764771,
	106217008,
	3516065817,
	3606008344,
	3600352804,
	1432725776,
	4094571909,
	1467031594,
	275423344,
	851169720,
	430227734,
	3100823752,
	506948616,
	1363258195,
	659060556,
	3750685593,
	883997877,
	3785050280,
	958139571,
	3318307427,
	1322822218,
	3812723403,
	1537002063,
	2003034995,
	1747873779,
	3602036899,
	1955562222,
	1575990012,
	2024104815,
	1125592928,
	2227730452,
	2716904306,
	2361852424,
	442776044,
	2428436474,
	593698344,
	2756734187,
	3733110249,
	3204031479,
	2999351573,
	3329325298,
	3815920427,
	3391569614,
	3928383900,
	3515267271,
	566280711,
	3940187606,
	3454069534,
	4118630271,
	4000239992,
	116418474,
	1914138554,
	174292421,
	2731055270,
	289380356,
	3203993006,
	460393269,
	320620315,
	685471733,
	587496836,
	852142971,
	1086792851,
	1017036298,
	365543100,
	1126000580,
	2618297676,
	1288033470,
	3409855158,
	1501505948,
	4234509866,
	1607167915,
	987167468,
	1816402316,
	1246189591
];
function Ol(t$1, e$1, r$1, n$1) {
	for (var i$1, s$1, a$1, o$1, c$1, u$1, h$1, f$1, l$1, y$1, g$1, p$1, d$1, A$1, w$1, m$1, b$1, k$1, E$1, v$1, B$1, I$1, S$1, K$1, C$1, D$1, U$1 = new Int32Array(16), P$1 = new Int32Array(16), x$1 = t$1[0], Q$1 = t$1[1], R$1 = t$1[2], T$1 = t$1[3], M$1 = t$1[4], F$1 = t$1[5], N$1 = t$1[6], L$1 = t$1[7], O$1 = e$1[0], H$1 = e$1[1], z$1 = e$1[2], G$1 = e$1[3], _$1 = e$1[4], j$1 = e$1[5], V$1 = e$1[6], q$1 = e$1[7], Y$1 = 0; n$1 >= 128;) {
		for (E$1 = 0; E$1 < 16; E$1++) v$1 = 8 * E$1 + Y$1, U$1[E$1] = r$1[v$1 + 0] << 24 | r$1[v$1 + 1] << 16 | r$1[v$1 + 2] << 8 | r$1[v$1 + 3], P$1[E$1] = r$1[v$1 + 4] << 24 | r$1[v$1 + 5] << 16 | r$1[v$1 + 6] << 8 | r$1[v$1 + 7];
		for (E$1 = 0; E$1 < 80; E$1++) if (i$1 = x$1, s$1 = Q$1, a$1 = R$1, o$1 = T$1, c$1 = M$1, u$1 = F$1, h$1 = N$1, L$1, l$1 = O$1, y$1 = H$1, g$1 = z$1, p$1 = G$1, d$1 = _$1, A$1 = j$1, w$1 = V$1, q$1, S$1 = 65535 & (I$1 = q$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = L$1), D$1 = B$1 >>> 16, S$1 += 65535 & (I$1 = (_$1 >>> 14 | M$1 << 18) ^ (_$1 >>> 18 | M$1 << 14) ^ (M$1 >>> 9 | _$1 << 23)), K$1 += I$1 >>> 16, C$1 += 65535 & (B$1 = (M$1 >>> 14 | _$1 << 18) ^ (M$1 >>> 18 | _$1 << 14) ^ (_$1 >>> 9 | M$1 << 23)), D$1 += B$1 >>> 16, S$1 += 65535 & (I$1 = _$1 & j$1 ^ ~_$1 & V$1), K$1 += I$1 >>> 16, C$1 += 65535 & (B$1 = M$1 & F$1 ^ ~M$1 & N$1), D$1 += B$1 >>> 16, S$1 += 65535 & (I$1 = Ll[2 * E$1 + 1]), K$1 += I$1 >>> 16, C$1 += 65535 & (B$1 = Ll[2 * E$1]), D$1 += B$1 >>> 16, B$1 = U$1[E$1 % 16], K$1 += (I$1 = P$1[E$1 % 16]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16, S$1 = 65535 & (I$1 = k$1 = 65535 & S$1 | K$1 << 16), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = b$1 = 65535 & C$1 | (D$1 += C$1 >>> 16) << 16), D$1 = B$1 >>> 16, S$1 += 65535 & (I$1 = (O$1 >>> 28 | x$1 << 4) ^ (x$1 >>> 2 | O$1 << 30) ^ (x$1 >>> 7 | O$1 << 25)), K$1 += I$1 >>> 16, C$1 += 65535 & (B$1 = (x$1 >>> 28 | O$1 << 4) ^ (O$1 >>> 2 | x$1 << 30) ^ (O$1 >>> 7 | x$1 << 25)), D$1 += B$1 >>> 16, K$1 += (I$1 = O$1 & H$1 ^ O$1 & z$1 ^ H$1 & z$1) >>> 16, C$1 += 65535 & (B$1 = x$1 & Q$1 ^ x$1 & R$1 ^ Q$1 & R$1), D$1 += B$1 >>> 16, f$1 = 65535 & (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) | (D$1 += C$1 >>> 16) << 16, m$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = p$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = o$1), D$1 = B$1 >>> 16, K$1 += (I$1 = k$1) >>> 16, C$1 += 65535 & (B$1 = b$1), D$1 += B$1 >>> 16, Q$1 = i$1, R$1 = s$1, T$1 = a$1, M$1 = o$1 = 65535 & (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) | (D$1 += C$1 >>> 16) << 16, F$1 = c$1, N$1 = u$1, L$1 = h$1, x$1 = f$1, H$1 = l$1, z$1 = y$1, G$1 = g$1, _$1 = p$1 = 65535 & S$1 | K$1 << 16, j$1 = d$1, V$1 = A$1, q$1 = w$1, O$1 = m$1, E$1 % 16 == 15) for (v$1 = 0; v$1 < 16; v$1++) B$1 = U$1[v$1], S$1 = 65535 & (I$1 = P$1[v$1]), K$1 = I$1 >>> 16, C$1 = 65535 & B$1, D$1 = B$1 >>> 16, B$1 = U$1[(v$1 + 9) % 16], S$1 += 65535 & (I$1 = P$1[(v$1 + 9) % 16]), K$1 += I$1 >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, b$1 = U$1[(v$1 + 1) % 16], S$1 += 65535 & (I$1 = ((k$1 = P$1[(v$1 + 1) % 16]) >>> 1 | b$1 << 31) ^ (k$1 >>> 8 | b$1 << 24) ^ (k$1 >>> 7 | b$1 << 25)), K$1 += I$1 >>> 16, C$1 += 65535 & (B$1 = (b$1 >>> 1 | k$1 << 31) ^ (b$1 >>> 8 | k$1 << 24) ^ b$1 >>> 7), D$1 += B$1 >>> 16, b$1 = U$1[(v$1 + 14) % 16], K$1 += (I$1 = ((k$1 = P$1[(v$1 + 14) % 16]) >>> 19 | b$1 << 13) ^ (b$1 >>> 29 | k$1 << 3) ^ (k$1 >>> 6 | b$1 << 26)) >>> 16, C$1 += 65535 & (B$1 = (b$1 >>> 19 | k$1 << 13) ^ (k$1 >>> 29 | b$1 << 3) ^ b$1 >>> 6), D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, U$1[v$1] = 65535 & C$1 | D$1 << 16, P$1[v$1] = 65535 & S$1 | K$1 << 16;
		S$1 = 65535 & (I$1 = O$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = x$1), D$1 = B$1 >>> 16, B$1 = t$1[0], K$1 += (I$1 = e$1[0]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[0] = x$1 = 65535 & C$1 | D$1 << 16, e$1[0] = O$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = H$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = Q$1), D$1 = B$1 >>> 16, B$1 = t$1[1], K$1 += (I$1 = e$1[1]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[1] = Q$1 = 65535 & C$1 | D$1 << 16, e$1[1] = H$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = z$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = R$1), D$1 = B$1 >>> 16, B$1 = t$1[2], K$1 += (I$1 = e$1[2]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[2] = R$1 = 65535 & C$1 | D$1 << 16, e$1[2] = z$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = G$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = T$1), D$1 = B$1 >>> 16, B$1 = t$1[3], K$1 += (I$1 = e$1[3]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[3] = T$1 = 65535 & C$1 | D$1 << 16, e$1[3] = G$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = _$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = M$1), D$1 = B$1 >>> 16, B$1 = t$1[4], K$1 += (I$1 = e$1[4]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[4] = M$1 = 65535 & C$1 | D$1 << 16, e$1[4] = _$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = j$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = F$1), D$1 = B$1 >>> 16, B$1 = t$1[5], K$1 += (I$1 = e$1[5]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[5] = F$1 = 65535 & C$1 | D$1 << 16, e$1[5] = j$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = V$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = N$1), D$1 = B$1 >>> 16, B$1 = t$1[6], K$1 += (I$1 = e$1[6]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[6] = N$1 = 65535 & C$1 | D$1 << 16, e$1[6] = V$1 = 65535 & S$1 | K$1 << 16, S$1 = 65535 & (I$1 = q$1), K$1 = I$1 >>> 16, C$1 = 65535 & (B$1 = L$1), D$1 = B$1 >>> 16, B$1 = t$1[7], K$1 += (I$1 = e$1[7]) >>> 16, C$1 += 65535 & B$1, D$1 += B$1 >>> 16, D$1 += (C$1 += (K$1 += (S$1 += 65535 & I$1) >>> 16) >>> 16) >>> 16, t$1[7] = L$1 = 65535 & C$1 | D$1 << 16, e$1[7] = q$1 = 65535 & S$1 | K$1 << 16, Y$1 += 128, n$1 -= 128;
	}
	return n$1;
}
function Hl(t$1, e$1, r$1) {
	var n$1, i$1 = new Int32Array(8), s$1 = new Int32Array(8), a$1 = new Uint8Array(256), o$1 = r$1;
	for (i$1[0] = 1779033703, i$1[1] = 3144134277, i$1[2] = 1013904242, i$1[3] = 2773480762, i$1[4] = 1359893119, i$1[5] = 2600822924, i$1[6] = 528734635, i$1[7] = 1541459225, s$1[0] = 4089235720, s$1[1] = 2227873595, s$1[2] = 4271175723, s$1[3] = 1595750129, s$1[4] = 2917565137, s$1[5] = 725511199, s$1[6] = 4215389547, s$1[7] = 327033209, Ol(i$1, s$1, e$1, r$1), r$1 %= 128, n$1 = 0; n$1 < r$1; n$1++) a$1[n$1] = e$1[o$1 - r$1 + n$1];
	for (a$1[r$1] = 128, a$1[(r$1 = 256 - 128 * (r$1 < 112 ? 1 : 0)) - 9] = 0, vl(a$1, r$1 - 8, o$1 / 536870912 | 0, o$1 << 3), Ol(i$1, s$1, a$1, r$1), n$1 = 0; n$1 < 8; n$1++) vl(t$1, 8 * n$1, i$1[n$1], s$1[n$1]);
	return 0;
}
function zl(t$1, e$1) {
	var r$1 = ll(), n$1 = ll(), i$1 = ll(), s$1 = ll(), a$1 = ll(), o$1 = ll(), c$1 = ll(), u$1 = ll(), h$1 = ll();
	Ql(r$1, t$1[1], t$1[0]), Ql(h$1, e$1[1], e$1[0]), Rl(r$1, r$1, h$1), xl(n$1, t$1[0], t$1[1]), xl(h$1, e$1[0], e$1[1]), Rl(n$1, n$1, h$1), Rl(i$1, t$1[3], e$1[3]), Rl(i$1, i$1, ml), Rl(s$1, t$1[2], e$1[2]), xl(s$1, s$1, s$1), Ql(a$1, n$1, r$1), Ql(o$1, s$1, i$1), xl(c$1, s$1, i$1), xl(u$1, n$1, r$1), Rl(t$1[0], a$1, o$1), Rl(t$1[1], u$1, c$1), Rl(t$1[2], c$1, o$1), Rl(t$1[3], a$1, u$1);
}
function Gl(t$1, e$1, r$1) {
	var n$1;
	for (n$1 = 0; n$1 < 4; n$1++) Kl(t$1[n$1], e$1[n$1], r$1);
}
function _l(t$1, e$1) {
	var r$1 = ll(), n$1 = ll(), i$1 = ll();
	Ml(i$1, e$1[2]), Rl(r$1, e$1[0], i$1), Rl(n$1, e$1[1], i$1), Cl(t$1, n$1), t$1[31] ^= Ul(r$1) << 7;
}
function jl(t$1, e$1, r$1) {
	var n$1, i$1;
	for (Il(t$1[0], pl), Il(t$1[1], dl), Il(t$1[2], dl), Il(t$1[3], pl), i$1 = 255; i$1 >= 0; --i$1) Gl(t$1, e$1, n$1 = r$1[i$1 / 8 | 0] >> (7 & i$1) & 1), zl(e$1, t$1), zl(t$1, t$1), Gl(t$1, e$1, n$1);
}
function Vl(t$1, e$1) {
	var r$1 = [
		ll(),
		ll(),
		ll(),
		ll()
	];
	Il(r$1[0], bl), Il(r$1[1], kl), Il(r$1[2], dl), Rl(r$1[3], bl, kl), jl(t$1, r$1, e$1);
}
function ql(t$1, e$1, r$1) {
	var n$1, i$1 = new Uint8Array(64), s$1 = [
		ll(),
		ll(),
		ll(),
		ll()
	];
	for (r$1 || yl(e$1, 32), Hl(i$1, e$1, 32), i$1[0] &= 248, i$1[31] &= 127, i$1[31] |= 64, Vl(s$1, i$1), _l(t$1, s$1), n$1 = 0; n$1 < 32; n$1++) e$1[n$1 + 32] = t$1[n$1];
	return 0;
}
var Yl = new Float64Array([
	237,
	211,
	245,
	92,
	26,
	99,
	18,
	88,
	214,
	156,
	247,
	162,
	222,
	249,
	222,
	20,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	16
]);
function Zl(t$1, e$1) {
	var r$1, n$1, i$1, s$1;
	for (n$1 = 63; n$1 >= 32; --n$1) {
		for (r$1 = 0, i$1 = n$1 - 32, s$1 = n$1 - 12; i$1 < s$1; ++i$1) e$1[i$1] += r$1 - 16 * e$1[n$1] * Yl[i$1 - (n$1 - 32)], r$1 = Math.floor((e$1[i$1] + 128) / 256), e$1[i$1] -= 256 * r$1;
		e$1[i$1] += r$1, e$1[n$1] = 0;
	}
	for (r$1 = 0, i$1 = 0; i$1 < 32; i$1++) e$1[i$1] += r$1 - (e$1[31] >> 4) * Yl[i$1], r$1 = e$1[i$1] >> 8, e$1[i$1] &= 255;
	for (i$1 = 0; i$1 < 32; i$1++) e$1[i$1] -= r$1 * Yl[i$1];
	for (n$1 = 0; n$1 < 32; n$1++) e$1[n$1 + 1] += e$1[n$1] >> 8, t$1[n$1] = 255 & e$1[n$1];
}
function Jl(t$1) {
	var e$1, r$1 = new Float64Array(64);
	for (e$1 = 0; e$1 < 64; e$1++) r$1[e$1] = t$1[e$1];
	for (e$1 = 0; e$1 < 64; e$1++) t$1[e$1] = 0;
	Zl(t$1, r$1);
}
function Wl(t$1, e$1) {
	var r$1 = ll(), n$1 = ll(), i$1 = ll(), s$1 = ll(), a$1 = ll(), o$1 = ll(), c$1 = ll();
	return Il(t$1[2], dl), Pl(t$1[1], e$1), Tl(i$1, t$1[1]), Rl(s$1, i$1, wl), Ql(i$1, i$1, t$1[2]), xl(s$1, t$1[2], s$1), Tl(a$1, s$1), Tl(o$1, a$1), Rl(c$1, o$1, a$1), Rl(r$1, c$1, i$1), Rl(r$1, r$1, s$1), function(t$2, e$2) {
		var r$2, n$2 = ll();
		for (r$2 = 0; r$2 < 16; r$2++) n$2[r$2] = e$2[r$2];
		for (r$2 = 250; r$2 >= 0; r$2--) Tl(n$2, n$2), 1 !== r$2 && Rl(n$2, n$2, e$2);
		for (r$2 = 0; r$2 < 16; r$2++) t$2[r$2] = n$2[r$2];
	}(r$1, r$1), Rl(r$1, r$1, i$1), Rl(r$1, r$1, s$1), Rl(r$1, r$1, s$1), Rl(t$1[0], r$1, s$1), Tl(n$1, t$1[0]), Rl(n$1, n$1, s$1), Dl(n$1, i$1) && Rl(t$1[0], t$1[0], El), Tl(n$1, t$1[0]), Rl(n$1, n$1, s$1), Dl(n$1, i$1) ? -1 : (Ul(t$1[0]) === e$1[31] >> 7 && Ql(t$1[0], pl, t$1[0]), Rl(t$1[3], t$1[0], t$1[1]), 0);
}
var Xl = 64;
function $l() {
	for (var t$1 = 0; t$1 < arguments.length; t$1++) if (!(arguments[t$1] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array");
}
fl.scalarMult = function(t$1, e$1) {
	if ($l(t$1, e$1), 32 !== t$1.length) throw Error("bad n size");
	if (32 !== e$1.length) throw Error("bad p size");
	var r$1 = new Uint8Array(32);
	return Fl(r$1, t$1, e$1), r$1;
}, fl.box = {}, fl.box.keyPair = function() {
	var t$1 = new Uint8Array(32), e$1 = new Uint8Array(32);
	return function(t$2, e$2) {
		yl(e$2, 32), Nl(t$2, e$2);
	}(t$1, e$1), {
		publicKey: t$1,
		secretKey: e$1
	};
}, fl.box.keyPair.fromSecretKey = function(t$1) {
	if ($l(t$1), 32 !== t$1.length) throw Error("bad secret key size");
	var e$1 = new Uint8Array(32);
	return Nl(e$1, t$1), {
		publicKey: e$1,
		secretKey: new Uint8Array(t$1)
	};
}, fl.sign = function(t$1, e$1) {
	if ($l(t$1, e$1), 64 !== e$1.length) throw Error("bad secret key size");
	var r$1 = new Uint8Array(Xl + t$1.length);
	return function(t$2, e$2, r$2, n$1) {
		var i$1, s$1, a$1 = new Uint8Array(64), o$1 = new Uint8Array(64), c$1 = new Uint8Array(64), u$1 = new Float64Array(64), h$1 = [
			ll(),
			ll(),
			ll(),
			ll()
		];
		Hl(a$1, n$1, 32), a$1[0] &= 248, a$1[31] &= 127, a$1[31] |= 64;
		var f$1 = r$2 + 64;
		for (i$1 = 0; i$1 < r$2; i$1++) t$2[64 + i$1] = e$2[i$1];
		for (i$1 = 0; i$1 < 32; i$1++) t$2[32 + i$1] = a$1[32 + i$1];
		for (Hl(c$1, t$2.subarray(32), r$2 + 32), Jl(c$1), Vl(h$1, c$1), _l(t$2, h$1), i$1 = 32; i$1 < 64; i$1++) t$2[i$1] = n$1[i$1];
		for (Hl(o$1, t$2, r$2 + 64), Jl(o$1), i$1 = 0; i$1 < 64; i$1++) u$1[i$1] = 0;
		for (i$1 = 0; i$1 < 32; i$1++) u$1[i$1] = c$1[i$1];
		for (i$1 = 0; i$1 < 32; i$1++) for (s$1 = 0; s$1 < 32; s$1++) u$1[i$1 + s$1] += o$1[i$1] * a$1[s$1];
		Zl(t$2.subarray(32), u$1);
	}(r$1, t$1, t$1.length, e$1), r$1;
}, fl.sign.detached = function(t$1, e$1) {
	for (var r$1 = fl.sign(t$1, e$1), n$1 = new Uint8Array(Xl), i$1 = 0; i$1 < n$1.length; i$1++) n$1[i$1] = r$1[i$1];
	return n$1;
}, fl.sign.detached.verify = function(t$1, e$1, r$1) {
	if ($l(t$1, e$1, r$1), e$1.length !== Xl) throw Error("bad signature size");
	if (32 !== r$1.length) throw Error("bad public key size");
	var n$1, i$1 = new Uint8Array(Xl + t$1.length), s$1 = new Uint8Array(Xl + t$1.length);
	for (n$1 = 0; n$1 < Xl; n$1++) i$1[n$1] = e$1[n$1];
	for (n$1 = 0; n$1 < t$1.length; n$1++) i$1[n$1 + Xl] = t$1[n$1];
	return function(t$2, e$2, r$2, n$2) {
		var i$2, s$2 = new Uint8Array(32), a$1 = new Uint8Array(64), o$1 = [
			ll(),
			ll(),
			ll(),
			ll()
		], c$1 = [
			ll(),
			ll(),
			ll(),
			ll()
		];
		if (r$2 < 64) return -1;
		if (Wl(c$1, n$2)) return -1;
		for (i$2 = 0; i$2 < r$2; i$2++) t$2[i$2] = e$2[i$2];
		for (i$2 = 0; i$2 < 32; i$2++) t$2[i$2 + 32] = n$2[i$2];
		if (Hl(a$1, t$2, r$2), Jl(a$1), jl(o$1, c$1, a$1), Vl(c$1, e$2.subarray(32)), zl(o$1, c$1), _l(s$2, o$1), r$2 -= 64, Bl(e$2, 0, s$2, 0)) {
			for (i$2 = 0; i$2 < r$2; i$2++) t$2[i$2] = 0;
			return -1;
		}
		for (i$2 = 0; i$2 < r$2; i$2++) t$2[i$2] = e$2[i$2 + 64];
		return r$2;
	}(s$1, i$1, i$1.length, r$1) >= 0;
}, fl.sign.keyPair = function() {
	var t$1 = new Uint8Array(32), e$1 = new Uint8Array(64);
	return ql(t$1, e$1), {
		publicKey: t$1,
		secretKey: e$1
	};
}, fl.sign.keyPair.fromSecretKey = function(t$1) {
	if ($l(t$1), 64 !== t$1.length) throw Error("bad secret key size");
	for (var e$1 = new Uint8Array(32), r$1 = 0; r$1 < e$1.length; r$1++) e$1[r$1] = t$1[32 + r$1];
	return {
		publicKey: e$1,
		secretKey: new Uint8Array(t$1)
	};
}, fl.sign.keyPair.fromSeed = function(t$1) {
	if ($l(t$1), 32 !== t$1.length) throw Error("bad seed size");
	for (var e$1 = new Uint8Array(32), r$1 = new Uint8Array(64), n$1 = 0; n$1 < 32; n$1++) r$1[n$1] = t$1[n$1];
	return ql(e$1, r$1, !0), {
		publicKey: e$1,
		secretKey: r$1
	};
}, fl.setPRNG = function(t$1) {
	yl = t$1;
}, function() {
	if (hl && hl.getRandomValues) fl.setPRNG(function(t$1, e$1) {
		var r$1, n$1 = new Uint8Array(e$1);
		for (r$1 = 0; r$1 < e$1; r$1 += 65536) hl.getRandomValues(n$1.subarray(r$1, r$1 + Math.min(e$1 - r$1, 65536)));
		for (r$1 = 0; r$1 < e$1; r$1++) t$1[r$1] = n$1[r$1];
		!function(t$2) {
			for (var e$2 = 0; e$2 < t$2.length; e$2++) t$2[e$2] = 0;
		}(n$1);
	});
}();
var ty = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	default: fl
});
function ey(t$1, e$1, r$1, n$1, i$1, s$1) {
	const a$1 = [
		16843776,
		0,
		65536,
		16843780,
		16842756,
		66564,
		4,
		65536,
		1024,
		16843776,
		16843780,
		1024,
		16778244,
		16842756,
		16777216,
		4,
		1028,
		16778240,
		16778240,
		66560,
		66560,
		16842752,
		16842752,
		16778244,
		65540,
		16777220,
		16777220,
		65540,
		0,
		1028,
		66564,
		16777216,
		65536,
		16843780,
		4,
		16842752,
		16843776,
		16777216,
		16777216,
		1024,
		16842756,
		65536,
		66560,
		16777220,
		1024,
		4,
		16778244,
		66564,
		16843780,
		65540,
		16842752,
		16778244,
		16777220,
		1028,
		66564,
		16843776,
		1028,
		16778240,
		16778240,
		0,
		65540,
		66560,
		0,
		16842756
	], o$1 = [
		-2146402272,
		-2147450880,
		32768,
		1081376,
		1048576,
		32,
		-2146435040,
		-2147450848,
		-2147483616,
		-2146402272,
		-2146402304,
		-2147483648,
		-2147450880,
		1048576,
		32,
		-2146435040,
		1081344,
		1048608,
		-2147450848,
		0,
		-2147483648,
		32768,
		1081376,
		-2146435072,
		1048608,
		-2147483616,
		0,
		1081344,
		32800,
		-2146402304,
		-2146435072,
		32800,
		0,
		1081376,
		-2146435040,
		1048576,
		-2147450848,
		-2146435072,
		-2146402304,
		32768,
		-2146435072,
		-2147450880,
		32,
		-2146402272,
		1081376,
		32,
		32768,
		-2147483648,
		32800,
		-2146402304,
		1048576,
		-2147483616,
		1048608,
		-2147450848,
		-2147483616,
		1048608,
		1081344,
		0,
		-2147450880,
		32800,
		-2147483648,
		-2146435040,
		-2146402272,
		1081344
	], c$1 = [
		520,
		134349312,
		0,
		134348808,
		134218240,
		0,
		131592,
		134218240,
		131080,
		134217736,
		134217736,
		131072,
		134349320,
		131080,
		134348800,
		520,
		134217728,
		8,
		134349312,
		512,
		131584,
		134348800,
		134348808,
		131592,
		134218248,
		131584,
		131072,
		134218248,
		8,
		134349320,
		512,
		134217728,
		134349312,
		134217728,
		131080,
		520,
		131072,
		134349312,
		134218240,
		0,
		512,
		131080,
		134349320,
		134218240,
		134217736,
		512,
		0,
		134348808,
		134218248,
		131072,
		134217728,
		134349320,
		8,
		131592,
		131584,
		134217736,
		134348800,
		134218248,
		520,
		134348800,
		131592,
		8,
		134348808,
		131584
	], u$1 = [
		8396801,
		8321,
		8321,
		128,
		8396928,
		8388737,
		8388609,
		8193,
		0,
		8396800,
		8396800,
		8396929,
		129,
		0,
		8388736,
		8388609,
		1,
		8192,
		8388608,
		8396801,
		128,
		8388608,
		8193,
		8320,
		8388737,
		1,
		8320,
		8388736,
		8192,
		8396928,
		8396929,
		129,
		8388736,
		8388609,
		8396800,
		8396929,
		129,
		0,
		0,
		8396800,
		8320,
		8388736,
		8388737,
		1,
		8396801,
		8321,
		8321,
		128,
		8396929,
		129,
		1,
		8192,
		8388609,
		8193,
		8396928,
		8388737,
		8193,
		8320,
		8388608,
		8396801,
		128,
		8388608,
		8192,
		8396928
	], h$1 = [
		256,
		34078976,
		34078720,
		1107296512,
		524288,
		256,
		1073741824,
		34078720,
		1074266368,
		524288,
		33554688,
		1074266368,
		1107296512,
		1107820544,
		524544,
		1073741824,
		33554432,
		1074266112,
		1074266112,
		0,
		1073742080,
		1107820800,
		1107820800,
		33554688,
		1107820544,
		1073742080,
		0,
		1107296256,
		34078976,
		33554432,
		1107296256,
		524544,
		524288,
		1107296512,
		256,
		33554432,
		1073741824,
		34078720,
		1107296512,
		1074266368,
		33554688,
		1073741824,
		1107820544,
		34078976,
		1074266368,
		256,
		33554432,
		1107820544,
		1107820800,
		524544,
		1107296256,
		1107820800,
		34078720,
		0,
		1074266112,
		1107296256,
		524544,
		33554688,
		1073742080,
		524288,
		0,
		1074266112,
		34078976,
		1073742080
	], f$1 = [
		536870928,
		541065216,
		16384,
		541081616,
		541065216,
		16,
		541081616,
		4194304,
		536887296,
		4210704,
		4194304,
		536870928,
		4194320,
		536887296,
		536870912,
		16400,
		0,
		4194320,
		536887312,
		16384,
		4210688,
		536887312,
		16,
		541065232,
		541065232,
		0,
		4210704,
		541081600,
		16400,
		4210688,
		541081600,
		536870912,
		536887296,
		16,
		541065232,
		4210688,
		541081616,
		4194304,
		16400,
		536870928,
		4194304,
		536887296,
		536870912,
		16400,
		536870928,
		541081616,
		4210688,
		541065216,
		4210704,
		541081600,
		0,
		541065232,
		16,
		16384,
		541065216,
		4210704,
		16384,
		4194320,
		536887312,
		0,
		541081600,
		536870912,
		4194320,
		536887312
	], l$1 = [
		2097152,
		69206018,
		67110914,
		0,
		2048,
		67110914,
		2099202,
		69208064,
		69208066,
		2097152,
		0,
		67108866,
		2,
		67108864,
		69206018,
		2050,
		67110912,
		2099202,
		2097154,
		67110912,
		67108866,
		69206016,
		69208064,
		2097154,
		69206016,
		2048,
		2050,
		69208066,
		2099200,
		2,
		67108864,
		2099200,
		67108864,
		2099200,
		2097152,
		67110914,
		67110914,
		69206018,
		69206018,
		2,
		2097154,
		67108864,
		67110912,
		2097152,
		69208064,
		2050,
		2099202,
		69208064,
		2050,
		67108866,
		69208066,
		69206016,
		2099200,
		0,
		2,
		69208066,
		0,
		2099202,
		69206016,
		2048,
		67108866,
		67110912,
		2048,
		2097154
	], y$1 = [
		268439616,
		4096,
		262144,
		268701760,
		268435456,
		268439616,
		64,
		268435456,
		262208,
		268697600,
		268701760,
		266240,
		268701696,
		266304,
		4096,
		64,
		268697600,
		268435520,
		268439552,
		4160,
		266240,
		262208,
		268697664,
		268701696,
		4160,
		0,
		0,
		268697664,
		268435520,
		268439552,
		266304,
		262144,
		266304,
		262144,
		268701696,
		4096,
		64,
		268697664,
		4096,
		266304,
		268439552,
		64,
		268435520,
		268697600,
		268697664,
		268435456,
		262144,
		268439616,
		0,
		268701760,
		262208,
		268435520,
		268697600,
		268439552,
		268439616,
		0,
		268701760,
		266240,
		266240,
		4160,
		4160,
		262208,
		268435456,
		268701696
	];
	let g$1, p$1, d$1, A$1, w$1, m$1, b$1, k$1, E$1, v$1, B$1 = 0, I$1 = e$1.length;
	const S$1 = 32 === t$1.length ? 3 : 9;
	k$1 = 3 === S$1 ? r$1 ? [
		0,
		32,
		2
	] : [
		30,
		-2,
		-2
	] : r$1 ? [
		0,
		32,
		2,
		62,
		30,
		-2,
		64,
		96,
		2
	] : [
		94,
		62,
		-2,
		32,
		64,
		2,
		30,
		-2,
		-2
	], r$1 && (e$1 = function(t$2) {
		const e$2 = 8 - t$2.length % 8;
		let r$2;
		if (!(e$2 < 8)) {
			if (8 === e$2) return t$2;
			throw Error("des: invalid padding");
		}
		r$2 = 0;
		const n$2 = new Uint8Array(t$2.length + e$2);
		for (let e$3 = 0; e$3 < t$2.length; e$3++) n$2[e$3] = t$2[e$3];
		for (let i$2 = 0; i$2 < e$2; i$2++) n$2[t$2.length + i$2] = r$2;
		return n$2;
	}(e$1), I$1 = e$1.length);
	let K$1 = new Uint8Array(I$1), C$1 = 0;
	for (; B$1 < I$1;) {
		for (m$1 = e$1[B$1++] << 24 | e$1[B$1++] << 16 | e$1[B$1++] << 8 | e$1[B$1++], b$1 = e$1[B$1++] << 24 | e$1[B$1++] << 16 | e$1[B$1++] << 8 | e$1[B$1++], d$1 = 252645135 & (m$1 >>> 4 ^ b$1), b$1 ^= d$1, m$1 ^= d$1 << 4, d$1 = 65535 & (m$1 >>> 16 ^ b$1), b$1 ^= d$1, m$1 ^= d$1 << 16, d$1 = 858993459 & (b$1 >>> 2 ^ m$1), m$1 ^= d$1, b$1 ^= d$1 << 2, d$1 = 16711935 & (b$1 >>> 8 ^ m$1), m$1 ^= d$1, b$1 ^= d$1 << 8, d$1 = 1431655765 & (m$1 >>> 1 ^ b$1), b$1 ^= d$1, m$1 ^= d$1 << 1, m$1 = m$1 << 1 | m$1 >>> 31, b$1 = b$1 << 1 | b$1 >>> 31, p$1 = 0; p$1 < S$1; p$1 += 3) {
			for (E$1 = k$1[p$1 + 1], v$1 = k$1[p$1 + 2], g$1 = k$1[p$1]; g$1 !== E$1; g$1 += v$1) A$1 = b$1 ^ t$1[g$1], w$1 = (b$1 >>> 4 | b$1 << 28) ^ t$1[g$1 + 1], d$1 = m$1, m$1 = b$1, b$1 = d$1 ^ (o$1[A$1 >>> 24 & 63] | u$1[A$1 >>> 16 & 63] | f$1[A$1 >>> 8 & 63] | y$1[63 & A$1] | a$1[w$1 >>> 24 & 63] | c$1[w$1 >>> 16 & 63] | h$1[w$1 >>> 8 & 63] | l$1[63 & w$1]);
			d$1 = m$1, m$1 = b$1, b$1 = d$1;
		}
		m$1 = m$1 >>> 1 | m$1 << 31, b$1 = b$1 >>> 1 | b$1 << 31, d$1 = 1431655765 & (m$1 >>> 1 ^ b$1), b$1 ^= d$1, m$1 ^= d$1 << 1, d$1 = 16711935 & (b$1 >>> 8 ^ m$1), m$1 ^= d$1, b$1 ^= d$1 << 8, d$1 = 858993459 & (b$1 >>> 2 ^ m$1), m$1 ^= d$1, b$1 ^= d$1 << 2, d$1 = 65535 & (m$1 >>> 16 ^ b$1), b$1 ^= d$1, m$1 ^= d$1 << 16, d$1 = 252645135 & (m$1 >>> 4 ^ b$1), b$1 ^= d$1, m$1 ^= d$1 << 4, K$1[C$1++] = m$1 >>> 24, K$1[C$1++] = m$1 >>> 16 & 255, K$1[C$1++] = m$1 >>> 8 & 255, K$1[C$1++] = 255 & m$1, K$1[C$1++] = b$1 >>> 24, K$1[C$1++] = b$1 >>> 16 & 255, K$1[C$1++] = b$1 >>> 8 & 255, K$1[C$1++] = 255 & b$1;
	}
	return r$1 || (K$1 = function(t$2) {
		let e$2, r$2 = null;
		if (e$2 = 0, !r$2) {
			for (r$2 = 1; t$2[t$2.length - r$2] === e$2;) r$2++;
			r$2--;
		}
		return t$2.subarray(0, t$2.length - r$2);
	}(K$1)), K$1;
}
function ry(t$1) {
	const e$1 = [
		0,
		4,
		536870912,
		536870916,
		65536,
		65540,
		536936448,
		536936452,
		512,
		516,
		536871424,
		536871428,
		66048,
		66052,
		536936960,
		536936964
	], r$1 = [
		0,
		1,
		1048576,
		1048577,
		67108864,
		67108865,
		68157440,
		68157441,
		256,
		257,
		1048832,
		1048833,
		67109120,
		67109121,
		68157696,
		68157697
	], n$1 = [
		0,
		8,
		2048,
		2056,
		16777216,
		16777224,
		16779264,
		16779272,
		0,
		8,
		2048,
		2056,
		16777216,
		16777224,
		16779264,
		16779272
	], i$1 = [
		0,
		2097152,
		134217728,
		136314880,
		8192,
		2105344,
		134225920,
		136323072,
		131072,
		2228224,
		134348800,
		136445952,
		139264,
		2236416,
		134356992,
		136454144
	], s$1 = [
		0,
		262144,
		16,
		262160,
		0,
		262144,
		16,
		262160,
		4096,
		266240,
		4112,
		266256,
		4096,
		266240,
		4112,
		266256
	], a$1 = [
		0,
		1024,
		32,
		1056,
		0,
		1024,
		32,
		1056,
		33554432,
		33555456,
		33554464,
		33555488,
		33554432,
		33555456,
		33554464,
		33555488
	], o$1 = [
		0,
		268435456,
		524288,
		268959744,
		2,
		268435458,
		524290,
		268959746,
		0,
		268435456,
		524288,
		268959744,
		2,
		268435458,
		524290,
		268959746
	], c$1 = [
		0,
		65536,
		2048,
		67584,
		536870912,
		536936448,
		536872960,
		536938496,
		131072,
		196608,
		133120,
		198656,
		537001984,
		537067520,
		537004032,
		537069568
	], u$1 = [
		0,
		262144,
		0,
		262144,
		2,
		262146,
		2,
		262146,
		33554432,
		33816576,
		33554432,
		33816576,
		33554434,
		33816578,
		33554434,
		33816578
	], h$1 = [
		0,
		268435456,
		8,
		268435464,
		0,
		268435456,
		8,
		268435464,
		1024,
		268436480,
		1032,
		268436488,
		1024,
		268436480,
		1032,
		268436488
	], f$1 = [
		0,
		32,
		0,
		32,
		1048576,
		1048608,
		1048576,
		1048608,
		8192,
		8224,
		8192,
		8224,
		1056768,
		1056800,
		1056768,
		1056800
	], l$1 = [
		0,
		16777216,
		512,
		16777728,
		2097152,
		18874368,
		2097664,
		18874880,
		67108864,
		83886080,
		67109376,
		83886592,
		69206016,
		85983232,
		69206528,
		85983744
	], y$1 = [
		0,
		4096,
		134217728,
		134221824,
		524288,
		528384,
		134742016,
		134746112,
		16,
		4112,
		134217744,
		134221840,
		524304,
		528400,
		134742032,
		134746128
	], g$1 = [
		0,
		4,
		256,
		260,
		0,
		4,
		256,
		260,
		1,
		5,
		257,
		261,
		1,
		5,
		257,
		261
	], p$1 = t$1.length > 8 ? 3 : 1, d$1 = Array(32 * p$1), A$1 = [
		0,
		0,
		1,
		1,
		1,
		1,
		1,
		1,
		0,
		1,
		1,
		1,
		1,
		1,
		1,
		0
	];
	let w$1, m$1, b$1, k$1 = 0, E$1 = 0;
	for (let v$1 = 0; v$1 < p$1; v$1++) {
		let p$2 = t$1[k$1++] << 24 | t$1[k$1++] << 16 | t$1[k$1++] << 8 | t$1[k$1++], v$2 = t$1[k$1++] << 24 | t$1[k$1++] << 16 | t$1[k$1++] << 8 | t$1[k$1++];
		b$1 = 252645135 & (p$2 >>> 4 ^ v$2), v$2 ^= b$1, p$2 ^= b$1 << 4, b$1 = 65535 & (v$2 >>> -16 ^ p$2), p$2 ^= b$1, v$2 ^= b$1 << -16, b$1 = 858993459 & (p$2 >>> 2 ^ v$2), v$2 ^= b$1, p$2 ^= b$1 << 2, b$1 = 65535 & (v$2 >>> -16 ^ p$2), p$2 ^= b$1, v$2 ^= b$1 << -16, b$1 = 1431655765 & (p$2 >>> 1 ^ v$2), v$2 ^= b$1, p$2 ^= b$1 << 1, b$1 = 16711935 & (v$2 >>> 8 ^ p$2), p$2 ^= b$1, v$2 ^= b$1 << 8, b$1 = 1431655765 & (p$2 >>> 1 ^ v$2), v$2 ^= b$1, p$2 ^= b$1 << 1, b$1 = p$2 << 8 | v$2 >>> 20 & 240, p$2 = v$2 << 24 | v$2 << 8 & 16711680 | v$2 >>> 8 & 65280 | v$2 >>> 24 & 240, v$2 = b$1;
		for (let t$2 = 0; t$2 < 16; t$2++) A$1[t$2] ? (p$2 = p$2 << 2 | p$2 >>> 26, v$2 = v$2 << 2 | v$2 >>> 26) : (p$2 = p$2 << 1 | p$2 >>> 27, v$2 = v$2 << 1 | v$2 >>> 27), p$2 &= -15, v$2 &= -15, w$1 = e$1[p$2 >>> 28] | r$1[p$2 >>> 24 & 15] | n$1[p$2 >>> 20 & 15] | i$1[p$2 >>> 16 & 15] | s$1[p$2 >>> 12 & 15] | a$1[p$2 >>> 8 & 15] | o$1[p$2 >>> 4 & 15], m$1 = c$1[v$2 >>> 28] | u$1[v$2 >>> 24 & 15] | h$1[v$2 >>> 20 & 15] | f$1[v$2 >>> 16 & 15] | l$1[v$2 >>> 12 & 15] | y$1[v$2 >>> 8 & 15] | g$1[v$2 >>> 4 & 15], b$1 = 65535 & (m$1 >>> 16 ^ w$1), d$1[E$1++] = w$1 ^ b$1, d$1[E$1++] = m$1 ^ b$1 << 16;
	}
	return d$1;
}
function ny(t$1) {
	this.key = [];
	for (let e$1 = 0; e$1 < 3; e$1++) this.key.push(new Uint8Array(t$1.subarray(8 * e$1, 8 * e$1 + 8)));
	this.encrypt = function(t$2) {
		return ey(ry(this.key[2]), ey(ry(this.key[1]), ey(ry(this.key[0]), t$2, !0), !1), !0);
	};
}
function iy() {
	this.BlockSize = 8, this.KeySize = 16, this.setKey = function(t$2) {
		if (this.masking = Array(16), this.rotate = Array(16), this.reset(), t$2.length !== this.KeySize) throw Error("CAST-128: keys must be 16 bytes");
		return this.keySchedule(t$2), !0;
	}, this.reset = function() {
		for (let t$2 = 0; t$2 < 16; t$2++) this.masking[t$2] = 0, this.rotate[t$2] = 0;
	}, this.getBlockSize = function() {
		return this.BlockSize;
	}, this.encrypt = function(t$2) {
		const e$2 = Array(t$2.length);
		for (let s$2 = 0; s$2 < t$2.length; s$2 += 8) {
			let a$1, o$1 = t$2[s$2] << 24 | t$2[s$2 + 1] << 16 | t$2[s$2 + 2] << 8 | t$2[s$2 + 3], c$1 = t$2[s$2 + 4] << 24 | t$2[s$2 + 5] << 16 | t$2[s$2 + 6] << 8 | t$2[s$2 + 7];
			a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[0], this.rotate[0]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[1], this.rotate[1]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[2], this.rotate[2]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[3], this.rotate[3]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[4], this.rotate[4]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[5], this.rotate[5]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[6], this.rotate[6]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[7], this.rotate[7]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[8], this.rotate[8]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[9], this.rotate[9]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[10], this.rotate[10]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[11], this.rotate[11]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[12], this.rotate[12]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[13], this.rotate[13]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[14], this.rotate[14]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[15], this.rotate[15]), o$1 = a$1, e$2[s$2] = c$1 >>> 24 & 255, e$2[s$2 + 1] = c$1 >>> 16 & 255, e$2[s$2 + 2] = c$1 >>> 8 & 255, e$2[s$2 + 3] = 255 & c$1, e$2[s$2 + 4] = o$1 >>> 24 & 255, e$2[s$2 + 5] = o$1 >>> 16 & 255, e$2[s$2 + 6] = o$1 >>> 8 & 255, e$2[s$2 + 7] = 255 & o$1;
		}
		return e$2;
	}, this.decrypt = function(t$2) {
		const e$2 = Array(t$2.length);
		for (let s$2 = 0; s$2 < t$2.length; s$2 += 8) {
			let a$1, o$1 = t$2[s$2] << 24 | t$2[s$2 + 1] << 16 | t$2[s$2 + 2] << 8 | t$2[s$2 + 3], c$1 = t$2[s$2 + 4] << 24 | t$2[s$2 + 5] << 16 | t$2[s$2 + 6] << 8 | t$2[s$2 + 7];
			a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[15], this.rotate[15]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[14], this.rotate[14]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[13], this.rotate[13]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[12], this.rotate[12]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[11], this.rotate[11]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[10], this.rotate[10]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[9], this.rotate[9]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[8], this.rotate[8]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[7], this.rotate[7]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[6], this.rotate[6]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[5], this.rotate[5]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[4], this.rotate[4]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[3], this.rotate[3]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ i$1(c$1, this.masking[2], this.rotate[2]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ n$1(c$1, this.masking[1], this.rotate[1]), o$1 = a$1, a$1 = c$1, c$1 = o$1 ^ r$1(c$1, this.masking[0], this.rotate[0]), o$1 = a$1, e$2[s$2] = c$1 >>> 24 & 255, e$2[s$2 + 1] = c$1 >>> 16 & 255, e$2[s$2 + 2] = c$1 >>> 8 & 255, e$2[s$2 + 3] = 255 & c$1, e$2[s$2 + 4] = o$1 >>> 24 & 255, e$2[s$2 + 5] = o$1 >> 16 & 255, e$2[s$2 + 6] = o$1 >> 8 & 255, e$2[s$2 + 7] = 255 & o$1;
		}
		return e$2;
	};
	const t$1 = [
		,
		,
		,
		,
	];
	t$1[0] = [
		,
		,
		,
		,
	], t$1[0][0] = [
		4,
		0,
		13,
		15,
		12,
		14,
		8
	], t$1[0][1] = [
		5,
		2,
		16,
		18,
		17,
		19,
		10
	], t$1[0][2] = [
		6,
		3,
		23,
		22,
		21,
		20,
		9
	], t$1[0][3] = [
		7,
		1,
		26,
		25,
		27,
		24,
		11
	], t$1[1] = [
		,
		,
		,
		,
	], t$1[1][0] = [
		0,
		6,
		21,
		23,
		20,
		22,
		16
	], t$1[1][1] = [
		1,
		4,
		0,
		2,
		1,
		3,
		18
	], t$1[1][2] = [
		2,
		5,
		7,
		6,
		5,
		4,
		17
	], t$1[1][3] = [
		3,
		7,
		10,
		9,
		11,
		8,
		19
	], t$1[2] = [
		,
		,
		,
		,
	], t$1[2][0] = [
		4,
		0,
		13,
		15,
		12,
		14,
		8
	], t$1[2][1] = [
		5,
		2,
		16,
		18,
		17,
		19,
		10
	], t$1[2][2] = [
		6,
		3,
		23,
		22,
		21,
		20,
		9
	], t$1[2][3] = [
		7,
		1,
		26,
		25,
		27,
		24,
		11
	], t$1[3] = [
		,
		,
		,
		,
	], t$1[3][0] = [
		0,
		6,
		21,
		23,
		20,
		22,
		16
	], t$1[3][1] = [
		1,
		4,
		0,
		2,
		1,
		3,
		18
	], t$1[3][2] = [
		2,
		5,
		7,
		6,
		5,
		4,
		17
	], t$1[3][3] = [
		3,
		7,
		10,
		9,
		11,
		8,
		19
	];
	const e$1 = [
		,
		,
		,
		,
	];
	function r$1(t$2, e$2, r$2) {
		const n$2 = e$2 + t$2, i$2 = n$2 << r$2 | n$2 >>> 32 - r$2;
		return (s$1[0][i$2 >>> 24] ^ s$1[1][i$2 >>> 16 & 255]) - s$1[2][i$2 >>> 8 & 255] + s$1[3][255 & i$2];
	}
	function n$1(t$2, e$2, r$2) {
		const n$2 = e$2 ^ t$2, i$2 = n$2 << r$2 | n$2 >>> 32 - r$2;
		return s$1[0][i$2 >>> 24] - s$1[1][i$2 >>> 16 & 255] + s$1[2][i$2 >>> 8 & 255] ^ s$1[3][255 & i$2];
	}
	function i$1(t$2, e$2, r$2) {
		const n$2 = e$2 - t$2, i$2 = n$2 << r$2 | n$2 >>> 32 - r$2;
		return (s$1[0][i$2 >>> 24] + s$1[1][i$2 >>> 16 & 255] ^ s$1[2][i$2 >>> 8 & 255]) - s$1[3][255 & i$2];
	}
	e$1[0] = [
		,
		,
		,
		,
	], e$1[0][0] = [
		24,
		25,
		23,
		22,
		18
	], e$1[0][1] = [
		26,
		27,
		21,
		20,
		22
	], e$1[0][2] = [
		28,
		29,
		19,
		18,
		25
	], e$1[0][3] = [
		30,
		31,
		17,
		16,
		28
	], e$1[1] = [
		,
		,
		,
		,
	], e$1[1][0] = [
		3,
		2,
		12,
		13,
		8
	], e$1[1][1] = [
		1,
		0,
		14,
		15,
		13
	], e$1[1][2] = [
		7,
		6,
		8,
		9,
		3
	], e$1[1][3] = [
		5,
		4,
		10,
		11,
		7
	], e$1[2] = [
		,
		,
		,
		,
	], e$1[2][0] = [
		19,
		18,
		28,
		29,
		25
	], e$1[2][1] = [
		17,
		16,
		30,
		31,
		28
	], e$1[2][2] = [
		23,
		22,
		24,
		25,
		18
	], e$1[2][3] = [
		21,
		20,
		26,
		27,
		22
	], e$1[3] = [
		,
		,
		,
		,
	], e$1[3][0] = [
		8,
		9,
		7,
		6,
		3
	], e$1[3][1] = [
		10,
		11,
		5,
		4,
		7
	], e$1[3][2] = [
		12,
		13,
		3,
		2,
		8
	], e$1[3][3] = [
		14,
		15,
		1,
		0,
		13
	], this.keySchedule = function(r$2) {
		const n$2 = [
			,
			,
			,
			,
			,
			,
			,
			,
		], i$2 = Array(32);
		let a$1;
		for (let t$2 = 0; t$2 < 4; t$2++) a$1 = 4 * t$2, n$2[t$2] = r$2[a$1] << 24 | r$2[a$1 + 1] << 16 | r$2[a$1 + 2] << 8 | r$2[a$1 + 3];
		const o$1 = [
			6,
			7,
			4,
			5
		];
		let c$1, u$1 = 0;
		for (let r$3 = 0; r$3 < 2; r$3++) for (let r$4 = 0; r$4 < 4; r$4++) {
			for (a$1 = 0; a$1 < 4; a$1++) {
				const e$2 = t$1[r$4][a$1];
				c$1 = n$2[e$2[1]], c$1 ^= s$1[4][n$2[e$2[2] >>> 2] >>> 24 - 8 * (3 & e$2[2]) & 255], c$1 ^= s$1[5][n$2[e$2[3] >>> 2] >>> 24 - 8 * (3 & e$2[3]) & 255], c$1 ^= s$1[6][n$2[e$2[4] >>> 2] >>> 24 - 8 * (3 & e$2[4]) & 255], c$1 ^= s$1[7][n$2[e$2[5] >>> 2] >>> 24 - 8 * (3 & e$2[5]) & 255], c$1 ^= s$1[o$1[a$1]][n$2[e$2[6] >>> 2] >>> 24 - 8 * (3 & e$2[6]) & 255], n$2[e$2[0]] = c$1;
			}
			for (a$1 = 0; a$1 < 4; a$1++) {
				const t$2 = e$1[r$4][a$1];
				c$1 = s$1[4][n$2[t$2[0] >>> 2] >>> 24 - 8 * (3 & t$2[0]) & 255], c$1 ^= s$1[5][n$2[t$2[1] >>> 2] >>> 24 - 8 * (3 & t$2[1]) & 255], c$1 ^= s$1[6][n$2[t$2[2] >>> 2] >>> 24 - 8 * (3 & t$2[2]) & 255], c$1 ^= s$1[7][n$2[t$2[3] >>> 2] >>> 24 - 8 * (3 & t$2[3]) & 255], c$1 ^= s$1[4 + a$1][n$2[t$2[4] >>> 2] >>> 24 - 8 * (3 & t$2[4]) & 255], i$2[u$1] = c$1, u$1++;
			}
		}
		for (let t$2 = 0; t$2 < 16; t$2++) this.masking[t$2] = i$2[t$2], this.rotate[t$2] = 31 & i$2[16 + t$2];
	};
	const s$1 = [
		,
		,
		,
		,
		,
		,
		,
		,
	];
	s$1[0] = [
		821772500,
		2678128395,
		1810681135,
		1059425402,
		505495343,
		2617265619,
		1610868032,
		3483355465,
		3218386727,
		2294005173,
		3791863952,
		2563806837,
		1852023008,
		365126098,
		3269944861,
		584384398,
		677919599,
		3229601881,
		4280515016,
		2002735330,
		1136869587,
		3744433750,
		2289869850,
		2731719981,
		2714362070,
		879511577,
		1639411079,
		575934255,
		717107937,
		2857637483,
		576097850,
		2731753936,
		1725645e3,
		2810460463,
		5111599,
		767152862,
		2543075244,
		1251459544,
		1383482551,
		3052681127,
		3089939183,
		3612463449,
		1878520045,
		1510570527,
		2189125840,
		2431448366,
		582008916,
		3163445557,
		1265446783,
		1354458274,
		3529918736,
		3202711853,
		3073581712,
		3912963487,
		3029263377,
		1275016285,
		4249207360,
		2905708351,
		3304509486,
		1442611557,
		3585198765,
		2712415662,
		2731849581,
		3248163920,
		2283946226,
		208555832,
		2766454743,
		1331405426,
		1447828783,
		3315356441,
		3108627284,
		2957404670,
		2981538698,
		3339933917,
		1669711173,
		286233437,
		1465092821,
		1782121619,
		3862771680,
		710211251,
		980974943,
		1651941557,
		430374111,
		2051154026,
		704238805,
		4128970897,
		3144820574,
		2857402727,
		948965521,
		3333752299,
		2227686284,
		718756367,
		2269778983,
		2731643755,
		718440111,
		2857816721,
		3616097120,
		1113355533,
		2478022182,
		410092745,
		1811985197,
		1944238868,
		2696854588,
		1415722873,
		1682284203,
		1060277122,
		1998114690,
		1503841958,
		82706478,
		2315155686,
		1068173648,
		845149890,
		2167947013,
		1768146376,
		1993038550,
		3566826697,
		3390574031,
		940016341,
		3355073782,
		2328040721,
		904371731,
		1205506512,
		4094660742,
		2816623006,
		825647681,
		85914773,
		2857843460,
		1249926541,
		1417871568,
		3287612,
		3211054559,
		3126306446,
		1975924523,
		1353700161,
		2814456437,
		2438597621,
		1800716203,
		722146342,
		2873936343,
		1151126914,
		4160483941,
		2877670899,
		458611604,
		2866078500,
		3483680063,
		770352098,
		2652916994,
		3367839148,
		3940505011,
		3585973912,
		3809620402,
		718646636,
		2504206814,
		2914927912,
		3631288169,
		2857486607,
		2860018678,
		575749918,
		2857478043,
		718488780,
		2069512688,
		3548183469,
		453416197,
		1106044049,
		3032691430,
		52586708,
		3378514636,
		3459808877,
		3211506028,
		1785789304,
		218356169,
		3571399134,
		3759170522,
		1194783844,
		1523787992,
		3007827094,
		1975193539,
		2555452411,
		1341901877,
		3045838698,
		3776907964,
		3217423946,
		2802510864,
		2889438986,
		1057244207,
		1636348243,
		3761863214,
		1462225785,
		2632663439,
		481089165,
		718503062,
		24497053,
		3332243209,
		3344655856,
		3655024856,
		3960371065,
		1195698900,
		2971415156,
		3710176158,
		2115785917,
		4027663609,
		3525578417,
		2524296189,
		2745972565,
		3564906415,
		1372086093,
		1452307862,
		2780501478,
		1476592880,
		3389271281,
		18495466,
		2378148571,
		901398090,
		891748256,
		3279637769,
		3157290713,
		2560960102,
		1447622437,
		4284372637,
		216884176,
		2086908623,
		1879786977,
		3588903153,
		2242455666,
		2938092967,
		3559082096,
		2810645491,
		758861177,
		1121993112,
		215018983,
		642190776,
		4169236812,
		1196255959,
		2081185372,
		3508738393,
		941322904,
		4124243163,
		2877523539,
		1848581667,
		2205260958,
		3180453958,
		2589345134,
		3694731276,
		550028657,
		2519456284,
		3789985535,
		2973870856,
		2093648313,
		443148163,
		46942275,
		2734146937,
		1117713533,
		1115362972,
		1523183689,
		3717140224,
		1551984063
	], s$1[1] = [
		522195092,
		4010518363,
		1776537470,
		960447360,
		4267822970,
		4005896314,
		1435016340,
		1929119313,
		2913464185,
		1310552629,
		3579470798,
		3724818106,
		2579771631,
		1594623892,
		417127293,
		2715217907,
		2696228731,
		1508390405,
		3994398868,
		3925858569,
		3695444102,
		4019471449,
		3129199795,
		3770928635,
		3520741761,
		990456497,
		4187484609,
		2783367035,
		21106139,
		3840405339,
		631373633,
		3783325702,
		532942976,
		396095098,
		3548038825,
		4267192484,
		2564721535,
		2011709262,
		2039648873,
		620404603,
		3776170075,
		2898526339,
		3612357925,
		4159332703,
		1645490516,
		223693667,
		1567101217,
		3362177881,
		1029951347,
		3470931136,
		3570957959,
		1550265121,
		119497089,
		972513919,
		907948164,
		3840628539,
		1613718692,
		3594177948,
		465323573,
		2659255085,
		654439692,
		2575596212,
		2699288441,
		3127702412,
		277098644,
		624404830,
		4100943870,
		2717858591,
		546110314,
		2403699828,
		3655377447,
		1321679412,
		4236791657,
		1045293279,
		4010672264,
		895050893,
		2319792268,
		494945126,
		1914543101,
		2777056443,
		3894764339,
		2219737618,
		311263384,
		4275257268,
		3458730721,
		669096869,
		3584475730,
		3835122877,
		3319158237,
		3949359204,
		2005142349,
		2713102337,
		2228954793,
		3769984788,
		569394103,
		3855636576,
		1425027204,
		108000370,
		2736431443,
		3671869269,
		3043122623,
		1750473702,
		2211081108,
		762237499,
		3972989403,
		2798899386,
		3061857628,
		2943854345,
		867476300,
		964413654,
		1591880597,
		1594774276,
		2179821409,
		552026980,
		3026064248,
		3726140315,
		2283577634,
		3110545105,
		2152310760,
		582474363,
		1582640421,
		1383256631,
		2043843868,
		3322775884,
		1217180674,
		463797851,
		2763038571,
		480777679,
		2718707717,
		2289164131,
		3118346187,
		214354409,
		200212307,
		3810608407,
		3025414197,
		2674075964,
		3997296425,
		1847405948,
		1342460550,
		510035443,
		4080271814,
		815934613,
		833030224,
		1620250387,
		1945732119,
		2703661145,
		3966000196,
		1388869545,
		3456054182,
		2687178561,
		2092620194,
		562037615,
		1356438536,
		3409922145,
		3261847397,
		1688467115,
		2150901366,
		631725691,
		3840332284,
		549916902,
		3455104640,
		394546491,
		837744717,
		2114462948,
		751520235,
		2221554606,
		2415360136,
		3999097078,
		2063029875,
		803036379,
		2702586305,
		821456707,
		3019566164,
		360699898,
		4018502092,
		3511869016,
		3677355358,
		2402471449,
		812317050,
		49299192,
		2570164949,
		3259169295,
		2816732080,
		3331213574,
		3101303564,
		2156015656,
		3705598920,
		3546263921,
		143268808,
		3200304480,
		1638124008,
		3165189453,
		3341807610,
		578956953,
		2193977524,
		3638120073,
		2333881532,
		807278310,
		658237817,
		2969561766,
		1641658566,
		11683945,
		3086995007,
		148645947,
		1138423386,
		4158756760,
		1981396783,
		2401016740,
		3699783584,
		380097457,
		2680394679,
		2803068651,
		3334260286,
		441530178,
		4016580796,
		1375954390,
		761952171,
		891809099,
		2183123478,
		157052462,
		3683840763,
		1592404427,
		341349109,
		2438483839,
		1417898363,
		644327628,
		2233032776,
		2353769706,
		2201510100,
		220455161,
		1815641738,
		182899273,
		2995019788,
		3627381533,
		3702638151,
		2890684138,
		1052606899,
		588164016,
		1681439879,
		4038439418,
		2405343923,
		4229449282,
		167996282,
		1336969661,
		1688053129,
		2739224926,
		1543734051,
		1046297529,
		1138201970,
		2121126012,
		115334942,
		1819067631,
		1902159161,
		1941945968,
		2206692869,
		1159982321
	], s$1[2] = [
		2381300288,
		637164959,
		3952098751,
		3893414151,
		1197506559,
		916448331,
		2350892612,
		2932787856,
		3199334847,
		4009478890,
		3905886544,
		1373570990,
		2450425862,
		4037870920,
		3778841987,
		2456817877,
		286293407,
		124026297,
		3001279700,
		1028597854,
		3115296800,
		4208886496,
		2691114635,
		2188540206,
		1430237888,
		1218109995,
		3572471700,
		308166588,
		570424558,
		2187009021,
		2455094765,
		307733056,
		1310360322,
		3135275007,
		1384269543,
		2388071438,
		863238079,
		2359263624,
		2801553128,
		3380786597,
		2831162807,
		1470087780,
		1728663345,
		4072488799,
		1090516929,
		532123132,
		2389430977,
		1132193179,
		2578464191,
		3051079243,
		1670234342,
		1434557849,
		2711078940,
		1241591150,
		3314043432,
		3435360113,
		3091448339,
		1812415473,
		2198440252,
		267246943,
		796911696,
		3619716990,
		38830015,
		1526438404,
		2806502096,
		374413614,
		2943401790,
		1489179520,
		1603809326,
		1920779204,
		168801282,
		260042626,
		2358705581,
		1563175598,
		2397674057,
		1356499128,
		2217211040,
		514611088,
		2037363785,
		2186468373,
		4022173083,
		2792511869,
		2913485016,
		1173701892,
		4200428547,
		3896427269,
		1334932762,
		2455136706,
		602925377,
		2835607854,
		1613172210,
		41346230,
		2499634548,
		2457437618,
		2188827595,
		41386358,
		4172255629,
		1313404830,
		2405527007,
		3801973774,
		2217704835,
		873260488,
		2528884354,
		2478092616,
		4012915883,
		2555359016,
		2006953883,
		2463913485,
		575479328,
		2218240648,
		2099895446,
		660001756,
		2341502190,
		3038761536,
		3888151779,
		3848713377,
		3286851934,
		1022894237,
		1620365795,
		3449594689,
		1551255054,
		15374395,
		3570825345,
		4249311020,
		4151111129,
		3181912732,
		310226346,
		1133119310,
		530038928,
		136043402,
		2476768958,
		3107506709,
		2544909567,
		1036173560,
		2367337196,
		1681395281,
		1758231547,
		3641649032,
		306774401,
		1575354324,
		3716085866,
		1990386196,
		3114533736,
		2455606671,
		1262092282,
		3124342505,
		2768229131,
		4210529083,
		1833535011,
		423410938,
		660763973,
		2187129978,
		1639812e3,
		3508421329,
		3467445492,
		310289298,
		272797111,
		2188552562,
		2456863912,
		310240523,
		677093832,
		1013118031,
		901835429,
		3892695601,
		1116285435,
		3036471170,
		1337354835,
		243122523,
		520626091,
		277223598,
		4244441197,
		4194248841,
		1766575121,
		594173102,
		316590669,
		742362309,
		3536858622,
		4176435350,
		3838792410,
		2501204839,
		1229605004,
		3115755532,
		1552908988,
		2312334149,
		979407927,
		3959474601,
		1148277331,
		176638793,
		3614686272,
		2083809052,
		40992502,
		1340822838,
		2731552767,
		3535757508,
		3560899520,
		1354035053,
		122129617,
		7215240,
		2732932949,
		3118912700,
		2718203926,
		2539075635,
		3609230695,
		3725561661,
		1928887091,
		2882293555,
		1988674909,
		2063640240,
		2491088897,
		1459647954,
		4189817080,
		2302804382,
		1113892351,
		2237858528,
		1927010603,
		4002880361,
		1856122846,
		1594404395,
		2944033133,
		3855189863,
		3474975698,
		1643104450,
		4054590833,
		3431086530,
		1730235576,
		2984608721,
		3084664418,
		2131803598,
		4178205752,
		267404349,
		1617849798,
		1616132681,
		1462223176,
		736725533,
		2327058232,
		551665188,
		2945899023,
		1749386277,
		2575514597,
		1611482493,
		674206544,
		2201269090,
		3642560800,
		728599968,
		1680547377,
		2620414464,
		1388111496,
		453204106,
		4156223445,
		1094905244,
		2754698257,
		2201108165,
		3757000246,
		2704524545,
		3922940700,
		3996465027
	], s$1[3] = [
		2645754912,
		532081118,
		2814278639,
		3530793624,
		1246723035,
		1689095255,
		2236679235,
		4194438865,
		2116582143,
		3859789411,
		157234593,
		2045505824,
		4245003587,
		1687664561,
		4083425123,
		605965023,
		672431967,
		1336064205,
		3376611392,
		214114848,
		4258466608,
		3232053071,
		489488601,
		605322005,
		3998028058,
		264917351,
		1912574028,
		756637694,
		436560991,
		202637054,
		135989450,
		85393697,
		2152923392,
		3896401662,
		2895836408,
		2145855233,
		3535335007,
		115294817,
		3147733898,
		1922296357,
		3464822751,
		4117858305,
		1037454084,
		2725193275,
		2127856640,
		1417604070,
		1148013728,
		1827919605,
		642362335,
		2929772533,
		909348033,
		1346338451,
		3547799649,
		297154785,
		1917849091,
		4161712827,
		2883604526,
		3968694238,
		1469521537,
		3780077382,
		3375584256,
		1763717519,
		136166297,
		4290970789,
		1295325189,
		2134727907,
		2798151366,
		1566297257,
		3672928234,
		2677174161,
		2672173615,
		965822077,
		2780786062,
		289653839,
		1133871874,
		3491843819,
		35685304,
		1068898316,
		418943774,
		672553190,
		642281022,
		2346158704,
		1954014401,
		3037126780,
		4079815205,
		2030668546,
		3840588673,
		672283427,
		1776201016,
		359975446,
		3750173538,
		555499703,
		2769985273,
		1324923,
		69110472,
		152125443,
		3176785106,
		3822147285,
		1340634837,
		798073664,
		1434183902,
		15393959,
		216384236,
		1303690150,
		3881221631,
		3711134124,
		3960975413,
		106373927,
		2578434224,
		1455997841,
		1801814300,
		1578393881,
		1854262133,
		3188178946,
		3258078583,
		2302670060,
		1539295533,
		3505142565,
		3078625975,
		2372746020,
		549938159,
		3278284284,
		2620926080,
		181285381,
		2865321098,
		3970029511,
		68876850,
		488006234,
		1728155692,
		2608167508,
		836007927,
		2435231793,
		919367643,
		3339422534,
		3655756360,
		1457871481,
		40520939,
		1380155135,
		797931188,
		234455205,
		2255801827,
		3990488299,
		397000196,
		739833055,
		3077865373,
		2871719860,
		4022553888,
		772369276,
		390177364,
		3853951029,
		557662966,
		740064294,
		1640166671,
		1699928825,
		3535942136,
		622006121,
		3625353122,
		68743880,
		1742502,
		219489963,
		1664179233,
		1577743084,
		1236991741,
		410585305,
		2366487942,
		823226535,
		1050371084,
		3426619607,
		3586839478,
		212779912,
		4147118561,
		1819446015,
		1911218849,
		530248558,
		3486241071,
		3252585495,
		2886188651,
		3410272728,
		2342195030,
		20547779,
		2982490058,
		3032363469,
		3631753222,
		312714466,
		1870521650,
		1493008054,
		3491686656,
		615382978,
		4103671749,
		2534517445,
		1932181,
		2196105170,
		278426614,
		6369430,
		3274544417,
		2913018367,
		697336853,
		2143000447,
		2946413531,
		701099306,
		1558357093,
		2805003052,
		3500818408,
		2321334417,
		3567135975,
		216290473,
		3591032198,
		23009561,
		1996984579,
		3735042806,
		2024298078,
		3739440863,
		569400510,
		2339758983,
		3016033873,
		3097871343,
		3639523026,
		3844324983,
		3256173865,
		795471839,
		2951117563,
		4101031090,
		4091603803,
		3603732598,
		971261452,
		534414648,
		428311343,
		3389027175,
		2844869880,
		694888862,
		1227866773,
		2456207019,
		3043454569,
		2614353370,
		3749578031,
		3676663836,
		459166190,
		4132644070,
		1794958188,
		51825668,
		2252611902,
		3084671440,
		2036672799,
		3436641603,
		1099053433,
		2469121526,
		3059204941,
		1323291266,
		2061838604,
		1018778475,
		2233344254,
		2553501054,
		334295216,
		3556750194,
		1065731521,
		183467730
	], s$1[4] = [
		2127105028,
		745436345,
		2601412319,
		2788391185,
		3093987327,
		500390133,
		1155374404,
		389092991,
		150729210,
		3891597772,
		3523549952,
		1935325696,
		716645080,
		946045387,
		2901812282,
		1774124410,
		3869435775,
		4039581901,
		3293136918,
		3438657920,
		948246080,
		363898952,
		3867875531,
		1286266623,
		1598556673,
		68334250,
		630723836,
		1104211938,
		1312863373,
		613332731,
		2377784574,
		1101634306,
		441780740,
		3129959883,
		1917973735,
		2510624549,
		3238456535,
		2544211978,
		3308894634,
		1299840618,
		4076074851,
		1756332096,
		3977027158,
		297047435,
		3790297736,
		2265573040,
		3621810518,
		1311375015,
		1667687725,
		47300608,
		3299642885,
		2474112369,
		201668394,
		1468347890,
		576830978,
		3594690761,
		3742605952,
		1958042578,
		1747032512,
		3558991340,
		1408974056,
		3366841779,
		682131401,
		1033214337,
		1545599232,
		4265137049,
		206503691,
		103024618,
		2855227313,
		1337551222,
		2428998917,
		2963842932,
		4015366655,
		3852247746,
		2796956967,
		3865723491,
		3747938335,
		247794022,
		3755824572,
		702416469,
		2434691994,
		397379957,
		851939612,
		2314769512,
		218229120,
		1380406772,
		62274761,
		214451378,
		3170103466,
		2276210409,
		3845813286,
		28563499,
		446592073,
		1693330814,
		3453727194,
		29968656,
		3093872512,
		220656637,
		2470637031,
		77972100,
		1667708854,
		1358280214,
		4064765667,
		2395616961,
		325977563,
		4277240721,
		4220025399,
		3605526484,
		3355147721,
		811859167,
		3069544926,
		3962126810,
		652502677,
		3075892249,
		4132761541,
		3498924215,
		1217549313,
		3250244479,
		3858715919,
		3053989961,
		1538642152,
		2279026266,
		2875879137,
		574252750,
		3324769229,
		2651358713,
		1758150215,
		141295887,
		2719868960,
		3515574750,
		4093007735,
		4194485238,
		1082055363,
		3417560400,
		395511885,
		2966884026,
		179534037,
		3646028556,
		3738688086,
		1092926436,
		2496269142,
		257381841,
		3772900718,
		1636087230,
		1477059743,
		2499234752,
		3811018894,
		2675660129,
		3285975680,
		90732309,
		1684827095,
		1150307763,
		1723134115,
		3237045386,
		1769919919,
		1240018934,
		815675215,
		750138730,
		2239792499,
		1234303040,
		1995484674,
		138143821,
		675421338,
		1145607174,
		1936608440,
		3238603024,
		2345230278,
		2105974004,
		323969391,
		779555213,
		3004902369,
		2861610098,
		1017501463,
		2098600890,
		2628620304,
		2940611490,
		2682542546,
		1171473753,
		3656571411,
		3687208071,
		4091869518,
		393037935,
		159126506,
		1662887367,
		1147106178,
		391545844,
		3452332695,
		1891500680,
		3016609650,
		1851642611,
		546529401,
		1167818917,
		3194020571,
		2848076033,
		3953471836,
		575554290,
		475796850,
		4134673196,
		450035699,
		2351251534,
		844027695,
		1080539133,
		86184846,
		1554234488,
		3692025454,
		1972511363,
		2018339607,
		1491841390,
		1141460869,
		1061690759,
		4244549243,
		2008416118,
		2351104703,
		2868147542,
		1598468138,
		722020353,
		1027143159,
		212344630,
		1387219594,
		1725294528,
		3745187956,
		2500153616,
		458938280,
		4129215917,
		1828119673,
		544571780,
		3503225445,
		2297937496,
		1241802790,
		267843827,
		2694610800,
		1397140384,
		1558801448,
		3782667683,
		1806446719,
		929573330,
		2234912681,
		400817706,
		616011623,
		4121520928,
		3603768725,
		1761550015,
		1968522284,
		4053731006,
		4192232858,
		4005120285,
		872482584,
		3140537016,
		3894607381,
		2287405443,
		1963876937,
		3663887957,
		1584857e3,
		2975024454,
		1833426440,
		4025083860
	], s$1[5] = [
		4143615901,
		749497569,
		1285769319,
		3795025788,
		2514159847,
		23610292,
		3974978748,
		844452780,
		3214870880,
		3751928557,
		2213566365,
		1676510905,
		448177848,
		3730751033,
		4086298418,
		2307502392,
		871450977,
		3222878141,
		4110862042,
		3831651966,
		2735270553,
		1310974780,
		2043402188,
		1218528103,
		2736035353,
		4274605013,
		2702448458,
		3936360550,
		2693061421,
		162023535,
		2827510090,
		687910808,
		23484817,
		3784910947,
		3371371616,
		779677500,
		3503626546,
		3473927188,
		4157212626,
		3500679282,
		4248902014,
		2466621104,
		3899384794,
		1958663117,
		925738300,
		1283408968,
		3669349440,
		1840910019,
		137959847,
		2679828185,
		1239142320,
		1315376211,
		1547541505,
		1690155329,
		739140458,
		3128809933,
		3933172616,
		3876308834,
		905091803,
		1548541325,
		4040461708,
		3095483362,
		144808038,
		451078856,
		676114313,
		2861728291,
		2469707347,
		993665471,
		373509091,
		2599041286,
		4025009006,
		4170239449,
		2149739950,
		3275793571,
		3749616649,
		2794760199,
		1534877388,
		572371878,
		2590613551,
		1753320020,
		3467782511,
		1405125690,
		4270405205,
		633333386,
		3026356924,
		3475123903,
		632057672,
		2846462855,
		1404951397,
		3882875879,
		3915906424,
		195638627,
		2385783745,
		3902872553,
		1233155085,
		3355999740,
		2380578713,
		2702246304,
		2144565621,
		3663341248,
		3894384975,
		2502479241,
		4248018925,
		3094885567,
		1594115437,
		572884632,
		3385116731,
		767645374,
		1331858858,
		1475698373,
		3793881790,
		3532746431,
		1321687957,
		619889600,
		1121017241,
		3440213920,
		2070816767,
		2833025776,
		1933951238,
		4095615791,
		890643334,
		3874130214,
		859025556,
		360630002,
		925594799,
		1764062180,
		3920222280,
		4078305929,
		979562269,
		2810700344,
		4087740022,
		1949714515,
		546639971,
		1165388173,
		3069891591,
		1495988560,
		922170659,
		1291546247,
		2107952832,
		1813327274,
		3406010024,
		3306028637,
		4241950635,
		153207855,
		2313154747,
		1608695416,
		1150242611,
		1967526857,
		721801357,
		1220138373,
		3691287617,
		3356069787,
		2112743302,
		3281662835,
		1111556101,
		1778980689,
		250857638,
		2298507990,
		673216130,
		2846488510,
		3207751581,
		3562756981,
		3008625920,
		3417367384,
		2198807050,
		529510932,
		3547516680,
		3426503187,
		2364944742,
		102533054,
		2294910856,
		1617093527,
		1204784762,
		3066581635,
		1019391227,
		1069574518,
		1317995090,
		1691889997,
		3661132003,
		510022745,
		3238594800,
		1362108837,
		1817929911,
		2184153760,
		805817662,
		1953603311,
		3699844737,
		120799444,
		2118332377,
		207536705,
		2282301548,
		4120041617,
		145305846,
		2508124933,
		3086745533,
		3261524335,
		1877257368,
		2977164480,
		3160454186,
		2503252186,
		4221677074,
		759945014,
		254147243,
		2767453419,
		3801518371,
		629083197,
		2471014217,
		907280572,
		3900796746,
		940896768,
		2751021123,
		2625262786,
		3161476951,
		3661752313,
		3260732218,
		1425318020,
		2977912069,
		1496677566,
		3988592072,
		2140652971,
		3126511541,
		3069632175,
		977771578,
		1392695845,
		1698528874,
		1411812681,
		1369733098,
		1343739227,
		3620887944,
		1142123638,
		67414216,
		3102056737,
		3088749194,
		1626167401,
		2546293654,
		3941374235,
		697522451,
		33404913,
		143560186,
		2595682037,
		994885535,
		1247667115,
		3859094837,
		2699155541,
		3547024625,
		4114935275,
		2968073508,
		3199963069,
		2732024527,
		1237921620,
		951448369,
		1898488916,
		1211705605,
		2790989240,
		2233243581,
		3598044975
	], s$1[6] = [
		2246066201,
		858518887,
		1714274303,
		3485882003,
		713916271,
		2879113490,
		3730835617,
		539548191,
		36158695,
		1298409750,
		419087104,
		1358007170,
		749914897,
		2989680476,
		1261868530,
		2995193822,
		2690628854,
		3443622377,
		3780124940,
		3796824509,
		2976433025,
		4259637129,
		1551479e3,
		512490819,
		1296650241,
		951993153,
		2436689437,
		2460458047,
		144139966,
		3136204276,
		310820559,
		3068840729,
		643875328,
		1969602020,
		1680088954,
		2185813161,
		3283332454,
		672358534,
		198762408,
		896343282,
		276269502,
		3014846926,
		84060815,
		197145886,
		376173866,
		3943890818,
		3813173521,
		3545068822,
		1316698879,
		1598252827,
		2633424951,
		1233235075,
		859989710,
		2358460855,
		3503838400,
		3409603720,
		1203513385,
		1193654839,
		2792018475,
		2060853022,
		207403770,
		1144516871,
		3068631394,
		1121114134,
		177607304,
		3785736302,
		326409831,
		1929119770,
		2983279095,
		4183308101,
		3474579288,
		3200513878,
		3228482096,
		119610148,
		1170376745,
		3378393471,
		3163473169,
		951863017,
		3337026068,
		3135789130,
		2907618374,
		1183797387,
		2015970143,
		4045674555,
		2182986399,
		2952138740,
		3928772205,
		384012900,
		2454997643,
		10178499,
		2879818989,
		2596892536,
		111523738,
		2995089006,
		451689641,
		3196290696,
		235406569,
		1441906262,
		3890558523,
		3013735005,
		4158569349,
		1644036924,
		376726067,
		1006849064,
		3664579700,
		2041234796,
		1021632941,
		1374734338,
		2566452058,
		371631263,
		4007144233,
		490221539,
		206551450,
		3140638584,
		1053219195,
		1853335209,
		3412429660,
		3562156231,
		735133835,
		1623211703,
		3104214392,
		2738312436,
		4096837757,
		3366392578,
		3110964274,
		3956598718,
		3196820781,
		2038037254,
		3877786376,
		2339753847,
		300912036,
		3766732888,
		2372630639,
		1516443558,
		4200396704,
		1574567987,
		4069441456,
		4122592016,
		2699739776,
		146372218,
		2748961456,
		2043888151,
		35287437,
		2596680554,
		655490400,
		1132482787,
		110692520,
		1031794116,
		2188192751,
		1324057718,
		1217253157,
		919197030,
		686247489,
		3261139658,
		1028237775,
		3135486431,
		3059715558,
		2460921700,
		986174950,
		2661811465,
		4062904701,
		2752986992,
		3709736643,
		367056889,
		1353824391,
		731860949,
		1650113154,
		1778481506,
		784341916,
		357075625,
		3608602432,
		1074092588,
		2480052770,
		3811426202,
		92751289,
		877911070,
		3600361838,
		1231880047,
		480201094,
		3756190983,
		3094495953,
		434011822,
		87971354,
		363687820,
		1717726236,
		1901380172,
		3926403882,
		2481662265,
		400339184,
		1490350766,
		2661455099,
		1389319756,
		2558787174,
		784598401,
		1983468483,
		30828846,
		3550527752,
		2716276238,
		3841122214,
		1765724805,
		1955612312,
		1277890269,
		1333098070,
		1564029816,
		2704417615,
		1026694237,
		3287671188,
		1260819201,
		3349086767,
		1016692350,
		1582273796,
		1073413053,
		1995943182,
		694588404,
		1025494639,
		3323872702,
		3551898420,
		4146854327,
		453260480,
		1316140391,
		1435673405,
		3038941953,
		3486689407,
		1622062951,
		403978347,
		817677117,
		950059133,
		4246079218,
		3278066075,
		1486738320,
		1417279718,
		481875527,
		2549965225,
		3933690356,
		760697757,
		1452955855,
		3897451437,
		1177426808,
		1702951038,
		4085348628,
		2447005172,
		1084371187,
		3516436277,
		3068336338,
		1073369276,
		1027665953,
		3284188590,
		1230553676,
		1368340146,
		2226246512,
		267243139,
		2274220762,
		4070734279,
		2497715176,
		2423353163,
		2504755875
	], s$1[7] = [
		3793104909,
		3151888380,
		2817252029,
		895778965,
		2005530807,
		3871412763,
		237245952,
		86829237,
		296341424,
		3851759377,
		3974600970,
		2475086196,
		709006108,
		1994621201,
		2972577594,
		937287164,
		3734691505,
		168608556,
		3189338153,
		2225080640,
		3139713551,
		3033610191,
		3025041904,
		77524477,
		185966941,
		1208824168,
		2344345178,
		1721625922,
		3354191921,
		1066374631,
		1927223579,
		1971335949,
		2483503697,
		1551748602,
		2881383779,
		2856329572,
		3003241482,
		48746954,
		1398218158,
		2050065058,
		313056748,
		4255789917,
		393167848,
		1912293076,
		940740642,
		3465845460,
		3091687853,
		2522601570,
		2197016661,
		1727764327,
		364383054,
		492521376,
		1291706479,
		3264136376,
		1474851438,
		1685747964,
		2575719748,
		1619776915,
		1814040067,
		970743798,
		1561002147,
		2925768690,
		2123093554,
		1880132620,
		3151188041,
		697884420,
		2550985770,
		2607674513,
		2659114323,
		110200136,
		1489731079,
		997519150,
		1378877361,
		3527870668,
		478029773,
		2766872923,
		1022481122,
		431258168,
		1112503832,
		897933369,
		2635587303,
		669726182,
		3383752315,
		918222264,
		163866573,
		3246985393,
		3776823163,
		114105080,
		1903216136,
		761148244,
		3571337562,
		1690750982,
		3166750252,
		1037045171,
		1888456500,
		2010454850,
		642736655,
		616092351,
		365016990,
		1185228132,
		4174898510,
		1043824992,
		2023083429,
		2241598885,
		3863320456,
		3279669087,
		3674716684,
		108438443,
		2132974366,
		830746235,
		606445527,
		4173263986,
		2204105912,
		1844756978,
		2532684181,
		4245352700,
		2969441100,
		3796921661,
		1335562986,
		4061524517,
		2720232303,
		2679424040,
		634407289,
		885462008,
		3294724487,
		3933892248,
		2094100220,
		339117932,
		4048830727,
		3202280980,
		1458155303,
		2689246273,
		1022871705,
		2464987878,
		3714515309,
		353796843,
		2822958815,
		4256850100,
		4052777845,
		551748367,
		618185374,
		3778635579,
		4020649912,
		1904685140,
		3069366075,
		2670879810,
		3407193292,
		2954511620,
		4058283405,
		2219449317,
		3135758300,
		1120655984,
		3447565834,
		1474845562,
		3577699062,
		550456716,
		3466908712,
		2043752612,
		881257467,
		869518812,
		2005220179,
		938474677,
		3305539448,
		3850417126,
		1315485940,
		3318264702,
		226533026,
		965733244,
		321539988,
		1136104718,
		804158748,
		573969341,
		3708209826,
		937399083,
		3290727049,
		2901666755,
		1461057207,
		4013193437,
		4066861423,
		3242773476,
		2421326174,
		1581322155,
		3028952165,
		786071460,
		3900391652,
		3918438532,
		1485433313,
		4023619836,
		3708277595,
		3678951060,
		953673138,
		1467089153,
		1930354364,
		1533292819,
		2492563023,
		1346121658,
		1685000834,
		1965281866,
		3765933717,
		4190206607,
		2052792609,
		3515332758,
		690371149,
		3125873887,
		2180283551,
		2903598061,
		3933952357,
		436236910,
		289419410,
		14314871,
		1242357089,
		2904507907,
		1616633776,
		2666382180,
		585885352,
		3471299210,
		2699507360,
		1432659641,
		277164553,
		3354103607,
		770115018,
		2303809295,
		3741942315,
		3177781868,
		2853364978,
		2269453327,
		3774259834,
		987383833,
		1290892879,
		225909803,
		1741533526,
		890078084,
		1496906255,
		1111072499,
		916028167,
		243534141,
		1252605537,
		2204162171,
		531204876,
		290011180,
		3916834213,
		102027703,
		237315147,
		209093447,
		1486785922,
		220223953,
		2758195998,
		4175039106,
		82940208,
		3127791296,
		2569425252,
		518464269,
		1353887104,
		3941492737,
		2377294467,
		3935040926
	];
}
function sy(t$1) {
	this.cast5 = new iy(), this.cast5.setKey(t$1), this.encrypt = function(t$2) {
		return this.cast5.encrypt(t$2);
	};
}
ny.keySize = ny.prototype.keySize = 24, ny.blockSize = ny.prototype.blockSize = 8, sy.blockSize = sy.prototype.blockSize = 8, sy.keySize = sy.prototype.keySize = 16;
const ay = 4294967295;
function oy(t$1, e$1) {
	return (t$1 << e$1 | t$1 >>> 32 - e$1) & ay;
}
function cy(t$1, e$1) {
	return t$1[e$1] | t$1[e$1 + 1] << 8 | t$1[e$1 + 2] << 16 | t$1[e$1 + 3] << 24;
}
function uy(t$1, e$1, r$1) {
	t$1.splice(e$1, 4, 255 & r$1, r$1 >>> 8 & 255, r$1 >>> 16 & 255, r$1 >>> 24 & 255);
}
function hy(t$1, e$1) {
	return t$1 >>> 8 * e$1 & 255;
}
function fy(t$1) {
	this.tf = function() {
		let t$2 = null, e$1 = null, r$1 = -1, n$1 = [], i$1 = [
			[],
			[],
			[],
			[]
		];
		function s$1(t$3) {
			return i$1[0][hy(t$3, 0)] ^ i$1[1][hy(t$3, 1)] ^ i$1[2][hy(t$3, 2)] ^ i$1[3][hy(t$3, 3)];
		}
		function a$1(t$3) {
			return i$1[0][hy(t$3, 3)] ^ i$1[1][hy(t$3, 0)] ^ i$1[2][hy(t$3, 1)] ^ i$1[3][hy(t$3, 2)];
		}
		function o$1(t$3, e$2) {
			let r$2 = s$1(e$2[0]), i$2 = a$1(e$2[1]);
			e$2[2] = oy(e$2[2] ^ r$2 + i$2 + n$1[4 * t$3 + 8] & ay, 31), e$2[3] = oy(e$2[3], 1) ^ r$2 + 2 * i$2 + n$1[4 * t$3 + 9] & ay, r$2 = s$1(e$2[2]), i$2 = a$1(e$2[3]), e$2[0] = oy(e$2[0] ^ r$2 + i$2 + n$1[4 * t$3 + 10] & ay, 31), e$2[1] = oy(e$2[1], 1) ^ r$2 + 2 * i$2 + n$1[4 * t$3 + 11] & ay;
		}
		function c$1(t$3, e$2) {
			let r$2 = s$1(e$2[0]), i$2 = a$1(e$2[1]);
			e$2[2] = oy(e$2[2], 1) ^ r$2 + i$2 + n$1[4 * t$3 + 10] & ay, e$2[3] = oy(e$2[3] ^ r$2 + 2 * i$2 + n$1[4 * t$3 + 11] & ay, 31), r$2 = s$1(e$2[2]), i$2 = a$1(e$2[3]), e$2[0] = oy(e$2[0], 1) ^ r$2 + i$2 + n$1[4 * t$3 + 8] & ay, e$2[1] = oy(e$2[1] ^ r$2 + 2 * i$2 + n$1[4 * t$3 + 9] & ay, 31);
		}
		return {
			name: "twofish",
			blocksize: 16,
			open: function(e$2) {
				let r$2, s$2, a$2, o$2, c$2;
				t$2 = e$2;
				const u$1 = [], h$1 = [], f$1 = [];
				let l$1;
				const y$1 = [];
				let g$1, p$1, d$1;
				const A$1 = [[
					8,
					1,
					7,
					13,
					6,
					15,
					3,
					2,
					0,
					11,
					5,
					9,
					14,
					12,
					10,
					4
				], [
					2,
					8,
					11,
					13,
					15,
					7,
					6,
					14,
					3,
					1,
					9,
					4,
					0,
					10,
					12,
					5
				]], w$1 = [[
					14,
					12,
					11,
					8,
					1,
					2,
					3,
					5,
					15,
					4,
					10,
					6,
					7,
					0,
					9,
					13
				], [
					1,
					14,
					2,
					11,
					4,
					12,
					3,
					7,
					6,
					13,
					10,
					5,
					15,
					9,
					0,
					8
				]], m$1 = [[
					11,
					10,
					5,
					14,
					6,
					13,
					9,
					0,
					12,
					8,
					15,
					3,
					2,
					4,
					7,
					1
				], [
					4,
					12,
					7,
					5,
					1,
					6,
					9,
					10,
					0,
					14,
					13,
					8,
					2,
					11,
					3,
					15
				]], b$1 = [[
					13,
					7,
					15,
					4,
					1,
					2,
					6,
					14,
					9,
					11,
					3,
					0,
					8,
					5,
					12,
					10
				], [
					11,
					9,
					5,
					1,
					12,
					3,
					13,
					14,
					6,
					4,
					7,
					15,
					2,
					0,
					8,
					10
				]], k$1 = [
					0,
					8,
					1,
					9,
					2,
					10,
					3,
					11,
					4,
					12,
					5,
					13,
					6,
					14,
					7,
					15
				], E$1 = [
					0,
					9,
					2,
					11,
					4,
					13,
					6,
					15,
					8,
					1,
					10,
					3,
					12,
					5,
					14,
					7
				], v$1 = [[], []], B$1 = [
					[],
					[],
					[],
					[]
				];
				function I$1(t$3) {
					return t$3 ^ t$3 >> 2 ^ [
						0,
						90,
						180,
						238
					][3 & t$3];
				}
				function S$1(t$3) {
					return t$3 ^ t$3 >> 1 ^ t$3 >> 2 ^ [
						0,
						238,
						180,
						90
					][3 & t$3];
				}
				function K$1(t$3, e$3) {
					let r$3, n$2, i$2;
					for (r$3 = 0; r$3 < 8; r$3++) n$2 = e$3 >>> 24, e$3 = e$3 << 8 & ay | t$3 >>> 24, t$3 = t$3 << 8 & ay, i$2 = n$2 << 1, 128 & n$2 && (i$2 ^= 333), e$3 ^= n$2 ^ i$2 << 16, i$2 ^= n$2 >>> 1, 1 & n$2 && (i$2 ^= 166), e$3 ^= i$2 << 24 | i$2 << 8;
					return e$3;
				}
				function C$1(t$3, e$3) {
					const r$3 = e$3 >> 4, n$2 = 15 & e$3, i$2 = A$1[t$3][r$3 ^ n$2], s$3 = w$1[t$3][k$1[n$2] ^ E$1[r$3]];
					return b$1[t$3][k$1[s$3] ^ E$1[i$2]] << 4 | m$1[t$3][i$2 ^ s$3];
				}
				function D$1(t$3, e$3) {
					let r$3 = hy(t$3, 0), n$2 = hy(t$3, 1), i$2 = hy(t$3, 2), s$3 = hy(t$3, 3);
					switch (l$1) {
						case 4: r$3 = v$1[1][r$3] ^ hy(e$3[3], 0), n$2 = v$1[0][n$2] ^ hy(e$3[3], 1), i$2 = v$1[0][i$2] ^ hy(e$3[3], 2), s$3 = v$1[1][s$3] ^ hy(e$3[3], 3);
						case 3: r$3 = v$1[1][r$3] ^ hy(e$3[2], 0), n$2 = v$1[1][n$2] ^ hy(e$3[2], 1), i$2 = v$1[0][i$2] ^ hy(e$3[2], 2), s$3 = v$1[0][s$3] ^ hy(e$3[2], 3);
						case 2: r$3 = v$1[0][v$1[0][r$3] ^ hy(e$3[1], 0)] ^ hy(e$3[0], 0), n$2 = v$1[0][v$1[1][n$2] ^ hy(e$3[1], 1)] ^ hy(e$3[0], 1), i$2 = v$1[1][v$1[0][i$2] ^ hy(e$3[1], 2)] ^ hy(e$3[0], 2), s$3 = v$1[1][v$1[1][s$3] ^ hy(e$3[1], 3)] ^ hy(e$3[0], 3);
					}
					return B$1[0][r$3] ^ B$1[1][n$2] ^ B$1[2][i$2] ^ B$1[3][s$3];
				}
				for (t$2 = t$2.slice(0, 32), r$2 = t$2.length; 16 !== r$2 && 24 !== r$2 && 32 !== r$2;) t$2[r$2++] = 0;
				for (r$2 = 0; r$2 < t$2.length; r$2 += 4) f$1[r$2 >> 2] = cy(t$2, r$2);
				for (r$2 = 0; r$2 < 256; r$2++) v$1[0][r$2] = C$1(0, r$2), v$1[1][r$2] = C$1(1, r$2);
				for (r$2 = 0; r$2 < 256; r$2++) g$1 = v$1[1][r$2], p$1 = I$1(g$1), d$1 = S$1(g$1), B$1[0][r$2] = g$1 + (p$1 << 8) + (d$1 << 16) + (d$1 << 24), B$1[2][r$2] = p$1 + (d$1 << 8) + (g$1 << 16) + (d$1 << 24), g$1 = v$1[0][r$2], p$1 = I$1(g$1), d$1 = S$1(g$1), B$1[1][r$2] = d$1 + (d$1 << 8) + (p$1 << 16) + (g$1 << 24), B$1[3][r$2] = p$1 + (g$1 << 8) + (d$1 << 16) + (p$1 << 24);
				for (l$1 = f$1.length / 2, r$2 = 0; r$2 < l$1; r$2++) s$2 = f$1[r$2 + r$2], u$1[r$2] = s$2, a$2 = f$1[r$2 + r$2 + 1], h$1[r$2] = a$2, y$1[l$1 - r$2 - 1] = K$1(s$2, a$2);
				for (r$2 = 0; r$2 < 40; r$2 += 2) s$2 = 16843009 * r$2, a$2 = s$2 + 16843009, s$2 = D$1(s$2, u$1), a$2 = oy(D$1(a$2, h$1), 8), n$1[r$2] = s$2 + a$2 & ay, n$1[r$2 + 1] = oy(s$2 + 2 * a$2, 9);
				for (r$2 = 0; r$2 < 256; r$2++) switch (s$2 = a$2 = o$2 = c$2 = r$2, l$1) {
					case 4: s$2 = v$1[1][s$2] ^ hy(y$1[3], 0), a$2 = v$1[0][a$2] ^ hy(y$1[3], 1), o$2 = v$1[0][o$2] ^ hy(y$1[3], 2), c$2 = v$1[1][c$2] ^ hy(y$1[3], 3);
					case 3: s$2 = v$1[1][s$2] ^ hy(y$1[2], 0), a$2 = v$1[1][a$2] ^ hy(y$1[2], 1), o$2 = v$1[0][o$2] ^ hy(y$1[2], 2), c$2 = v$1[0][c$2] ^ hy(y$1[2], 3);
					case 2: i$1[0][r$2] = B$1[0][v$1[0][v$1[0][s$2] ^ hy(y$1[1], 0)] ^ hy(y$1[0], 0)], i$1[1][r$2] = B$1[1][v$1[0][v$1[1][a$2] ^ hy(y$1[1], 1)] ^ hy(y$1[0], 1)], i$1[2][r$2] = B$1[2][v$1[1][v$1[0][o$2] ^ hy(y$1[1], 2)] ^ hy(y$1[0], 2)], i$1[3][r$2] = B$1[3][v$1[1][v$1[1][c$2] ^ hy(y$1[1], 3)] ^ hy(y$1[0], 3)];
				}
			},
			close: function() {
				n$1 = [], i$1 = [
					[],
					[],
					[],
					[]
				];
			},
			encrypt: function(t$3, i$2) {
				e$1 = t$3, r$1 = i$2;
				const s$2 = [
					cy(e$1, r$1) ^ n$1[0],
					cy(e$1, r$1 + 4) ^ n$1[1],
					cy(e$1, r$1 + 8) ^ n$1[2],
					cy(e$1, r$1 + 12) ^ n$1[3]
				];
				for (let t$4 = 0; t$4 < 8; t$4++) o$1(t$4, s$2);
				return uy(e$1, r$1, s$2[2] ^ n$1[4]), uy(e$1, r$1 + 4, s$2[3] ^ n$1[5]), uy(e$1, r$1 + 8, s$2[0] ^ n$1[6]), uy(e$1, r$1 + 12, s$2[1] ^ n$1[7]), r$1 += 16, e$1;
			},
			decrypt: function(t$3, i$2) {
				e$1 = t$3, r$1 = i$2;
				const s$2 = [
					cy(e$1, r$1) ^ n$1[4],
					cy(e$1, r$1 + 4) ^ n$1[5],
					cy(e$1, r$1 + 8) ^ n$1[6],
					cy(e$1, r$1 + 12) ^ n$1[7]
				];
				for (let t$4 = 7; t$4 >= 0; t$4--) c$1(t$4, s$2);
				uy(e$1, r$1, s$2[2] ^ n$1[0]), uy(e$1, r$1 + 4, s$2[3] ^ n$1[1]), uy(e$1, r$1 + 8, s$2[0] ^ n$1[2]), uy(e$1, r$1 + 12, s$2[1] ^ n$1[3]), r$1 += 16;
			},
			finalize: function() {
				return e$1;
			}
		};
	}(), this.tf.open(Array.from(t$1), 0), this.encrypt = function(t$2) {
		return this.tf.encrypt(Array.from(t$2), 0);
	};
}
function ly() {}
function yy(t$1) {
	this.bf = new ly(), this.bf.init(t$1), this.encrypt = function(t$2) {
		return this.bf.encryptBlock(t$2);
	};
}
fy.keySize = fy.prototype.keySize = 32, fy.blockSize = fy.prototype.blockSize = 16, ly.prototype.BLOCKSIZE = 8, ly.prototype.SBOXES = [
	[
		3509652390,
		2564797868,
		805139163,
		3491422135,
		3101798381,
		1780907670,
		3128725573,
		4046225305,
		614570311,
		3012652279,
		134345442,
		2240740374,
		1667834072,
		1901547113,
		2757295779,
		4103290238,
		227898511,
		1921955416,
		1904987480,
		2182433518,
		2069144605,
		3260701109,
		2620446009,
		720527379,
		3318853667,
		677414384,
		3393288472,
		3101374703,
		2390351024,
		1614419982,
		1822297739,
		2954791486,
		3608508353,
		3174124327,
		2024746970,
		1432378464,
		3864339955,
		2857741204,
		1464375394,
		1676153920,
		1439316330,
		715854006,
		3033291828,
		289532110,
		2706671279,
		2087905683,
		3018724369,
		1668267050,
		732546397,
		1947742710,
		3462151702,
		2609353502,
		2950085171,
		1814351708,
		2050118529,
		680887927,
		999245976,
		1800124847,
		3300911131,
		1713906067,
		1641548236,
		4213287313,
		1216130144,
		1575780402,
		4018429277,
		3917837745,
		3693486850,
		3949271944,
		596196993,
		3549867205,
		258830323,
		2213823033,
		772490370,
		2760122372,
		1774776394,
		2652871518,
		566650946,
		4142492826,
		1728879713,
		2882767088,
		1783734482,
		3629395816,
		2517608232,
		2874225571,
		1861159788,
		326777828,
		3124490320,
		2130389656,
		2716951837,
		967770486,
		1724537150,
		2185432712,
		2364442137,
		1164943284,
		2105845187,
		998989502,
		3765401048,
		2244026483,
		1075463327,
		1455516326,
		1322494562,
		910128902,
		469688178,
		1117454909,
		936433444,
		3490320968,
		3675253459,
		1240580251,
		122909385,
		2157517691,
		634681816,
		4142456567,
		3825094682,
		3061402683,
		2540495037,
		79693498,
		3249098678,
		1084186820,
		1583128258,
		426386531,
		1761308591,
		1047286709,
		322548459,
		995290223,
		1845252383,
		2603652396,
		3431023940,
		2942221577,
		3202600964,
		3727903485,
		1712269319,
		422464435,
		3234572375,
		1170764815,
		3523960633,
		3117677531,
		1434042557,
		442511882,
		3600875718,
		1076654713,
		1738483198,
		4213154764,
		2393238008,
		3677496056,
		1014306527,
		4251020053,
		793779912,
		2902807211,
		842905082,
		4246964064,
		1395751752,
		1040244610,
		2656851899,
		3396308128,
		445077038,
		3742853595,
		3577915638,
		679411651,
		2892444358,
		2354009459,
		1767581616,
		3150600392,
		3791627101,
		3102740896,
		284835224,
		4246832056,
		1258075500,
		768725851,
		2589189241,
		3069724005,
		3532540348,
		1274779536,
		3789419226,
		2764799539,
		1660621633,
		3471099624,
		4011903706,
		913787905,
		3497959166,
		737222580,
		2514213453,
		2928710040,
		3937242737,
		1804850592,
		3499020752,
		2949064160,
		2386320175,
		2390070455,
		2415321851,
		4061277028,
		2290661394,
		2416832540,
		1336762016,
		1754252060,
		3520065937,
		3014181293,
		791618072,
		3188594551,
		3933548030,
		2332172193,
		3852520463,
		3043980520,
		413987798,
		3465142937,
		3030929376,
		4245938359,
		2093235073,
		3534596313,
		375366246,
		2157278981,
		2479649556,
		555357303,
		3870105701,
		2008414854,
		3344188149,
		4221384143,
		3956125452,
		2067696032,
		3594591187,
		2921233993,
		2428461,
		544322398,
		577241275,
		1471733935,
		610547355,
		4027169054,
		1432588573,
		1507829418,
		2025931657,
		3646575487,
		545086370,
		48609733,
		2200306550,
		1653985193,
		298326376,
		1316178497,
		3007786442,
		2064951626,
		458293330,
		2589141269,
		3591329599,
		3164325604,
		727753846,
		2179363840,
		146436021,
		1461446943,
		4069977195,
		705550613,
		3059967265,
		3887724982,
		4281599278,
		3313849956,
		1404054877,
		2845806497,
		146425753,
		1854211946
	],
	[
		1266315497,
		3048417604,
		3681880366,
		3289982499,
		290971e4,
		1235738493,
		2632868024,
		2414719590,
		3970600049,
		1771706367,
		1449415276,
		3266420449,
		422970021,
		1963543593,
		2690192192,
		3826793022,
		1062508698,
		1531092325,
		1804592342,
		2583117782,
		2714934279,
		4024971509,
		1294809318,
		4028980673,
		1289560198,
		2221992742,
		1669523910,
		35572830,
		157838143,
		1052438473,
		1016535060,
		1802137761,
		1753167236,
		1386275462,
		3080475397,
		2857371447,
		1040679964,
		2145300060,
		2390574316,
		1461121720,
		2956646967,
		4031777805,
		4028374788,
		33600511,
		2920084762,
		1018524850,
		629373528,
		3691585981,
		3515945977,
		2091462646,
		2486323059,
		586499841,
		988145025,
		935516892,
		3367335476,
		2599673255,
		2839830854,
		265290510,
		3972581182,
		2759138881,
		3795373465,
		1005194799,
		847297441,
		406762289,
		1314163512,
		1332590856,
		1866599683,
		4127851711,
		750260880,
		613907577,
		1450815602,
		3165620655,
		3734664991,
		3650291728,
		3012275730,
		3704569646,
		1427272223,
		778793252,
		1343938022,
		2676280711,
		2052605720,
		1946737175,
		3164576444,
		3914038668,
		3967478842,
		3682934266,
		1661551462,
		3294938066,
		4011595847,
		840292616,
		3712170807,
		616741398,
		312560963,
		711312465,
		1351876610,
		322626781,
		1910503582,
		271666773,
		2175563734,
		1594956187,
		70604529,
		3617834859,
		1007753275,
		1495573769,
		4069517037,
		2549218298,
		2663038764,
		504708206,
		2263041392,
		3941167025,
		2249088522,
		1514023603,
		1998579484,
		1312622330,
		694541497,
		2582060303,
		2151582166,
		1382467621,
		776784248,
		2618340202,
		3323268794,
		2497899128,
		2784771155,
		503983604,
		4076293799,
		907881277,
		423175695,
		432175456,
		1378068232,
		4145222326,
		3954048622,
		3938656102,
		3820766613,
		2793130115,
		2977904593,
		26017576,
		3274890735,
		3194772133,
		1700274565,
		1756076034,
		4006520079,
		3677328699,
		720338349,
		1533947780,
		354530856,
		688349552,
		3973924725,
		1637815568,
		332179504,
		3949051286,
		53804574,
		2852348879,
		3044236432,
		1282449977,
		3583942155,
		3416972820,
		4006381244,
		1617046695,
		2628476075,
		3002303598,
		1686838959,
		431878346,
		2686675385,
		1700445008,
		1080580658,
		1009431731,
		832498133,
		3223435511,
		2605976345,
		2271191193,
		2516031870,
		1648197032,
		4164389018,
		2548247927,
		300782431,
		375919233,
		238389289,
		3353747414,
		2531188641,
		2019080857,
		1475708069,
		455242339,
		2609103871,
		448939670,
		3451063019,
		1395535956,
		2413381860,
		1841049896,
		1491858159,
		885456874,
		4264095073,
		4001119347,
		1565136089,
		3898914787,
		1108368660,
		540939232,
		1173283510,
		2745871338,
		3681308437,
		4207628240,
		3343053890,
		4016749493,
		1699691293,
		1103962373,
		3625875870,
		2256883143,
		3830138730,
		1031889488,
		3479347698,
		1535977030,
		4236805024,
		3251091107,
		2132092099,
		1774941330,
		1199868427,
		1452454533,
		157007616,
		2904115357,
		342012276,
		595725824,
		1480756522,
		206960106,
		497939518,
		591360097,
		863170706,
		2375253569,
		3596610801,
		1814182875,
		2094937945,
		3421402208,
		1082520231,
		3463918190,
		2785509508,
		435703966,
		3908032597,
		1641649973,
		2842273706,
		3305899714,
		1510255612,
		2148256476,
		2655287854,
		3276092548,
		4258621189,
		236887753,
		3681803219,
		274041037,
		1734335097,
		3815195456,
		3317970021,
		1899903192,
		1026095262,
		4050517792,
		356393447,
		2410691914,
		3873677099,
		3682840055
	],
	[
		3913112168,
		2491498743,
		4132185628,
		2489919796,
		1091903735,
		1979897079,
		3170134830,
		3567386728,
		3557303409,
		857797738,
		1136121015,
		1342202287,
		507115054,
		2535736646,
		337727348,
		3213592640,
		1301675037,
		2528481711,
		1895095763,
		1721773893,
		3216771564,
		62756741,
		2142006736,
		835421444,
		2531993523,
		1442658625,
		3659876326,
		2882144922,
		676362277,
		1392781812,
		170690266,
		3921047035,
		1759253602,
		3611846912,
		1745797284,
		664899054,
		1329594018,
		3901205900,
		3045908486,
		2062866102,
		2865634940,
		3543621612,
		3464012697,
		1080764994,
		553557557,
		3656615353,
		3996768171,
		991055499,
		499776247,
		1265440854,
		648242737,
		3940784050,
		980351604,
		3713745714,
		1749149687,
		3396870395,
		4211799374,
		3640570775,
		1161844396,
		3125318951,
		1431517754,
		545492359,
		4268468663,
		3499529547,
		1437099964,
		2702547544,
		3433638243,
		2581715763,
		2787789398,
		1060185593,
		1593081372,
		2418618748,
		4260947970,
		69676912,
		2159744348,
		86519011,
		2512459080,
		3838209314,
		1220612927,
		3339683548,
		133810670,
		1090789135,
		1078426020,
		1569222167,
		845107691,
		3583754449,
		4072456591,
		1091646820,
		628848692,
		1613405280,
		3757631651,
		526609435,
		236106946,
		48312990,
		2942717905,
		3402727701,
		1797494240,
		859738849,
		992217954,
		4005476642,
		2243076622,
		3870952857,
		3732016268,
		765654824,
		3490871365,
		2511836413,
		1685915746,
		3888969200,
		1414112111,
		2273134842,
		3281911079,
		4080962846,
		172450625,
		2569994100,
		980381355,
		4109958455,
		2819808352,
		2716589560,
		2568741196,
		3681446669,
		3329971472,
		1835478071,
		660984891,
		3704678404,
		4045999559,
		3422617507,
		3040415634,
		1762651403,
		1719377915,
		3470491036,
		2693910283,
		3642056355,
		3138596744,
		1364962596,
		2073328063,
		1983633131,
		926494387,
		3423689081,
		2150032023,
		4096667949,
		1749200295,
		3328846651,
		309677260,
		2016342300,
		1779581495,
		3079819751,
		111262694,
		1274766160,
		443224088,
		298511866,
		1025883608,
		3806446537,
		1145181785,
		168956806,
		3641502830,
		3584813610,
		1689216846,
		3666258015,
		3200248200,
		1692713982,
		2646376535,
		4042768518,
		1618508792,
		1610833997,
		3523052358,
		4130873264,
		2001055236,
		3610705100,
		2202168115,
		4028541809,
		2961195399,
		1006657119,
		2006996926,
		3186142756,
		1430667929,
		3210227297,
		1314452623,
		4074634658,
		4101304120,
		2273951170,
		1399257539,
		3367210612,
		3027628629,
		1190975929,
		2062231137,
		2333990788,
		2221543033,
		2438960610,
		1181637006,
		548689776,
		2362791313,
		3372408396,
		3104550113,
		3145860560,
		296247880,
		1970579870,
		3078560182,
		3769228297,
		1714227617,
		3291629107,
		3898220290,
		166772364,
		1251581989,
		493813264,
		448347421,
		195405023,
		2709975567,
		677966185,
		3703036547,
		1463355134,
		2715995803,
		1338867538,
		1343315457,
		2802222074,
		2684532164,
		233230375,
		2599980071,
		2000651841,
		3277868038,
		1638401717,
		4028070440,
		3237316320,
		6314154,
		819756386,
		300326615,
		590932579,
		1405279636,
		3267499572,
		3150704214,
		2428286686,
		3959192993,
		3461946742,
		1862657033,
		1266418056,
		963775037,
		2089974820,
		2263052895,
		1917689273,
		448879540,
		3550394620,
		3981727096,
		150775221,
		3627908307,
		1303187396,
		508620638,
		2975983352,
		2726630617,
		1817252668,
		1876281319,
		1457606340,
		908771278,
		3720792119,
		3617206836,
		2455994898,
		1729034894,
		1080033504
	],
	[
		976866871,
		3556439503,
		2881648439,
		1522871579,
		1555064734,
		1336096578,
		3548522304,
		2579274686,
		3574697629,
		3205460757,
		3593280638,
		3338716283,
		3079412587,
		564236357,
		2993598910,
		1781952180,
		1464380207,
		3163844217,
		3332601554,
		1699332808,
		1393555694,
		1183702653,
		3581086237,
		1288719814,
		691649499,
		2847557200,
		2895455976,
		3193889540,
		2717570544,
		1781354906,
		1676643554,
		2592534050,
		3230253752,
		1126444790,
		2770207658,
		2633158820,
		2210423226,
		2615765581,
		2414155088,
		3127139286,
		673620729,
		2805611233,
		1269405062,
		4015350505,
		3341807571,
		4149409754,
		1057255273,
		2012875353,
		2162469141,
		2276492801,
		2601117357,
		993977747,
		3918593370,
		2654263191,
		753973209,
		36408145,
		2530585658,
		25011837,
		3520020182,
		2088578344,
		530523599,
		2918365339,
		1524020338,
		1518925132,
		3760827505,
		3759777254,
		1202760957,
		3985898139,
		3906192525,
		674977740,
		4174734889,
		2031300136,
		2019492241,
		3983892565,
		4153806404,
		3822280332,
		352677332,
		2297720250,
		60907813,
		90501309,
		3286998549,
		1016092578,
		2535922412,
		2839152426,
		457141659,
		509813237,
		4120667899,
		652014361,
		1966332200,
		2975202805,
		55981186,
		2327461051,
		676427537,
		3255491064,
		2882294119,
		3433927263,
		1307055953,
		942726286,
		933058658,
		2468411793,
		3933900994,
		4215176142,
		1361170020,
		2001714738,
		2830558078,
		3274259782,
		1222529897,
		1679025792,
		2729314320,
		3714953764,
		1770335741,
		151462246,
		3013232138,
		1682292957,
		1483529935,
		471910574,
		1539241949,
		458788160,
		3436315007,
		1807016891,
		3718408830,
		978976581,
		1043663428,
		3165965781,
		1927990952,
		4200891579,
		2372276910,
		3208408903,
		3533431907,
		1412390302,
		2931980059,
		4132332400,
		1947078029,
		3881505623,
		4168226417,
		2941484381,
		1077988104,
		1320477388,
		886195818,
		18198404,
		3786409e3,
		2509781533,
		112762804,
		3463356488,
		1866414978,
		891333506,
		18488651,
		661792760,
		1628790961,
		3885187036,
		3141171499,
		876946877,
		2693282273,
		1372485963,
		791857591,
		2686433993,
		3759982718,
		3167212022,
		3472953795,
		2716379847,
		445679433,
		3561995674,
		3504004811,
		3574258232,
		54117162,
		3331405415,
		2381918588,
		3769707343,
		4154350007,
		1140177722,
		4074052095,
		668550556,
		3214352940,
		367459370,
		261225585,
		2610173221,
		4209349473,
		3468074219,
		3265815641,
		314222801,
		3066103646,
		3808782860,
		282218597,
		3406013506,
		3773591054,
		379116347,
		1285071038,
		846784868,
		2669647154,
		3771962079,
		3550491691,
		2305946142,
		453669953,
		1268987020,
		3317592352,
		3279303384,
		3744833421,
		2610507566,
		3859509063,
		266596637,
		3847019092,
		517658769,
		3462560207,
		3443424879,
		370717030,
		4247526661,
		2224018117,
		4143653529,
		4112773975,
		2788324899,
		2477274417,
		1456262402,
		2901442914,
		1517677493,
		1846949527,
		2295493580,
		3734397586,
		2176403920,
		1280348187,
		1908823572,
		3871786941,
		846861322,
		1172426758,
		3287448474,
		3383383037,
		1655181056,
		3139813346,
		901632758,
		1897031941,
		2986607138,
		3066810236,
		3447102507,
		1393639104,
		373351379,
		950779232,
		625454576,
		3124240540,
		4148612726,
		2007998917,
		544563296,
		2244738638,
		2330496472,
		2058025392,
		1291430526,
		424198748,
		50039436,
		29584100,
		3605783033,
		2429876329,
		2791104160,
		1057563949,
		3255363231,
		3075367218,
		3463963227,
		1469046755,
		985887462
	]
], ly.prototype.PARRAY = [
	608135816,
	2242054355,
	320440878,
	57701188,
	2752067618,
	698298832,
	137296536,
	3964562569,
	1160258022,
	953160567,
	3193202383,
	887688300,
	3232508343,
	3380367581,
	1065670069,
	3041331479,
	2450970073,
	2306472731
], ly.prototype.NN = 16, ly.prototype._clean = function(t$1) {
	if (t$1 < 0) t$1 = (2147483647 & t$1) + 2147483648;
	return t$1;
}, ly.prototype._F = function(t$1) {
	let e$1;
	const r$1 = 255 & t$1, n$1 = 255 & (t$1 >>>= 8), i$1 = 255 & (t$1 >>>= 8), s$1 = 255 & (t$1 >>>= 8);
	return e$1 = this.sboxes[0][s$1] + this.sboxes[1][i$1], e$1 ^= this.sboxes[2][n$1], e$1 += this.sboxes[3][r$1], e$1;
}, ly.prototype._encryptBlock = function(t$1) {
	let e$1, r$1 = t$1[0], n$1 = t$1[1];
	for (e$1 = 0; e$1 < this.NN; ++e$1) {
		r$1 ^= this.parray[e$1], n$1 = this._F(r$1) ^ n$1;
		const t$2 = r$1;
		r$1 = n$1, n$1 = t$2;
	}
	r$1 ^= this.parray[this.NN + 0], n$1 ^= this.parray[this.NN + 1], t$1[0] = this._clean(n$1), t$1[1] = this._clean(r$1);
}, ly.prototype.encryptBlock = function(t$1) {
	let e$1;
	const r$1 = [0, 0], n$1 = this.BLOCKSIZE / 2;
	for (e$1 = 0; e$1 < this.BLOCKSIZE / 2; ++e$1) r$1[0] = r$1[0] << 8 | 255 & t$1[e$1 + 0], r$1[1] = r$1[1] << 8 | 255 & t$1[e$1 + n$1];
	this._encryptBlock(r$1);
	const i$1 = [];
	for (e$1 = 0; e$1 < this.BLOCKSIZE / 2; ++e$1) i$1[e$1 + 0] = r$1[0] >>> 24 - 8 * e$1 & 255, i$1[e$1 + n$1] = r$1[1] >>> 24 - 8 * e$1 & 255;
	return i$1;
}, ly.prototype._decryptBlock = function(t$1) {
	let e$1, r$1 = t$1[0], n$1 = t$1[1];
	for (e$1 = this.NN + 1; e$1 > 1; --e$1) {
		r$1 ^= this.parray[e$1], n$1 = this._F(r$1) ^ n$1;
		const t$2 = r$1;
		r$1 = n$1, n$1 = t$2;
	}
	r$1 ^= this.parray[1], n$1 ^= this.parray[0], t$1[0] = this._clean(n$1), t$1[1] = this._clean(r$1);
}, ly.prototype.init = function(t$1) {
	let e$1, r$1 = 0;
	for (this.parray = [], e$1 = 0; e$1 < this.NN + 2; ++e$1) {
		let n$2 = 0;
		for (let e$2 = 0; e$2 < 4; ++e$2) n$2 = n$2 << 8 | 255 & t$1[r$1], ++r$1 >= t$1.length && (r$1 = 0);
		this.parray[e$1] = this.PARRAY[e$1] ^ n$2;
	}
	for (this.sboxes = [], e$1 = 0; e$1 < 4; ++e$1) for (this.sboxes[e$1] = [], r$1 = 0; r$1 < 256; ++r$1) this.sboxes[e$1][r$1] = this.SBOXES[e$1][r$1];
	const n$1 = [0, 0];
	for (e$1 = 0; e$1 < this.NN + 2; e$1 += 2) this._encryptBlock(n$1), this.parray[e$1 + 0] = n$1[0], this.parray[e$1 + 1] = n$1[1];
	for (e$1 = 0; e$1 < 4; ++e$1) for (r$1 = 0; r$1 < 256; r$1 += 2) this._encryptBlock(n$1), this.sboxes[e$1][r$1 + 0] = n$1[0], this.sboxes[e$1][r$1 + 1] = n$1[1];
}, yy.keySize = yy.prototype.keySize = 16, yy.blockSize = yy.prototype.blockSize = 8;
const gy = new Map(Object.entries({
	tripledes: ny,
	cast5: sy,
	twofish: fy,
	blowfish: yy
}));
var py = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	legacyCiphers: gy
});
function dy(t$1, e$1, r$1, n$1) {
	t$1[e$1] += r$1[n$1], t$1[e$1 + 1] += r$1[n$1 + 1] + (t$1[e$1] < r$1[n$1]);
}
function Ay(t$1, e$1) {
	t$1[0] += e$1, t$1[1] += t$1[0] < e$1;
}
function wy(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1) {
	dy(t$1, r$1, t$1, n$1), dy(t$1, r$1, e$1, a$1);
	let c$1 = t$1[s$1] ^ t$1[r$1], u$1 = t$1[s$1 + 1] ^ t$1[r$1 + 1];
	t$1[s$1] = u$1, t$1[s$1 + 1] = c$1, dy(t$1, i$1, t$1, s$1), c$1 = t$1[n$1] ^ t$1[i$1], u$1 = t$1[n$1 + 1] ^ t$1[i$1 + 1], t$1[n$1] = c$1 >>> 24 ^ u$1 << 8, t$1[n$1 + 1] = u$1 >>> 24 ^ c$1 << 8, dy(t$1, r$1, t$1, n$1), dy(t$1, r$1, e$1, o$1), c$1 = t$1[s$1] ^ t$1[r$1], u$1 = t$1[s$1 + 1] ^ t$1[r$1 + 1], t$1[s$1] = c$1 >>> 16 ^ u$1 << 16, t$1[s$1 + 1] = u$1 >>> 16 ^ c$1 << 16, dy(t$1, i$1, t$1, s$1), c$1 = t$1[n$1] ^ t$1[i$1], u$1 = t$1[n$1 + 1] ^ t$1[i$1 + 1], t$1[n$1] = u$1 >>> 31 ^ c$1 << 1, t$1[n$1 + 1] = c$1 >>> 31 ^ u$1 << 1;
}
const my = new Uint32Array([
	4089235720,
	1779033703,
	2227873595,
	3144134277,
	4271175723,
	1013904242,
	1595750129,
	2773480762,
	2917565137,
	1359893119,
	725511199,
	2600822924,
	4215389547,
	528734635,
	327033209,
	1541459225
]), by = new Uint8Array([
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3,
	11,
	8,
	12,
	0,
	5,
	2,
	15,
	13,
	10,
	14,
	3,
	6,
	7,
	1,
	9,
	4,
	7,
	9,
	3,
	1,
	13,
	12,
	11,
	14,
	2,
	6,
	5,
	10,
	4,
	0,
	15,
	8,
	9,
	0,
	5,
	7,
	2,
	4,
	10,
	15,
	14,
	1,
	11,
	12,
	6,
	8,
	3,
	13,
	2,
	12,
	6,
	10,
	0,
	11,
	8,
	3,
	4,
	13,
	7,
	5,
	15,
	14,
	1,
	9,
	12,
	5,
	1,
	15,
	14,
	13,
	4,
	10,
	0,
	7,
	6,
	3,
	9,
	2,
	8,
	11,
	13,
	11,
	7,
	14,
	12,
	1,
	3,
	9,
	5,
	0,
	15,
	4,
	8,
	6,
	2,
	10,
	6,
	15,
	14,
	9,
	11,
	3,
	0,
	8,
	12,
	2,
	13,
	7,
	1,
	4,
	10,
	5,
	10,
	2,
	8,
	4,
	7,
	6,
	1,
	5,
	15,
	11,
	9,
	14,
	3,
	12,
	13,
	0,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3
].map((t$1) => 2 * t$1));
function ky(t$1, e$1) {
	const r$1 = new Uint32Array(32), n$1 = new Uint32Array(t$1.b.buffer, t$1.b.byteOffset, 32);
	for (let e$2 = 0; e$2 < 16; e$2++) r$1[e$2] = t$1.h[e$2], r$1[e$2 + 16] = my[e$2];
	r$1[24] ^= t$1.t0[0], r$1[25] ^= t$1.t0[1];
	const i$1 = e$1 ? 4294967295 : 0;
	r$1[28] ^= i$1, r$1[29] ^= i$1;
	for (let t$2 = 0; t$2 < 12; t$2++) {
		const e$2 = t$2 << 4;
		wy(r$1, n$1, 0, 8, 16, 24, by[e$2 + 0], by[e$2 + 1]), wy(r$1, n$1, 2, 10, 18, 26, by[e$2 + 2], by[e$2 + 3]), wy(r$1, n$1, 4, 12, 20, 28, by[e$2 + 4], by[e$2 + 5]), wy(r$1, n$1, 6, 14, 22, 30, by[e$2 + 6], by[e$2 + 7]), wy(r$1, n$1, 0, 10, 20, 30, by[e$2 + 8], by[e$2 + 9]), wy(r$1, n$1, 2, 12, 22, 24, by[e$2 + 10], by[e$2 + 11]), wy(r$1, n$1, 4, 14, 16, 26, by[e$2 + 12], by[e$2 + 13]), wy(r$1, n$1, 6, 8, 18, 28, by[e$2 + 14], by[e$2 + 15]);
	}
	for (let e$2 = 0; e$2 < 16; e$2++) t$1.h[e$2] ^= r$1[e$2] ^ r$1[e$2 + 16];
}
var Ey = class {
	constructor(t$1, e$1, r$1, n$1) {
		const i$1 = new Uint8Array(64);
		this.S = {
			b: new Uint8Array(Iy),
			h: new Uint32Array(By / 4),
			t0: new Uint32Array(2),
			c: 0,
			outlen: t$1
		}, i$1[0] = t$1, e$1 && (i$1[1] = e$1.length), i$1[2] = 1, i$1[3] = 1, r$1 && i$1.set(r$1, 32), n$1 && i$1.set(n$1, 48);
		const s$1 = new Uint32Array(i$1.buffer, i$1.byteOffset, i$1.length / Uint32Array.BYTES_PER_ELEMENT);
		for (let t$2 = 0; t$2 < 16; t$2++) this.S.h[t$2] = my[t$2] ^ s$1[t$2];
		if (e$1) {
			const t$2 = new Uint8Array(Iy);
			t$2.set(e$1), this.update(t$2);
		}
	}
	update(t$1) {
		if (!(t$1 instanceof Uint8Array)) throw Error("Input must be Uint8Array or Buffer");
		let e$1 = 0;
		for (; e$1 < t$1.length;) {
			this.S.c === Iy && (Ay(this.S.t0, this.S.c), ky(this.S, !1), this.S.c = 0);
			let r$1 = Iy - this.S.c;
			this.S.b.set(t$1.subarray(e$1, e$1 + r$1), this.S.c);
			const n$1 = Math.min(r$1, t$1.length - e$1);
			this.S.c += n$1, e$1 += n$1;
		}
		return this;
	}
	digest(t$1) {
		Ay(this.S.t0, this.S.c), this.S.b.fill(0, this.S.c), this.S.c = Iy, ky(this.S, !0);
		const e$1 = t$1 || new Uint8Array(this.S.outlen);
		for (let t$2 = 0; t$2 < this.S.outlen; t$2++) e$1[t$2] = this.S.h[t$2 >> 2] >> 8 * (3 & t$2);
		return this.S.h = null, e$1.buffer;
	}
};
function vy(t$1, e$1, r$1, n$1) {
	if (t$1 > By) throw Error(`outlen must be at most ${By} (given: ${t$1})`);
	return new Ey(t$1, e$1, r$1, n$1);
}
const By = 64, Iy = 128, Sy = 1024, Ky = 205 === new Uint8Array(new Uint16Array([43981]).buffer)[0];
function Cy(t$1, e$1, r$1) {
	return t$1[r$1 + 0] = e$1, t$1[r$1 + 1] = e$1 >> 8, t$1[r$1 + 2] = e$1 >> 16, t$1[r$1 + 3] = e$1 >> 24, t$1;
}
function Dy(t$1, e$1, r$1) {
	if (e$1 > Number.MAX_SAFE_INTEGER) throw Error("LE64: large numbers unsupported");
	let n$1 = e$1;
	for (let e$2 = r$1; e$2 < r$1 + 7; e$2++) t$1[e$2] = n$1, n$1 = (n$1 - t$1[e$2]) / 256;
	return t$1;
}
function Uy(t$1, e$1, r$1) {
	const n$1 = new Uint8Array(64), i$1 = new Uint8Array(4 + e$1.length);
	if (Cy(i$1, t$1, 0), i$1.set(e$1, 4), t$1 <= 64) return vy(t$1).update(i$1).digest(r$1), r$1;
	const s$1 = Math.ceil(t$1 / 32) - 2;
	for (let t$2 = 0; t$2 < s$1; t$2++) vy(64).update(0 === t$2 ? i$1 : n$1).digest(n$1), r$1.set(n$1.subarray(0, 32), 32 * t$2);
	const a$1 = new Uint8Array(vy(t$1 - 32 * s$1).update(n$1).digest());
	return r$1.set(a$1, 32 * s$1), r$1;
}
function Py(t$1, e$1, r$1, n$1) {
	return t$1.fn.XOR(e$1.byteOffset, r$1.byteOffset, n$1.byteOffset), e$1;
}
function xy(t$1, e$1, r$1, n$1) {
	return t$1.fn.G(e$1.byteOffset, r$1.byteOffset, n$1.byteOffset, t$1.refs.gZ.byteOffset), n$1;
}
function Qy(t$1, e$1, r$1, n$1) {
	return t$1.fn.G2(e$1.byteOffset, r$1.byteOffset, n$1.byteOffset, t$1.refs.gZ.byteOffset), n$1;
}
function* Ry(t$1, e$1, r$1, n$1, i$1, s$1, a$1, o$1) {
	t$1.refs.prngTmp.fill(0);
	const c$1 = t$1.refs.prngTmp.subarray(0, 48);
	Dy(c$1, e$1, 0), Dy(c$1, r$1, 8), Dy(c$1, n$1, 16), Dy(c$1, i$1, 24), Dy(c$1, s$1, 32), Dy(c$1, 2, 40);
	for (let e$2 = 1; e$2 <= a$1; e$2++) {
		Dy(t$1.refs.prngTmp, e$2, c$1.length);
		const r$2 = Qy(t$1, t$1.refs.ZERO1024, t$1.refs.prngTmp, t$1.refs.prngR);
		for (let t$2 = 1 === e$2 ? 8 * o$1 : 0; t$2 < r$2.length; t$2 += 8) yield r$2.subarray(t$2, t$2 + 8);
	}
	return [];
}
function Ty(t$1, { memory: e$1, instance: r$1 }) {
	if (!Ky) throw Error("BigEndian system not supported");
	const n$1 = function({ type: t$2, version: e$2, tagLength: r$2, password: n$2, salt: i$2, ad: s$2, secret: a$2, parallelism: o$2, memorySize: c$2, passes: u$2 }) {
		const h$2 = (t$3, e$3, r$3, n$3) => {
			if (e$3 < r$3 || e$3 > n$3) throw Error(`${t$3} size should be between ${r$3} and ${n$3} bytes`);
		};
		if (2 !== t$2 || 19 !== e$2) throw Error("Unsupported type or version");
		return h$2("password", n$2, 8, 4294967295), h$2("salt", i$2, 8, 4294967295), h$2("tag", r$2, 4, 4294967295), h$2("memory", c$2, 8 * o$2, 4294967295), s$2 && h$2("associated data", s$2, 0, 4294967295), a$2 && h$2("secret", a$2, 0, 32), {
			type: t$2,
			version: e$2,
			tagLength: r$2,
			password: n$2,
			salt: i$2,
			ad: s$2,
			secret: a$2,
			lanes: o$2,
			memorySize: c$2,
			passes: u$2
		};
	}({
		type: 2,
		version: 19,
		...t$1
	}), { G: i$1, G2: s$1, xor: a$1, getLZ: o$1 } = r$1.exports, c$1 = {}, u$1 = {};
	u$1.G = i$1, u$1.G2 = s$1, u$1.XOR = a$1;
	const h$1 = 4 * n$1.lanes * Math.floor(n$1.memorySize / (4 * n$1.lanes)), f$1 = h$1 * Sy + 10240;
	if (e$1.buffer.byteLength < f$1) {
		const t$2 = Math.ceil((f$1 - e$1.buffer.byteLength) / 65536);
		e$1.grow(t$2);
	}
	let l$1 = 0;
	c$1.gZ = new Uint8Array(e$1.buffer, l$1, Sy), l$1 += c$1.gZ.length, c$1.prngR = new Uint8Array(e$1.buffer, l$1, Sy), l$1 += c$1.prngR.length, c$1.prngTmp = new Uint8Array(e$1.buffer, l$1, Sy), l$1 += c$1.prngTmp.length, c$1.ZERO1024 = new Uint8Array(e$1.buffer, l$1, 1024), l$1 += c$1.ZERO1024.length;
	const y$1 = new Uint32Array(e$1.buffer, l$1, 2);
	l$1 += y$1.length * Uint32Array.BYTES_PER_ELEMENT;
	const g$1 = {
		fn: u$1,
		refs: c$1
	}, p$1 = new Uint8Array(e$1.buffer, l$1, Sy);
	l$1 += p$1.length;
	const d$1 = new Uint8Array(e$1.buffer, l$1, n$1.memorySize * Sy), A$1 = new Uint8Array(e$1.buffer, 0, l$1), w$1 = function(t$2) {
		const e$2 = vy(64), r$2 = new Uint8Array(4), n$2 = new Uint8Array(24);
		Cy(n$2, t$2.lanes, 0), Cy(n$2, t$2.tagLength, 4), Cy(n$2, t$2.memorySize, 8), Cy(n$2, t$2.passes, 12), Cy(n$2, t$2.version, 16), Cy(n$2, t$2.type, 20);
		const i$2 = [n$2];
		t$2.password ? (i$2.push(Cy(new Uint8Array(4), t$2.password.length, 0)), i$2.push(t$2.password)) : i$2.push(r$2);
		t$2.salt ? (i$2.push(Cy(new Uint8Array(4), t$2.salt.length, 0)), i$2.push(t$2.salt)) : i$2.push(r$2);
		t$2.secret ? (i$2.push(Cy(new Uint8Array(4), t$2.secret.length, 0)), i$2.push(t$2.secret)) : i$2.push(r$2);
		t$2.ad ? (i$2.push(Cy(new Uint8Array(4), t$2.ad.length, 0)), i$2.push(t$2.ad)) : i$2.push(r$2);
		e$2.update(function(t$3) {
			if (1 === t$3.length) return t$3[0];
			let e$3 = 0;
			for (let r$4 = 0; r$4 < t$3.length; r$4++) {
				if (!(t$3[r$4] instanceof Uint8Array)) throw Error("concatArrays: Data must be in the form of a Uint8Array");
				e$3 += t$3[r$4].length;
			}
			const r$3 = new Uint8Array(e$3);
			let n$3 = 0;
			return t$3.forEach((t$4) => {
				r$3.set(t$4, n$3), n$3 += t$4.length;
			}), r$3;
		}(i$2));
		const s$2 = e$2.digest();
		return new Uint8Array(s$2);
	}(n$1), m$1 = h$1 / n$1.lanes, b$1 = Array(n$1.lanes).fill(null).map(() => Array(m$1)), k$1 = (t$2, e$2) => (b$1[t$2][e$2] = d$1.subarray(t$2 * m$1 * 1024 + 1024 * e$2, t$2 * m$1 * 1024 + 1024 * e$2 + Sy), b$1[t$2][e$2]);
	for (let t$2 = 0; t$2 < n$1.lanes; t$2++) {
		const e$2 = new Uint8Array(w$1.length + 8);
		e$2.set(w$1), Cy(e$2, 0, w$1.length), Cy(e$2, t$2, w$1.length + 4), Uy(Sy, e$2, k$1(t$2, 0)), Cy(e$2, 1, w$1.length), Uy(Sy, e$2, k$1(t$2, 1));
	}
	const E$1 = m$1 / 4;
	for (let t$2 = 0; t$2 < n$1.passes; t$2++) for (let e$2 = 0; e$2 < 4; e$2++) {
		const r$2 = 0 === t$2 && e$2 <= 1;
		for (let i$2 = 0; i$2 < n$1.lanes; i$2++) {
			let s$2 = 0 === e$2 && 0 === t$2 ? 2 : 0;
			const a$2 = r$2 ? Ry(g$1, t$2, i$2, e$2, h$1, n$1.passes, E$1, s$2) : null;
			for (; s$2 < E$1; s$2++) {
				const c$2 = e$2 * E$1 + s$2, u$2 = c$2 > 0 ? b$1[i$2][c$2 - 1] : b$1[i$2][m$1 - 1], h$2 = r$2 ? a$2.next().value : u$2;
				o$1(y$1.byteOffset, h$2.byteOffset, i$2, n$1.lanes, t$2, e$2, s$2, 4, E$1);
				const f$2 = y$1[0], l$2 = y$1[1];
				0 === t$2 && k$1(i$2, c$2), xy(g$1, u$2, b$1[f$2][l$2], t$2 > 0 ? p$1 : b$1[i$2][c$2]), t$2 > 0 && Py(g$1, b$1[i$2][c$2], p$1, b$1[i$2][c$2]);
			}
		}
	}
	const v$1 = b$1[0][m$1 - 1];
	for (let t$2 = 1; t$2 < n$1.lanes; t$2++) Py(g$1, v$1, v$1, b$1[t$2][m$1 - 1]);
	const B$1 = Uy(n$1.tagLength, v$1, new Uint8Array(n$1.tagLength));
	return A$1.fill(0), e$1.grow(0), B$1;
}
let My;
async function Fy(t$1, e$1) {
	const r$1 = new WebAssembly.Memory({
		initial: 1040,
		maximum: 65536
	}), n$1 = await async function(t$2, e$2, r$2) {
		const n$2 = { env: { memory: t$2 } };
		if (void 0 === My) try {
			const t$3 = await e$2(n$2);
			return My = !0, t$3;
		} catch (t$3) {
			My = !1;
		}
		return (My ? e$2 : r$2)(n$2);
	}(r$1, t$1, e$1);
	return (t$2) => Ty(t$2, {
		instance: n$1.instance,
		memory: r$1
	});
}
function Ny(e$1, r$1, n$1, i$1) {
	var s$1 = null, a$1 = t.atob(n$1), o$1 = a$1.length;
	s$1 = new Uint8Array(new ArrayBuffer(o$1));
	for (var c$1 = 0; c$1 < o$1; c$1++) s$1[c$1] = a$1.charCodeAt(c$1);
	return function(t$1, e$2, r$2) {
		var n$2 = r$2 ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, i$2 = r$2 ? WebAssembly.compileStreaming : WebAssembly.compile;
		return e$2 ? n$2(t$1, e$2) : i$2(t$1);
	}(s$1, i$1, !1);
}
var Ly, Oy, Hy, zy, Gy, _y, jy, Vy, qy = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	default: async () => Fy((t$1) => Ny(0, 0, "AGFzbQEAAAABKwdgBH9/f38AYAABf2AAAGADf39/AGAJf39/f39/f39/AX9gAX8AYAF/AX8CEwEDZW52Bm1lbW9yeQIBkAiAgAQDCgkCAwAABAEFBgEEBQFwAQICBgkBfwFBkIjAAgsHfQoDeG9yAAEBRwACAkcyAAMFZ2V0TFoABBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALX2luaXRpYWxpemUAABBfX2Vycm5vX2xvY2F0aW9uAAgJc3RhY2tTYXZlAAUMc3RhY2tSZXN0b3JlAAYKc3RhY2tBbGxvYwAHCQcBAEEBCwEACs0gCQMAAQtYAQJ/A0AgACAEQQR0IgNqIAIgA2r9AAQAIAEgA2r9AAQA/VH9CwQAIAAgA0EQciIDaiACIANq/QAEACABIANq/QAEAP1R/QsEACAEQQJqIgRBwABHDQALC7ceAgt7A38DQCADIBFBBHQiD2ogASAPav0ABAAgACAPav0ABAD9USIF/QsEACACIA9qIAX9CwQAIAMgD0EQciIPaiABIA9q/QAEACAAIA9q/QAEAP1RIgX9CwQAIAIgD2ogBf0LBAAgEUECaiIRQcAARw0ACwNAIAMgEEEHdGoiAEEQaiAA/QAEcCAA/QAEMCIFIAD9AAQQIgT9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAQgBP0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9USIJQSD9ywEgCUEg/c0B/VAiCSAA/QAEUCIG/c4BIAkgCf0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIGIAX9USIFQSj9ywEgBUEY/c0B/VAiCCAE/c4BIAggCP0NAAECAwgJCgsAAQIDCAkKCyAEIAT9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIKIAogCf1RIgVBMP3LASAFQRD9zQH9UCIFIAb9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgkgCP1RIgRBAf3LASAEQT/9zQH9UCIMIAD9AARgIAD9AAQgIgQgAP0ABAAiBv3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBv1RIghBIP3LASAIQSD9zQH9UCIIIABBQGsiAf0ABAAiB/3OASAIIAj9DQABAgMICQoLAAECAwgJCgsgByAH/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiByAE/VEiBEEo/csBIARBGP3NAf1QIgsgBv3OASALIAv9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAI/VEiBEEw/csBIARBEP3NAf1QIgQgB/3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgByAH/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCCAL/VEiB0EB/csBIAdBP/3NAf1QIg0gDf0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eHyIH/c4BIAcgB/0NAAECAwgJCgsAAQIDCAkKCyAKIAr9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIKIAQgBSAF/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/VEiC0Eg/csBIAtBIP3NAf1QIgsgCP3OASALIAv9DQABAgMICQoLAAECAwgJCgsgCCAI/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCCAH/VEiB0Eo/csBIAdBGP3NAf1QIgcgCv3OASAHIAf9DQABAgMICQoLAAECAwgJCgsgCiAK/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiDv0LBAAgACAGIA0gDCAM/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4fIgr9zgEgCiAK/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgYgBSAEIAT9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9USIFQSD9ywEgBUEg/c0B/VAiBSAJ/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAJIAn9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJIAr9USIEQSj9ywEgBEEY/c0B/VAiCiAG/c4BIAogCv0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIE/QsEACAAIAQgBf1RIgVBMP3LASAFQRD9zQH9UCIFIA4gC/1RIgRBMP3LASAEQRD9zQH9UCIEIAT9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwRgIAAgBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwRwIAEgBCAI/c4BIAQgBP0NAAECAwgJCgsAAQIDCAkKCyAIIAj9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIE/QsEACAAIAUgCf3OASAFIAX9DQABAgMICQoLAAECAwgJCgsgCSAJ/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCf0LBFAgACAEIAf9USIFQQH9ywEgBUE//c0B/VAiBSAJIAr9USIEQQH9ywEgBEE//c0B/VAiBCAE/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEICAAIAQgBSAF/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEMCAQQQFqIhBBCEcNAAtBACEQA0AgAyAQQQR0aiIAQYABaiAA/QAEgAcgAP0ABIADIgUgAP0ABIABIgT9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAQgBP0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9USIJQSD9ywEgCUEg/c0B/VAiCSAA/QAEgAUiBv3OASAJIAn9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAF/VEiBUEo/csBIAVBGP3NAf1QIgggBP3OASAIIAj9DQABAgMICQoLAAECAwgJCgsgBCAE/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCiAKIAn9USIFQTD9ywEgBUEQ/c0B/VAiBSAG/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJIAj9USIEQQH9ywEgBEE//c0B/VAiDCAA/QAEgAYgAP0ABIACIgQgAP0ABAAiBv3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBv1RIghBIP3LASAIQSD9zQH9UCIIIAD9AASABCIH/c4BIAggCP0NAAECAwgJCgsAAQIDCAkKCyAHIAf9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIHIAT9USIEQSj9ywEgBEEY/c0B/VAiCyAG/c4BIAsgC/0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIGIAj9USIEQTD9ywEgBEEQ/c0B/VAiBCAH/c4BIAQgBP0NAAECAwgJCgsAAQIDCAkKCyAHIAf9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIIIAv9USIHQQH9ywEgB0E//c0B/VAiDSAN/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4fIgf9zgEgByAH/Q0AAQIDCAkKCwABAgMICQoLIAogCv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgogBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9USILQSD9ywEgC0Eg/c0B/VAiCyAI/c4BIAsgC/0NAAECAwgJCgsAAQIDCAkKCyAIIAj9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIIIAf9USIHQSj9ywEgB0EY/c0B/VAiByAK/c4BIAcgB/0NAAECAwgJCgsAAQIDCAkKCyAKIAr9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIO/QsEACAAIAYgDSAMIAz9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh8iCv3OASAKIAr9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAFIAQgBP0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/1RIgVBIP3LASAFQSD9zQH9UCIFIAn9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAkgCf0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgkgCv1RIgRBKP3LASAEQRj9zQH9UCIKIAb9zgEgCiAK/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9CwQAIAAgBCAF/VEiBUEw/csBIAVBEP3NAf1QIgUgDiAL/VEiBEEw/csBIARBEP3NAf1QIgQgBP0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/0LBIAGIAAgBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwSAByAAIAQgCP3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgCCAI/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBP0LBIAEIAAgBSAJ/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAJIAn9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJ/QsEgAUgACAEIAf9USIFQQH9ywEgBUE//c0B/VAiBSAJIAr9USIEQQH9ywEgBEE//c0B/VAiBCAE/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEgAIgACAEIAUgBf0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/0LBIADIBBBAWoiEEEIRw0AC0EAIRADQCACIBBBBHQiAGoiASAAIANq/QAEACAB/QAEAP1R/QsEACACIABBEHIiAWoiDyABIANq/QAEACAP/QAEAP1R/QsEACACIABBIHIiAWoiDyABIANq/QAEACAP/QAEAP1R/QsEACACIABBMHIiAGoiASAAIANq/QAEACAB/QAEAP1R/QsEACAQQQRqIhBBwABHDQALCxYAIAAgASACIAMQAiAAIAIgAiADEAILewIBfwF+IAIhCSABNQIAIQogBCAFcgRAIAEoAgQgA3AhCQsgACAJNgIAIAAgB0EBayAFIAQbIAhsIAZBAWtBAEF/IAYbIAIgCUYbaiIBIAVBAWogCGxBACAEG2ogAa0gCiAKfkIgiH5CIIinQX9zaiAHIAhscDYCBCAACwQAIwALBgAgACQACxAAIwAgAGtBcHEiACQAIAALBQBBgAgL", t$1), (t$1) => Ny(0, 0, "AGFzbQEAAAABPwhgBH9/f38AYAABf2AAAGADf39/AGARf39/f39/f39/f39/f39/f38AYAl/f39/f39/f38Bf2ABfwBgAX8BfwITAQNlbnYGbWVtb3J5AgGQCICABAMLCgIDBAAABQEGBwEEBQFwAQICBgkBfwFBkIjAAgsHfQoDeG9yAAEBRwADAkcyAAQFZ2V0TFoABRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALX2luaXRpYWxpemUAABBfX2Vycm5vX2xvY2F0aW9uAAkJc3RhY2tTYXZlAAYMc3RhY2tSZXN0b3JlAAcKc3RhY2tBbGxvYwAICQcBAEEBCwEACssaCgMAAQtQAQJ/A0AgACAEQQN0IgNqIAIgA2opAwAgASADaikDAIU3AwAgACADQQhyIgNqIAIgA2opAwAgASADaikDAIU3AwAgBEECaiIEQYABRw0ACwveDwICfgF/IAAgAUEDdGoiEyATKQMAIhEgACAFQQN0aiIBKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA1BA3RqIgUgESAFKQMAhUIgiSIRNwMAIAAgCUEDdGoiCSARIAkpAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAEgESABKQMAhUIoiSIRNwMAIBMgESATKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAFIBEgBSkDAIVCMIkiETcDACAJIBEgCSkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgASARIAEpAwCFQgGJNwMAIAAgAkEDdGoiDSANKQMAIhEgACAGQQN0aiICKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA5BA3RqIgYgESAGKQMAhUIgiSIRNwMAIAAgCkEDdGoiCiARIAopAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAIgESACKQMAhUIoiSIRNwMAIA0gESANKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAGIBEgBikDAIVCMIkiETcDACAKIBEgCikDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAiARIAIpAwCFQgGJNwMAIAAgA0EDdGoiDiAOKQMAIhEgACAHQQN0aiIDKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA9BA3RqIgcgESAHKQMAhUIgiSIRNwMAIAAgC0EDdGoiCyARIAspAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAMgESADKQMAhUIoiSIRNwMAIA4gESAOKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAHIBEgBykDAIVCMIkiETcDACALIBEgCykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAyARIAMpAwCFQgGJNwMAIAAgBEEDdGoiDyAPKQMAIhEgACAIQQN0aiIEKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIBBBA3RqIgggESAIKQMAhUIgiSIRNwMAIAAgDEEDdGoiACARIAApAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAQgESAEKQMAhUIoiSIRNwMAIA8gESAPKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAIIBEgCCkDAIVCMIkiETcDACAAIBEgACkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgBCARIAQpAwCFQgGJNwMAIBMgEykDACIRIAIpAwAiEnwgEUIBhkL+////H4MgEkL/////D4N+fCIRNwMAIAggESAIKQMAhUIgiSIRNwMAIAsgESALKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACACIBEgAikDAIVCKIkiETcDACATIBEgEykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgCCARIAgpAwCFQjCJIhE3AwAgCyARIAspAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAIgESACKQMAhUIBiTcDACANIA0pAwAiESADKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAFIBEgBSkDAIVCIIkiETcDACAAIBEgACkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAyARIAMpAwCFQiiJIhE3AwAgDSARIA0pAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAUgESAFKQMAhUIwiSIRNwMAIAAgESAAKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACADIBEgAykDAIVCAYk3AwAgDiAOKQMAIhEgBCkDACISfCARQgGGQv7///8fgyASQv////8Pg358IhE3AwAgBiARIAYpAwCFQiCJIhE3AwAgCSARIAkpAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAQgESAEKQMAhUIoiSIRNwMAIA4gESAOKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAGIBEgBikDAIVCMIkiETcDACAJIBEgCSkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgBCARIAQpAwCFQgGJNwMAIA8gDykDACIRIAEpAwAiEnwgEUIBhkL+////H4MgEkL/////D4N+fCIRNwMAIAcgESAHKQMAhUIgiSIRNwMAIAogESAKKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACABIBEgASkDAIVCKIkiETcDACAPIBEgDykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgByARIAcpAwCFQjCJIhE3AwAgCiARIAopAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAEgESABKQMAhUIBiTcDAAvdCAEPfwNAIAIgBUEDdCIGaiABIAZqKQMAIAAgBmopAwCFNwMAIAIgBkEIciIGaiABIAZqKQMAIAAgBmopAwCFNwMAIAVBAmoiBUGAAUcNAAsDQCADIARBA3QiAGogACACaikDADcDACADIARBAXIiAEEDdCIBaiABIAJqKQMANwMAIAMgBEECciIBQQN0IgVqIAIgBWopAwA3AwAgAyAEQQNyIgVBA3QiBmogAiAGaikDADcDACADIARBBHIiBkEDdCIHaiACIAdqKQMANwMAIAMgBEEFciIHQQN0IghqIAIgCGopAwA3AwAgAyAEQQZyIghBA3QiCWogAiAJaikDADcDACADIARBB3IiCUEDdCIKaiACIApqKQMANwMAIAMgBEEIciIKQQN0IgtqIAIgC2opAwA3AwAgAyAEQQlyIgtBA3QiDGogAiAMaikDADcDACADIARBCnIiDEEDdCINaiACIA1qKQMANwMAIAMgBEELciINQQN0Ig5qIAIgDmopAwA3AwAgAyAEQQxyIg5BA3QiD2ogAiAPaikDADcDACADIARBDXIiD0EDdCIQaiACIBBqKQMANwMAIAMgBEEOciIQQQN0IhFqIAIgEWopAwA3AwAgAyAEQQ9yIhFBA3QiEmogAiASaikDADcDACADIARB//8DcSAAQf//A3EgAUH//wNxIAVB//8DcSAGQf//A3EgB0H//wNxIAhB//8DcSAJQf//A3EgCkH//wNxIAtB//8DcSAMQf//A3EgDUH//wNxIA5B//8DcSAPQf//A3EgEEH//wNxIBFB//8DcRACIARB8ABJIQAgBEEQaiEEIAANAAtBACEBIANBAEEBQRBBEUEgQSFBMEExQcAAQcEAQdAAQdEAQeAAQeEAQfAAQfEAEAIgA0ECQQNBEkETQSJBI0EyQTNBwgBBwwBB0gBB0wBB4gBB4wBB8gBB8wAQAiADQQRBBUEUQRVBJEElQTRBNUHEAEHFAEHUAEHVAEHkAEHlAEH0AEH1ABACIANBBkEHQRZBF0EmQSdBNkE3QcYAQccAQdYAQdcAQeYAQecAQfYAQfcAEAIgA0EIQQlBGEEZQShBKUE4QTlByABByQBB2ABB2QBB6ABB6QBB+ABB+QAQAiADQQpBC0EaQRtBKkErQTpBO0HKAEHLAEHaAEHbAEHqAEHrAEH6AEH7ABACIANBDEENQRxBHUEsQS1BPEE9QcwAQc0AQdwAQd0AQewAQe0AQfwAQf0AEAIgA0EOQQ9BHkEfQS5BL0E+QT9BzgBBzwBB3gBB3wBB7gBB7wBB/gBB/wAQAgNAIAIgAUEDdCIAaiIEIAAgA2opAwAgBCkDAIU3AwAgAiAAQQhyIgRqIgUgAyAEaikDACAFKQMAhTcDACACIABBEHIiBGoiBSADIARqKQMAIAUpAwCFNwMAIAIgAEEYciIAaiIEIAAgA2opAwAgBCkDAIU3AwAgAUEEaiIBQYABRw0ACwsWACAAIAEgAiADEAMgACACIAIgAxADC3sCAX8BfiACIQkgATUCACEKIAQgBXIEQCABKAIEIANwIQkLIAAgCTYCACAAIAdBAWsgBSAEGyAIbCAGQQFrQQBBfyAGGyACIAlGG2oiASAFQQFqIAhsQQAgBBtqIAGtIAogCn5CIIh+QiCIp0F/c2ogByAIbHA2AgQgAAsEACMACwYAIAAkAAsQACMAIABrQXBxIgAkACAACwUAQYAICw==", t$1))
});
function Yy() {
	if (Oy) return Ly;
	Oy = 1;
	var t$1 = [
		0,
		1,
		3,
		7,
		15,
		31,
		63,
		127,
		255
	], e$1 = function(t$2) {
		this.stream = t$2, this.bitOffset = 0, this.curByte = 0, this.hasByte = !1;
	};
	return e$1.prototype._ensureByte = function() {
		this.hasByte || (this.curByte = this.stream.readByte(), this.hasByte = !0);
	}, e$1.prototype.read = function(e$2) {
		for (var r$1 = 0; e$2 > 0;) {
			this._ensureByte();
			var n$1 = 8 - this.bitOffset;
			if (e$2 >= n$1) r$1 <<= n$1, r$1 |= t$1[n$1] & this.curByte, this.hasByte = !1, this.bitOffset = 0, e$2 -= n$1;
else {
				r$1 <<= e$2;
				var i$1 = n$1 - e$2;
				r$1 |= (this.curByte & t$1[e$2] << i$1) >> i$1, this.bitOffset += e$2, e$2 = 0;
			}
		}
		return r$1;
	}, e$1.prototype.seek = function(t$2) {
		var e$2 = t$2 % 8, r$1 = (t$2 - e$2) / 8;
		this.bitOffset = e$2, this.stream.seek(r$1), this.hasByte = !1;
	}, e$1.prototype.pi = function() {
		var t$2, e$2 = new Uint8Array(6);
		for (t$2 = 0; t$2 < e$2.length; t$2++) e$2[t$2] = this.read(8);
		return function(t$3) {
			return Array.prototype.map.call(t$3, (t$4) => ("00" + t$4.toString(16)).slice(-2)).join("");
		}(e$2);
	}, Ly = e$1;
}
var Zy = function() {
	if (Vy) return jy;
	Vy = 1;
	var t$1, e$1 = Yy(), r$1 = function() {
		if (zy) return Hy;
		zy = 1;
		var t$2 = function() {};
		return t$2.prototype.readByte = function() {
			throw Error("abstract method readByte() not implemented");
		}, t$2.prototype.read = function(t$3, e$2, r$2) {
			for (var n$2 = 0; n$2 < r$2;) {
				var i$2 = this.readByte();
				if (i$2 < 0) return 0 === n$2 ? -1 : n$2;
				t$3[e$2++] = i$2, n$2++;
			}
			return n$2;
		}, t$2.prototype.seek = function(t$3) {
			throw Error("abstract method seek() not implemented");
		}, t$2.prototype.writeByte = function(t$3) {
			throw Error("abstract method readByte() not implemented");
		}, t$2.prototype.write = function(t$3, e$2, r$2) {
			var n$2;
			for (n$2 = 0; n$2 < r$2; n$2++) this.writeByte(t$3[e$2++]);
			return r$2;
		}, t$2.prototype.flush = function() {}, Hy = t$2;
	}(), n$1 = _y ? Gy : (_y = 1, t$1 = new Uint32Array([
		0,
		79764919,
		159529838,
		222504665,
		319059676,
		398814059,
		445009330,
		507990021,
		638119352,
		583659535,
		797628118,
		726387553,
		890018660,
		835552979,
		1015980042,
		944750013,
		1276238704,
		1221641927,
		1167319070,
		1095957929,
		1595256236,
		1540665371,
		1452775106,
		1381403509,
		1780037320,
		1859660671,
		1671105958,
		1733955601,
		2031960084,
		2111593891,
		1889500026,
		1952343757,
		2552477408,
		2632100695,
		2443283854,
		2506133561,
		2334638140,
		2414271883,
		2191915858,
		2254759653,
		3190512472,
		3135915759,
		3081330742,
		3009969537,
		2905550212,
		2850959411,
		2762807018,
		2691435357,
		3560074640,
		3505614887,
		3719321342,
		3648080713,
		3342211916,
		3287746299,
		3467911202,
		3396681109,
		4063920168,
		4143685023,
		4223187782,
		4286162673,
		3779000052,
		3858754371,
		3904687514,
		3967668269,
		881225847,
		809987520,
		1023691545,
		969234094,
		662832811,
		591600412,
		771767749,
		717299826,
		311336399,
		374308984,
		453813921,
		533576470,
		25881363,
		88864420,
		134795389,
		214552010,
		2023205639,
		2086057648,
		1897238633,
		1976864222,
		1804852699,
		1867694188,
		1645340341,
		1724971778,
		1587496639,
		1516133128,
		1461550545,
		1406951526,
		1302016099,
		1230646740,
		1142491917,
		1087903418,
		2896545431,
		2825181984,
		2770861561,
		2716262478,
		3215044683,
		3143675388,
		3055782693,
		3001194130,
		2326604591,
		2389456536,
		2200899649,
		2280525302,
		2578013683,
		2640855108,
		2418763421,
		2498394922,
		3769900519,
		3832873040,
		3912640137,
		3992402750,
		4088425275,
		4151408268,
		4197601365,
		4277358050,
		3334271071,
		3263032808,
		3476998961,
		3422541446,
		3585640067,
		3514407732,
		3694837229,
		3640369242,
		1762451694,
		1842216281,
		1619975040,
		1682949687,
		2047383090,
		2127137669,
		1938468188,
		2001449195,
		1325665622,
		1271206113,
		1183200824,
		1111960463,
		1543535498,
		1489069629,
		1434599652,
		1363369299,
		622672798,
		568075817,
		748617968,
		677256519,
		907627842,
		853037301,
		1067152940,
		995781531,
		51762726,
		131386257,
		177728840,
		240578815,
		269590778,
		349224269,
		429104020,
		491947555,
		4046411278,
		4126034873,
		4172115296,
		4234965207,
		3794477266,
		3874110821,
		3953728444,
		4016571915,
		3609705398,
		3555108353,
		3735388376,
		3664026991,
		3290680682,
		3236090077,
		3449943556,
		3378572211,
		3174993278,
		3120533705,
		3032266256,
		2961025959,
		2923101090,
		2868635157,
		2813903052,
		2742672763,
		2604032198,
		2683796849,
		2461293480,
		2524268063,
		2284983834,
		2364738477,
		2175806836,
		2238787779,
		1569362073,
		1498123566,
		1409854455,
		1355396672,
		1317987909,
		1246755826,
		1192025387,
		1137557660,
		2072149281,
		2135122070,
		1912620623,
		1992383480,
		1753615357,
		1816598090,
		1627664531,
		1707420964,
		295390185,
		358241886,
		404320391,
		483945776,
		43990325,
		106832002,
		186451547,
		266083308,
		932423249,
		861060070,
		1041341759,
		986742920,
		613929101,
		542559546,
		756411363,
		701822548,
		3316196985,
		3244833742,
		3425377559,
		3370778784,
		3601682597,
		3530312978,
		3744426955,
		3689838204,
		3819031489,
		3881883254,
		3928223919,
		4007849240,
		4037393693,
		4100235434,
		4180117107,
		4259748804,
		2310601993,
		2373574846,
		2151335527,
		2231098320,
		2596047829,
		2659030626,
		2470359227,
		2550115596,
		2947551409,
		2876312838,
		2788305887,
		2733848168,
		3165939309,
		3094707162,
		3040238851,
		2985771188
	]), Gy = function() {
		var e$2 = 4294967295;
		this.getCRC = function() {
			return ~e$2 >>> 0;
		}, this.updateCRC = function(r$2) {
			e$2 = e$2 << 8 ^ t$1[255 & (e$2 >>> 24 ^ r$2)];
		}, this.updateCRCRun = function(r$2, n$2) {
			for (; n$2-- > 0;) e$2 = e$2 << 8 ^ t$1[255 & (e$2 >>> 24 ^ r$2)];
		};
	}), i$1 = function(t$2, e$2) {
		var r$2, n$2 = t$2[e$2];
		for (r$2 = e$2; r$2 > 0; r$2--) t$2[r$2] = t$2[r$2 - 1];
		return t$2[0] = n$2, n$2;
	}, s$1 = {
		OK: 0,
		LAST_BLOCK: -1,
		NOT_BZIP_DATA: -2,
		UNEXPECTED_INPUT_EOF: -3,
		UNEXPECTED_OUTPUT_EOF: -4,
		DATA_ERROR: -5,
		OUT_OF_MEMORY: -6,
		OBSOLETE_INPUT: -7,
		END_OF_BLOCK: -8
	}, a$1 = {};
	a$1[s$1.LAST_BLOCK] = "Bad file checksum", a$1[s$1.NOT_BZIP_DATA] = "Not bzip data", a$1[s$1.UNEXPECTED_INPUT_EOF] = "Unexpected input EOF", a$1[s$1.UNEXPECTED_OUTPUT_EOF] = "Unexpected output EOF", a$1[s$1.DATA_ERROR] = "Data error", a$1[s$1.OUT_OF_MEMORY] = "Out of memory", a$1[s$1.OBSOLETE_INPUT] = "Obsolete (pre 0.9.5) bzip format not supported.";
	var o$1 = function(t$2, e$2) {
		var r$2 = a$1[t$2] || "unknown error";
		e$2 && (r$2 += ": " + e$2);
		var n$2 = new TypeError(r$2);
		throw n$2.errorCode = t$2, n$2;
	}, c$1 = function(t$2, e$2) {
		this.writePos = this.writeCurrent = this.writeCount = 0, this._start_bunzip(t$2, e$2);
	};
	c$1.prototype._init_block = function() {
		return this._get_next_block() ? (this.blockCRC = new n$1(), !0) : (this.writeCount = -1, !1);
	}, c$1.prototype._start_bunzip = function(t$2, r$2) {
		var n$2 = new Uint8Array(4);
		4 === t$2.read(n$2, 0, 4) && "BZh" === String.fromCharCode(n$2[0], n$2[1], n$2[2]) || o$1(s$1.NOT_BZIP_DATA, "bad magic");
		var i$2 = n$2[3] - 48;
		(i$2 < 1 || i$2 > 9) && o$1(s$1.NOT_BZIP_DATA, "level out of range"), this.reader = new e$1(t$2), this.dbufSize = 1e5 * i$2, this.nextoutput = 0, this.outputStream = r$2, this.streamCRC = 0;
	}, c$1.prototype._get_next_block = function() {
		var t$2, e$2, r$2, n$2 = this.reader, a$2 = n$2.pi();
		if ("177245385090" === a$2) return !1;
		"314159265359" !== a$2 && o$1(s$1.NOT_BZIP_DATA), this.targetBlockCRC = n$2.read(32) >>> 0, this.streamCRC = (this.targetBlockCRC ^ (this.streamCRC << 1 | this.streamCRC >>> 31)) >>> 0, n$2.read(1) && o$1(s$1.OBSOLETE_INPUT);
		var c$2 = n$2.read(24);
		c$2 > this.dbufSize && o$1(s$1.DATA_ERROR, "initial position out of bounds");
		var u$2 = n$2.read(16), h$2 = new Uint8Array(256), f$1 = 0;
		for (t$2 = 0; t$2 < 16; t$2++) if (u$2 & 1 << 15 - t$2) {
			var l$1 = 16 * t$2;
			for (r$2 = n$2.read(16), e$2 = 0; e$2 < 16; e$2++) r$2 & 1 << 15 - e$2 && (h$2[f$1++] = l$1 + e$2);
		}
		var y$1 = n$2.read(3);
		(y$1 < 2 || y$1 > 6) && o$1(s$1.DATA_ERROR);
		var g$1 = n$2.read(15);
		0 === g$1 && o$1(s$1.DATA_ERROR);
		var p$1 = new Uint8Array(256);
		for (t$2 = 0; t$2 < y$1; t$2++) p$1[t$2] = t$2;
		var d$1 = new Uint8Array(g$1);
		for (t$2 = 0; t$2 < g$1; t$2++) {
			for (e$2 = 0; n$2.read(1); e$2++) e$2 >= y$1 && o$1(s$1.DATA_ERROR);
			d$1[t$2] = i$1(p$1, e$2);
		}
		var A$1, w$1 = f$1 + 2, m$1 = [];
		for (e$2 = 0; e$2 < y$1; e$2++) {
			var b$1, k$1, E$1 = new Uint8Array(w$1), v$1 = new Uint16Array(21);
			for (u$2 = n$2.read(5), t$2 = 0; t$2 < w$1; t$2++) {
				for (; (u$2 < 1 || u$2 > 20) && o$1(s$1.DATA_ERROR), n$2.read(1);) n$2.read(1) ? u$2-- : u$2++;
				E$1[t$2] = u$2;
			}
			for (b$1 = k$1 = E$1[0], t$2 = 1; t$2 < w$1; t$2++) E$1[t$2] > k$1 ? k$1 = E$1[t$2] : E$1[t$2] < b$1 && (b$1 = E$1[t$2]);
			A$1 = {}, m$1.push(A$1), A$1.permute = new Uint16Array(258), A$1.limit = new Uint32Array(22), A$1.base = new Uint32Array(21), A$1.minLen = b$1, A$1.maxLen = k$1;
			var B$1 = 0;
			for (t$2 = b$1; t$2 <= k$1; t$2++) for (v$1[t$2] = A$1.limit[t$2] = 0, u$2 = 0; u$2 < w$1; u$2++) E$1[u$2] === t$2 && (A$1.permute[B$1++] = u$2);
			for (t$2 = 0; t$2 < w$1; t$2++) v$1[E$1[t$2]]++;
			for (B$1 = u$2 = 0, t$2 = b$1; t$2 < k$1; t$2++) B$1 += v$1[t$2], A$1.limit[t$2] = B$1 - 1, B$1 <<= 1, u$2 += v$1[t$2], A$1.base[t$2 + 1] = B$1 - u$2;
			A$1.limit[k$1 + 1] = Number.MAX_VALUE, A$1.limit[k$1] = B$1 + v$1[k$1] - 1, A$1.base[b$1] = 0;
		}
		var I$1 = new Uint32Array(256);
		for (t$2 = 0; t$2 < 256; t$2++) p$1[t$2] = t$2;
		var S$1, K$1 = 0, C$1 = 0, D$1 = 0, U$1 = this.dbuf = new Uint32Array(this.dbufSize);
		for (w$1 = 0;;) {
			for (w$1-- || (w$1 = 49, D$1 >= g$1 && o$1(s$1.DATA_ERROR), A$1 = m$1[d$1[D$1++]]), t$2 = A$1.minLen, e$2 = n$2.read(t$2); t$2 > A$1.maxLen && o$1(s$1.DATA_ERROR), !(e$2 <= A$1.limit[t$2]); t$2++) e$2 = e$2 << 1 | n$2.read(1);
			((e$2 -= A$1.base[t$2]) < 0 || e$2 >= 258) && o$1(s$1.DATA_ERROR);
			var P$1 = A$1.permute[e$2];
			if (0 !== P$1 && 1 !== P$1) {
				if (K$1) for (K$1 = 0, C$1 + u$2 > this.dbufSize && o$1(s$1.DATA_ERROR), I$1[S$1 = h$2[p$1[0]]] += u$2; u$2--;) U$1[C$1++] = S$1;
				if (P$1 > f$1) break;
				C$1 >= this.dbufSize && o$1(s$1.DATA_ERROR), I$1[S$1 = h$2[S$1 = i$1(p$1, t$2 = P$1 - 1)]]++, U$1[C$1++] = S$1;
			} else K$1 || (K$1 = 1, u$2 = 0), u$2 += 0 === P$1 ? K$1 : 2 * K$1, K$1 <<= 1;
		}
		for ((c$2 < 0 || c$2 >= C$1) && o$1(s$1.DATA_ERROR), e$2 = 0, t$2 = 0; t$2 < 256; t$2++) r$2 = e$2 + I$1[t$2], I$1[t$2] = e$2, e$2 = r$2;
		for (t$2 = 0; t$2 < C$1; t$2++) U$1[I$1[S$1 = 255 & U$1[t$2]]] |= t$2 << 8, I$1[S$1]++;
		var x$1 = 0, Q$1 = 0, R$1 = 0;
		return C$1 && (Q$1 = 255 & (x$1 = U$1[c$2]), x$1 >>= 8, R$1 = -1), this.writePos = x$1, this.writeCurrent = Q$1, this.writeCount = C$1, this.writeRun = R$1, !0;
	}, c$1.prototype._read_bunzip = function(t$2, e$2) {
		var r$2, n$2, i$2;
		if (this.writeCount < 0) return 0;
		var a$2 = this.dbuf, c$2 = this.writePos, u$2 = this.writeCurrent, h$2 = this.writeCount;
		this.outputsize;
		for (var f$1 = this.writeRun; h$2;) {
			for (h$2--, n$2 = u$2, u$2 = 255 & (c$2 = a$2[c$2]), c$2 >>= 8, 3 == f$1++ ? (r$2 = u$2, i$2 = n$2, u$2 = -1) : (r$2 = 1, i$2 = u$2), this.blockCRC.updateCRCRun(i$2, r$2); r$2--;) this.outputStream.writeByte(i$2), this.nextoutput++;
			u$2 != n$2 && (f$1 = 0);
		}
		return this.writeCount = h$2, this.blockCRC.getCRC() !== this.targetBlockCRC && o$1(s$1.DATA_ERROR, "Bad block CRC (got " + this.blockCRC.getCRC().toString(16) + " expected " + this.targetBlockCRC.toString(16) + ")"), this.nextoutput;
	};
	var u$1 = function(t$2) {
		if ("readByte" in t$2) return t$2;
		var e$2 = new r$1();
		return e$2.pos = 0, e$2.readByte = function() {
			return t$2[this.pos++];
		}, e$2.seek = function(t$3) {
			this.pos = t$3;
		}, e$2.eof = function() {
			return this.pos >= t$2.length;
		}, e$2;
	}, h$1 = function(t$2) {
		var e$2 = new r$1(), n$2 = !0;
		if (t$2) if ("number" == typeof t$2) e$2.buffer = new Uint8Array(t$2), n$2 = !1;
else {
			if ("writeByte" in t$2) return t$2;
			e$2.buffer = t$2, n$2 = !1;
		}
else e$2.buffer = new Uint8Array(16384);
		return e$2.pos = 0, e$2.writeByte = function(t$3) {
			if (n$2 && this.pos >= this.buffer.length) {
				var e$3 = new Uint8Array(2 * this.buffer.length);
				e$3.set(this.buffer), this.buffer = e$3;
			}
			this.buffer[this.pos++] = t$3;
		}, e$2.getBuffer = function() {
			if (this.pos !== this.buffer.length) {
				if (!n$2) throw new TypeError("outputsize does not match decoded input");
				var t$3 = new Uint8Array(this.pos);
				t$3.set(this.buffer.subarray(0, this.pos)), this.buffer = t$3;
			}
			return this.buffer;
		}, e$2._coerced = !0, e$2;
	};
	return jy = {
		Bunzip: c$1,
		Stream: r$1,
		Err: s$1,
		decode: function(t$2, e$2, r$2) {
			for (var n$2 = u$1(t$2), i$2 = h$1(e$2), a$2 = new c$1(n$2, i$2); !("eof" in n$2) || !n$2.eof();) if (a$2._init_block()) a$2._read_bunzip();
else {
				var f$1 = a$2.reader.read(32) >>> 0;
				if (f$1 !== a$2.streamCRC && o$1(s$1.DATA_ERROR, "Bad stream CRC (got " + a$2.streamCRC.toString(16) + " expected " + f$1.toString(16) + ")"), !r$2 || !("eof" in n$2) || n$2.eof()) break;
				a$2._start_bunzip(n$2, i$2);
			}
			if ("getBuffer" in i$2) return i$2.getBuffer();
		},
		decodeBlock: function(t$2, e$2, r$2) {
			var i$2 = u$1(t$2), s$2 = h$1(r$2), a$2 = new c$1(i$2, s$2);
			if (a$2.reader.seek(e$2), a$2._get_next_block() && (a$2.blockCRC = new n$1(), a$2.writeCopies = 0, a$2._read_bunzip()), "getBuffer" in s$2) return s$2.getBuffer();
		},
		table: function(t$2, e$2, n$2) {
			var i$2 = new r$1();
			i$2.delegate = u$1(t$2), i$2.pos = 0, i$2.readByte = function() {
				return this.pos++, this.delegate.readByte();
			}, i$2.delegate.eof && (i$2.eof = i$2.delegate.eof.bind(i$2.delegate));
			var s$2 = new r$1();
			s$2.pos = 0, s$2.writeByte = function() {
				this.pos++;
			};
			for (var a$2 = new c$1(i$2, s$2), o$2 = a$2.dbufSize; !("eof" in i$2) || !i$2.eof();) {
				var h$2 = 8 * i$2.pos + a$2.reader.bitOffset;
				if (a$2.reader.hasByte && (h$2 -= 8), a$2._init_block()) {
					var f$1 = s$2.pos;
					a$2._read_bunzip(), e$2(h$2, s$2.pos - f$1);
				} else {
					if (a$2.reader.read(32), !n$2 || !("eof" in i$2) || i$2.eof()) break;
					a$2._start_bunzip(i$2, s$2), console.assert(a$2.dbufSize === o$2, "shouldn't change block size within multistream file");
				}
			}
		}
	};
}(), Jy = /*#__PURE__*/ e({ __proto__: null }, [Zy]);

//#endregion
//#region plugins/pgpcord/lib/api.ts
const SUPABASE_URL = "https://pkbbwljgdyblxtroicpd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aiZeSeoUYh5roraVYEA8Bw_8cvn7ewe";
const publicKeyCache = new Map();
const CACHE_TTL = 3e5;
async function getPublicKeys(userIds) {
	const now = Date.now();
	const missingIds = [];
	const cachedKeys = [];
	for (const id of userIds) {
		const cached = publicKeyCache.get(id);
		const isHit = cached && cached.key;
		const ttl = isHit ? CACHE_TTL : 3e4;
		if (cached && now - cached.timestamp < ttl) {
			if (cached.key) cachedKeys.push(cached.key);
		} else missingIds.push(id);
	}
	if (missingIds.length === 0) return cachedKeys;
	const query = new URLSearchParams();
	if (missingIds.length === 1) query.append("discord_id", `eq.${missingIds[0]}`);
else query.append("discord_id", `in.(${missingIds.join(",")})`);
	query.append("select", "*");
	try {
		const response = await fetch(`${SUPABASE_URL}/rest/v1/user_keys?${query.toString()}`, {
			method: "GET",
			headers: {
				"apikey": SUPABASE_ANON_KEY,
				"Authorization": `Bearer ${SUPABASE_ANON_KEY}`
			}
		});
		if (!response.ok) {
			const error = await response.json();
			console.error("Supabase select error:", error);
			throw new Error("Failed to fetch public keys.");
		}
		const data = await response.json();
		for (const record of data) publicKeyCache.set(record.discord_id, {
			key: record,
			timestamp: now
		});
		const foundIds = new Set(data.map((r$1) => r$1.discord_id));
		for (const id of missingIds) if (!foundIds.has(id)) publicKeyCache.set(id, {
			key: null,
			timestamp: now
		});
		return [...cachedKeys, ...data || []];
	} catch (e$1) {
		console.error("PGPCord: Error fetching keys", e$1);
		return cachedKeys;
	}
}
let currentUserKeyCache = null;
async function checkCurrentUserKey() {
	const now = Date.now();
	if (currentUserKeyCache && now - currentUserKeyCache.timestamp < CACHE_TTL) return currentUserKeyCache.key;
	const userId = shelter.flux.stores.UserStore.getCurrentUser()?.id;
	if (!userId) {
		console.error("PGPCord: Could not get current user ID.");
		return null;
	}
	const query = new URLSearchParams({
		select: "*",
		discord_id: `eq.${userId}`
	});
	try {
		const response = await fetch(`${SUPABASE_URL}/rest/v1/user_keys?${query.toString()}`, {
			method: "GET",
			headers: {
				"apikey": SUPABASE_ANON_KEY,
				"Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
				"Accept": "application/vnd.pgrst.object+json"
			}
		});
		if (!response.ok) {
			console.error("Supabase check error:", await response.text());
			return null;
		}
		const data = await response.json();
		const keyRecord = data;
		currentUserKeyCache = {
			key: keyRecord,
			timestamp: now
		};
		return keyRecord;
	} catch (e$1) {
		currentUserKeyCache = {
			key: null,
			timestamp: now
		};
		return null;
	}
}

//#endregion
//#region plugins/pgpcord/lib/crypto.ts
var import_solid_js$4 = __toESM(require_solid_js(), 1);
const [privateKey, setPrivateKey] = (0, import_solid_js$4.createSignal)(null);
let cacheTimestamp = null;
var PassphraseRequiredError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "PassphraseRequiredError";
	}
};
async function generateKeyPair(passphrase) {
	const { privateKey: privateKey$1, publicKey } = await uo({
		type: "rsa",
		rsaBits: 4096,
		userIDs: [{
			name: "PGPCord User",
			email: "user@pgpcord.dev"
		}],
		passphrase,
		format: "armored"
	});
	const keyId = (await qa({ armoredKey: publicKey })).getKeyID().toHex();
	return {
		publicKey,
		privateKey: privateKey$1,
		keyId
	};
}
async function decryptAndCachePrivateKey(passphrase) {
	const keyPair = loadKeyPairFromLocalStorage();
	if (!keyPair) throw new Error("No key pair found in local storage.");
	console.log("PGPCord: Loading private key from storage. Length:", keyPair.privateKey.length);
	console.log("PGPCord: Private key start:", keyPair.privateKey.substring(0, 50));
	let cleanedKey = keyPair.privateKey.trim();
	if (cleanedKey.includes("\\n")) {
		console.log("PGPCord: Detected literal \\n in private key, fixing...");
		cleanedKey = cleanedKey.replace(/\\n/g, "\n");
	}
	const privateKey$1 = await Ya({ armoredKey: cleanedKey });
	if (privateKey$1.isDecrypted()) {
		console.log("PGPCord: Private key is already decrypted, caching directly.");
		setPrivateKey(privateKey$1);
		cacheTimestamp = Date.now();
		return privateKey$1;
	}
	const decryptedKey = await lo({
		privateKey: privateKey$1,
		passphrase
	});
	setPrivateKey(decryptedKey);
	cacheTimestamp = Date.now();
	return decryptedKey;
}
function getCachedPrivateKey() {
	const settings = shelter.plugin.store.pgpcord_settings || {
		cacheDuration: "session",
		cacheTimeMinutes: 15
	};
	const pk = privateKey();
	if (!pk || !cacheTimestamp) return null;
	if (settings.cacheDuration === "none") return null;
	if (settings.cacheDuration === "time") {
		const elapsedMinutes = (Date.now() - cacheTimestamp) / 6e4;
		if (elapsedMinutes > settings.cacheTimeMinutes) {
			setPrivateKey(null);
			cacheTimestamp = null;
			return null;
		}
	}
	return pk;
}
const usePrivateKey = privateKey;
function saveKeyPairToLocalStorage(keyPair) {
	shelter.plugin.store.pgpcord_keys = keyPair;
}
function loadKeyPairFromLocalStorage() {
	return shelter.plugin.store.pgpcord_keys;
}
async function encryptMessage(message, recipientIds) {
	const recipientKeysData = await getPublicKeys(recipientIds);
	if (recipientKeysData.length === 0) throw new Error("No valid recipient public keys found.");
	const recipientPublicKeys = await Promise.all(recipientKeysData.map(async (r$1) => {
		try {
			let cleanedKey = r$1.public_key.trim();
			if (cleanedKey.includes("\\n")) cleanedKey = cleanedKey.replace(/\\n/g, "\n");
			if (!cleanedKey.includes("\n") && cleanedKey.includes("-----BEGIN PGP PUBLIC KEY BLOCK-----")) {
				cleanedKey = cleanedKey.replace("-----BEGIN PGP PUBLIC KEY BLOCK-----", "-----BEGIN PGP PUBLIC KEY BLOCK-----\n");
				cleanedKey = cleanedKey.replace("-----END PGP PUBLIC KEY BLOCK-----", "\n-----END PGP PUBLIC KEY BLOCK-----");
			}
			console.log(`PGPCord: Parsing key for ${r$1.discord_id}`, cleanedKey);
			return await qa({ armoredKey: cleanedKey });
		} catch (e$1) {
			console.error(`PGPCord: Failed to parse key for user ${r$1.discord_id}`, e$1);
			return null;
		}
	}));
	const validKeys = recipientPublicKeys.filter((k$1) => k$1 !== null);
	if (validKeys.length === 0) throw new Error("No valid recipient public keys could be parsed.");
	const ownKeyPair = loadKeyPairFromLocalStorage();
	if (!ownKeyPair) throw new Error("Cannot encrypt message: Own key pair not found.");
	const ownPublicKey = await qa({ armoredKey: ownKeyPair.publicKey });
	const encryptedMessage = await go({
		message: await io({ text: message }),
		encryptionKeys: [...validKeys, ownPublicKey]
	});
	const header = `PGPCord v1.0.0 - https://github.com/Zerostats/pgpcord\n\n`;
	return header + encryptedMessage;
}
var WrongKeyError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "WrongKeyError";
	}
};
async function decryptMessage(encryptedMessage) {
	let cleanedMessage = encryptedMessage.trim();
	console.log("PGPCord: Decrypting message (raw length):", encryptedMessage.length);
	console.log("PGPCord: Decrypting message (first 50 chars):", encryptedMessage.substring(0, 50));
	if (cleanedMessage.includes("\\n")) cleanedMessage = cleanedMessage.replace(/\\n/g, "\n");
	if (!cleanedMessage.includes("\n") && cleanedMessage.includes("-----BEGIN PGP MESSAGE-----")) {
		cleanedMessage = cleanedMessage.replace("-----BEGIN PGP MESSAGE-----", "-----BEGIN PGP MESSAGE-----\n");
		cleanedMessage = cleanedMessage.replace("-----END PGP MESSAGE-----", "\n-----END PGP MESSAGE-----");
	}
	const message = await no({ armoredMessage: cleanedMessage });
	const keyPair = loadKeyPairFromLocalStorage();
	if (!keyPair) throw new Error("No key pair found.");
	const encryptionKeyIds = message.getEncryptionKeyIDs();
	const privateKeyFromStorage = await Ya({ armoredKey: keyPair.privateKey });
	const allKeyIds = privateKeyFromStorage.getKeyIDs().map((k$1) => k$1.toHex().toLowerCase());
	console.log("PGPCord: My key IDs (including subkeys):", allKeyIds);
	console.log("PGPCord: Message encrypted for key IDs:", encryptionKeyIds.map((k$1) => k$1.toHex()));
	const isForMe = encryptionKeyIds.length === 0 || encryptionKeyIds.some((msgKeyId) => allKeyIds.includes(msgKeyId.toHex().toLowerCase()));
	console.log("PGPCord: Is message for me?", isForMe);
	if (!isForMe) {
		console.warn("PGPCord: Message is not encrypted for any of my keys");
		console.warn("PGPCord: My Key IDs:", allKeyIds);
		console.warn("PGPCord: Message Key IDs:", encryptionKeyIds.map((k$1) => k$1.toHex()));
		throw new WrongKeyError("Message not encrypted for this key.");
	}
	let privateKey$1 = getCachedPrivateKey();
	if (!privateKey$1) throw new PassphraseRequiredError("Passphrase required to decrypt private key.");
	const { data: decrypted } = await po({
		message,
		decryptionKeys: privateKey$1
	});
	return decrypted;
}
async function encryptPrivateKey(privateKeyArmored, passphrase) {
	const privateKey$1 = await Ya({ armoredKey: privateKeyArmored });
	if (!privateKey$1.isDecrypted()) return privateKeyArmored;
	const encryptedKey = await yo({
		privateKey: privateKey$1,
		passphrase
	});
	return encryptedKey.armor();
}
async function decryptPrivateKey(privateKeyArmored, passphrase) {
	const privateKey$1 = await Ya({ armoredKey: privateKeyArmored });
	if (privateKey$1.isDecrypted()) return privateKeyArmored;
	const decryptedKey = await lo({
		privateKey: privateKey$1,
		passphrase
	});
	return decryptedKey.armor();
}

//#endregion
//#region plugins/pgpcord/components/settings.scss
shelter.plugin.scoped.ui.injectCss(`.qtaweq_container {
  color: var(--text-normal);
  padding: 16px;
}

.qtaweq_header {
  color: var(--header-primary);
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
}

.qtaweq_section {
  border-bottom: 1px solid var(--background-modifier-accent);
  margin-bottom: 24px;
  padding-bottom: 24px;
}

.qtaweq_section:last-child {
  border-bottom: none;
}

.qtaweq_subHeader {
  color: var(--header-secondary);
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
}

.qtaweq_text {
  color: var(--text-normal);
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
}

.qtaweq_muted {
  color: var(--text-muted);
  font-size: 12px;
}

.qtaweq_inputGroup {
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  display: flex;
}

.qtaweq_label {
  text-transform: uppercase;
  color: var(--header-secondary);
  font-size: 12px;
  font-weight: 700;
}

.qtaweq_input {
  background-color: var(--input-background);
  color: var(--text-normal);
  box-sizing: border-box;
  border: none;
  border-radius: 3px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.qtaweq_input:focus {
  background-color: var(--input-background);
  outline: none;
}

.qtaweq_select {
  background-color: var(--input-background);
  color: #494949;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.qtaweq_button, .qtaweq_secondaryButton {
  cursor: pointer;
  color: #fff;
  background-color: var(--brand-experiment);
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color .17s;
}

.qtaweq_button:hover, .qtaweq_secondaryButton:hover {
  background-color: var(--brand-experiment-560);
}

.qtaweq_button:disabled, .qtaweq_secondaryButton:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.qtaweq_secondaryButton {
  background-color: var(--button-secondary-background);
  color: var(--text-normal);
}

.qtaweq_secondaryButton:hover {
  background-color: var(--button-secondary-background-hover);
}

.qtaweq_codeBlock pre, .qtaweq_codeBlock code {
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--font-code);
  margin: 0;
  padding: 0;
}

.qtaweq_error {
  color: var(--text-danger);
  background-color: rgba(var(--text-danger-rgb), .1);
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 8px;
}

.qtaweq_codeBlock {
  background-color: var(--background-secondary);
  font-family: var(--font-code);
  user-select: text;
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 12px;
  font-size: 12px;
  overflow-x: auto;
}

.qtaweq_copyButton {
  cursor: pointer;
  background-color: var(--button-secondary-background);
  color: var(--text-normal);
  border: none;
  border-radius: 3px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  transition: background-color .17s;
}

.qtaweq_copyButton:hover {
  background-color: var(--button-secondary-background-hover);
}
`);
var settings_default = {
	"section": "qtaweq_section",
	"container": "qtaweq_container",
	"select": "qtaweq_select",
	"text": "qtaweq_text",
	"button": "qtaweq_button",
	"error": "qtaweq_error",
	"inputGroup": "qtaweq_inputGroup",
	"secondaryButton": "qtaweq_secondaryButton",
	"subHeader": "qtaweq_subHeader",
	"copyButton": "qtaweq_copyButton",
	"label": "qtaweq_label",
	"header": "qtaweq_header",
	"muted": "qtaweq_muted",
	"input": "qtaweq_input",
	"codeBlock": "qtaweq_codeBlock"
};

//#endregion
//#region plugins/pgpcord/components/Settings.tsx
var import_web$23 = __toESM(require_web(), 1);
var import_web$24 = __toESM(require_web(), 1);
var import_web$25 = __toESM(require_web(), 1);
var import_web$26 = __toESM(require_web(), 1);
var import_web$27 = __toESM(require_web(), 1);
var import_web$28 = __toESM(require_web(), 1);
var import_web$29 = __toESM(require_web(), 1);
var import_web$30 = __toESM(require_web(), 1);
var import_web$31 = __toESM(require_web(), 1);
var import_web$32 = __toESM(require_web(), 1);
var import_solid_js$3 = __toESM(require_solid_js(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$23.template)(`<div><div><h3></h3><p></p><input type="password" placeholder="Password"><div><button>Cancel</button><button></button></div></div></div>`, 15), _tmpl$2$2 = /*#__PURE__*/ (0, import_web$23.template)(`<div><strong>Error: </strong> <!#><!/></div>`, 6), _tmpl$3$2 = /*#__PURE__*/ (0, import_web$23.template)(`<div><p>Generating keys... This may take a moment. Your browser may become unresponsive.</p></div>`, 4), _tmpl$4$2 = /*#__PURE__*/ (0, import_web$23.template)(`<div><h2>PGPCord Settings</h2><!#><!/><!#><!/><!#><!/><!#><!/></div>`, 12), _tmpl$5$2 = /*#__PURE__*/ (0, import_web$23.template)(`<div><h3>Generate New Keys</h3><p>To get started, generate a new PGP key pair.<br><span>You will lose access to your encrypted messages if you forget your passphrase.</span></p><div><label for="passphrase">Passphrase</label><input id="passphrase" type="password" placeholder="Enter a strong passphrase"></div><button>Generate Keys</button><div><h4>Or Import Existing Keys</h4><label>Import Keys from JSON<input type="file" accept=".json"></label></div></div>`, 23), _tmpl$6$2 = /*#__PURE__*/ (0, import_web$23.template)(`<button></button>`, 2), _tmpl$7$1 = /*#__PURE__*/ (0, import_web$23.template)(`<pre><code></code></pre>`, 4), _tmpl$8 = /*#__PURE__*/ (0, import_web$23.template)(`<span></span>`, 2), _tmpl$9 = /*#__PURE__*/ (0, import_web$23.template)(`<div><label for="cache-time">Cache duration (minutes)</label><input id="cache-time" type="number" min="1"></div>`, 5), _tmpl$0 = /*#__PURE__*/ (0, import_web$23.template)(`<div><div><h3>Your PGP Keys</h3><div><div><label>Public Key</label><div><button></button><!#><!/></div></div><!#><!/></div><div><button>Publish Public Key</button><button>Export Keys Backup</button></div><div><h4>Account Status</h4><div><button></button><!#><!/></div><p>Check if your public key is correctly registered on the PGPCord server.</p></div><div><button>Delete Keys & Account</button></div><p>Publishing opens an external website. Exporting downloads a JSON file with your private key - keep it safe! Deleting will remove keys locally and open the deletion page.</p></div><div><h3>Security Settings</h3><div><label for="cache-duration">Passphrase Cache Duration</label><select id="cache-duration"><option value="session">Cache for session</option><option value="time">Cache for a set time</option><option value="none">Do not cache (most secure)</option></select></div><!#><!/><p>Determines how long your unlocked private key is kept in memory.</p></div></div>`, 64);
let lastCheckTime = 0;
const CHECK_COOLDOWN_MS = 2e3;
const defaultSettings = {
	cacheDuration: "session",
	cacheTimeMinutes: 15,
	lastKnownKeyStatus: "idle"
};
var Settings_default = () => {
	const [keyPair, setKeyPair] = (0, import_solid_js$3.createSignal)(null);
	const [passphrase, setPassphrase] = (0, import_solid_js$3.createSignal)("");
	const [isGenerating, setIsGenerating] = (0, import_solid_js$3.createSignal)(false);
	const [error, setError] = (0, import_solid_js$3.createSignal)(null);
	const [showModal, setShowModal] = (0, import_solid_js$3.createSignal)(false);
	const [modalMode, setModalMode] = (0, import_solid_js$3.createSignal)("export");
	const [modalPassword, setModalPassword] = (0, import_solid_js$3.createSignal)("");
	const [pendingImportFile, setPendingImportFile] = (0, import_solid_js$3.createSignal)(null);
	const [showPublicKey, setShowPublicKey] = (0, import_solid_js$3.createSignal)(false);
	if (!shelter.plugin.store.pgpcord_settings) shelter.plugin.store.pgpcord_settings = defaultSettings;
	const getSettings = () => shelter.plugin.store.pgpcord_settings;
	const updateSettings = (partial) => {
		shelter.plugin.store.pgpcord_settings = {
			...getSettings(),
			...partial
		};
	};
	const [keyStatus, setKeyStatus] = (0, import_solid_js$3.createSignal)(getSettings().lastKnownKeyStatus || "idle");
	(0, import_solid_js$3.onMount)(() => {
		const loadedKeys = loadKeyPairFromLocalStorage();
		if (loadedKeys) setKeyPair(loadedKeys);
	});
	const handleGenerateKeys = async () => {
		setIsGenerating(true);
		setError(null);
		try {
			const newKeyPair = await generateKeyPair(passphrase());
			saveKeyPairToLocalStorage(newKeyPair);
			setKeyPair(newKeyPair);
		} catch (err) {
			console.error("Key generation failed:", err);
			setError(err instanceof Error ? err.message : "An unknown error occurred.");
		} finally {
			setIsGenerating(false);
			setPassphrase("");
		}
	};
	const handlePublishKey = async () => {
		const kp = keyPair();
		if (!kp) return;
		try {
			const response = await fetch(`${WEB_BASE_URL}/api/cache-key`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					key: kp.publicKey,
					next: "/dashboard"
				})
			});
			if (!response.ok) throw new Error("Failed to cache key");
			const data = await response.json();
			if (data.redirect_url) {
				const redirectUrl = data.redirect_url.startsWith("http") ? data.redirect_url : `${WEB_BASE_URL}${data.redirect_url.startsWith("/") ? "" : "/"}${data.redirect_url}`;
				window.open(redirectUrl, "_blank");
			} else throw new Error("No redirect URL returned");
		} catch (err) {
			console.error("PGPCord: Failed to publish key", err);
			setError("Failed to publish key to server. Please try again.");
		}
	};
	const handleDeleteKeys = () => {
		if (confirm("Are you sure you want to delete your keys? This action cannot be undone and you will lose access to all encrypted messages.")) try {
			saveKeyPairToLocalStorage(null);
			delete shelter.plugin.store.pgpcord_keys;
			delete shelter.plugin.store.pgpcord_settings;
			delete shelter.plugin.store.pgpcord_lock_state;
			if (typeof sessionStorage !== "undefined") {
				sessionStorage.removeItem("pgpcord_cached_private_key");
				sessionStorage.removeItem("pgpcord_cache_expiry");
			}
			setKeyPair(null);
			setPassphrase("");
			setKeyStatus("idle");
			window.open(`${WEB_BASE_URL}/delete?validate=true`, "_blank");
			console.log("PGPCord: Local data cleared, redirecting to server deletion...");
		} catch (err) {
			console.error("PGPCord: Error during key deletion", err);
			setError("Failed to clear local data. Please try again.");
		}
	};
	const initiateExport = () => {
		setModalMode("export");
		setModalPassword("");
		setShowModal(true);
	};
	const initiateImport = (event) => {
		const input = event.target;
		if (!input.files || input.files.length === 0) return;
		setPendingImportFile(input.files[0]);
		setModalMode("import");
		setModalPassword("");
		setShowModal(true);
		input.value = "";
	};
	const handleModalConfirm = async () => {
		setShowModal(false);
		const password = modalPassword();
		if (modalMode() === "export") {
			const keys = keyPair();
			if (!keys) return;
			let privateKeyToExport = keys.privateKey;
			if (password) try {
				privateKeyToExport = await encryptPrivateKey(keys.privateKey, password);
			} catch (e$1) {
				console.error("Failed to encrypt key", e$1);
				setError("Failed to encrypt key. Check console.");
				return;
			}
			const exportData = {
				...keys,
				privateKey: privateKeyToExport
			};
			const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
			const downloadAnchorNode = document.createElement("a");
			downloadAnchorNode.setAttribute("href", dataStr);
			downloadAnchorNode.setAttribute("download", "pgpcord_keys.json");
			document.body.appendChild(downloadAnchorNode);
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
		} else if (modalMode() === "import") {
			const file = pendingImportFile();
			if (!file) return;
			const reader = new FileReader();
			reader.onload = async (e$1) => {
				try {
					const content = e$1.target?.result;
					const parsed = JSON.parse(content);
					if (parsed.publicKey && parsed.privateKey && parsed.keyId) {
						let privateKey$1 = parsed.privateKey;
						if (password) try {
							privateKey$1 = await decryptPrivateKey(privateKey$1, password);
						} catch (err) {
							setError("Incorrect password or invalid key.");
							return;
						}
						const newKeys = {
							...parsed,
							privateKey: privateKey$1
						};
						saveKeyPairToLocalStorage(newKeys);
						setKeyPair(newKeys);
						setError(null);
					} else throw new Error("Invalid key file format.");
				} catch (err) {
					console.error("Import failed:", err);
					setError("Failed to import keys. Invalid file format or wrong password.");
				}
			};
			reader.readAsText(file);
		}
	};
	const [copyFeedback, setCopyFeedback] = (0, import_solid_js$3.createSignal)(false);
	const handleCopy = (text) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopyFeedback(true);
			setTimeout(() => setCopyFeedback(false), 2e3);
			console.log("PGPCord: Public key copied to clipboard.");
		}, (err) => {
			console.error("PGPCord: Failed to copy public key", err);
		});
	};
	const normalizeKey = (key) => {
		return key.replace(/\s+/g, "").trim();
	};
	const handleCheckStatus = async () => {
		const now = Date.now();
		if (now - lastCheckTime < CHECK_COOLDOWN_MS) {
			console.log(`PGPCord: Please wait ${Math.ceil((CHECK_COOLDOWN_MS - (now - lastCheckTime)) / 1e3)}s before checking again`);
			return;
		}
		lastCheckTime = now;
		setKeyStatus("checking");
		try {
			const serverKeyRecord = await checkCurrentUserKey();
			const localKeys = keyPair();
			let status = "not_found";
			if (serverKeyRecord) if (localKeys) {
				const normalizedServerKey = normalizeKey(serverKeyRecord.public_key);
				const normalizedLocalKey = normalizeKey(localKeys.publicKey);
				if (normalizedServerKey === normalizedLocalKey) status = "found";
else status = "mismatch";
			} else status = "mismatch";
else status = "not_found";
			setKeyStatus(status);
			updateSettings({ lastKnownKeyStatus: status });
		} catch (e$1) {
			console.error("Failed to check key status", e$1);
			setKeyStatus("not_found");
			updateSettings({ lastKnownKeyStatus: "not_found" });
		}
	};
	return (() => {
		const _el$ = (0, import_web$28.getNextElement)(_tmpl$4$2), _el$2 = _el$.firstChild, _el$16 = _el$2.nextSibling, [_el$17, _co$2] = (0, import_web$25.getNextMarker)(_el$16.nextSibling), _el$18 = _el$17.nextSibling, [_el$19, _co$3] = (0, import_web$25.getNextMarker)(_el$18.nextSibling), _el$20 = _el$19.nextSibling, [_el$21, _co$4] = (0, import_web$25.getNextMarker)(_el$20.nextSibling), _el$22 = _el$21.nextSibling, [_el$23, _co$5] = (0, import_web$25.getNextMarker)(_el$22.nextSibling);
		(0, import_web$31.insert)(_el$, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
			get when() {
				return showModal();
			},
			get children() {
				const _el$3 = (0, import_web$28.getNextElement)(_tmpl$$2), _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$7.nextSibling, _el$9 = _el$8.firstChild, _el$0 = _el$9.nextSibling;
				_el$3.style.setProperty("position", "fixed");
				_el$3.style.setProperty("top", "0");
				_el$3.style.setProperty("left", "0");
				_el$3.style.setProperty("right", "0");
				_el$3.style.setProperty("bottom", "0");
				_el$3.style.setProperty("background", "rgba(0,0,0,0.85)");
				_el$3.style.setProperty("display", "flex");
				_el$3.style.setProperty("align-items", "center");
				_el$3.style.setProperty("justify-content", "center");
				_el$3.style.setProperty("z-index", "9999");
				_el$4.style.setProperty("background", "var(--background-primary)");
				_el$4.style.setProperty("padding", "24px");
				_el$4.style.setProperty("border-radius", "8px");
				_el$4.style.setProperty("min-width", "320px");
				_el$4.style.setProperty("box-shadow", "var(--elevation-high)");
				_el$4.style.setProperty("border", "1px solid var(--background-modifier-accent)");
				_el$5.style.setProperty("margin-top", "0");
				(0, import_web$31.insert)(_el$5, () => modalMode() === "export" ? "Encrypt Export" : "Decrypt Import");
				_el$6.style.setProperty("margin-bottom", "16px");
				(0, import_web$31.insert)(_el$6, () => modalMode() === "export" ? "Enter a password to encrypt your private key (Recommended):" : "Enter the password for this key file (leave empty if none):");
				_el$7.$$input = (e$1) => setModalPassword(e$1.currentTarget.value);
				_el$7.style.setProperty("margin-bottom", "24px");
				_el$7.style.setProperty("background-color", "var(--input-background)");
				_el$8.style.setProperty("display", "flex");
				_el$8.style.setProperty("gap", "12px");
				_el$8.style.setProperty("justify-content", "flex-end");
				_el$9.$$click = () => setShowModal(false);
				_el$0.$$click = handleModalConfirm;
				(0, import_web$31.insert)(_el$0, () => modalMode() === "export" ? "Export" : "Import");
				(0, import_web$30.effect)((_p$) => {
					const _v$ = settings_default.section, _v$2 = settings_default.subHeader, _v$3 = settings_default.text, _v$4 = settings_default.input, _v$5 = settings_default.secondaryButton, _v$6 = settings_default.button;
					_v$ !== _p$._v$ && (0, import_web$27.className)(_el$4, _p$._v$ = _v$);
					_v$2 !== _p$._v$2 && (0, import_web$27.className)(_el$5, _p$._v$2 = _v$2);
					_v$3 !== _p$._v$3 && (0, import_web$27.className)(_el$6, _p$._v$3 = _v$3);
					_v$4 !== _p$._v$4 && (0, import_web$27.className)(_el$7, _p$._v$4 = _v$4);
					_v$5 !== _p$._v$5 && (0, import_web$27.className)(_el$9, _p$._v$5 = _v$5);
					_v$6 !== _p$._v$6 && (0, import_web$27.className)(_el$0, _p$._v$6 = _v$6);
					return _p$;
				}, {
					_v$: undefined,
					_v$2: undefined,
					_v$3: undefined,
					_v$4: undefined,
					_v$5: undefined,
					_v$6: undefined
				});
				(0, import_web$30.effect)(() => _el$7.value = modalPassword());
				(0, import_web$29.runHydrationEvents)();
				return _el$3;
			}
		}), _el$17, _co$2);
		(0, import_web$31.insert)(_el$, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
			get when() {
				return error();
			},
			get children() {
				const _el$1 = (0, import_web$28.getNextElement)(_tmpl$2$2), _el$10 = _el$1.firstChild, _el$11 = _el$10.nextSibling, _el$12 = _el$11.nextSibling, [_el$13, _co$] = (0, import_web$25.getNextMarker)(_el$12.nextSibling);
				(0, import_web$31.insert)(_el$1, error, _el$13, _co$);
				(0, import_web$30.effect)(() => (0, import_web$27.className)(_el$1, settings_default.error));
				return _el$1;
			}
		}), _el$19, _co$3);
		(0, import_web$31.insert)(_el$, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
			get when() {
				return keyPair();
			},
			get fallback() {
				return (0, import_web$26.createComponent)(import_solid_js$3.Show, {
					get when() {
						return !isGenerating();
					},
					get children() {
						const _el$24 = (0, import_web$28.getNextElement)(_tmpl$5$2), _el$25 = _el$24.firstChild, _el$26 = _el$25.nextSibling, _el$27 = _el$26.firstChild, _el$28 = _el$27.nextSibling, _el$29 = _el$28.nextSibling, _el$30 = _el$26.nextSibling, _el$31 = _el$30.firstChild, _el$32 = _el$31.nextSibling, _el$33 = _el$30.nextSibling, _el$34 = _el$33.nextSibling, _el$35 = _el$34.firstChild, _el$36 = _el$35.nextSibling, _el$37 = _el$36.firstChild, _el$38 = _el$37.nextSibling;
						_el$32.$$input = (e$1) => setPassphrase(e$1.currentTarget.value);
						_el$33.$$click = handleGenerateKeys;
						_el$34.style.setProperty("margin-top", "16px");
						_el$34.style.setProperty("border-top", "1px solid var(--background-modifier-accent)");
						_el$34.style.setProperty("padding-top", "16px");
						_el$36.style.setProperty("display", "inline-block");
						_el$36.style.setProperty("cursor", "pointer");
						_el$38.addEventListener("change", initiateImport);
						_el$38.style.setProperty("display", "none");
						(0, import_web$30.effect)((_p$) => {
							const _v$1 = settings_default.section, _v$10 = settings_default.subHeader, _v$11 = settings_default.text, _v$12 = settings_default.muted, _v$13 = settings_default.inputGroup, _v$14 = settings_default.label, _v$15 = settings_default.input, _v$16 = settings_default.button, _v$17 = !passphrase() || isGenerating(), _v$18 = settings_default.inputGroup, _v$19 = settings_default.subHeader, _v$20 = settings_default.secondaryButton;
							_v$1 !== _p$._v$1 && (0, import_web$27.className)(_el$24, _p$._v$1 = _v$1);
							_v$10 !== _p$._v$10 && (0, import_web$27.className)(_el$25, _p$._v$10 = _v$10);
							_v$11 !== _p$._v$11 && (0, import_web$27.className)(_el$26, _p$._v$11 = _v$11);
							_v$12 !== _p$._v$12 && (0, import_web$27.className)(_el$29, _p$._v$12 = _v$12);
							_v$13 !== _p$._v$13 && (0, import_web$27.className)(_el$30, _p$._v$13 = _v$13);
							_v$14 !== _p$._v$14 && (0, import_web$27.className)(_el$31, _p$._v$14 = _v$14);
							_v$15 !== _p$._v$15 && (0, import_web$27.className)(_el$32, _p$._v$15 = _v$15);
							_v$16 !== _p$._v$16 && (0, import_web$27.className)(_el$33, _p$._v$16 = _v$16);
							_v$17 !== _p$._v$17 && (_el$33.disabled = _p$._v$17 = _v$17);
							_v$18 !== _p$._v$18 && (0, import_web$27.className)(_el$34, _p$._v$18 = _v$18);
							_v$19 !== _p$._v$19 && (0, import_web$27.className)(_el$35, _p$._v$19 = _v$19);
							_v$20 !== _p$._v$20 && (0, import_web$27.className)(_el$36, _p$._v$20 = _v$20);
							return _p$;
						}, {
							_v$1: undefined,
							_v$10: undefined,
							_v$11: undefined,
							_v$12: undefined,
							_v$13: undefined,
							_v$14: undefined,
							_v$15: undefined,
							_v$16: undefined,
							_v$17: undefined,
							_v$18: undefined,
							_v$19: undefined,
							_v$20: undefined
						});
						(0, import_web$30.effect)(() => _el$32.value = passphrase());
						(0, import_web$29.runHydrationEvents)();
						return _el$24;
					}
				});
			},
			children: (kp) => (() => {
				const _el$39 = (0, import_web$28.getNextElement)(_tmpl$0), _el$40 = _el$39.firstChild, _el$41 = _el$40.firstChild, _el$42 = _el$41.nextSibling, _el$43 = _el$42.firstChild, _el$44 = _el$43.firstChild, _el$45 = _el$44.nextSibling, _el$46 = _el$45.firstChild, _el$48 = _el$46.nextSibling, [_el$49, _co$6] = (0, import_web$25.getNextMarker)(_el$48.nextSibling), _el$52 = _el$43.nextSibling, [_el$53, _co$7] = (0, import_web$25.getNextMarker)(_el$52.nextSibling), _el$54 = _el$42.nextSibling, _el$55 = _el$54.firstChild, _el$56 = _el$55.nextSibling, _el$57 = _el$54.nextSibling, _el$58 = _el$57.firstChild, _el$59 = _el$58.nextSibling, _el$60 = _el$59.firstChild, _el$62 = _el$60.nextSibling, [_el$63, _co$8] = (0, import_web$25.getNextMarker)(_el$62.nextSibling), _el$64 = _el$59.nextSibling, _el$65 = _el$57.nextSibling, _el$66 = _el$65.firstChild, _el$67 = _el$65.nextSibling, _el$68 = _el$40.nextSibling, _el$69 = _el$68.firstChild, _el$70 = _el$69.nextSibling, _el$71 = _el$70.firstChild, _el$72 = _el$71.nextSibling, _el$77 = _el$70.nextSibling, [_el$78, _co$9] = (0, import_web$25.getNextMarker)(_el$77.nextSibling), _el$76 = _el$78.nextSibling;
				_el$43.style.setProperty("display", "flex");
				_el$43.style.setProperty("justify-content", "space-between");
				_el$43.style.setProperty("align-items", "center");
				_el$43.style.setProperty("margin-bottom", "8px");
				_el$45.style.setProperty("display", "flex");
				_el$45.style.setProperty("gap", "8px");
				_el$46.$$click = () => setShowPublicKey(!showPublicKey());
				(0, import_web$31.insert)(_el$46, () => showPublicKey() ? "Hide" : "Show");
				(0, import_web$31.insert)(_el$45, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
					get when() {
						return showPublicKey();
					},
					get children() {
						const _el$47 = (0, import_web$28.getNextElement)(_tmpl$6$2);
						_el$47.$$click = () => handleCopy(kp.publicKey);
						(0, import_web$31.insert)(_el$47, () => copyFeedback() ? "Copied!" : "Copy");
						(0, import_web$30.effect)(() => (0, import_web$27.className)(_el$47, settings_default.copyButton));
						(0, import_web$29.runHydrationEvents)();
						return _el$47;
					}
				}), _el$49, _co$6);
				(0, import_web$31.insert)(_el$42, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
					get when() {
						return showPublicKey();
					},
					get children() {
						const _el$50 = (0, import_web$28.getNextElement)(_tmpl$7$1), _el$51 = _el$50.firstChild;
						(0, import_web$31.insert)(_el$51, () => kp.publicKey);
						(0, import_web$30.effect)(() => (0, import_web$27.className)(_el$50, settings_default.codeBlock));
						return _el$50;
					}
				}), _el$53, _co$7);
				_el$54.style.setProperty("display", "flex");
				_el$54.style.setProperty("gap", "8px");
				_el$55.$$click = handlePublishKey;
				_el$56.$$click = initiateExport;
				_el$57.style.setProperty("margin-top", "16px");
				_el$57.style.setProperty("border-top", "1px solid var(--background-modifier-accent)");
				_el$57.style.setProperty("padding-top", "16px");
				_el$59.style.setProperty("display", "flex");
				_el$59.style.setProperty("align-items", "center");
				_el$59.style.setProperty("gap", "12px");
				_el$60.$$click = handleCheckStatus;
				(0, import_web$31.insert)(_el$60, () => keyStatus() === "checking" ? "Checking..." : "Check Server Status");
				(0, import_web$31.insert)(_el$59, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
					get when() {
						return keyStatus() !== "idle";
					},
					get children() {
						const _el$61 = (0, import_web$28.getNextElement)(_tmpl$8);
						_el$61.style.setProperty("font-weight", "bold");
						(0, import_web$31.insert)(_el$61, (() => {
							const _c$ = (0, import_web$32.memo)(() => keyStatus() === "found");
							return () => _c$() ? "Key Found on Server" : keyStatus() === "mismatch" ? "Key Mismatch" : "Key Not Found on Server";
						})());
						(0, import_web$30.effect)(() => _el$61.style.setProperty("color", keyStatus() === "found" ? "var(--text-positive)" : keyStatus() === "mismatch" ? "var(--text-warning)" : "var(--text-danger)"));
						return _el$61;
					}
				}), _el$63, _co$8);
				_el$64.style.setProperty("margin-top", "8px");
				_el$65.style.setProperty("margin-top", "8px");
				_el$66.$$click = handleDeleteKeys;
				_el$66.style.setProperty("background-color", "var(--button-danger-background)");
				_el$66.style.setProperty("color", "var(--white)");
				_el$70.style.setProperty("margin-top", "16px");
				_el$72.addEventListener("change", (e$1) => updateSettings({ cacheDuration: e$1.currentTarget.value }));
				(0, import_web$31.insert)(_el$68, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
					get when() {
						return getSettings().cacheDuration === "time";
					},
					get children() {
						const _el$73 = (0, import_web$28.getNextElement)(_tmpl$9), _el$74 = _el$73.firstChild, _el$75 = _el$74.nextSibling;
						_el$75.$$input = (e$1) => updateSettings({ cacheTimeMinutes: parseInt(e$1.currentTarget.value, 10) });
						(0, import_web$30.effect)((_p$) => {
							const _v$21 = settings_default.inputGroup, _v$22 = settings_default.label, _v$23 = settings_default.input;
							_v$21 !== _p$._v$21 && (0, import_web$27.className)(_el$73, _p$._v$21 = _v$21);
							_v$22 !== _p$._v$22 && (0, import_web$27.className)(_el$74, _p$._v$22 = _v$22);
							_v$23 !== _p$._v$23 && (0, import_web$27.className)(_el$75, _p$._v$23 = _v$23);
							return _p$;
						}, {
							_v$21: undefined,
							_v$22: undefined,
							_v$23: undefined
						});
						(0, import_web$30.effect)(() => _el$75.value = getSettings().cacheTimeMinutes);
						(0, import_web$29.runHydrationEvents)();
						return _el$73;
					}
				}), _el$78, _co$9);
				(0, import_web$30.effect)((_p$) => {
					const _v$24 = settings_default.section, _v$25 = settings_default.subHeader, _v$26 = settings_default.inputGroup, _v$27 = settings_default.label, _v$28 = settings_default.copyButton, _v$29 = settings_default.inputGroup, _v$30 = settings_default.secondaryButton, _v$31 = settings_default.secondaryButton, _v$32 = settings_default.inputGroup, _v$33 = settings_default.subHeader, _v$34 = settings_default.secondaryButton, _v$35 = keyStatus() === "checking", _v$36 = settings_default.muted, _v$37 = settings_default.inputGroup, _v$38 = settings_default.secondaryButton, _v$39 = settings_default.muted, _v$40 = settings_default.section, _v$41 = settings_default.subHeader, _v$42 = settings_default.inputGroup, _v$43 = settings_default.label, _v$44 = settings_default.select, _v$45 = settings_default.muted;
					_v$24 !== _p$._v$24 && (0, import_web$27.className)(_el$40, _p$._v$24 = _v$24);
					_v$25 !== _p$._v$25 && (0, import_web$27.className)(_el$41, _p$._v$25 = _v$25);
					_v$26 !== _p$._v$26 && (0, import_web$27.className)(_el$42, _p$._v$26 = _v$26);
					_v$27 !== _p$._v$27 && (0, import_web$27.className)(_el$44, _p$._v$27 = _v$27);
					_v$28 !== _p$._v$28 && (0, import_web$27.className)(_el$46, _p$._v$28 = _v$28);
					_v$29 !== _p$._v$29 && (0, import_web$27.className)(_el$54, _p$._v$29 = _v$29);
					_v$30 !== _p$._v$30 && (0, import_web$27.className)(_el$55, _p$._v$30 = _v$30);
					_v$31 !== _p$._v$31 && (0, import_web$27.className)(_el$56, _p$._v$31 = _v$31);
					_v$32 !== _p$._v$32 && (0, import_web$27.className)(_el$57, _p$._v$32 = _v$32);
					_v$33 !== _p$._v$33 && (0, import_web$27.className)(_el$58, _p$._v$33 = _v$33);
					_v$34 !== _p$._v$34 && (0, import_web$27.className)(_el$60, _p$._v$34 = _v$34);
					_v$35 !== _p$._v$35 && (_el$60.disabled = _p$._v$35 = _v$35);
					_v$36 !== _p$._v$36 && (0, import_web$27.className)(_el$64, _p$._v$36 = _v$36);
					_v$37 !== _p$._v$37 && (0, import_web$27.className)(_el$65, _p$._v$37 = _v$37);
					_v$38 !== _p$._v$38 && (0, import_web$27.className)(_el$66, _p$._v$38 = _v$38);
					_v$39 !== _p$._v$39 && (0, import_web$27.className)(_el$67, _p$._v$39 = _v$39);
					_v$40 !== _p$._v$40 && (0, import_web$27.className)(_el$68, _p$._v$40 = _v$40);
					_v$41 !== _p$._v$41 && (0, import_web$27.className)(_el$69, _p$._v$41 = _v$41);
					_v$42 !== _p$._v$42 && (0, import_web$27.className)(_el$70, _p$._v$42 = _v$42);
					_v$43 !== _p$._v$43 && (0, import_web$27.className)(_el$71, _p$._v$43 = _v$43);
					_v$44 !== _p$._v$44 && (0, import_web$27.className)(_el$72, _p$._v$44 = _v$44);
					_v$45 !== _p$._v$45 && (0, import_web$27.className)(_el$76, _p$._v$45 = _v$45);
					return _p$;
				}, {
					_v$24: undefined,
					_v$25: undefined,
					_v$26: undefined,
					_v$27: undefined,
					_v$28: undefined,
					_v$29: undefined,
					_v$30: undefined,
					_v$31: undefined,
					_v$32: undefined,
					_v$33: undefined,
					_v$34: undefined,
					_v$35: undefined,
					_v$36: undefined,
					_v$37: undefined,
					_v$38: undefined,
					_v$39: undefined,
					_v$40: undefined,
					_v$41: undefined,
					_v$42: undefined,
					_v$43: undefined,
					_v$44: undefined,
					_v$45: undefined
				});
				(0, import_web$30.effect)(() => _el$72.value = getSettings().cacheDuration);
				(0, import_web$29.runHydrationEvents)();
				return _el$39;
			})()
		}), _el$21, _co$4);
		(0, import_web$31.insert)(_el$, (0, import_web$26.createComponent)(import_solid_js$3.Show, {
			get when() {
				return isGenerating();
			},
			get children() {
				const _el$14 = (0, import_web$28.getNextElement)(_tmpl$3$2), _el$15 = _el$14.firstChild;
				(0, import_web$30.effect)((_p$) => {
					const _v$7 = settings_default.section, _v$8 = settings_default.text;
					_v$7 !== _p$._v$7 && (0, import_web$27.className)(_el$14, _p$._v$7 = _v$7);
					_v$8 !== _p$._v$8 && (0, import_web$27.className)(_el$15, _p$._v$8 = _v$8);
					return _p$;
				}, {
					_v$7: undefined,
					_v$8: undefined
				});
				return _el$14;
			}
		}), _el$23, _co$5);
		(0, import_web$30.effect)((_p$) => {
			const _v$9 = settings_default.container, _v$0 = settings_default.header;
			_v$9 !== _p$._v$9 && (0, import_web$27.className)(_el$, _p$._v$9 = _v$9);
			_v$0 !== _p$._v$0 && (0, import_web$27.className)(_el$2, _p$._v$0 = _v$0);
			return _p$;
		}, {
			_v$9: undefined,
			_v$0: undefined
		});
		return _el$;
	})();
};
(0, import_web$24.delegateEvents)(["input", "click"]);

//#endregion
//#region plugins/pgpcord/lib/store.ts
var import_solid_js$2 = __toESM(require_solid_js(), 1);
const [isSecureMode, setSecureMode] = (0, import_solid_js$2.createSignal)(false);
const [isProcessing, setProcessing] = (0, import_solid_js$2.createSignal)(false);

//#endregion
//#region plugins/pgpcord/patches/Message.tsx
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
var import_web$17 = __toESM(require_web(), 1);
var import_web$18 = __toESM(require_web(), 1);
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
var import_solid_js$1 = __toESM(require_solid_js(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$14.template)(`<div></div>`, 2), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$14.template)(`<div><div><span>🔒</span><span>PGP Encrypted Message</span></div><form><input type="password" placeholder="Enter passphrase to unlock key..."><button type="submit">Unlock</button></form><div>Your private key is locked. Enter your passphrase to decrypt this and other messages.</div></div>`, 15), _tmpl$3$1 = /*#__PURE__*/ (0, import_web$14.template)(`<div><div><span>🔑</span><span>Encrypted with a different key</span></div><div>This message cannot be decrypted with your current private key. It may have been encrypted with an old key or for a different user.</div></div>`, 10), _tmpl$4$1 = /*#__PURE__*/ (0, import_web$14.template)(`<div><div class="spinner-dots"></div><span>Decrypting message...</span></div>`, 6), _tmpl$5$1 = /*#__PURE__*/ (0, import_web$14.template)(`<div><div><span>⚠️</span><span>Error Decrypting Message</span></div><div></div><button>Try again</button></div>`, 12), _tmpl$6$1 = /*#__PURE__*/ (0, import_web$14.template)(`<div><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/></div>`, 12);
const PGP_BLOCK_REGEX = /-----BEGIN PGP MESSAGE-----(.|\n)*-----END PGP MESSAGE-----/;
let unobserve$1 = null;
const channelMessageStore = new Map();
const updateMessageContent = (messageId, channelId, newContent) => {
	if (messageId.includes("-")) {
		const parts = messageId.split("-");
		messageId = parts[parts.length - 1];
	}
	const existingMessage = shelter.flux.stores.MessageStore.getMessage(channelId, messageId);
	if (!existingMessage || !existingMessage.id || !existingMessage.channel_id) return;
	if (existingMessage.content === newContent) return;
	shelter.flux.dispatcher.dispatch({
		type: "MESSAGE_UPDATE",
		message: {
			id: messageId,
			channel_id: channelId,
			content: newContent,
			attachments: [],
			type: existingMessage.type,
			flags: existingMessage.flags
		}
	});
};
const getMessageId = (element) => {
	const messageElement = element.closest("[id^='chat-messages-']");
	if (!messageElement) return null;
	const rawId = messageElement.id.replace("chat-messages-", "");
	if (rawId.includes("-")) {
		const parts = rawId.split("-");
		return parts[parts.length - 1];
	}
	return rawId;
};
const DecryptedMessageContainer = (props) => {
	const channelStore = channelMessageStore.get(props.channelId);
	const cached = channelStore?.get(props.messageId);
	const [content, setContent] = (0, import_solid_js$1.createSignal)(cached?.decrypted || "");
	const [state, setState] = (0, import_solid_js$1.createSignal)(cached?.state === "wrong_key" ? "wrong_key" : cached?.state === "passphrase_required" ? "waiting_for_passphrase" : cached?.state === "decrypted" ? "decrypted" : "decrypting");
	const [passphrase, setPassphrase] = (0, import_solid_js$1.createSignal)("");
	let mounted = true;
	(0, import_solid_js$1.onCleanup)(() => {
		mounted = false;
	});
	const attemptDecryption = async () => {
		try {
			const decrypted = await decryptMessage(props.encryptedContent);
			const channelStore$1 = channelMessageStore.get(props.channelId);
			if (channelStore$1) {
				const cached$1 = channelStore$1.get(props.messageId);
				if (cached$1) {
					cached$1.decrypted = decrypted;
					cached$1.state = "decrypted";
				}
			}
			updateMessageContent(props.messageId, props.channelId, decrypted);
			if (mounted) {
				setContent(decrypted);
				setState("decrypted");
			}
		} catch (err) {
			const channelStore$1 = channelMessageStore.get(props.channelId);
			const cached$1 = channelStore$1?.get(props.messageId);
			if (err instanceof PassphraseRequiredError) {
				if (cached$1) cached$1.state = "passphrase_required";
			} else if (err.name === "WrongKeyError") {
				if (cached$1) cached$1.state = "wrong_key";
			}
			if (!mounted) return;
			if (err instanceof PassphraseRequiredError) setState("waiting_for_passphrase");
else if (err.name === "WrongKeyError") setState("wrong_key");
else {
				console.error("PGPCord: Decryption failed", err);
				setState("error");
				const errorMessage = err instanceof Error ? err.message : "Unknown error";
				setContent(`Decryption failed: ${errorMessage}`);
			}
		}
	};
	const handlePassphraseSubmit = async (e$1) => {
		e$1.preventDefault();
		setState("decrypting");
		try {
			await decryptAndCachePrivateKey(passphrase());
			await attemptDecryption();
			reprocessMessages(props.channelId);
		} catch (err) {
			console.error("PGPCord: Passphrase incorrect or decryption failed", err);
			if (mounted) {
				setState("error");
				setContent("Incorrect passphrase or decryption failed.");
			}
		}
	};
	(0, import_solid_js$1.onMount)(() => {
		if (state() === "decrypting") attemptDecryption();
	});
	(0, import_solid_js$1.createEffect)(() => {
		const pk = usePrivateKey();
		if (pk && state() === "waiting_for_passphrase") attemptDecryption();
	});
	return (() => {
		const _el$ = (0, import_web$20.getNextElement)(_tmpl$6$1), _el$20 = _el$.firstChild, [_el$21, _co$] = (0, import_web$16.getNextMarker)(_el$20.nextSibling), _el$22 = _el$21.nextSibling, [_el$23, _co$2] = (0, import_web$16.getNextMarker)(_el$22.nextSibling), _el$24 = _el$23.nextSibling, [_el$25, _co$3] = (0, import_web$16.getNextMarker)(_el$24.nextSibling), _el$26 = _el$25.nextSibling, [_el$27, _co$4] = (0, import_web$16.getNextMarker)(_el$26.nextSibling), _el$28 = _el$27.nextSibling, [_el$29, _co$5] = (0, import_web$16.getNextMarker)(_el$28.nextSibling);
		_el$.style.setProperty("background-color", "var(--background-secondary)");
		_el$.style.setProperty("border-radius", "8px");
		_el$.style.setProperty("padding", "12px");
		_el$.style.setProperty("margin-top", "8px");
		_el$.style.setProperty("border", "1px solid var(--background-modifier-accent)");
		(0, import_web$21.insert)(_el$, (0, import_web$19.createComponent)(import_solid_js$1.Show, {
			get when() {
				return state() === "decrypted";
			},
			get children() {
				const _el$2 = (0, import_web$20.getNextElement)(_tmpl$$1);
				_el$2.style.setProperty("white-space", "pre-wrap");
				_el$2.style.setProperty("word-break", "break-word");
				_el$2.style.setProperty("color", "var(--text-normal)");
				(0, import_web$21.insert)(_el$2, content);
				return _el$2;
			}
		}), _el$21, _co$);
		(0, import_web$21.insert)(_el$, (0, import_web$19.createComponent)(import_solid_js$1.Show, {
			get when() {
				return state() === "waiting_for_passphrase";
			},
			get children() {
				const _el$3 = (0, import_web$20.getNextElement)(_tmpl$2$1), _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling, _el$7 = _el$4.nextSibling, _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling, _el$0 = _el$7.nextSibling;
				_el$3.style.setProperty("display", "flex");
				_el$3.style.setProperty("flex-direction", "column");
				_el$3.style.setProperty("gap", "8px");
				_el$4.style.setProperty("display", "flex");
				_el$4.style.setProperty("align-items", "center");
				_el$4.style.setProperty("gap", "8px");
				_el$4.style.setProperty("color", "var(--header-secondary)");
				_el$5.style.setProperty("font-size", "1.2em");
				_el$6.style.setProperty("font-weight", "600");
				_el$7.addEventListener("submit", handlePassphraseSubmit);
				_el$7.style.setProperty("display", "flex");
				_el$7.style.setProperty("gap", "8px");
				_el$8.$$input = (e$1) => setPassphrase(e$1.currentTarget.value);
				_el$8.style.setProperty("flex-grow", "1");
				_el$8.style.setProperty("padding", "8px 12px");
				_el$8.style.setProperty("border-radius", "4px");
				_el$8.style.setProperty("border", "1px solid var(--background-modifier-accent)");
				_el$8.style.setProperty("background-color", "black");
				_el$8.style.setProperty("color", "white");
				_el$8.style.setProperty("font-size", "14px");
				_el$9.style.setProperty("padding", "8px 16px");
				_el$9.style.setProperty("border-radius", "4px");
				_el$9.style.setProperty("border", "none");
				_el$9.style.setProperty("background-color", "var(--brand-experiment)");
				_el$9.style.setProperty("color", "var(--interactive-active)");
				_el$9.style.setProperty("font-weight", "500");
				_el$9.style.setProperty("cursor", "pointer");
				_el$9.style.setProperty("transition", "background-color 0.17s ease");
				_el$0.style.setProperty("font-size", "12px");
				_el$0.style.setProperty("color", "var(--text-muted)");
				(0, import_web$18.effect)(() => _el$8.value = passphrase());
				(0, import_web$17.runHydrationEvents)();
				return _el$3;
			}
		}), _el$23, _co$2);
		(0, import_web$21.insert)(_el$, (0, import_web$19.createComponent)(import_solid_js$1.Show, {
			get when() {
				return state() === "wrong_key";
			},
			get children() {
				const _el$1 = (0, import_web$20.getNextElement)(_tmpl$3$1), _el$10 = _el$1.firstChild, _el$11 = _el$10.firstChild, _el$12 = _el$11.nextSibling, _el$13 = _el$10.nextSibling;
				_el$1.style.setProperty("display", "flex");
				_el$1.style.setProperty("flex-direction", "column");
				_el$1.style.setProperty("gap", "8px");
				_el$1.style.setProperty("color", "var(--text-muted)");
				_el$10.style.setProperty("display", "flex");
				_el$10.style.setProperty("align-items", "center");
				_el$10.style.setProperty("gap", "8px");
				_el$11.style.setProperty("font-size", "1.2em");
				_el$12.style.setProperty("font-weight", "600");
				_el$13.style.setProperty("font-size", "12px");
				return _el$1;
			}
		}), _el$25, _co$3);
		(0, import_web$21.insert)(_el$, (0, import_web$19.createComponent)(import_solid_js$1.Show, {
			get when() {
				return state() === "decrypting";
			},
			get children() {
				const _el$14 = (0, import_web$20.getNextElement)(_tmpl$4$1), _el$15 = _el$14.firstChild;
				_el$14.style.setProperty("display", "flex");
				_el$14.style.setProperty("align-items", "center");
				_el$14.style.setProperty("gap", "8px");
				_el$14.style.setProperty("color", "var(--text-normal)");
				_el$15.style.setProperty("width", "20px");
				_el$15.style.setProperty("height", "20px");
				_el$15.style.setProperty("border", "2px solid var(--text-muted)");
				_el$15.style.setProperty("border-top-color", "var(--brand-experiment)");
				_el$15.style.setProperty("border-radius", "50%");
				_el$15.style.setProperty("animation", "spin 1s linear infinite");
				return _el$14;
			}
		}), _el$27, _co$4);
		(0, import_web$21.insert)(_el$, (0, import_web$19.createComponent)(import_solid_js$1.Show, {
			get when() {
				return state() === "error";
			},
			get children() {
				const _el$16 = (0, import_web$20.getNextElement)(_tmpl$5$1), _el$17 = _el$16.firstChild, _el$18 = _el$17.nextSibling, _el$19 = _el$18.nextSibling;
				_el$16.style.setProperty("color", "var(--text-danger)");
				_el$16.style.setProperty("display", "flex");
				_el$16.style.setProperty("flex-direction", "column");
				_el$16.style.setProperty("gap", "4px");
				_el$17.style.setProperty("font-weight", "bold");
				_el$17.style.setProperty("display", "flex");
				_el$17.style.setProperty("align-items", "center");
				_el$17.style.setProperty("gap", "6px");
				_el$18.style.setProperty("font-family", "monospace");
				_el$18.style.setProperty("background-color", "var(--background-tertiary)");
				_el$18.style.setProperty("padding", "8px");
				_el$18.style.setProperty("border-radius", "4px");
				_el$18.style.setProperty("font-size", "12px");
				(0, import_web$21.insert)(_el$18, content);
				_el$19.$$click = () => setState("waiting_for_passphrase");
				_el$19.style.setProperty("margin-top", "4px");
				_el$19.style.setProperty("background", "transparent");
				_el$19.style.setProperty("border", "none");
				_el$19.style.setProperty("color", "var(--text-link)");
				_el$19.style.setProperty("cursor", "pointer");
				_el$19.style.setProperty("text-align", "left");
				_el$19.style.setProperty("padding", "0");
				(0, import_web$17.runHydrationEvents)();
				return _el$16;
			}
		}), _el$29, _co$5);
		return _el$;
	})();
};
const applyMessageVisibility = async (messageId, channelId, encryptedContent) => {
	const channelStore = channelMessageStore.get(channelId);
	const cached = channelStore?.get(messageId);
	if (cached?.cleanup) {
		try {
			cached.cleanup();
		} catch (e$1) {
			console.warn("PGPCord: Failed to cleanup injected component", e$1);
		}
		cached.cleanup = undefined;
	}
	const secure = isSecureMode();
	const privateKey$1 = getCachedPrivateKey();
	console.log(`PGPCord: applyMessageVisibility ${messageId} secure=${secure} hasKey=${!!privateKey$1}`);
	const sanitizedContent = encryptedContent.replace(/(-----BEGIN PGP MESSAGE-----)([^\n])/, "$1\n\n$2").replace(/(-----BEGIN PGP MESSAGE-----\n)(?!Version: )([^\n])/, "$1\n$2");
	if (cached) {
		if (privateKey$1 && cached.state === "passphrase_required") {} else if (cached.state === "decrypted" && cached.decrypted) {
			if (secure) updateMessageContent(messageId, channelId, cached.decrypted);
else updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
			return;
		} else if (cached.state === "wrong_key") {
			if (secure) updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
else updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
			return;
		} else if (cached.state === "passphrase_required") {
			if (secure) updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
else updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
			return;
		}
	}
	if (!secure) updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
else if (privateKey$1) {
		updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
		try {
			const decrypted = await decryptMessage(sanitizedContent);
			if (cached) {
				cached.decrypted = decrypted;
				cached.state = "decrypted";
			}
			updateMessageContent(messageId, channelId, decrypted);
		} catch (err) {
			if (err.name === "WrongKeyError") {
				if (cached) cached.state = "wrong_key";
				return;
			} else {
				if (cached) cached.state = "passphrase_required";
				updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
			}
		}
	} else {
		if (cached) cached.state = "passphrase_required";
		updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
	}
};
const reprocessMessages = (targetChannelId) => {
	console.log("PGPCord: Reprocessing messages...", targetChannelId ? `for channel ${targetChannelId}` : "all channels");
	if (targetChannelId) {
		const channelStore = channelMessageStore.get(targetChannelId);
		if (channelStore) channelStore.forEach((data, messageId) => {
			console.log(`PGPCord: Reprocessing message ${messageId} state=${data.state}`);
			if (data.state === "passphrase_required" || data.state === "encrypted") {
				data.state = "encrypted";
				delete data.decrypted;
			}
			applyMessageVisibility(messageId, targetChannelId, data.encrypted);
		});
	} else channelMessageStore.forEach((channelStore, channelId) => {
		channelStore.forEach((data, messageId) => {
			if (data.state === "passphrase_required" || data.state === "encrypted") {
				data.state = "encrypted";
				delete data.decrypted;
			}
			applyMessageVisibility(messageId, channelId, data.encrypted);
		});
	});
};
const handleEncryptedText = (element, text) => {
	if (element.getAttribute("data-pgpcord-injected") === "true") return;
	const messageId = getMessageId(element);
	if (!messageId) return;
	const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
	if (!channelId) return;
	if (!channelMessageStore.has(channelId)) channelMessageStore.set(channelId, new Map());
	const channelStore = channelMessageStore.get(channelId);
	if (!channelStore.has(messageId)) {
		channelStore.set(messageId, {
			encrypted: text,
			isFile: false,
			state: "encrypted"
		});
		applyMessageVisibility(messageId, channelId, text);
		if (!isSecureMode()) return;
	} else applyMessageVisibility(messageId, channelId, text);
	const cached = channelStore.get(messageId);
	const inject = (component) => {
		try {
			element.setAttribute("data-pgpcord-injected", "true");
			element.style.display = "none";
			const container = document.createElement("div");
			if (element.parentNode) element.parentNode.insertBefore(container, element.nextSibling);
else element.appendChild(container);
			const dispose = (0, import_web$22.render)(component, container);
			setTimeout(() => window.dispatchEvent(new Event("resize")), 10);
			if (cached) cached.cleanup = () => {
				try {
					dispose();
				} catch (e$1) {
					console.warn("PGPCord: Error disposing component", e$1);
				}
				try {
					container.remove();
					element.style.display = "";
					element.removeAttribute("data-pgpcord-injected");
				} catch (e$1) {
					console.warn("PGPCord: Error restoring DOM", e$1);
				}
			};
		} catch (e$1) {
			console.error("PGPCord: Failed to inject component", e$1);
		}
	};
	if (cached?.state === "wrong_key") {
		inject(() => (0, import_web$19.createComponent)(DecryptedMessageContainer, {
			encryptedContent: text,
			messageId,
			channelId
		}));
		return;
	}
	const privateKey$1 = getCachedPrivateKey();
	if (!privateKey$1 && cached?.state === "passphrase_required") inject(() => (0, import_web$19.createComponent)(DecryptedMessageContainer, {
		encryptedContent: text,
		messageId,
		channelId
	}));
};
const handleEncryptedFile = async (attachmentElement, messageId) => {
	const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
	if (!channelId) return;
	if (!channelMessageStore.has(channelId)) channelMessageStore.set(channelId, new Map());
	const channelStore = channelMessageStore.get(channelId);
	if (channelStore.has(messageId)) {
		const data = channelStore.get(messageId);
		applyMessageVisibility(messageId, channelId, data.encrypted);
		attachmentElement.style.display = "none";
		return;
	}
	if (attachmentElement.getAttribute("data-pgpcord-processing") === "true") return;
	attachmentElement.setAttribute("data-pgpcord-processing", "true");
	let anchor = attachmentElement.querySelector("a[href]");
	if (!anchor) anchor = attachmentElement.closest("a[href]");
	if (!anchor && attachmentElement.parentElement) {
		anchor = attachmentElement.parentElement.querySelector("a[href]");
		if (!anchor && attachmentElement.parentElement.parentElement) anchor = attachmentElement.parentElement.parentElement.querySelector("a[href]");
	}
	if (!anchor) {
		console.warn("PGPCord: Could not find download link for message.txt attachment", attachmentElement);
		return;
	}
	try {
		attachmentElement.style.display = "none";
		const url = anchor.href;
		const response = await fetch(url);
		if (!response.ok) throw new Error("Failed to fetch attachment");
		const textContent = await response.text();
		if (PGP_BLOCK_REGEX.test(textContent)) {
			channelStore.set(messageId, {
				encrypted: textContent,
				isFile: true,
				state: "encrypted"
			});
			applyMessageVisibility(messageId, channelId, textContent);
		} else attachmentElement.style.display = "";
	} catch (e$1) {
		console.error("PGPCord: Failed to process encrypted file.", e$1);
		attachmentElement.style.display = "";
	} finally {
		attachmentElement.removeAttribute("data-pgpcord-processing");
	}
};
const observeDom$1 = (selector, callback) => {
	if (shelter.observeDom) return shelter.observeDom(selector, callback);
	const observer = new MutationObserver((mutations) => {
		for (const m$1 of mutations) for (const n$1 of m$1.addedNodes) if (n$1 instanceof Element) {
			if (n$1.matches(selector)) callback(n$1);
			const c$1 = n$1.querySelector(selector);
			if (c$1) callback(c$1);
		}
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
	const existing = document.querySelectorAll(selector);
	existing.forEach((e$1) => callback(e$1));
	return () => observer.disconnect();
};
const injectLockIcon = (messageElement) => {
	const header = messageElement.querySelector("h3");
	if (!header) return;
	if (header.querySelector(".pgpcord-lock-icon")) return;
	const username = header.querySelector("span[class*='username']");
	if (!username) return;
	const lockIcon = document.createElement("span");
	lockIcon.className = "pgpcord-lock-icon";
	lockIcon.innerHTML = "🔒 ";
	lockIcon.style.fontSize = "0.9em";
	lockIcon.style.marginRight = "4px";
	lockIcon.style.cursor = "help";
	lockIcon.title = "End-to-end Encrypted";
	if (username.parentNode) username.parentNode.insertBefore(lockIcon, username);
};
let uninterceptEdit = null;
const patchMessageContent = () => {
	unobserve$1 = observeDom$1("[id^='chat-messages-']", (messageElement) => {
		let messageId = messageElement.id.replace("chat-messages-", "");
		if (messageId.includes("-")) {
			const parts = messageId.split("-");
			messageId = parts[parts.length - 1];
		}
		if (!messageId) return;
		const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
		if (channelId) {
			const channelStore = channelMessageStore.get(channelId);
			if (channelStore && channelStore.has(messageId)) {
				const cached = channelStore.get(messageId);
				const contentElement$1 = messageElement.querySelector("[id^='message-content-']");
				if (contentElement$1) {
					handleEncryptedText(contentElement$1, cached.encrypted);
					injectLockIcon(messageElement);
					return;
				}
			}
		}
		const contentElement = messageElement.querySelector("[id^='message-content-']");
		if (contentElement) {
			const text = contentElement.textContent;
			const match = text && text.match(PGP_BLOCK_REGEX);
			if (match) {
				handleEncryptedText(contentElement, match[0]);
				injectLockIcon(messageElement);
				return;
			}
		}
		const attachments = messageElement.querySelectorAll("[class*='attachment']");
		attachments.forEach((attachment) => {
			const textContent = attachment.textContent || "";
			const isMessageTxt = textContent.includes("message.txt") || attachment.querySelector("a[href*='message.txt']");
			if (isMessageTxt) {
				handleEncryptedFile(attachment, messageId);
				injectLockIcon(messageElement);
			}
		});
		if (channelId) {
			const channelStore = channelMessageStore.get(channelId);
			if (channelStore && channelStore.has(messageId)) injectLockIcon(messageElement);
		}
	});
	if (shelter.flux?.dispatcher) {
		const originalDispatch = shelter.flux.dispatcher.dispatch.bind(shelter.flux.dispatcher);
		shelter.flux.dispatcher.dispatch = (payload) => {
			if (payload.type === "MESSAGE_START_EDIT") {
				const messageId = payload.messageId;
				const channelId = payload.channelId;
				const channelStore = channelMessageStore.get(channelId);
				if (channelStore && channelStore.has(messageId)) {
					console.log("PGPCord: Blocked edit attempt on encrypted message", messageId);
					if (shelter.ui?.showToast) shelter.ui.showToast({
						title: "Cannot Edit Encrypted Message",
						content: "Encrypted messages cannot be edited for security reasons. Please delete and send a new message instead.",
						duration: 5e3
					});
else alert("Cannot edit encrypted messages for security reasons.\nPlease delete and send a new message instead.");
					return;
				}
			}
			return originalDispatch(payload);
		};
		uninterceptEdit = () => {
			if (shelter.flux?.dispatcher) shelter.flux.dispatcher.dispatch = originalDispatch;
		};
	} else console.warn("PGPCord: shelter.flux.dispatcher not found. Message edit blocking will not work.");
};
const unpatchMessage = () => {
	if (unobserve$1) unobserve$1();
	if (uninterceptEdit) uninterceptEdit();
	document.querySelectorAll(".pgpcord-lock-icon").forEach((e$1) => e$1.remove());
};
(0, import_web$15.delegateEvents)(["input", "click"]);

//#endregion
//#region plugins/pgpcord/components/SecureChatBar.tsx
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_solid_js = __toESM(require_solid_js(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web$2.template)(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>`, 2), _tmpl$2 = /*#__PURE__*/ (0, import_web$2.template)(`<svg><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect></svg>`, 4, true), _tmpl$3 = /*#__PURE__*/ (0, import_web$2.template)(`<svg><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`, 4, true), _tmpl$4 = /*#__PURE__*/ (0, import_web$2.template)(`<svg><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>`, 4, true), _tmpl$5 = /*#__PURE__*/ (0, import_web$2.template)(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`, 10), _tmpl$6 = /*#__PURE__*/ (0, import_web$2.template)(`<div class="spinner-dots"></div>`, 2), _tmpl$7 = /*#__PURE__*/ (0, import_web$2.template)(`<div></div>`, 2);
const LockIcon = (props) => (() => {
	const _el$ = (0, import_web$11.getNextElement)(_tmpl$);
	(0, import_web$12.insert)(_el$, (() => {
		const _c$ = (0, import_web$13.memo)(() => !!props.locked);
		return () => _c$() ? [(0, import_web$11.getNextElement)(_tmpl$2), (0, import_web$11.getNextElement)(_tmpl$3)] : [(0, import_web$11.getNextElement)(_tmpl$2), (0, import_web$11.getNextElement)(_tmpl$4)];
	})());
	(0, import_web$10.effect)((_p$) => {
		const _v$ = props.locked ? "locked-icon" : props.disabled ? "disabled-icon" : "unlocked-icon", _v$2 = props.disabled ? {
			opacity: .5,
			cursor: "not-allowed"
		} : {};
		_v$ !== _p$._v$ && (0, import_web$9.setAttribute)(_el$, "class", _p$._v$ = _v$);
		_p$._v$2 = (0, import_web$8.style)(_el$, _v$2, _p$._v$2);
		return _p$;
	}, {
		_v$: undefined,
		_v$2: undefined
	});
	return _el$;
})();
const InviteIcon = () => (0, import_web$11.getNextElement)(_tmpl$5);
const Spinner = () => (() => {
	const _el$7 = (0, import_web$11.getNextElement)(_tmpl$6);
	_el$7.style.setProperty("width", "16px");
	_el$7.style.setProperty("height", "16px");
	_el$7.style.setProperty("border", "2px solid var(--text-muted)");
	_el$7.style.setProperty("border-top-color", "var(--brand-experiment)");
	_el$7.style.setProperty("border-radius", "50%");
	_el$7.style.setProperty("animation", "spin 1s linear infinite");
	return _el$7;
})();
var SecureChatBar_default = () => {
	const [isSecureMode$1, setSecureMode$1] = (0, import_solid_js.createSignal)(isSecureMode());
	const [currentUserHasKey, setCurrentUserHasKey] = (0, import_solid_js.createSignal)(false);
	const [checkingCurrentUser, setCheckingCurrentUser] = (0, import_solid_js.createSignal)(true);
	const [hasKeys, setHasKeys] = (0, import_solid_js.createSignal)(false);
	const [checking, setChecking] = (0, import_solid_js.createSignal)(false);
	const [hasCheckedKeys, setHasCheckedKeys] = (0, import_solid_js.createSignal)(false);
	const [currentChannelId, setCurrentChannelId] = (0, import_solid_js.createSignal)("");
	let ref;
	(0, import_solid_js.createEffect)(() => {
		setSecureMode$1(isSecureMode());
	});
	(0, import_solid_js.onMount)(async () => {
		if (!shelter.plugin.store.pgpcord_channel_status) shelter.plugin.store.pgpcord_channel_status = {};
		setCheckingCurrentUser(true);
		const userKey = await checkCurrentUserKey();
		setCurrentUserHasKey(!!userKey);
		setCheckingCurrentUser(false);
		const channelId = shelter.flux?.stores?.SelectedChannelStore?.getChannelId();
		if (channelId) onChannelChange(channelId);
		const unsubscribe = shelter.flux.stores.SelectedChannelStore.addChangeListener(() => {
			const newChannelId = shelter.flux?.stores?.SelectedChannelStore?.getChannelId();
			if (newChannelId && newChannelId !== currentChannelId()) onChannelChange(newChannelId);
		});
		(0, import_solid_js.onCleanup)(() => unsubscribe());
	});
	(0, import_solid_js.createEffect)(() => {
		const channelId = currentChannelId();
		if (!channelId) return;
		const channel = shelter.util?.getChannel?.(channelId) || shelter.flux?.stores?.ChannelStore?.getChannel(channelId);
		if (channel?.guild_id) {
			const interval = setInterval(() => {
				checkKeys(channelId, true);
			}, 6e4);
			(0, import_solid_js.onCleanup)(() => clearInterval(interval));
		}
	});
	const checkKeys = async (channelId, force = false) => {
		const currentUser = shelter.flux.stores.UserStore.getCurrentUser();
		if (!currentUser) return;
		const cachedStatus = shelter.plugin.store.pgpcord_channel_status?.[channelId];
		if (!force && cachedStatus) {
			const isFresh = Date.now() - cachedStatus.lastChecked < 6e4;
			if (cachedStatus.isDm || isFresh) {
				setHasKeys(cachedStatus.hasKeys);
				setHasCheckedKeys(true);
				if (cachedStatus.hasKeys) {
					const storedLockState = shelter.plugin.store.pgpcord_lock_state?.[channelId];
					const shouldLock = storedLockState === undefined ? true : storedLockState;
					setSecureMode(shouldLock);
				}
				return;
			}
		}
		setChecking(true);
		try {
			if (!currentUserHasKey()) {
				const ownKey = await checkCurrentUserKey();
				setCurrentUserHasKey(!!ownKey);
				if (!ownKey) {
					setHasKeys(false);
					setHasCheckedKeys(true);
					setSecureMode(false);
					return;
				}
			}
			const channel = shelter.util?.getChannel?.(channelId) || shelter.flux?.stores?.ChannelStore?.getChannel(channelId);
			if (!channel) return;
			let recipientIds = [];
			let isDm = false;
			if (channel.recipients) {
				recipientIds = [...channel.recipients];
				isDm = true;
			} else if (channel.guild_id) {
				const guildId = channel.guild_id;
				const memberIds = new Set();
				const cachedMembers = shelter.flux.stores.GuildMemberStore?.getMemberIds(guildId);
				if (cachedMembers && Array.isArray(cachedMembers)) cachedMembers.forEach((id) => memberIds.add(id));
				const messages = shelter.flux.stores.MessageStore.getMessages(channelId);
				if (messages && messages.toArray) messages.toArray().forEach((msg) => {
					if (msg.author?.id) memberIds.add(msg.author.id);
				});
				if (memberIds.size > 0) recipientIds = Array.from(memberIds).slice(0, 100);
			} else recipientIds = [channel.id];
			const otherRecipients = recipientIds.filter((id) => id !== currentUser.id);
			if (otherRecipients.length === 0) {
				const hasKeysResult = !channel.guild_id;
				updateChannelStatus(channelId, hasKeysResult, isDm);
				return;
			}
			const keys = await getPublicKeys(otherRecipients);
			let allFound = false;
			if (channel.guild_id) allFound = keys.length > 0;
else allFound = keys.length === otherRecipients.length;
			updateChannelStatus(channelId, allFound, isDm);
		} catch (e$1) {
			console.error("PGPCord: Error checking keys", e$1);
			setHasKeys(false);
			setSecureMode(false);
		} finally {
			setChecking(false);
		}
	};
	const updateChannelStatus = (channelId, hasKeysResult, isDm) => {
		setHasKeys(hasKeysResult);
		setHasCheckedKeys(true);
		if (!shelter.plugin.store.pgpcord_channel_status) shelter.plugin.store.pgpcord_channel_status = {};
		shelter.plugin.store.pgpcord_channel_status[channelId] = {
			hasKeys: hasKeysResult,
			lastChecked: Date.now(),
			isDm
		};
		if (hasKeysResult) {
			if (!shelter.plugin.store.pgpcord_lock_state) shelter.plugin.store.pgpcord_lock_state = {};
			const storedState = shelter.plugin.store.pgpcord_lock_state[channelId];
			const shouldLock = storedState === undefined ? true : storedState;
			setSecureMode(shouldLock);
		} else setSecureMode(false);
		setTimeout(() => reprocessMessages(channelId), 100);
	};
	const onChannelChange = (channelId) => {
		setCurrentChannelId(channelId);
		setHasKeys(false);
		setHasCheckedKeys(false);
		setSecureMode(false);
		checkKeys(channelId);
	};
	const isDisabled = () => !currentUserHasKey();
	const handleClick = async () => {
		console.log("PGPCord: Lock button clicked", {
			disabled: isDisabled(),
			checking: checking(),
			checkingUser: checkingCurrentUser(),
			hasKeys: hasKeys(),
			currentMode: isSecureMode$1()
		});
		if (isDisabled() || checking() || checkingCurrentUser()) return;
		const channelId = currentChannelId();
		if (!channelId) return;
		if (!hasCheckedKeys()) await checkKeys(channelId, true);
		if (hasKeys()) {
			const newMode = !isSecureMode$1();
			console.log("PGPCord: Toggling secure mode to", newMode);
			setSecureMode(newMode);
			if (!shelter.plugin.store.pgpcord_lock_state) shelter.plugin.store.pgpcord_lock_state = {};
			shelter.plugin.store.pgpcord_lock_state[channelId] = newMode;
			setTimeout(() => reprocessMessages(channelId), 50);
		} else {
			const inviteText = `I am using PGPCord to encrypt my messages. Please install it and set up your keys so we can chat securely: ${WEB_BASE_URL}/`;
			const chatInput = document.querySelector("[role=\"textbox\"]") || document.querySelector("form textarea") || document.querySelector("[contenteditable=\"true\"]");
			if (chatInput) {
				chatInput.focus();
				if (chatInput.getAttribute("contenteditable") === "true") {
					const dataTransfer = new DataTransfer();
					dataTransfer.setData("text/plain", inviteText);
					const pasteEvent = new ClipboardEvent("paste", {
						clipboardData: dataTransfer,
						bubbles: true,
						cancelable: true
					});
					chatInput.dispatchEvent(pasteEvent);
				} else {
					const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
					nativeTextAreaValueSetter?.call(chatInput, inviteText);
					chatInput.dispatchEvent(new Event("input", { bubbles: true }));
				}
			} else alert(`Could not find chat bar to insert invite. Please send this link manually: ${WEB_BASE_URL}/`);
		}
	};
	const styles = `
    .secure-chat-bar-button {
      cursor: pointer;
      margin-right: 8px;
      color: var(--interactive-normal);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 4px;
      border-radius: 4px;
      transition: background-color 0.15s ease-out, color 0.15s ease-out;
    }
    .secure-chat-bar-button.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
    .secure-chat-bar-button:hover:not(.disabled) {
      background-color: var(--background-modifier-hover);
      color: var(--interactive-hover);
    }
    .secure-chat-bar-button .locked-icon {
      color: var(--green-360);
    }
    .secure-chat-bar-button .unlocked-icon {
      color: var(--interactive-normal);
    }
    .secure-chat-bar-button .disabled-icon {
      color: var(--text-muted);
    }
  `;
	shelter.ui.injectCss(styles);
	const getTitle = () => {
		if (checkingCurrentUser()) return "Checking your key...";
		if (!currentUserHasKey()) return "You need to set up your key in settings.";
		if (checking()) return "Checking recipient's keys...";
		if (!hasKeys()) return "Recipient has no key. Click to invite.";
		return isSecureMode$1() ? "Disable Encryption" : "Enable Encryption";
	};
	return (() => {
		const _el$8 = (0, import_web$11.getNextElement)(_tmpl$7);
		_el$8.$$click = handleClick;
		const _ref$ = ref;
		typeof _ref$ === "function" ? (0, import_web$7.use)(_ref$, _el$8) : ref = _el$8;
		(0, import_web$12.insert)(_el$8, (() => {
			const _c$2 = (0, import_web$13.memo)(() => !!isProcessing());
			return () => _c$2() ? (0, import_web$4.createComponent)(Spinner, {}) : (() => {
				const _c$3 = (0, import_web$13.memo)(() => !!hasKeys());
				return () => _c$3() ? (0, import_web$4.createComponent)(LockIcon, {
					get locked() {
						return isSecureMode$1();
					},
					get disabled() {
						return isDisabled();
					}
				}) : (0, import_web$4.createComponent)(InviteIcon, {});
			})();
		})());
		(0, import_web$10.effect)((_p$) => {
			const _v$3 = `secure-chat-bar-button ${isDisabled() ? "disabled" : ""}`, _v$4 = getTitle();
			_v$3 !== _p$._v$3 && (0, import_web$5.className)(_el$8, _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && (0, import_web$9.setAttribute)(_el$8, "title", _p$._v$4 = _v$4);
			return _p$;
		}, {
			_v$3: undefined,
			_v$4: undefined
		});
		(0, import_web$6.runHydrationEvents)();
		return _el$8;
	})();
};
(0, import_web$3.delegateEvents)(["click"]);

//#endregion
//#region plugins/pgpcord/patches/ChatBar.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
let unobserve = null;
let unintercept = null;
const observeDom = (selector, callback) => {
	if (shelter.observeDom) return shelter.observeDom(selector, callback);
	const observer = new MutationObserver((mutations) => {
		for (const m$1 of mutations) for (const n$1 of m$1.addedNodes) if (n$1 instanceof Element) {
			if (n$1.matches(selector)) callback(n$1);
			const c$1 = n$1.querySelector(selector);
			if (c$1) callback(c$1);
		}
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
	const existing = document.querySelectorAll(selector);
	existing.forEach((e$1) => callback(e$1));
	return () => observer.disconnect();
};
const patchChatBar = () => {
	unobserve = observeDom("form [class*='buttons']", (element) => {
		if (!element.closest("form")) return;
		if (element.querySelector("#pgpcord-lock-btn")) return;
		const container = document.createElement("div");
		container.id = "pgpcord-lock-btn";
		container.style.display = "flex";
		container.style.alignItems = "center";
		container.style.marginRight = "8px";
		element.prepend(container);
		(0, import_web$1.render)(() => (0, import_web.createComponent)(SecureChatBar_default, {}), container);
	});
	if (shelter.http?.intercept) unintercept = shelter.http.intercept("POST", /\/channels\/\d+\/messages/, async (req, send) => {
		console.log("PGPCord: Interceptor triggered!", {
			isSecureMode: isSecureMode(),
			hasBody: !!req.body,
			bodyType: req.body?.constructor?.name,
			isFormData: req.body instanceof FormData
		});
		if (!isSecureMode()) {
			console.log("PGPCord: Not in secure mode, skipping");
			return send(req);
		}
		console.log("PGPCord: Request body keys:", Object.keys(req.body || {}));
		console.log("PGPCord: Request body:", req.body);
		try {
			const match = req.url.match(/\/channels\/(\d+)\/messages/);
			const channelId = match ? match[1] : null;
			if (!channelId) return send(req);
			let channel = shelter.util?.getChannel?.(channelId);
			if (!channel && shelter.flux?.stores?.ChannelStore) channel = shelter.flux.stores.ChannelStore.getChannel(channelId);
			if (!channel) return send(req);
			if (req.body.attachments && Array.isArray(req.body.attachments) && req.body.attachments.length > 0) {
				console.warn("PGPCord: File uploads cannot be encrypted (files are already on Discord CDN).");
				console.warn("PGPCord: Only text messages can be encrypted. Please send files separately or use external encrypted file sharing.");
				return send(req);
			}
			let recipientIds = [];
			if (channel?.recipients) recipientIds = [...channel.recipients];
else if (channel?.guild_id) {
				const guildId = channel.guild_id;
				const memberIds = new Set();
				const cachedMembers = shelter.flux.stores.GuildMemberStore?.getMemberIds(guildId);
				if (cachedMembers && Array.isArray(cachedMembers)) cachedMembers.forEach((id) => memberIds.add(id));
				const messages = shelter.flux.stores.MessageStore.getMessages(channelId);
				if (messages && messages.toArray) messages.toArray().forEach((msg) => {
					if (msg.author?.id) memberIds.add(msg.author.id);
				});
				if (memberIds.size > 0) recipientIds = Array.from(memberIds).slice(0, 100);
			}
			const currentUser = shelter.flux?.stores?.UserStore?.getCurrentUser();
			if (currentUser && !recipientIds.includes(currentUser.id)) recipientIds.push(currentUser.id);
			if (recipientIds.length === 0) {
				console.warn("PGPCord: No recipients found");
				return send(req);
			}
			const keys = await getPublicKeys(recipientIds);
			const validRecipientIds = keys.map((k$1) => k$1.discord_id);
			if (validRecipientIds.length === 0) {
				console.warn("PGPCord: No valid recipients with keys found.");
				return send(req);
			}
			const content = req.body?.content;
			if (!content) return send(req);
			const mentionRegex = /<@!?(\d+)>/g;
			const mentions = [];
			let mentionMatch;
			while ((mentionMatch = mentionRegex.exec(content)) !== null) mentions.push(mentionMatch[0]);
			setProcessing(true);
			const encrypted = await encryptMessage(content, validRecipientIds);
			const finalContent = mentions.length > 0 ? `||${mentions.join(" ")}||` : "";
			const formData = new FormData();
			const file = new File([new Blob([encrypted], { type: "text/plain" })], "message.txt");
			const payload_json = {
				...req.body,
				content: finalContent
			};
			formData.append("payload_json", JSON.stringify(payload_json));
			formData.append("files[0]", file, "message.txt");
			req.body = formData;
			if (req.headers) delete req.headers["Content-Type"];
		} catch (e$1) {
			console.error("PGPCord: Failed to encrypt", e$1);
		} finally {
			setProcessing(false);
		}
		return send(req);
	});
else console.warn("PGPCord: shelter.http.intercept not found. Encryption will not work.");
};
const unpatchChatBar = () => {
	if (unobserve) unobserve();
	if (unintercept) unintercept();
	document.querySelectorAll("#pgpcord-lock-btn").forEach((e$1) => e$1.remove());
};

//#endregion
//#region plugins/pgpcord/index.tsx
var pgpcord_default = {
	name: "PGPCord",
	author: "Gemini",
	description: "End-to-end PGP encryption for Discord messages.",
	onLoad: () => {
		patchChatBar();
		patchMessageContent();
	},
	onUnload: () => {
		unpatchChatBar();
		unpatchMessage();
	},
	settings: Settings_default
};

//#endregion
return pgpcord_default;
})();