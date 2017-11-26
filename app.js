	  		const app = {};
	  		let fees = {
	  			current: 0,
	  			proposed: 0,
	  		};
	  		let sales = 0
	  		let orders = 0 

	  		

	  		
	  		app.thirdParty = function(sales, type){
	  			if ($(`.${type}-plan input:checked`).val() === "basic") {
	  				if ($(`.${type}-cycle input:checked`).val() === "monthly") {
	  					fees[type] = (sales*.02)+348;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "annual") {
	  					fees[type] = (sales*.02)+312;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "biannual") {
	  					fees[type] = (sales*.02)+290;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "triannual") {
	  					fees[type] = (sales*.02)+261;
	  				}
	  				else {
	  					alert("Error! Choose a current cycle!")
	  				}		
	  			}
	  			else if ($(`.${type}-plan input:checked`).val() === "shopify") {
	  				if ($(`.${type}-cycle input:checked`).val() === "monthly") {
	  					fees[type] = (sales*.01)+948;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "annual") {
	  					fees[type] = (sales*.01)+852;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "biannual") {
	  					fees[type] = (sales*.01)+748;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "triannual") {
	  					fees[type] = (sales*.01)+711;
	  				}
	  				else {
	  					alert("Error! Choose a current cycle!")
	  				}	
	  			}
	  			else if ($(`.${type}-plan input:checked`).val() === "advanced") {
	  				if ($(`.${type}-cycle input:checked`).val() === "monthly") {
	  					fees[type] = (sales*.005)+3588;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "annual") {
	  					fees[type] = (sales*.005)+3230;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "biannual") {
	  					fees[type] = (sales*.005)+2870;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "triannual") {
	  					fees[type] = (sales*.005)+2691;
	  				}
	  				else {
	  					alert("Error! Choose a current cycle!")
	  				}
	  			}
	  		};


	  		//NOTE: when I have this app uncommented I get an unexpected token at line 72! Not sure why :-/
	  		app.shopifyPayments = function(type, sales, orders){
	  			if ($(`.${type}-plan input:checked`).val() === "basic") {
	  				if ($(`.${type}-cycle input:checked`).val() === "monthly") {
	  					fees[type] = (sales*.029)+(orders*.3)+348;
	  					console.log('currentbasic monthly');
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "annual") {
	  					fees[type] = (sales*.029)+(orders*.3)+312;
	  					console.log('currentannual monthly');
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "biannual") {
	  					fees[type] = (sales*.029)+(orders*.3)+290;
	  					console.log('currentbiannual monthly');
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "triannual") {
	  					fees[type] = (sales*.029)+(orders*.3)+261;
	  					console.log('current tri monthly');
	  				}
	  				else {
	  					alert("Error! Choose a current cycle!")
	  				}		
	  			}
	  			else if ($(`.${type}-plan input:checked`).val() === "shopify") {
	  				if ($(`.${type}-cycle input:checked`).val() === "monthly") {
	  					fees[type] = (sales*.027)+(orders*.3)+948;
	  					console.log('currentshopify monthly');
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "annual") {
	  					fees[type] = (sales*.027)+(orders*.3)+852;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "biannual") {
	  					fees[type] = (sales*.027)+(orders*.3)+748;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "triannual") {
	  					fees[type] = (sales*.027)+(orders*.3)+711;
	  				}
	  				else {
	  					alert("Error! Choose a current cycle!")
	  				}	
	  			}
	  			else if ($(`.${type}-plan input:checked`).val() === "advanced") {
	  				if ($(`.${type}-cycle input:checked`).val() === "monthly") {
	  					fees[type] = (sales*.024)+(orders*.3)+3588;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "annual") {
	  					fees[type] = (sales*.024)+(orders*.3)+3230;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "biannual") {
	  					fees[type] = (sales*.024)+(orders*.3)+2870;
	  				}
	  				else if ($(`.${type}-cycle input:checked`).val() === "triannual") {
	  					fees[type] = (sales*.024)+(orders*.3)+2691;
	  				}
	  				else {
	  					alert("Error! Choose a current cycle!")
	  				}
	  			}
	  		};

	  		

	  		app.init = () => {
	  			console.log('test');
	  			$('#form').on('submit', function (e){
	  				e.preventDefault();
	  				console.log('click');
				    if( $('input.gateway').is(':checked') ) {
				    	sales = $('input[id="sales"]').val();
	  					app.thirdParty(sales, 'current')
				      	app.thirdParty(sales, 'proposed');
				      	console.log(fees);
				    }
				    else {
						orders = $('input[id="orders"]').val();	
				    	app.shopifyPayments('current', sales, orders);
				    	app.shopifyPayments('proposed', sales, orders);
				    };	
				  	if (fees.current > fees.proposed) {
				  		let monthSave = (fees.current - fees.proposed)/12
					  	$('.current-fees-text').text(`You are currently spending $${fees.current} per year.`)
					  	$('.proposed-fees-text').text(`You could be spending $${fees.proposed} per year!`) 
					  	$('.advice').text(`That's a savings of $${monthSave.toFixed(2)} per month!`) 
				  	} else {
					  	$('.current-fees-text').text(`You are currently spending $${fees.current} per year.`)
					  	$('.proposed-fees-text').text(`You would be spending $${fees.proposed} per year.`) 
					  	$('.advice').text(`So... you shouldn't pick this plan.`) 
				  	};    	
	  			});
	  		}
	    	$(function() {	
		    	app.init();
	    	});








