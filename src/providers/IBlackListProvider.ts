export interface IBlackListProvider {
	verifyToken(token: string): boolean;
	addToken(token: string): void;
}
