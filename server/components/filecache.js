const glob = require('fast-glob');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

class FileCache {

	constructor(path, options) {
		this._loadQueue = [];
		this.files = {};
		path && this.load(path, options);
	}

	/**
	 * recursively adds all files in the directory to the load queue
	 * @param dir the directory to scan relative to cwd
	 * @returns {Promise}
	 */
	load(dir, options) {
		return glob(dir, options)
			.then(files => Array.prototype.push.apply(this._loadQueue, files))
			.then(() => this._processLoadQueue())
	}

	/**
	 * loads all files in the load queue into the cache
	 * @returns {Promise}
	 * @private
	 */
	_processLoadQueue() {
		if (!this._loadQueue.length) {
			return Promise.resolve();
		}
		return this.loadFile(this._loadQueue.pop())
			.then(() => this._processLoadQueue())
	}

	/**
	 * loads the file from the disk and adds it to the cache
	 * @param path
	 * @returns {Promise.<TResult>}
	 */
	loadFile(path) {
		return fs.readFileAsync(path)
			.then(file => {
				path = this.formatPath(path);
				this.files[path] = this.formatFile(file);
			});
	}

	/**
	 * pushes all files in the cache on the profided res object
	 * @param res
	 */
	pushFiles(res) {
		let paths = Object.keys(this.files);
		return Promise.each(paths, path => {
			res.push(path, {}).end(this.files[path]);
		});
	}

	/**
	 * placeholder function to format the path stored in the cache
	 * @param path
	 * @returns {*}
	 */
	formatPath(path) {
		return path;
	}

	/**
	 * placeholder function to format the file contents stored in the cache
	 * @param file
	 * @returns {string|*|String}
	 */
	formatFile(file) {
		return file.toString();
	}
}

module.exports = FileCache;

