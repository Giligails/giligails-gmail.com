function formatter(){
	console.log($(window).width());
   if ($(window).width() < 768) {
        $("header").removeClass('fixed-top');
		$(".tabs").css('margin-top',0);
    } else {
        $("header").addClass('fixed-top');
		$(".tabs").css('margin-top',$("header").height()+5);
    }
}

function computeIncome(){
	//if($('#incomeValue').val()==0)
		console.log('Í run');
	var sum = 0;
	$('.income').each(function(){
		sum += parseFloat(this.value);
	});
	console.log(sum);
	if(sum!==0){
	$('#incomeValue').val(sum)};
};
function computeInvestments(){
	var sum = 0;
	$('.80c').each(function(){
		sum += parseFloat(this.value);
	})
	if(sum!==0){
		sum = Math.min(sum, 150000);
	}
	$('#investmentsValue').text(sum);
};

function computeDeductions(){
	var sum = 0;
	$('.deduction').each(function(){
		sum += parseFloat(this.value);
	})
	$('#deductionsValue').text(sum);
	
};

function computeExcemptions(){
	var sum = 0;
	$('.excemption').each(function(){
		sum += parseFloat(this.value);
	})
	$('#excemptionValue').text(sum);
};

$( "input" ).change(function() {
	if($(this).attr("id") =="name"){
		$('#user').text(this.value);
	}
	else {
		this.value = Math.abs(this.value);
	}
	if($(this).attr("id") =="incomeValue"){
		$('.income').each(function(){
		this.value = 0;
	});
	};
	computeIncome();
	computeExcemptions();
	computeInvestments();
	computeDeductions();
	computeTax();
	var message = 'Out of your specified Total Income of '+$("#incomeValue").val() + ','+$('#taxable').text() + ' is your taxable Income.\n';
	message +=  'Total excemptions, Deductions from 80C and Other deductions amount to '+$('#excemptionValue').text()+' ,'+
	$('#investmentsValue').text()+' and '+$('#deductionsValue').text()+' respectively\n.';
	message += 'You are liable for paying '+$('#taxtobepaid').text()+' plus the taxes(surcharge and Education Cess), amounting to '+$('#payable').text()+'\n';
	recommandDeductions();
	$("#message").text(message);
	
});

$( ".deduction" ).change(function() {
	this.value = Math.abs(this.value)
	
	computeTax();
});

function computeTax(){
	var income = $('#incomeValue').val();
	if(income >0){
	var deductions = parseInt($('#deductionsValue').text()) +parseInt($('#excemptionValue').text())+
					 parseInt($('#investmentsValue').text())+52400; /* 50000 - Standard Deduction , 2400 Professional Tax*/;
	var taxable = income-deductions;
	$('#taxable').text(Math.max(0,taxable));
	var tax = 0.05*(taxable-250000) +0.15*Math.max(0,taxable-500000)+0.10*Math.max(0,taxable -1000000);
	$('#taxtobepaid').text(Math.max(0,tax))
	if(tax<=12500) 
		$('#taxtobepaid').text(0);
	$('#payable').text(1.04*parseInt($('#taxtobepaid').text()));
	
	}
}

function recommandDeductions(){
	if(parseInt($('#payable').text())>0 && parseInt($('#investmentsValue').text()) <150000){
		var message = $("#message").text();
		message += 'You can save more on taxes by investing '+
		(150000-parseInt($('#investmentsValue').text()))+' more under 80C.'
		$("#message").text(message);
	}
		
}
