export const categories = [
  { id: "HARDWARE_ISSUES", title: "Hardware Issues" },
  { id: "SOFTWARE_ISSUES", title: "Software Issues" },
  { id: "NETWORK_ISSUES", title: "Network Issues" },
  { id: "SERVER_ISSUES", title: "Server Issues" },
  { id: "SECURITY_ISSUES", title: "Security Issues" },
  { id: "ACCOUNT_OR_BILLING_ISSUES", title: "Account or Billing Issues" },
  { id: "TRAINING_OR_ONBOARDING", title: "Training or Onboarding" },
  { id: "OTHER_GENERAL_INQUIRIES", title: "Other/General Inquiries" },
];

export const subCategories = [
  { id: "WORKSTATION", title: "Workstation", category: "HARDWARE_ISSUES" },
  { id: "PRINTER", title: "Printer", category: "HARDWARE_ISSUES" },
  { id: "MONITOR", title: "Monitor", category: "HARDWARE_ISSUES" },
  {
    id: "KEYBOARD_AND_MOUSE",
    title: "Keyboard and Mouse",
    category: "HARDWARE_ISSUES",
  },
  {
    id: "NETWORKING_DEVICES",
    title: "Networking Devices",
    category: "HARDWARE_ISSUES",
  },
  {
    id: "OTHER_HARDWARE",
    title: "Other Hardware",
    category: "HARDWARE_ISSUES",
  },
  {
    id: "OPERATING_SYSTEM",
    title: "Operating System",
    category: "SOFTWARE_ISSUES",
  },
  {
    id: "OFFICE_SUITE",
    title: "Office Suite",
    category: "SOFTWARE_ISSUES",
  },
  {
    id: "EMAIL_CLIENT",
    title: "Email Client",
    category: "SOFTWARE_ISSUES",
  },
  { id: "BROWSER", title: "Browser", category: "SOFTWARE_ISSUES" },
  {
    id: "ACCOUNTING_SOFTWARE",
    title: "Accounting Software",
    category: "SOFTWARE_ISSUES",
  },
  {
    id: "SECURITY_SOFTWARE",
    title: "Security Software",
    category: "SOFTWARE_ISSUES",
  },
  {
    id: "CRM_OR_ERP_SYSTEM",
    title: "CRM or ERP System",
    category: "SOFTWARE_ISSUES",
  },
  {
    id: "CUSTOM_APPLICATIONS",
    title: "Custom Applications",
    category: "SOFTWARE_ISSUES",
  },
  {
    id: "OTHER_SOFTWARE",
    title: "Other Software",
    category: "SOFTWARE_ISSUES",
  },
  {
    id: "INTERNET_CONNECTIVITY",
    title: "Internet Connectivity",
    category: "NETWORK_ISSUES",
  },
  { id: "WI_FI", title: "Wi-Fi", category: "NETWORK_ISSUES" },
  { id: "VPN", title: "VPN", category: "NETWORK_ISSUES" },
  { id: "DNS", title: "DNS", category: "NETWORK_ISSUES" },
  { id: "FIREWALL", title: "Firewall", category: "NETWORK_ISSUES" },
  {
    id: "OTHER_NETWORK_ISSUES",
    title: "Other Network Issues",
    category: "NETWORK_ISSUES",
  },
  { id: "FILE_SERVER", title: "File Server", category: "SERVER_ISSUES" },
  { id: "EMAIL_SERVER", title: "Email Server", category: "SERVER_ISSUES" },
  {
    id: "DATABASE_SERVER",
    title: "Database Server",
    category: "SERVER_ISSUES",
  },
  { id: "WEB_SERVER", title: "Web Server", category: "SERVER_ISSUES" },
  {
    id: "VIRTUALIZATION_SERVER",
    title: "Virtualization Server",
    category: "SERVER_ISSUES",
  },
  {
    id: "BACKUP_SERVER",
    title: "Backup Server",
    category: "SERVER_ISSUES",
  },
  {
    id: "OTHER_SERVER_ISSUES",
    title: "Other Server Issues",
    category: "SERVER_ISSUES",
  },
  { id: "DATA_BREACH", title: "Data Breach", category: "SECURITY_ISSUES" },
  {
    id: "MALWARE_OR_VIRUS",
    title: "Malware or Virus",
    category: "SECURITY_ISSUES",
  },
  {
    id: "PHISHING_ATTEMPT",
    title: "Phishing Attempt",
    category: "SECURITY_ISSUES",
  },
  {
    id: "ACCOUNT_COMPROMISE",
    title: "Account Compromise",
    category: "SECURITY_ISSUES",
  },
  {
    id: "UNAUTHORIZED_ACCESS",
    title: "Unauthorized Access",
    category: "SECURITY_ISSUES",
  },
  {
    id: "VULNERABILITY_OR_PATCH_MANAGEMENT",
    title: "Vulnerability or Patch Management",
    category: "SECURITY_ISSUES",
  },
  {
    id: "OTHER_SECURITY_ISSUES",
    title: "Other Security Issues",
    category: "SECURITY_ISSUES",
  },
  {
    id: "ACCOUNT_ACCESS",
    title: "Account Access",
    category: "ACCOUNT_OR_BILLING_ISSUES",
  },
  {
    id: "PASSWORD_RESET",
    title: "Password Reset",
    category: "ACCOUNT_OR_BILLING_ISSUES",
  },
  {
    id: "BILLING_OR_INVOICE_INQUIRY",
    title: "Billing or Invoice Inquiry",
    category: "ACCOUNT_OR_BILLING_ISSUES",
  },
  {
    id: "SERVICE_UPGRADES_OR_DOWNGRADES",
    title: "Service Upgrades or Downgrades",
    category: "ACCOUNT_OR_BILLING_ISSUES",
  },
  {
    id: "CONTRACT_RENEWAL",
    title: "Contract Renewal",
    category: "ACCOUNT_OR_BILLING_ISSUES",
  },
  {
    id: "OTHER_ACCOUNT_OR_BILLING_ISSUES",
    title: "Other Account or Billing Issues",
    category: "ACCOUNT_OR_BILLING_ISSUES",
  },
  {
    id: "NEW_EMPLOYEE_ONBOARDING",
    title: "New Employee Onboarding",
    category: "TRAINING_OR_ONBOARDING",
  },
  {
    id: "SOFTWARE_TRAINING",
    title: "Software Training",
    category: "TRAINING_OR_ONBOARDING",
  },
  {
    id: "SECURITY_AWARENESS_TRAINING",
    title: "Security Awareness Training",
    category: "TRAINING_OR_ONBOARDING",
  },
  {
    id: "HARDWARE_USAGE_TRAINING",
    title: "Hardware Usage Training",
    category: "TRAINING_OR_ONBOARDING",
  },
  {
    id: "MSP_SERVICES_TRAINING",
    title: "MSP Services Training",
    category: "TRAINING_OR_ONBOARDING",
  },
  {
    id: "OTHER_TRAINING_OR_ONBOARDING",
    title: "Other Training or Onboarding",
    category: "TRAINING_OR_ONBOARDING",
  },
  {
    id: "TECHNICAL_CONSULTATION",
    title: "Technical Consultation",
    category: "OTHER_GENERAL_INQUIRIES",
  },
  {
    id: "PROJECT_OR_SERVICE_REQUEST",
    title: "Project or Service Request",
    category: "OTHER_GENERAL_INQUIRIES",
  },
  {
    id: "HARDWARE_OR_SOFTWARE_RECOMMENDATIONS",
    title: "Hardware or Software Recommendations",
    category: "OTHER_GENERAL_INQUIRIES",
  },
  {
    id: "SERVICE_OUTAGE_OR_DOWNTIME",
    title: "Service Outage or Downtime",
    category: "OTHER_GENERAL_INQUIRIES",
  },
  {
    id: "GENERAL_SUPPORT_QUESTIONS",
    title: "General Support Questions",
    category: "OTHER_GENERAL_INQUIRIES",
  },
  {
    id: "OTHER_INQUIRIES",
    title: "Other Inquiries",
    category: "OTHER_GENERAL_INQUIRIES",
  },
];
