function computeIncome(){
	if($('#incomeValue').val()==0){
		console.log('Í run');
	var sum = 0;
	$('.income').each(function(){
		sum += parseFloat(this.value);
	});
	console.log(sum);
	$('#incomeValue').val(sum);
	}
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
	this.value = Math.abs(this.value);
	$("#message").removeClass('show');
	computeIncome();
	computeExcemptions();
	computeInvestments();
	computeDeductions();
	computeTax();
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
	recommandDeductions();
	}
}

function recommandDeductions(){
	if(parseInt($('#payable').text())>0 && parseInt($('#investmentsValue').text()) <150000)
		$("#message").addClass('show');
		$('#investmentsValue').css('background','red');
		
}
