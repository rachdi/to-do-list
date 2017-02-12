(function() {
	'use strict';
	
	//Création tableau vide et gestion du localStorage
	var tabTasks = [];
	var dataTasks = JSON.parse(localStorage.getItem('dataTasks'));
	if (dataTasks !== undefined && dataTasks !== null) {
		tabTasks = dataTasks;
		allTasks();
	}

	var tabLists = ['Courses', 'Idées de voyage'];
	var dataLists = JSON.parse(localStorage.getItem('dataLists'));
	if (dataLists !== undefined && dataLists !== null) {
		tabLists = dataLists;
		console.log(tabLists);
		allLists();
	}

	// Listener sur bouton add
	$('#add').on('click', function() {
		if($('#fieldInput').val()){			
			var indexTask = tabTasks.length;
			tabTasks[indexTask] = {
				title : $('input[name="todo"]').val(),
				status : false,
				list : $('.item.active').text(),
			};
			$('#fieldInput').val('');
			console.log(tabTasks);

			$('.tasks').append('<li><div class="ui checkbox"><input type="checkbox" data-index="'+ indexTask + '"><label data-index="'+ indexTask +'">'+ tabTasks[indexTask].title +'</label></div></li>');
			localStorage.setItem('dataTasks', JSON.stringify(tabTasks));
		}
	});


	// Clic sur vider la liste
	$('#clear').on('click', function(){
		$('.tasks').html('');
		localStorage.removeItem('dataTasks');
		tabTasks = [];
		console.log(dataTasks);
	});


	//Clic sur checkbox pour modifier class
	$('.tasks').on('click', 'input[type="checkbox"]', function(){
		var numInput = $(this).data('index');
		isChecked(numInput);
		localStorage.setItem('dataTasks', JSON.stringify(tabTasks));
		
	});


	//Listeners sur les filtres
	$('#tasksDone').on('click', function() {
		$('.tasks').html('');
		var len = tabTasks.length;
		for (var i = 0; i < len; i++) {
			if (tabTasks[i].status && tabTasks[i].list === $('.item.active').text()) {
				statusTrue(i);
			}
		}
	});
	$('#tasksToDo').on('click', function() {
		$('.tasks').html('');
		var len = tabTasks.length;
		for (var i = 0; i < len; i++) {
			if (!tabTasks[i].status && tabTasks[i].list === $('.item.active').text()) {
				statusFalse(i);
			}
		}
	});
	$('#allTasks').on('click', function() {
		allTasks();
	});


	// Ajouter une liste
	$('#addList').on('click', function() {
		var listName = $('input[name="addList"]').val();
		
		if($('#fieldList').val()){			
			var indexList = tabLists.length;
			tabLists[indexList] = listName;
			$('#fieldList').val('');
			console.log(tabLists);

			$('#menuList').append('<a class="item">' + listName +'<i class="trash outline icon"></i><i class="write icon"></i><i class="empty star icon"></i></a>');
			localStorage.setItem('dataLists', JSON.stringify(tabLists));
		}
	});


	//Au clic sur un item du menu, changer la classe active
	$('#menuList').on('click', '.item' ,function(){
		if(!this.getAttribute('active')) {
			$(".active").removeClass('active');
			$(this).addClass('active');
			allTasks();
		}
	});

	//Au clic sur la poubelle, suppression de la liste
	$('#menuList').on('click', '.trash.icon', function(){
		var len = tabLists.length;
		var listName = $($(this).parent()).text();
		console.log(listName);
		for (var i = 0 ; i < len ; i++){
			if(tabLists[i] === listName) {
				tabLists[i] = false;
				console.log(tabLists[i]);
			}
		}
		localStorage.setItem('dataLists', JSON.stringify(tabLists));
		allLists();
	});



	function isChecked(numInput){
		if (!tabTasks[numInput].status){
			$('label[data-index="'+ numInput +'"]').addClass('checked');
			tabTasks[numInput].status = true;
			console.log('addClass');
		} else {
			$('label[data-index="'+ numInput +'"]').removeClass('checked');
			tabTasks[numInput].status = false;
			console.log('removeClass');
		}
	}

	function statusFalse(index){
		$('.tasks').append('<li><div class="ui checkbox"><input type="checkbox" data-index="' + index + '"><label data-index="' + index +'">' + tabTasks[index].title + '</label></div></li>');
	}

	function statusTrue(index){
		$('.tasks').append('<li><div class="ui checkbox"><input type="checkbox" checked="checked" data-index="' + index + '"><label data-index="' + index +'">' + tabTasks[index].title + '</label></div></li>');
		$('label[data-index="'+ index +'"]').addClass('checked');
	}

		//Afficher toutes les taches à partir du local Storage
	function allTasks(){
		$('.tasks').html('');
		var len = tabTasks.length;
		for (var i = 0; i < len; i++) {
			if (tabTasks[i].status && tabTasks[i].list === $('.item.active').text()) {
				statusTrue(i);
			}
			else if (!tabTasks[i].status && tabTasks[i].list === $('.item.active').text()){
				statusFalse(i);
			}
		}
	}

		//Afficher toutes les listes à partir du local Storage
	function allLists() {
		$('#menuList').html('');
		$('#menuList').append('<a class="item active">' + tabLists[0] +'<i class="write icon"></i><i class="empty star icon"></i></a>');

		var len = tabLists.length;
		for (var i = 1; i < len; i++) {
			if (tabLists[i]) {
				$('#menuList').append('<a class="item">' + tabLists[i] +'<i class="trash outline icon"></i><i class="write icon"></i><i class="empty star icon"></i></a>');
			}
		}
	}

})();