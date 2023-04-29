import { IBlackListProvider } from '../IBlackListProvider';

export class BlackList implements IBlackListProvider {
	private blacklist: string[];

	constructor() {
		this.blacklist = [];
	}

	public verifyToken(token: string): boolean {
		return this.blacklist.includes(token);
	}

	public addToken(token: string) {
		if (this.verifyToken(token)) {
			this.blacklist.push(token);
		}
	}
}
