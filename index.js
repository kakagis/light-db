const fs = require("fs").promises;
const path = require("path");

class Database {
	dir = "";
	#data = null;

	constructor(dir = "") {
		this.dir = dir;
	}

	async getItem(key = "") {
		const pathToItem = path.join(this.dir, `${key}.json`);

		this.#data = "";

		try {
			this.#data = await fs.readFile(pathToItem, { encoding: "utf-8" });
		} catch (err) {
			console.error(err);
		}

		return this.#data;
	}

	async setItem(key = "", value) {
		const pathToItem = path.join(this.dir, `${key}.json`);

		let modifiedValue = "";

		switch (typeof value) {
			case "boolean": {
				modifiedValue = `${value}`;
				break;
			}
			case "number" || "bigint": {
				modifiedValue = value.toString();
				break;
			}
			case "object": {
				modifiedValue = JSON.stringify(value);
				break;
			}
			case "string": {
				modifiedValue = `"${value}"`;
				break;
			}
		}

		try {
			await fs.writeFile(pathToItem, modifiedValue, {
				encoding: "utf-8",
			});
		} catch (err) {
			console.error(err);
		}
	}

	async deleteItem(key = "") {
		const pathToItem = path.join(this.dir, `${key}.json`);

		try {
			await fs.rm(pathToItem);
		} catch (err) {
			console.error(err);
		}
	}

	async listItems(key = "") {
		const pathToItem = path.join(this.dir, `${key}.json`);

		this.#data = [""];

		try {
			this.#data = await fs.readdir(pathToItem, { encoding: "utf-8" });
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = Database;
