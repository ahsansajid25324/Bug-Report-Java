package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.InvalidBugDataException;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Bug;
import net.javaguides.springboot.service.BugService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class BugController {
    
    @Autowired
    private BugService bugService;
    
    //get all bugs
    @GetMapping("/bug")
    public List<Bug> getAllBugs(){
        return bugService.getAllBugs();
    }
    
    
    //add bugs api
    @PostMapping("/bug")
    public Bug createBug(@RequestBody Bug bug) {
        return bugService.createBug(bug.getBugReporter(), bug.getBugType(), bug.getReason(), bug.getSiteName(), bug.getSiteLink());
    }
    
    
    //get bug reporter by name
    @GetMapping("/bug/{id}")
    public ResponseEntity<Bug> getBugReporter(@PathVariable Long id) {
        
        Bug bug = bugService.getBugById(id);
        return ResponseEntity.ok(bug);
    }
    
  //update bug
    @PutMapping("/bug/{id}")
    public ResponseEntity<?> updateBug(@PathVariable Long id,@RequestBody Bug bugDetails){
        try {
            Bug updatedBug = bugService.updateBug(id, bugDetails.getBugReporter(), bugDetails.getBugType(), bugDetails.getReason(), bugDetails.getSiteName(), bugDetails.getSiteLink());
            return ResponseEntity.ok(updatedBug);
        } catch (InvalidBugDataException e) {
            // Handle invalid bug data exception
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (ResourceNotFoundException e) {
            // Handle resource not found exception
            return ResponseEntity.notFound().build();
        }
    }

    
    //delete bug
    @DeleteMapping("/bug/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBug(@PathVariable Long id){
        
        bugService.deleteBug(id);
        Map<String, Boolean> response=new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    
}
