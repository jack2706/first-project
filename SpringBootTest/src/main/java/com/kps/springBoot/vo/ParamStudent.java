package com.kps.springBoot.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ParamStudent {
	private int id;
    private String name;
    private String branch;
    private int percentage;
    private int phone;
    private String email;
    
	public ParamStudent(int id, String name) {
    	this.id = id;
    	this.name = name;
    }
}
