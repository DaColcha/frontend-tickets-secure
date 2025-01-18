export interface Tarjeta {
	numero: string;
	nombreTitular: string;
	cvv: string;
	fechaVencimiento: string;
}

export interface Token {
	token: string;
}

export interface Pago {
	encryptedData: string; 
	total: number;         
	useCard: boolean;      
	formaPago: string;
}