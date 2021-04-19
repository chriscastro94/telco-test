package com.consulti.entity;

public class ResponseMsg {
	String code;

	String message;

	String status;

	String payload;

	public ResponseMsg(String code, String message, String status) {
		this.code = code;
		this.message = message;
		this.status = status;
	}

	public ResponseMsg(String resp) {
		switch (resp) {
		case "ERROR":
			this.code = "400";
			this.status = "ERROR";
			this.message = "Transacción Negada";
			return;
		case "OK":
			this.code = "200";
			this.status = "OK";
			this.message = "Transacción Aceptada";
			return;
		case "exists":
			this.code = "500";
			this.status = "ERROR";
			this.message = "El dato a ingresar ya existe";
			return;
		}
		this.code = "400";
		this.status = "ERROR";
		this.message = "Mensaje desconocido";
	}

	public ResponseMsg() {
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPayload() {
		return this.payload;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}

	@Override
	public String toString() {
		return "ResponseMsg [code=" + code + ", message=" + message + ", status=" + status + ", payload=" + payload
				+ "]";
	}
	
	
}
