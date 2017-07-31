var projectArr=[];
var taskCompleteArr=[];
var projectTitleArr=[];
var noteArr=[]
var projectInformationArr=[];
window.onload=function(){
	if(localStorage.todoData){
		projectArr=JSON.parse(localStorage.todoData);
	}
	if(localStorage.projectData){
		taskCompleteArr=JSON.parse(localStorage.projectData);
	}
	if(localStorage.titleData){
		projectTitleArr=JSON.parse(localStorage.titleData);
	}
	if(localStorage.noteData){
		noteArr=JSON.parse(localStorage.noteData);
	}
	if(localStorage.informationData){
		projectInformationArr=JSON.parse(localStorage.informationData);
	}
Vue.directive('state',{
	bind:function(el,binding){
		if(binding.value==0){
			$(el).removeClass('hover');
		}else if(binding.value==1){
			$(el).addClass('hover');
		}
	},
	update:function(el,binding){
		if(binding.value==0){
			$(el).removeClass('hover');
		}else if(binding.value==1){
			$(el).addClass('hover');
		}
	}
})
Vue.directive('red',{
	bind:function(el,binding){
		if(binding.value=='red'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
	update:function(el,binding){
		if(binding.value=='red'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
})
Vue.directive('yellow',{
	bind:function(el,binding){
		if(binding.value=='yellow'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
	update:function(el,binding){
		if(binding.value=='yellow'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
})
Vue.directive('blue',{
	bind:function(el,binding){
		if(binding.value=='blue'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
	update:function(el,binding){
		if(binding.value=='blue'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
})
Vue.directive('green',{
	bind:function(el,binding){
		if(binding.value=='green'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
	update:function(el,binding){
		if(binding.value=='green'){
			$(el).css('display','block');
		}else{
			$(el).css('display','none');
		}
	},
})
Vue.directive('nan',{
	bind:function(el,binding){
		if(isNaN(binding.value)){
			$(el).text('0%');
		}else{
			$(el).text(binding.value+'%');
		}
	},
	update:function(el,binding){
		if(isNaN(binding.value)){
			$(el).text('0%');
		}else{
			$(el).text(binding.value+'%');
		}
	},
})
$(function(){
	$('#note').click(function(){
		$('span.mark').css('background-positionX','-5px');
		$('#note span.mark').css('background-positionX','-36px');
		$('span.content').css('color','#878787');
		$('#note span.content').css('color','#7EC0EE');
		$('section>div').css('display','none');
		$('#noteView').css('display','block');
	})
	$('#task').click(function(){
		$('span.mark').css('background-positionX','-5px');
		$('#task span.mark').css('background-positionX','-36px');
		$('span.content').css('color','#878787');
		$('#task span.content').css('color','#7EC0EE');
		$('section>div').css('display','none');
		$('#taskView').css('display','block');
	})
	$('#project').click(function(){
		$('span.mark').css('background-positionX','-5px');
		$('#project span.mark').css('background-positionX','-36px');
		$('span.content').css('color','#878787');
		$('#project span.content').css('color','#7EC0EE');
		$('section>div').css('display','none');
		$('#projectView').css('display','block');
	})
})
var note=new Vue({
	el:'#noteView',
	data:{
		memos:noteArr,
		str:'',
		index:0,
	},
	methods:{
		addTextarea:function(){
			var date=new Date();
			this.memos.push({
				'content':$('#noteView textarea').val().split('\n'),
				'time':formateDate(date),
			});
			$('#textareaInput').val('');
		},
		push:function(e){
			$(e.target).children().eq(0).css('display','block')
		},
		pull:function(e){
			if($(e.target).children().eq(1).css('display')=='none'){
				$(e.target ).children().eq(0).css('display','none')
			}
			
		},
		showEdit:function(e){
			$(e.target).parent().children().eq(1).css('display','block')
			
		},
		editOptionShow:function(e){
			if(e.target.nodeName!='SPAN'){
				$('#noteView ul li div.editOption').css('display','none')
			}
		},
		edit:function(e){
			$('#mask').css('display','block');
			$(e.target).parent().parent().parent().next().css('display','block');
			this.index=$(e.target).parent().parent().index();
			this.str=this.memos[this.index].content.join('\n');
		},
		deleteLi:function(e){
			this.index=$(e.target).parent().parent().index();
			this.memos.splice(this.index,1)
			
		},
		close:function(e){
			$('#mask').css('display','none');
			$(e.target).parent().css('display','none');
		},
		change:function(e){
			this.$set(this.memos[this.index],'content',$(e.target).prev().val().split('\n'));
			$('#mask').css('display','none');
			$(e.target).parent().css('display','none');
		},
	}
});
var project=new Vue({
	el:'#projectView',
	data:{
		titles:projectTitleArr,
		projectInformation:projectInformationArr,
		projectTask:taskCompleteArr,
		index:0,
		num:0,
		typeIndex:0,
		taskIndex:0,
		title:null,
		projectNum:0,
		marks:null,
		mark:null,
		tasks:projectArr,
		taskType:'red',
		rate:0,
		changeable:false,
	},
	methods:{
		active1:function(e){
			$('#projectList').animate({width:'100%'},500);
			$('#timeTask').animate({left:'100%'},500);
			$('#timeTask').animate({width:'80%'},500);
			$('#addTask').animate({left:'100%'},500);
			$(e.target).addClass('active');
			$('#doneObject').removeClass('active');
			$('#projectView ul.newProject').css('display','block');
		},
		editOptionShow:function(e){
			if(e.target.nodeName!='SPAN'){
				$('#projectView ul li div.editOption').css('display','none')
			}
		},
		newProject:function(){
			$('#inputTitle').val('');
			$('#inputTextarea').val('');
			$('#mask').css('display','block');
			$('#createNewProject').css('display','block');
		},
		create:function(e){
			if(this.titles.indexOf($('#inputTitle').val())==-1){
				this.titles.push($('#inputTitle').val());
				this.projectInformation.push($('#inputTextarea').val());
				var objet={
					all:0,
					done:0,
					
				};
				this.projectTask.push(objet)
				$('#mask').css('display','none');
				$(e.target).parent().css('display','none');
				this.tasks.push([]);
			}
			else{
				alert('该项目已经存在')
			}
			
		},
		edit:function(e){
			$('#mask').css('display','block');
			$('#changeProject').css('display','block');
			this.index=$(e.target).parent().parent().index();
			$('#changeTitle').val(this.titles[this.index])
			$('#changeTextarea').val(this.projectInformation[this.index])
		},
		change:function(e){
			this.$set(this.titles,this.index,$('#changeTitle').val());
			this.$set(this.projectInformation,this.index,$('#changeTextarea').val());
			$('#mask').css('display','none');
			$(e.target).parent().css('display','none');
		},
		deleteLi:function(e){
			this.index=$(e.target).parent().parent().index();
			this.titles.splice(this.index,1);
			this.tasks.splice(this.index,1);
			this.projectInformation.splice(this.index,1);
			this.projectTask.splice(this.index,1);
			this.projectInformation.splice(this.index,1);
		},
		close:function(e){
			$('#mask').css('display','none');
			$(e.target).parent().css('display','none');
		},
		push:function(e){
			$(e.target).children().eq(0).css('display','block')
		},
		pull:function(e){
			if($(e.target).children().eq(1).css('display')=='none'){
				$(e.target ).children().eq(0).css('display','none')
			}
			
		},
		showEdit:function(e){
			$(e.target).parent().children().eq(1).css('display','block')
			
		},
		createTask:function(e){
			$('#projectList').animate({width:'20%'},500);
			$('#timeTask').css('display','block');
			$('#timeTask').animate({left:'20%'},500);
			this.taskIndex=$(e.target).parent().parent().parent().index();
			this.index=$(e.target).parent().parent().parent().index();
			this.title=this.titles[this.taskIndex];
			$('#allTask>li').css('display','none');
			$('#allTask>li').eq(this.taskIndex).css('display','block');
		},
		newTask:function(){
			$('#newTaskInput').val('');
			$('#taskType span').removeClass('hover');
			$('#danger').addClass('hover');
			this.taskType='red';
			this.changeable=false;
			$('#timeTask').animate({width:'50%'},500);
			$('#addTask').css('display','block');
			$('#addTask').animate({left:'70%'},500);
			$('#saveTask').css('display','block');
			$('#cancelTask').css('display','block');
			$('#deleteTask').css('display','none');
			$('#changeTask').css('display','none');
		},
		changeProjectName:function(){
			$('#newProjectList').css('display','block');
			$('#newProjectList li span').removeClass('hover')
			$('#newProjectList li span').eq(this.index).addClass('hover');
		},
		doneProject:function(e){
			$(e.target).parent().css('display','none');
			this.projectNum=$(e.target).index();
			$('#newProjectList>li span').removeClass('hover')
			$('#newProjectList>li').eq(this.projectNum).children().eq(0).addClass('hover');
		},
		searchProject:function(e){
			$('#newInput').css('display','block');
			for(var i=0;i<$('#newProjectList li').length-1;i++){
				$('#newProjectList li').eq(i).css('display','block');
				if($('#newProjectList li')[i].innerHTML.indexOf($(e.target).val())==-1){
					$('#newProjectList li').eq(i).css('display','none');
				}
				if($('#newProjectList li').eq(i).text()==$(e.target).val()){
					$('#newInput').css('display','none');
				}
			}
		},
		save:function(){
			
			$('#timeTask').animate({width:'80%'},500);
			$('#addTask').animate({left:'100%'},500);
			var index=this.titles.indexOf(this.title);
			console.log(index)
			this.projectTask[index].all+=1;
			this.tasks[index].push({
				'name':$('#newTaskInput').val(),
				'type':this.taskType,
				'state':0,
			});
			
		},
		cancel:function(){
			$('#timeTask').animate({width:'80%'},500);
			$('#addTask').animate({left:'100%'},500);
		},
		deleteTask:function(){
			$('#timeTask').animate({width:'80%'},500);
			$('#addTask').animate({left:'100%'},500);
			this.tasks[this.taskIndex].splice(this.typeIndex,1);
			this.projectTask[this.taskIndex].all-=1;
			if($('#allTask').children().eq(this.taskIndex).children().children().eq(this.typeIndex).children().eq(0).is('.hover')){
				this.projectTask[this.taskIndex].done-=1;
			}
		},
		changeTask:function(){
			$('#timeTask').animate({width:'80%'},500);
			$('#addTask').animate({left:'100%'},500);
			console.log(this.taskIndex);
			console.log(this.projectNum);
			if(this.taskIndex==this.projectNum){
				this.tasks[this.projectNum][this.typeIndex].name=$('#newTaskInput').val();
			}else{
				if($('#allTask').children().eq(this.taskIndex).children().children().eq(this.typeIndex).children().eq(0).is('.hover')){
					this.tasks[this.taskIndex].splice(this.typeIndex,1);
					this.tasks[this.projectNum].push({
						'name':$('#newTaskInput').val(),
						'type':this.taskType,
						'state':1,
					});
					this.projectTask[this.projectNum].all+=1;
					this.projectTask[this.taskIndex].all-=1;
					this.projectTask[this.taskIndex].done-=1;
					this.projectTask[this.projectNum].done+=1;
				}else{
					this.tasks[this.taskIndex].splice(this.typeIndex,1);
					this.tasks[this.projectNum].push({
						'name':$('#newTaskInput').val(),
						'type':this.taskType,
						'state':0,
					});
					this.projectTask[this.projectNum].all+=1;
					this.projectTask[this.taskIndex].all-=1;
				}
			}
			
		},
		changeType:function(e){
			console.log(22222);
			$('#taskType span').removeClass('hover');
			$(e.target).addClass('hover');
			switch($(e.target).index()){
				case 0:
					this.taskType='red';
					break;
				case 1:
					this.taskType='yellow';
					break;
				case 2:
					this.taskType='blue';
					break;
				case 3:
					this.taskType='green';
					break;
			}
			if(this.changeable){
				if($('#allTask').children().eq(this.taskIndex).children().children().eq(this.typeIndex).children().eq(0).is('.hover')){
					this.$set(this.tasks[this.taskIndex][this.typeIndex],'type',this.taskType);
					this.$set(this.tasks[this.taskIndex][this.typeIndex],'state',1);
				}else{
					this.$set(this.tasks[this.taskIndex][this.typeIndex],'type',this.taskType);
					this.$set(this.tasks[this.taskIndex][this.typeIndex],'state',0);
				}
			}
		},
		changeState:function(e){
			var index=$(e.target).parent().index()
			if($(e.target).is('.hover')){
				this.$set(this.tasks[this.taskIndex][index],'state',0);
				this.projectTask[this.taskIndex].done-=1;
			}else{
				this.$set(this.tasks[this.taskIndex][index],'state',1);
				this.projectTask[this.taskIndex].done+=1;
			}
		},
		editTask:function(e){
			if(e.target.nodeName=='LI'){
				$('#allTask>li>ul>li').css('backgroundColor','');
				$(e.target).css('backgroundColor','#c4c4c4');
				this.typeIndex=$(e.target).index();
				this.taskIndex=$(e.target).parent().parent().index();
				this.projectNum=this.taskIndex;
				$('#timeTask').animate({width:'50%'},500);
				$('#addTask').css('display','block');
				$('#addTask').animate({left:'70%'},500);
				$('#saveTask').css('display','none');
				$('#cancelTask').css('display','none');
				$('#deleteTask').css('display','block');
				$('#changeTask').css('display','block');
				$('#newTaskInput').val($(e.target).text());
				$('#taskType span').removeClass('hover');
				this.changeable=true;
				this.taskType=this.tasks[this.taskIndex][this.typeIndex].type;
				switch(this.taskType){
					case 'red':
						$('#danger').addClass('hover');
						break;
					case 'yellow':
						$('#warn').addClass('hover');
						break;
					case 'blue':
						$('#normal').addClass('hover');
						break;
					case 'green':
						$('#easy').addClass('hover');
						break;
				}
			}
		},
		addBackground:function(e){
			if(e.target.nodeName=='LI'){
				$(e.target).addClass('hover');
			}
		},
		removeBackground:function(e){
			if(e.target.nodeName=='LI'){
				$(e.target).removeClass('hover');
			}
		},
	},
})
var task=new Vue({
	el:'#taskView',
	data:{
		dataAll:project.tasks,
	},
});
function formateDate(date){
	var result=date.getFullYear()+'-'+(date.getMonth()+1)
	+'-'+date.getDate()+'-'+''+date.getHours()+':'+date.getMinutes()+':'+
	date.getSeconds();
	return result;
}
};
window.onunload=function(){
	localStorage.setItem('todoData',JSON.stringify(projectArr));
	localStorage.setItem('projectData',JSON.stringify(taskCompleteArr));
	localStorage.setItem('titleData',JSON.stringify(projectTitleArr));
	localStorage.setItem('noteData',JSON.stringify(noteArr));
	localStorage.setItem('informationData',JSON.stringify(projectInformationArr));
};
