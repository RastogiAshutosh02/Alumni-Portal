
<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Student Gymkhana Election</title>

	<!-- Bootstrap core CSS -->
	<link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

	<!-- Bootstrap core CSS -->
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/dataTables.bootstrap.css" rel="stylesheet">

	<!-- Custom fonts for this template -->
	<link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet">
	<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet">

	<!-- Custom styles for this template -->
	<link href="css/resume.min.css" rel="stylesheet">
	<style>

		p.lead, .subheading {
			font-size: 2rem;
		}

		del { 
			text-decoration: line-through;
		}

		nav > .nav.nav-tabs{

			border: none;
			color:#fff;
			background:#272e38;
			border-radius:0;

		}
		nav > div a.nav-item.nav-link,
		nav > div a.nav-item.nav-link.active
		{
			border: none;
			padding: 18px 25px;
			color:#fff;
			background:#272e38;
			border-radius:0;
		}

		nav > div a.nav-item.nav-link.active:after
		{
			content: "";
			position: relative;
			bottom: -60px;
			left: -10%;
			border: 15px solid transparent;
			border-top-color: #e74c3c ;
		}
		.tab-content{
			background: #fdfdfd;
			line-height: 25px;
			border: 1px solid #ddd;
			border-top:5px solid #e74c3c;
			border-bottom:5px solid #e74c3c;
			padding:30px 25px;
		}

		nav > div a.nav-item.nav-link:hover,
		nav > div a.nav-item.nav-link:focus
		{
			border: none;
			background: #e74c3c;
			color:#fff;
			border-radius:0;
			transition:background 0.20s linear;
		}

		* {
			box-sizing: border-box;
		}

		/* Create two equal columns that floats next to each other */
		.column {
			float: left;
			width: 50%;
			padding: 10px;
			height: 300px; /* Should be removed. Only for demonstration */
		}

		/* Clear floats after the columns */
		.row:after {
			content: "";
			display: table;
			clear: both;
		}

		/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
		@media screen and (max-width: 600px) {
			.column {
				width: 100%;
			}
		}
	</style>


	<!-- Bootstrap core JavaScript -->
	<script src="vendor/jquery/jquery.min.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Plugin JavaScript -->
	<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

	<!-- Custom scripts for this template -->
	<script src="js/resume.min.js"></script>

	  <!-- Bootstrap core JavaScript
	  	================================================== -->
	  	<!-- Placed at the end of the document so the pages load faster -->
	  	<script type="text/javascript" src="js/jquery.min.js"></script>
	  	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	  	<script type="text/javascript" src="js/jquery.csv.min.js"></script>
	  	<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
	  	<script type="text/javascript" src="js/dataTables.bootstrap.js"></script>
	  	<script type="text/javascript" src="js/csv_to_html_table.js"></script>

	  	<script type="text/javascript">
	  		function format_link(link){
	  			if (link)
	  				return "<a href='" + link + "' target='_blank'>" + link + "</a>";
	  			else
	  				return "";
	  		}
	  		$(function(){
	  			CsvToHtmlTable.init({
	  				csv_path: 'data/Group_A.csv',
	  				element: 'ga-table-container', 
	          //allow_download: true,
	          csv_options: {separator: ',', delimiter: '"'},
	          datatables_options: {"paging": true},
	          pageLength: 10,
	          //custom_formatting: [[4, format_link]]
	      });

	  			CsvToHtmlTable.init({
	  				csv_path: 'data/Group_B.csv',
	  				element: 'gb-table-container', 
	          //allow_download: true,
	          csv_options: {separator: ',', delimiter: '"'},
	          datatables_options: {"paging": true},
	          //custom_formatting: [[4, format_link]]
	      });

	  			CsvToHtmlTable.init({
	  				csv_path: 'data/Group_C.csv',
	  				element: 'gc-table-container', 
	          //allow_download: true,
	          csv_options: {separator: ',', delimiter: '"'},
	          datatables_options: {"paging": true},
	          //custom_formatting: [[4, format_link]]
	      });

	  			CsvToHtmlTable.init({
	  				csv_path: 'data/Group_D.csv',
	  				element: 'gd-table-container', 
	          //allow_download: true,
	          csv_options: {separator: ',', delimiter: '"'},
	          datatables_options: {"paging": true},
	          //custom_formatting: [[4, format_link]]
	      });

	  			CsvToHtmlTable.init({
	  				csv_path: 'data/Group_E.csv',
	  				element: 'ge-table-container', 
	          //allow_download: true,
	          csv_options: {separator: ',', delimiter: '"'},
	          datatables_options: {"paging": true},
	          //custom_formatting: [[4, format_link]]
	      });

	  			CsvToHtmlTable.init({
	  				csv_path: 'data/Group_F.csv',
	  				element: 'gf-table-container', 
	          //allow_download: true,
	          csv_options: {separator: ',', delimiter: '"'},
	          datatables_options: {"paging": true},
	          //custom_formatting: [[4, format_link]]
	      });

	  		});
	  	</script>

</head>

<body id="page-top" tcap-name="main">

	<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
		<a class="navbar-brand js-scroll-trigger" href="#page-top">
			<span class="d-block d-lg-none">Student GymKhana Election</span>
			<span class="d-none d-lg-block">
				<img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="img/election.jpg" alt="">
			</span>
		</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#about">About</a>
				</li>
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#schedule">Schedule</a>
				</li>
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger active" href="#eligibility">Eligibility &amp; Forms</a>
				</li>
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#principles">PRINCIPLES &amp; GUIDELINES</a>
				</li>
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#election_body">Election Body</a>
				</li>
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" target="_blank" href="./nominations">Nominations</a>
				</li>
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#voter_search">Voter Search</a>
				</li>
				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#manifesto">Manifesto</a>
				</li>


				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#venue-details">Venue Details</a>
				</li>

				<li class="nav-item">
					<a class="nav-link js-scroll-trigger" href="#contact">Contact</a>
				</li>
			</ul>
		</div>
	</nav>

	<div class="container-fluid p-0">

		<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
			<div class="w-100">
				<h1 class="mb-0">Student GymKhana
					<span class="text-primary">Election</span>
				</h1>
				<div class="subheading mb-5">IIT (ISM) Dhanbad
					<!--a href="mailto:name@email.com">name@email.com</a-->
				</div>
				<p class="lead mb-5">The objective of a SG is to give students a role in the administrative and academic governance of the Institute and help them develop leadership and administrative skills.</p>
        <!--div class="social-icons">
          <a href="#">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="#">
            <i class="fab fa-github"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
      </div-->
  </div>
</section>

<hr class="m-0">

<section class="resume-section p-3 p-lg-5 d-flex justify-content-center" id="schedule">
	<div class="w-100">
		<h2 class="mb-5">Schedule</h2>

		<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
			<div class="resume-content">
				<h3 class="mb-0">Election Timeline</h3>

				<table class="table table-dark col-lg-12">
					<thead>
						<tr>
							<th>Event</th>
							<th>Schedule</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Publication of Voter List</td>
							<del><td>13th March 2019</td></del>
						</tr>
						<tr>
							<td>Last date for Corrections/Additions/Updations</td>
							<del><td>15th March 2019</td></del>
						</tr>
						<tr>
							<td>Publication of Final Voter List</td>
							<del><td>20th March 2019</td></del>
						</tr>
						<tr>
							<td>Notification Date</td>
							<del><td>18th March 2019</td></del>
						</tr>
						<tr>
							<td>Nominations Start</td>
							<del><td>25th March 2019</td></del>
						</tr>
						<tr>
							<td>Nomination End</td>
							<td>26th March 2019 7 PM</td>
						</tr>
						<tr>
							<td>Last date for withdrawal of Nominations</td>
							<td>27th March 2019 7 PM</td>
						</tr>
						<tr>
							<td>Final list of contestants after Scrutiny by C.E.O</td>
							<td>27th March 2019</td>
						</tr>
          <!--tr>
            <td>Distribution of Voter slips in respective Departments</td>
            <td>25th - 27th March 2019</td>
        </tr-->
        <tr>
        	<td>Student campaign through addressing near central library on scheduled time (No other form of canvassing is allowed).</td>
        	<td>28th - 29th March 2019</td>
        </tr>

        <tr>
        	<td><b>Date of polling</b></td>
        	<td><b>30th March 2019, 8 AM - 1 PM</b></td>
        </tr>

        <tr>
        	<td>Date of Counting</td>
        	<td>31st March 2019, 3 PM onwards</td>
        </tr>
        <tr>
        	<td>Results</td>
        	<td>31st March/1st April 2019</td>
        </tr>
        <tr>
        	<td>Polling Station Locations</td>
        	<td>SAC, OLHC and NLHC.</td>
        </tr>
    </tbody>
</table>
</div>
</div>
<p> * <strong>Note:</strong> Working Hours of CEO’s office (Room NO: 106) SAC building</p><br>
<p> Office Timing: <b>06:00 PM - 07:00 PM,</b> (Except on Voting and Counting days)</p>
</div>



</section>

<hr class="m-0">

<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="eligibility">
	<div class="w-100">
		<h2 class="mb-5">Eligibility &amp; Forms</h2>

		<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
			<div class="resume-content">
				<h3 class="mb-0">Eligibility</h3>
				<ul class="fa-ul mb-0">
					<li>
						<strong><p>All registered students of the Institute who pay SG, student activity fees shall be members of the Students’ Gymkhana (SG) and shall constitute its General Body (GB). However, only those students who fall in various groups as mentioned in <a href="#voter_search">Voter Search Tab</a> are eligible to cast their vote.</p></strong>
					</li>
					<li>
						<p>The following are the eligibility for applying for a Senator’s post:</p>
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						A student can apply only for a post under the same group as mentioned in <a href="#voter_search">Voter Search Tab</a>.
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						An applicant should not have any disciplinary action taken or pending against them.
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Should not possess any criminal record.
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Should have a minimum CGPA of 7.0
					</li>
					<br>
					<li>
						<strong><p>Students who wish to contest the Senator Election should submit the following in the Election Office on/before the date as mentioned in the Election Schedule.</p></strong>
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Filled in Nomination form (Please find the form in Forms Section below).
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Proof for the payment of nomination fee of Rs. 500.00, which will be refunded:<br>
						a.  If the contestant gets at least 10% of the total votes polled.
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						A self-attested photocopy of their ID card issued by the IIT (ISM) Dhanbad.
					</li>
					<li>
						<p><strong>Note:<br> Nomination fee has to be deposited in SBI Collect under "Other Academic Fees/Fines" Section</strong></p> 
						<p><strong>No refund will be made in case of withdrawl of nomination.</strong></p>
					</li>            
				</ul>
				<br>
				<div class="subheading mb-5">The CEO’s decision will be final.</div>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="column">
				<h2>Nomination Procedure</h2>
				<ul>
					<li>
						<i class="fa-li fa fa-check"></i>
						Fill the Nomination Form
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Fill the Manifesto details Form
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Complete Payment and get the payment receipt
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Submit the filled forms along with Identity Card Xerox (Proposer/Contestant/Both) in Election Office (Room No: 106, SAC)
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Email the soft copy to ceo-sg@iitism.ac.in
					</li>
				</ul>
			</div>
			<div class="column">
				<h2>Voting Procedure</h2>
				<ul>
					<li>
						<i class="fa-li fa fa-check"></i>
						Reach your respective booth's waiting room, show your identity card and get the token
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Once you got your token, wait in the waiting room until your token number is called 
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Enter the Booth, take the ballot paper
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Seat at the canopy and cast your vote in the ballot paper (Vote has to be given for only one candidate). Opting more than one candidate will be considered as invalid.
					</li>
					<li>
						<i class="fa-li fa fa-check"></i>
						Drop the ballot paper in the ballot box. Only then, exit the booth
					</li>
				</ul>
			</div>
			<ul class="fa-ul mb-0">
				<li>
					<strong><p>Note:</p>
						<p>Only Institute ID is accepted as valid proof of Identity during polling.</p>
						<p>No other Identity proof (such as Library Card/Club Membership Card/Govt ID) would be entertained. </p>
					</strong>
				</li>
			</ul>
		</div>
		<hr>
		<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
			<div class="resume-content">
				<h3 class="mb-0">Forms</h3>
				<div class="subheading mb-5">
					<del><a href="#">Correction Form </a></del>(Closed)
					<!--a href="./files/correction_form.doc" download="">Correction Form</a-->
				</div>
				<div class="subheading mb-5">
					<del><a href="#">Report Invalid Voter Form </a></del>(Closed)
					<!--a href="./files/reporting_invalid_voter.docx" download="">Report Invalid Voter Form</a-->
				</div>
				<div class="subheading mb-5">
					<a href="./files/nomination_form_updated.pdf" download="">Nomination Form</a>
				</div>
			</div>
		</div>
	</div>
</section>

<hr class="m-0">

<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="principles">
	<div class="w-100">
		<h2 class="mb-5">Principles &amp; Guidelines</h2>

		<div class="subheading mb-3">SG - ORGANIZATION AND ORGANIZATIONAL IMPORTANT PRINCIPLES</div>

		<div class="w-100">
			<p>The objective of a SG is to give students a role in the administrative and academic governance of the Institute and help them develop leadership and administrative skills.</p>
		</div>

		<ul class="fa-ul mb-0">
			<li>
				<i class="fa-li fa fa-check"></i>
			SG activities will be subordinate to academic activities.</li>
			<li>

			</li><li>
				<i class="fa-li fa fa-check"></i>
			First year students of all programmes will be devoted primarily to academics.</li>
			<li>

			</li><li>
				<i class="fa-li fa fa-check"></i>
			The SG shall function through the Students’ Senate (hereafter referred to as the Senate) and its Executive wing.</li>
			<li>

			</li><li>
				<i class="fa-li fa fa-check"></i>
				The Senate shall be the Central Representative, Legislative and Supervisory body of the students. It shall:
				<br>
				(a)	Serve as the main forum of expression of student opinion.<br>

				(b)	Be in continuous touch with the General Body (GB), consult the students, and act as a feedback system.<br>

				(c)	Act as the central policy making body of the SG.<br>

				(d)	Guide and check the functioning of the Executive wing of the SG.<br>
			</li>

			<li>
				<i class="fa-li fa fa-check"></i>
			The Senate shall comprise of Senators representing students from all academic programmes. The number of Senators representing a batch shall be at the rate of one Senator for every 200 students in the batch (or group of batches as given in 3.3), rounded up to the next integer.</li>
			<li>

			</li><li>
				<i class="fa-li fa fa-check"></i>
			SG activities will be subordinate to academic activities.</li>
			<li>

			</li><li>
				<i class="fa-li fa fa-check"></i>
				The Senate shall elect from amongst the Senators:<br>

				(a)	The President, SG (PSG)<br>

				(b)	The Chairperson, Students’ Senate (CSS)<br>

				(c)	The Finance Convener, Senate (FCS)<br>

				(d)	The General Secretary, Media and Culture (SMC)<br>

				(e)	The General Secretary, Games and Sports (SGS)<br>

				(f)	The General Secretary, Science and Technology (SST)<br>
			</li>

			<li>
				<i class="fa-li fa fa-check"></i>
				The Executive Wing of the SG shall comprise of the following Executive:<br>

				(a)	The General Affairs Council (GAC)<br>

				(b)	The Media and Cultural Council MCC)<br>

				(c)	The Games and Sports Council (GSC)<br>

				(d)	The Science and Technology Council (STC)<br>
			</li>
		</ul>

		<hr>

		<div class="subheading mb-3">GUIDELINES FOR THE CONDUCT OF IIT(ISM) STUDENTS' GYMKHANA(SG).<br>
		ELECTIONS :  2018-2019</div>
		<ul class="fa-ul mb-0">
			<li>
				<i class="fa-li fa fa-check"></i>
			No candidate contesting election of SG, IIT(ISM) will be allowed to enter any class room or Hostel premises for the purpose of canvassing without any order issued by the Office of the Chief Election Officer(CEO), for this a schedule will be announced by CEO to address in common place with all the voters, other than that no canvassing is allowed.</li>
			<li>
				<i class="fa-li fa fa-check"></i>
			Each supporter of a candidate, if any, accompanying the candidate should also carry his/her College Identity Card while canvassing in common place. Supporters of the candidate who are not students of IIT(ISM) will not be allowed to enter the College/ Department/institution.</li>
			<li>
				<i class="fa-li fa fa-check"></i>
			The Head of the Departments, chief warden/wardens should give adequate publicity in their respective departments or hostels for all sorts of information related to SG election, so that the candidates and students know the arrangements so made.</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				No candidate or his supporters will indulge in any act of indiscipline of the IIT(ISM):<br>

				a)	Physical assault or threat to use physical force, against any member of the teaching and non-teaching staff of any College/institution/ Department and against any student within the IIT(ISM).<br>
				b)	Carrying of Use of or threat of use of any weapons.<br>
				c)	Any violation of the provisions of Civil Rights Protection Act 1976.<br>
				d)	Violation of the status, dignity and honor of students belonging to the SC/ST.<br>
				e)	Any practice whether verbal or otherwise derogatory of women.<br>
				f)	Any attempt at bribing or corruption in any manner.<br>
				g)	Willful destruction of institutional property.<br>
				h)	Creating ill-will or intolerance on religious or communal grounds.<br>
				i)	Causing disruption in any manner of the academic functioning of the IIT(ISM).<br>
			</li>

			<li>
				<i class="fa-li fa fa-check"></i>
				On the day of polling, if a candidate visits Polling booths, the Election Officer or some other staff deputed by the CEO may take him/her around the Polling booths for his/her satisfaction.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Adequate security personal should be provided in each Polling booth by the Sr SEO,IIT(ISM). If required SEO may request police authorities to post some police constables around the College canteens, and other sensitive points.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The Campus maintenance section or authorities be requested to ensure uninterrupted Electric Supply on the day of polling there by no power failure and this should also be provided  at the time of counting of votes.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				DSW office will make adequate arrangements for Emergency lights, etc. to cope up with any emergency situation.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				For each group of students at IIT(ISM) there would be separate polling setups that would be provided by the office of chief Election Officer.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Each polling booth election officer concerned should ensure that all ballot papers are properly sealed in packets before these are dispatched to the Counting Centre. The sealed packets for senate election should reach the counting centre immediately after the polling is over.
			</li>

			<li>
				<i class="fa-li fa fa-check"></i>
				Necessary ballot papers will be dispatched to the polling booths on 30th March, 2019 two hours before conduct of elections. The polling hours are from 8.30 a.m. to 1.00 p.m. All students who report for polling during the above timings should be allowed to cast their votes.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Every bonafide student should be allowed to cast his/her vote after checking his/her Identity Card.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The statement showing the number of votes polled should be sent in a sealed cover along with the ballot papers.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Security persons/Police escorts should be made available for transportation of ballot papers from the polling booths to the Counting Centre.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Departments/ Hostels will give publicity of the instructions regarding how to vote and respective schedules.
			</li>
		</ul>
		<ul class="fa-ul mb-0">
			<li>
				<i class="fa-li fa fa-check"></i>
				The Director nominates Chief Election Officer every year to conduct the SG elections.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The Election Officers, returning officers, deputed staff for election shall work in coordination with the Chief Election Officer.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The Chief Election Officer may appoint number of Returning Officers as they may deem necessary.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				All Elections will be held by Secret Ballot. 
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The Chief Election Officer shall issue a complete schedule of elections giving therein the date and time all activities.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Forms for nominations will be prescribed by the Chief Election Officer.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Nominations for senators shall be invited by and filed with the Election Officers for various groups and put up on the Notice Board of DSW, Departments, Hostels, etc. 
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				Nominations along with all documents will be filed at the Office of the Chief Election Officer, who will scrutinize the nominations at his office and put up the final list of candidates on the Notice Board.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The Chief Election Officer will arrange for the counting of votes for the senators of the SG and also announce the results.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The Election Petition, if any, may be made to the CEO/chief counselor by a candidate or candidates within 48 hours after the declaration of results by the Chief Election Officer. No election petition shall be entertained after the expiry of 48 hours of the declaration of results.
			</li>
			<li>
				<i class="fa-li fa fa-check"></i>
				The Chief Election Officer may issue necessary directions to the Election Officers for the smooth and orderly conduct of elections.
			</li>
		</ul>
		<hr>
		<br>
        <!--div class="subheading mb-5">
			<a href="./files/election_conduct_rules.pdf" download>Election Conduct Rules</a>
		</div-->
	</div>
</section>

<hr class="m-0">

<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="election_body">
	<div class="w-100">
		<h2 class="mb-5">Election Body</h2>
		<p>Election officers responsible for receipt of nomination, finalizing the contestants, making ballot paper after final list released by CEO, conducting poling and counting to the respective groups.</p>

		<table style="margin-left: 3pt; border: 0.75pt solid #000000; border-spacing: 1.5pt;" cellspacing="2" cellpadding="0">
			<thead>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Photo</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Name</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Designation</span></strong></p>
					</td>
					<td style="width: 87.9pt; border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Email Id</span></strong></p>
					</td>
					<td style="width: 72.9pt; border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Contact Number</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Responsibilities</span></strong></p>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.001.png" alt="https://www.iitism.ac.in/~acsrao/CW/images/acs_rao.jpg" width="112" height="144"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 8pt; text-align: center; line-height: 115%; font-size: 12pt;"><strong><span style="font-family: 'Times New Roman';">Prof. Annavarapu Chandra Sekhara Rao</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 8pt; text-align: center; line-height: 115%; font-size: 12pt;"><strong><span style="font-family: 'Times New Roman';">Chief Election Officer</span></strong></p>
					</td>
					<td style="width: 87.9pt; border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 8pt; text-align: center; line-height: 115%; font-size: 12pt;"><strong><span style="font-family: 'Times New Roman';">ceo-sg@iitism.ac.in</span></strong></p>
					</td>
					<td style="width: 72.9pt; border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><strong><span style="font-family: 'Times New Roman';">9471191414, 3262235420</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><strong><span style="font-family: 'Times New Roman';">Propose some staff members as a Micro observers/ Polling staff/ counting staff, etc. everything new</span></strong><strong><span style="font-family: 'Times New Roman';">&nbsp; </span></strong></p>
					</td>
				</tr>
			</tbody>
		</table>
		<br>
		<br>
		<table style="margin-right: auto; margin-left: auto; border: 0.75pt solid #000000; border-spacing: 1.5pt;" cellspacing="2" cellpadding="0">
			<thead>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Photo</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Name</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Email Id</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Contact Number</span></strong></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 8.5pt;"><strong><span style="font-family: Verdana;">Group Responsibility</span></strong></p>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.002.jpg" alt="https://www.iitism.ac.in/~acsrao/CW/images/wardens/D1.jpg" width="78" height="100"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof Vijay Bhaskar</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">devara@iitism.ac.in</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">9471191085/5911</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">B.Tech./BE/Dual Degree/Integrated M. Tech (3rd Year)</span></p>
					</td>
				</tr>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.003.jpg" alt="https://www.iitism.ac.in/~acsrao/CW/images/wardens/D2.jpg" width="78" height="100"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof S Soren</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">ssoren@iitism.ac.in</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">9939707967/5652</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">B.Tech./BE/Dual Degree/Integrated M. Tech (2nd Year)</span></p>
					</td>
				</tr>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.004.jpg" alt="https://www.iitism.ac.in/employee/924/emp_924_20151118062105.jpg" width="78" height="107"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof Mrinal sen</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">mrinalsen@iitism.ac.in</span><span style="font-family: 'Times New Roman';">&nbsp;</span><br><span style="font-family: 'Times New Roman';">&nbsp;</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">3262235657</span></p>
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">9471191435</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">B.Tech./BE/Dual Degree/Integrated M. Tech (1st Year)</span></p>
					</td>
				</tr>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.005.jpg" alt="https://www.iitism.ac.in/~acsrao/CW/images/wardens/A1.jpg" width="78" height="100"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof Madan lal C</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">madan@iitism.ac.in</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">9471191089/5137</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">M.Tech. (1st Year) + Dual Degree/Integrated M.Tech (4th Year)</span></p>
					</td>
				</tr>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.006.jpg" alt="https://www.iitism.ac.in/~acsrao/CW/images/wardens/C1.jpg" width="78" height="102"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof Kaushal Kumar</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">kkumar@iitism.ac.in</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">9471191739/5754</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">2 Yr. M.Sc (1st Year) + 3 Yr. M.Sc Tech (1st year &amp; 2nd year) + 2 Yr. MBA (1st Year)</span></p>
					</td>
				</tr>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.007.jpg" alt="https://www.iitism.ac.in/~acsrao/CW/images/wardens/B2.jpg" width="78" height="76"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof Sridhar Sahu</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">sridharsahu@iitism.ac.in</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">9471191343/5919</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 90%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Ph.D (Full time) (1st year &amp; 2nd year)</span></p>
					</td>
				</tr>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.008.jpg" alt="" width="82" height="119"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof Sowmiya Chawla</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">sowmiya@iitism.ac.in</span><span style="font-family: 'Times New Roman';">&nbsp;</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">3262235092/</span><br><span style="font-family: 'Times New Roman';">7070654099</span><span style="font-family: 'Times New Roman';">&nbsp;</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Grievances or petitions if any</span></p>
					</td>
				</tr>
				<tr style="height: 82.15pt;">
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.009.jpg" alt="Image result for ram mohan SEO iit ism" width="84" height="95"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Sr SEO</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">sseo@iitism.ac.in</span></p>
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">&nbsp;</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">91-326-223-5614(O)/5714(R)</span></p>
						<p style="margin-top: 0pt; margin-bottom: 15pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">&nbsp;</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Providing security staff at the polling booths, common places to avoid fighting between contestant groups, if any and monitoring or controlling any kind of violence till the election gets completed</span></p>
					</td>
				</tr>
				<tr>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 8.5pt;"><img src="images/1550484822_election-body.010.jpg" alt="https://www.iitism.ac.in/employee/1078/emp_1078.jpg" width="78" height="92"></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Prof Sachin Kumar Singh</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">sachinks@iitism.ac.in</span><span style="font-family: 'Times New Roman';">&nbsp;</span><br><span style="font-family: 'Times New Roman';">5184</span><span style="font-family: 'Times New Roman';">&nbsp;</span><br><span style="font-family: 'Times New Roman';">9102991041</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 12pt;"><span style="font-family: 'Times New Roman';">5184/</span><br><span style="font-family: 'Times New Roman';">9102991041</span></p>
					</td>
					<td style="border-style: solid; border-width: 0.75pt; padding: 0.38pt;">
						<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; line-height: 115%; font-size: 12pt;"><span style="font-family: 'Times New Roman';">Printing of ballot papers, distribution of packets and receiving after election before counting</span></p>
					</td>
				</tr>
			</tbody>
		</table>

	</div>
</section>

<hr class="m-0">

<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="voter_search">
	<div class="w-100">
		<h2 class="mb-5">Voter Search &amp; Group List</h2>

		<ul class="fa-ul mb-0">
			<li>
				<strong><p>Note:</p>
					<p>Only Institute ID is accepted as valid proof of Identity during polling.</p>
					<p>No other Identity proof (such as Library Card/Club Membership Card/Govt ID) would be entertained. </p>
				</strong>
			</li>
		</ul>

		<table class="table table-dark">
			<thead>
				<tr>
					<th>Group Name</th>
					<th>Group Description</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Group A</td>
					<td>B.Tech./BE/Dual Degree/Integrated M. Tech (3rd Year)</td>
				</tr>
				<tr>
					<td>Group B</td>
					<td>B.Tech./BE/Dual Degree/Integrated M. Tech (2nd Year)</td>
				</tr>
				<tr>
					<td>Group C</td>
					<td>B.Tech./BE/Dual Degree/Integrated M. Tech (1st Year)</td>
				</tr>
				<tr>
					<td>Group D</td>
					<td>M.Tech. (1st Year) + Dual Degree/Integrated M.Tech (4th Year)</td>
				</tr>
				<tr>
					<td>Group E</td>
					<td>2 Yr. M.Sc (1st Year) + 3 Yr. M.Sc Tech (1st year &amp; 2nd year) + 2 Yr. MBA (1st Year)</td>
				</tr>
				<tr>
					<td>Group F</td>
					<td>Ph.D (Full time) (1st year &amp; 2nd year)</td>
				</tr>
			</tbody>
		</table>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 ">
					<nav>
						<div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
							<a class="nav-item nav-link" id="group-a-tab" data-toggle="tab" href="#group-a" role="tab" aria-controls="group-a" aria-selected="false">Group A</a>
							<a class="nav-item nav-link" id="group-b-tab" data-toggle="tab" href="#group-b" role="tab" aria-controls="group-b" aria-selected="false">Group B</a>
							<a class="nav-item nav-link" id="group-c-tab" data-toggle="tab" href="#group-c" role="tab" aria-controls="group-c" aria-selected="false">Group C</a>
							<a class="nav-item nav-link" id="group-d-tab" data-toggle="tab" href="#group-d" role="tab" aria-controls="group-d" aria-selected="false">Group D</a>
							<a class="nav-item nav-link" id="group-e-tab" data-toggle="tab" href="#group-e" role="tab" aria-controls="group-e" aria-selected="false">Group E</a>
							<a class="nav-item nav-link active show" id="group-f-tab" data-toggle="tab" href="#group-f" role="tab" aria-controls="group-f" aria-selected="true">Group F</a>
						</div>
					</nav>
					<div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
						<div class="tab-pane fade active" id="group-a" role="tabpanel" aria-labelledby="group-a-tab">
							<div id="ga-table-container"></div>
						</div>
						<div class="tab-pane fade" id="group-b" role="tabpanel" aria-labelledby="group-b-tab">
							<div id="gb-table-container"></div>
						</div>
						<div class="tab-pane fade" id="group-c" role="tabpanel" aria-labelledby="group-c-tab">
							<div id="gc-table-container"></div>
						</div>
						<div class="tab-pane fade" id="group-d" role="tabpanel" aria-labelledby="group-d-tab">
							<div id="gd-table-container"></div>
						</div>
						<div class="tab-pane fade" id="group-e" role="tabpanel" aria-labelledby="group-e-tab">
							<div id="ge-table-container"></div>
						</div>
						<div class="tab-pane fade" id="group-f" role="tabpanel" aria-labelledby="group-f-tab">
							<div id="gf-table-container"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<hr class="m-0">

<?php
        // Please fix it later.


        // $files = scandir('./uploads/ffbl/daily');
        // rsort($files); // this does the sorting
        // foreach($files as $file)
        // {
        //   echo'<tr><td><a href="/uploads/ffbl/daily/'.$file.'">'.$file.'</a></td></tr>';
        // }
?>

<script type="text/javascript">
	$(document).ready(function(){
		$("#manifesto-table").DataTable();
	});
</script>

<style type="text/css">
/*	body{
		overflow-x: hidden;
	}
*/
	#manifesto{
		width: 100%;
		max-width: 10000000rem;
	}
	#manifesto-table_wrapper{
		flex-flow: column wrap;
		align-items: initial;
	}
</style>

<section class="resume-section p-3 p-lg-5" id="manifesto">
	<div class="w-100">
		<h2 class="mb-5">Manifesto</h2>
		<table class="table table-striped table-bordered" id="manifesto-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Group</th>
					<th>Manifesto</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Abhinav Sharma</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1RTYESTydt1BQNwpQWOhu4G2hIpLTRNze">Manifesto</a></td>
				</tr>
				<tr>
					<td>Aman Sharma</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1jt657K179uBnuNF08PWSmFLqT8D19MCH">Manifesto</a></td>
				</tr>
				<tr>
					<td>Anuja Priyadarshini</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=18-VQeb0E27rGf0YOs2orFFWeImQs17Pk">Manifesto</a></td>
				</tr>
				<tr>
					<td>Aranya Samaiyar</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1-5qR889c-TwrXGJ5-L_h8UDQTRmjYNZg">Manifesto</a></td>
				</tr>
				<tr>
					<td>Fatehvir Singh</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1OYhHI_0q-PQzrIaRQ6Kf69lZUo7UtyMG">Manifesto</a></td>
				</tr>
				<tr>
					<td>Manish Kumar</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1wl2QO1JeEqV0YJXhC0uJbpJdtEL1rALH">Manifesto</a></td>
				</tr>
				<tr>
					<td>Nikhil Swaraj</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1kLaYPneCySOT7xFxTuq9y_-3fNbT3qtq">Manifesto</a></td>
				</tr>
				<tr>
					<td>Panjwani Ekta</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1wIQx3qYshyEyK_vSXkquY2uiBrO8RdwI">Manifesto</a></td>
				</tr>
				<tr>
					<td>Pranav Singh</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1kTa_xPXqzXcsP31hHGGs127cWUoSMd8t">Manifesto</a></td>
				</tr>
				<tr>
					<td>Ranabothu Sathwik Reddy</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1p6Zv5i-ViKsT0nBQ4bTTcbVuxlKTqrQS">Manifesto</a></td>
				</tr>
				<tr>
					<td>Rohit Kumar</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1UO_NW3skOEB_WybF08gNrsheRyaEm_y2">Manifesto</a></td>
				</tr>
				<tr>
					<td>Ruchit Dhelawat</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1yv31_ryOSBuefQycRAmQa-wavdYvpHBuhttps://drive.google.com/open?id=1yv31_ryOSBuefQycRAmQa-wavdYvpHBu">Manifesto</a></td>
				</tr>
				<tr>
					<td>Saurabh Singh</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1IDb2jPE7tv_64Jx2v9of_ZFjj9_GPPfP">Manifesto</a></td>
				</tr>
				<tr>
					<td>Sonali Sinha</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=17CPiLBRmE3vb5ML_LextEAVPMTngsYOB">Manifesto</a></td>
				</tr>
				<tr>
					<td>Vishnu D Gor</td>
					<td>Group A</td>
					<td><a href="https://drive.google.com/open?id=1o4BcjMuluKd1fe36Za80K1scNbQS1z0P">Manifesto</a></td>
				</tr>
				<tr>
					<td>Akhil Binani</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1EdYgQ1JvamwLTJoH_tozA6UCdzAhNsmX">Manifesto</a></td>
				</tr>
				<tr>
					<td>Akhil Rungta</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1sDOvMg5J32joD3OeLS5lY4nnshzZcRdW">Manifesto</a></td>
				</tr>
				<tr>
					<td>Anvita Verma</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=13rbgouO1RD9LeulrQry6p_15JLLaxvZc">Manifesto</a></td>
				</tr>
				<tr>
					<td>Arti Kumari</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1hZlJ6WvL5iB1ZPPynO9QvpWySfLVHfPe">Manifesto</a></td>
				</tr>
				<tr>
					<td>Avinash Gautam</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1ZFxBvQkyZqkJdHnhCZOH_1FpPsaeTD7V">Manifesto</a></td>
				</tr>
				<tr>
					<td>Darshil Asawar</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1gLrw3y4CnOyqr3H3Ys5HNmD3v6u2loF1">Manifesto</a></td>
				</tr>
				<tr>
					<td>Deepansh Deepak Srivastav</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1WIuPulaO8jSRAtoW-iY_A2PH92_lEX6T">Manifesto</a></td>
				</tr>
				<tr>
					<td>Keshav Kumar Singh</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1bdrMeJL672Y5perdb5TSz23f9Wsdbwpl">Manifesto</a></td>
				</tr>
				<tr>
					<td>Neelansh Maheshwari</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1RYVScr2_eMQrrqkrgxTWydl4Ls2kDgCs">Manifesto</a></td>
				</tr>
				<tr>
					<td>Peraka Sai Ratna Teja</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1hxrCQ_ESvaLRfJAfZQVZXQrHYfoR-cr0">Manifesto</a></td>
				</tr>
				<tr>
					<td>Pritam Jaiswal</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=19d1BNyzJrBhzS0v8fNRcbao5K4QN_TWo">Manifesto</a></td>
				</tr>
				<tr>
					<td>Sanchit Chaurasiya</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=15ijuyg0sZ8mJY-j0tyOIwmhZMIfmnDx0">Manifesto</a></td>
				</tr>
				<tr>
					<td>Suraj Kumar Singh</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=1uxKvYiGZ6u2rZAQ_ziYV525qYYRQ-WuN">Manifesto</a></td>
				</tr>
				<tr>
					<td>Vartika Singh</td>
					<td>Group B</td>
					<td><a href="https://drive.google.com/open?id=14xapxNTuXLkszUdRwfjnShPYRWGf4VJj">Manifesto</a></td>
				</tr>
				<tr>
					<td>Aman Joshi</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=19Q6IwMsdEkDlEzGx9F42rYqQ2KsnFJd0">Manifesto</a></td>
				</tr>
				<tr>
					<td>Animesh Saurav</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=140p5SGeOFZL8-4pdOnFThaHyMeDqEU-F">Manifesto</a></td>
				</tr>
				<tr>
					<td>Aryan Sharma</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1mxwB6YT93yaJsTwQHpBvStEWoM8U8kFG">Manifesto</a></td>
				</tr>
				<tr>
					<td>Ayush Singhal</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1GbeIubaYq2Xfb6od85qkpu70FJQshYbU">Manifesto</a></td>
				</tr>
				<tr>
					<td>Cherapalli Harshita Naidu</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1CtZW58Q-7YSetgKG5b7iMEmijfmVDOac">Manifesto</a></td>
				</tr>
				<tr>
					<td>Niharika Rawat</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1fZ52Hp7ji1eunracv4tMmMlcI2x-uNca">Manifesto</a></td>
				</tr>
				<tr>
					<td>Nikunj Jain</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=14bF1Wh1fXRbXtwC2T6HGfyBnYxQCPQYG">Manifesto</a></td>
				</tr>
				<tr>
					<td>Pindi Venkata Ajay</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1ZJURmB9gmDGYXuq-urft1Buo3EKL3kMU">Manifesto</a></td>
				</tr>
				<tr>
					<td>Pramod Ganesh Asagodu</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1CddLDu0gHiyFqnQGYwqK7UlHLB8MDk8b">Manifesto</a></td>
				</tr>
				<tr>
					<td>Shashi Kumar Puram</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1SngNKZAXgH7_L24pmiu7x8O2kn1ah4zM">Manifesto</a></td>
				</tr>
				<tr>
					<td>Shubhagyata Swaraj Jayswal</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1A6PhGC3jE0tB6mbv5YJC2vhyZEmjPkIi">Manifesto</a></td>
				</tr>
				<tr>
					<td>Sirimavulla Sai Deepthi</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1r4CiXj_kSi8QykRvnmH5-XyZ-GaVJ1vP">Manifesto</a></td>
				</tr>
				<tr>
					<td>Utkarsh Kumar</td>
					<td>Group C</td>
					<td><a href="https://drive.google.com/open?id=1HHi9NemkC8pSOsrxw-4g6yie3kD0c0_R">Manifesto</a></td>
				</tr>
				<tr>
					<td>Ankit Papneja</td>
					<td>Group E</td>
					<td><a href="https://drive.google.com/open?id=1pQNRQROAszo9nCJSgGS6EFHTmSjSCc9y">Manifesto</a></td>
				</tr>
				<tr>
					<td>Daudayal Sharma</td>
					<td>Group E</td>
					<td><a href="https://drive.google.com/open?id=1y2VRrunxGGD1P1cAjzbnvehILEcre425">Manifesto</a></td>
				</tr>
				<tr>
					<td>Vishal Kumar Rajak</td>
					<td>Group E</td>
					<td><a href="https://drive.google.com/open?id=1kkkFTbkFZikbQn66et6oUWQLgEcDOD5h">Manifesto</a></td>
				</tr>
				<tr>
					<td>Aparna Shukla</td>
					<td>Group F</td>
					<td><a href="https://drive.google.com/open?id=10rXS5JsZlaoAb_nT88zqHTSPzTYYeh41">Manifesto</a></td>
				</tr>
				<tr>
					<td>Rahul Mishra</td>
					<td>Group F</td>
					<td><a href="https://drive.google.com/open?id=1DD7zi-z-oA1WjtMnl4HHL45cgxl7vpYc">Manifesto</a></td>
				</tr>
				<tr>
					<td>Sharavan Kumar</td>
					<td>Group F</td>
					<td><a href="https://drive.google.com/open?id=1CeujYIZputqssxgvdW6Z2xY868oQjuXp">Manifesto</a></td>
				</tr>
				<tr>
					<td>Sikandar Kumar</td>
					<td>Group F</td>
					<td><a href="https://drive.google.com/open?id=1oyMYhcjWnne4ldD4dHEcrwem8YKDN_iM">Manifesto</a></td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<hr class="m-0">

<section class="resume-section p-3 p-lg-5" id="venue-details">
	<div class="w-100">
		<h2 class="mb-5">Venue Details</h2>
		<div>
			<p>
				Please visit <a href="https://drive.google.com/open?id=1_nI8qT8xfmjdMZZi4aOOBD3QC1tLJO8zw9xYiuSYBJ0">this link</a> to get the venue details.
			</p>
			<p>
				Note:- Please open the Manifestos and the Venue Details with your college Email ID only (for privacy purposes).
			</p>
		</div>
	</div>
</section>

<hr class="m-0">

<section class="resume-section p-3 p-lg-5 d-flex align-items-center" id="contact">
	<div class="w-100">
		<h2 class="mb-5">Contact</h2>
		<p> For any queries, please contact:</p>
		<p><strong>Prof A.C.S.Rao, Chief Election Offier</strong> </p>
		<p><strong>Election Office, Room No: 106, SAC </strong></p>
		<p> Contact: <strong>+91 9471191414 (or) 3262235420</strong></p>
		<p> Email: <strong>ceo-sg@iitism.ac.in</strong></p>
	</div>
</section>


  </body>
  </html>