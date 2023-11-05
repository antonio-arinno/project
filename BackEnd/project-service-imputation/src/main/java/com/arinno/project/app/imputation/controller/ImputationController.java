package com.arinno.project.app.imputation.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.arinno.project.app.imputation.service.IImputationService;
import com.arinno.project.app.model.entity.Company;
import com.arinno.project.app.model.entity.Imputation;
import com.arinno.project.app.model.entity.User;

@RestController
public class ImputationController {

	@Autowired
	private IImputationService imputationService;
	
	@GetMapping("/")	
	public List<Imputation> list(@RequestHeader(value="Authorization") String auth){
//		return imputationService.findByCompany(getCompany(auth));		
		return imputationService.findByUser(getUser(auth));	
	}
	
	@GetMapping("/{id}")
	public Imputation project(@PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		return imputationService.findByIdAndCompany(id, getCompany(auth));
	}
	
	@PostMapping("/")
	@ResponseStatus(HttpStatus.CREATED)
	public Imputation create(@RequestBody Imputation imputation, @RequestHeader(value="Authorization") String auth) {
		imputation.setUser(getUser(auth));
		imputation.setCompany(getCompany(auth));
		return imputationService.save(imputation);
	}
	
	@GetMapping("/createcal")
	@ResponseStatus(HttpStatus.CREATED)
	public void createCal(@RequestHeader(value="Authorization") String auth) {

		ZoneId defaultZoneId = ZoneId.systemDefault(); 
        for ( LocalDate day = LocalDate.parse("2023-01-01"); day.getYear() < 2024 ; day = day.plusDays(1)) {
    		Imputation imputation = new Imputation();
    		imputation.setUser(getUser(auth));
    		imputation.setCompany(getCompany(auth));
    		Date date = Date.from(day.atStartOfDay(defaultZoneId).toInstant());
    		imputation.setDate(date);
    		imputationService.save(imputation);


        }		
	}	
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Imputation edit(@RequestBody Imputation imputation, @PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		Imputation imputationDb = imputationService.findByIdAndCompany(id, getCompany(auth));
		imputationDb.setDate(imputation.getDate());
		imputationDb.setItems(imputation.getItems());
		return imputationService.save(imputationDb);
	}
	
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id, @RequestHeader(value="Authorization") String auth) {
		imputationService.deleteByIdAndCompany(id, getCompany(auth));
	}
	
	private Company getCompany(String auth) {
		String[] chunks = auth.substring(7).split("\\.");
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String payload = new String(decoder.decode(chunks[1]));
		JSONObject jsonObject = new JSONObject(payload);			
		return imputationService.findCompanyByUsername(jsonObject.getString ("user_name"));	
	}		
	
	private User getUser(String auth) {
		String[] chunks = auth.substring(7).split("\\.");
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String payload = new String(decoder.decode(chunks[1]));
		JSONObject jsonObject = new JSONObject(payload);			
		return imputationService.findUserByUsername(jsonObject.getString ("user_name"));	
	}			
	
	
}
