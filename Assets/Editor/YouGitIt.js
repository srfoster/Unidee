
import System;
import System.IO;
import System.Net;
import System.Threading;

class YouGitIt extends EditorWindow {

	var button_text = "Git It!";
	var data_path = Application.dataPath;
	var feedback = "";
	
    @MenuItem ("Window/YouGitIt")
    static function ShowWindow () {


        EditorWindow.GetWindow (YouGitIt);
    }

    function OnGUI () {
        if(!Directory.Exists(data_path+"/YouGotIt"))
		{
            Directory.CreateDirectory(data_path+"/YouGotIt");
        }
        
		if(GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2-30,100,20),button_text) && button_text != "Gitting...")
		{
			button_text = "Gitting...";
			(new Thread(GitIt)).Start();
		}
		
		GUI.Label(Rect(50,Screen.height/2,Screen.width - 50, 50), feedback); 
    }
    
    function GitIt()
    {
    	try{
	        var path = data_path+"/Dependencies";    
		    var info = new DirectoryInfo(path);
		    var fileInfo = info.GetFiles();
		
			
		    for (file in fileInfo)
		    {
		        var filename = file.ToString(); 
		    	var to_gits = System.IO.File.ReadAllText(filename).Split('\n'[0]);
		    	
		    	for(var to_git in to_gits)
		    	{
					var to_git_path_split = to_git.Split('/'[0]);
					var package_name = to_git_path_split[to_git_path_split.Length - 1];
					
			    	Debug.Log("Gitting " + to_git + "/blob/master/"+package_name+".unitypackage?raw=true");
					feedback = "Gitting: " + to_git;
		    		
		    		var webClient = new WebClient();
					webClient.DownloadFile(to_git + "/blob/master/"+package_name+".unitypackage?raw=true", data_path + "/YouGotIt/"+package_name+".unitypackage");
		    	}
		    	
		    	
		    }
		
			button_text = "Git It!";
			feedback = "Got It!  Refresh your YouGotIt folder.";
		}catch(e){
			feedback = e.ToString();
		}
    } 
}