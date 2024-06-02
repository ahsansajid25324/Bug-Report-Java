package net.javaguides.springboot.service;

import net.javaguides.springboot.exception.InvalidBugDataException;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Bug;
import net.javaguides.springboot.repository.BugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BugService {

    @Autowired
    private BugRepository bugRepository;

    public Bug createBug(String bugReporter, String bugType, String reason, String siteName, String siteLink) {
        validateBugData(bugReporter, bugType, reason, siteName, siteLink);
        Bug bug = new Bug(bugReporter, bugType, reason, siteName, siteLink);
        return bugRepository.save(bug);
    }

    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

    public Bug getBugById(Long id) {
        Optional<Bug> bug = bugRepository.findById(id);
        if (bug.isPresent()) {
            return bug.get();
        } else {
            throw new ResourceNotFoundException("Bug not found with id: " + id);
        }
    }

    public Bug updateBug(Long id, String bugReporter, String bugType, String reason, String siteName, String siteLink) {
        try {
            Bug existingBug = getBugById(id);
            validateBugData(bugReporter, bugType, reason, siteName, siteLink);
            existingBug.setBugReporter(bugReporter);
            existingBug.setBugType(bugType);
            existingBug.setReason(reason);
            existingBug.setSiteName(siteName);
            existingBug.setSiteLink(siteLink);
            return bugRepository.save(existingBug);
        } catch (ResourceNotFoundException ex) {
            throw new ResourceNotFoundException("Bug not found with id: " + id);
        } catch (InvalidBugDataException ex) {
            throw new InvalidBugDataException("Invalid bug data provided");
        } catch (Exception ex) {
            // Handle other potential exceptions here
            throw new RuntimeException("An error occurred while updating the bug", ex);
        }
    }


    public void deleteBug(Long id) {
        Bug existingBug = getBugById(id);
        bugRepository.delete(existingBug);
    }

    private void validateBugData(String bugReporter, String bugType, String reason, String siteName, String siteLink) {
        if (bugReporter == null || bugReporter.isEmpty()) {
            throw new InvalidBugDataException("BugReporter cannot be null or empty");
        }
        if (bugType == null || bugType.isEmpty()) {
            throw new InvalidBugDataException("BugType cannot be null or empty");
        }
        if (reason == null || reason.isEmpty()) {
            throw new InvalidBugDataException("Reason cannot be null or empty");
        }
        if (siteName == null || siteName.isEmpty()) {
            throw new InvalidBugDataException("SiteName cannot be null or empty");
        }
        if (siteLink == null || siteLink.isEmpty()) {
            throw new InvalidBugDataException("SiteLink cannot be null or empty");
        }
        if (!siteLink.matches("^(http|https)://.*$")) {
            throw new InvalidBugDataException("SiteLink must be a valid URL");
        }
    }

    // Other service methods...
}