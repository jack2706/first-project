package com.kps.springBoot.exceptionHandle;

public class BeanCreationException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public BeanCreationException(String message) {
		super(message);
	}
	 
}
