<aura:application access="global" extends="force:slds" >
    
   <aura:attribute name="leftValues" type="Object[]" default="[
                                                               {
                                                               'label': 'Annual Review',
                                                               'value': 'Annual Review'
                                                               },
                                                               {
                                                               'label': 'Initial Contact',
                                                               'value': 'Initial Contact'
                                                               },
                                                               {
                                                               'label': 'Application',
                                                               'value': 'Application'
                                                               },
                                                               {
                                                               'label': 'Qualifying Documentation Review',
                                                               'value': 'Qualifying Documentation Review'
                                                               },
                                                               {
                                                               'label': 'Additional Documentation Requested',
                                                               'value': 'Additional Documentation Requested'
                                                               },
                                                               {
                                                               'label': 'Evaluations Sent',
                                                               'value': 'Evaluations Sent'
                                                               },
                                                               {
                                                               'label': '24 Hour Follow Up',
                                                               'value': '24 Hour Follow Up'
                                                               },
                                                               {
                                                               'label': '48 Hour Follow Up',
                                                               'value': '48 Hour Follow Up'
                                                               },
                                                               {
                                                               'label': 'Initial Items Received',
                                                               'value': 'Initial Items Received'
                                                               },
                                                               {
                                                               'label': 'Additional Items Requested',
                                                               'value': 'Additional Items Requested'
                                                               },
                                                               {
                                                               'label': 'Additional Items Received',
                                                               'value': 'Additional Items Received'
                                                               },
                                                               {
                                                               'label': 'On Hold',
                                                               'value': 'On Hold'
                                                               },
                                                               {
                                                               'label': 'Conditions Received',
                                                               'value': 'Conditions Received'
                                                               },
                                                               {
                                                               'label': 'Waiting on Approval',
                                                               'value': 'Waiting on Approval'
                                                               },
                                                               {
                                                               'label': 'Ready for Re-Submission',
                                                               'value': 'Ready for Re-Submission'
                                                               },
                                                               {
                                                               'label': 'Conditions Submitted',
                                                               'value': 'Conditions Submitted'
                                                               },
                                                               {
                                                               'label': 'Clear to Close',
                                                               'value': 'Clear to Close'
                                                               },
                                                               {
                                                               'label': 'Evaluation Ordered',
                                                               'value': 'Evaluation Ordered'
                                                               },
                                                               {
                                                               'label': 'Closed Won',
                                                               'value': 'Closed Won'
                                                               },
                                                               {
                                                               'label': 'Closed Lost',
                                                               'value': 'Closed Lost'
                                                               },
                                                               {
                                                               'label': 'Suspect',
                                                               'value': 'Suspect'
                                                               },
                                                               {
                                                               'label': 'Closed Lost - Nurture',
                                                               'value': 'Closed Lost - Nurture'
                                                               },
                                                               {
                                                               'label': 'Closed Lost - Rejected',
                                                               'value': 'Closed Lost - Rejected'
                                                               }
                                                               ]"/>
    
    <aura:attribute name="rightValues" type="Object[]" default="[
                                                                       {
                                                                       'label': 'In Credit Repair',
                                                                       'value': 'In Credit Repair'
                                                                       },
                                                                       {
                                                                       'label': 'Submit to Dev',
                                                                       'value': 'Submit to Dev'
                                                                       },
                                                                       {
                                                                       'label': 'Watching Market',
                                                                       'value': 'Watching Market'
                                                                       },
                                                                       {
                                                                       'label': 'Waiting for Response',
                                                                       'value': 'Waiting for Response'
                                                                       }]"/>
    
  <div class="slds">
    <div class="slds-box">
      <c:DualSelect fieldName="Opportunity Stage" leftValues="{!v.leftValues}" rightValues="{!v.rightValues}"  />
    </div>     
  </div>
</aura:application>
