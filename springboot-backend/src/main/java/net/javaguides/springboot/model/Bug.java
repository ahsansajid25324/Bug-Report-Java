package net.javaguides.springboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="bugs")

public class Bug {
	
		@Id
		@GeneratedValue(strategy= GenerationType.IDENTITY)
	    private Long id;
		
		@Column(name= "bug_reporter")
	    private String BugReporter;
		@Column(name= "bug_type")
	    private String BugType;
		@Column(name= "reason")
	    private String Reason;
		@Column(name= "site_name")
	    private String SiteName;
		@Column(name= "site_link")
	    private String SiteLink;
	    
	    public Bug() {
	    	
	    }
	    
	    
		public Bug(String bugReporter, String bugType, String reason, String siteName, String siteLink) {
			super();
			BugReporter = bugReporter;
			BugType = bugType;
			Reason = reason;
			SiteName = siteName;
			SiteLink = siteLink;
		}
		
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getBugReporter() {
			return BugReporter;
		}
		public void setBugReporter(String bugReporter) {
			BugReporter = bugReporter;
		}
		public String getBugType() {
			return BugType;
		}
		public void setBugType(String bugType) {
			BugType = bugType;
		}
		public String getReason() {
			return Reason;
		}
		public void setReason(String reason) {
			Reason = reason;
		}
		public String getSiteName() {
			return SiteName;
		}
		public void setSiteName(String siteName) {
			SiteName = siteName;
		}
		public String getSiteLink() {
			return SiteLink;
		}
		public void setSiteLink(String siteLink) {
			SiteLink = siteLink;
		}

	    
}
