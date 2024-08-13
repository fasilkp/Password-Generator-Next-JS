
export function appLog(...o) {
	if (process.env.LOGGER===false) {
		return;
	}
	const stack = new Error().stack;
	console.log("────────────────────────────────────────────────────────────────");
	console.log(
		`(📂${stack.split("\n")[2].split("./src")[1]}`,
		`[🕒 ${new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}).toLocaleString()}]`,
	);
	console.log(...o);
	console.log("-----------------------------------------------------------------");
}
export function errLog(...o) {
	if (process.env.LOGGER===false) {
		return;
	}
	const stack = new Error().stack;
	console.log("🚨🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🚨");
	console.log(
		`(📂${stack.split("\n")[2].split("./src")[1]}`,
		`[🕒 ${new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}).toLocaleString()}]`,
	);
	console.log(
		...o
	);
	console.log("--------------------------------------------------------------------");
}

export default {appLog, errLog};
