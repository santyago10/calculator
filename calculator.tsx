import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface IComponent{
  displayInfo?: any
}

export class Calculator extends React.Component<{}, IComponent>{
  private value1: any;
  private value2: any;
  private operation: string;
  constructor( props ){
    super( props );
    this.value1 = ["0"];
    this.value2 = [];
    this.operation = "";
    this.state = { displayInfo: this.value1 };
  }

  getValues( e ){
    if( this.operation !== "" ){
      if( this.value2.length < 9 ){
        if( e._dispatchInstances.memoizedProps.children === "0" && this.value2[0] === "0"  ){
          this.value2 = [ "0" ];
          this.setState( { displayInfo: this.value2 } );
        }
        else if( !this.value2.length && e._dispatchInstances.memoizedProps.children === "." ){
          this.value2 = [ "0", "." ];
          this.setState( { displayInfo: this.value2 } )
        }
        else if( this.value2[0] === "-" && this.value2[1] === "0" && e._dispatchInstances.memoizedProps.children === "0" ){
          this.value2 = [ "-", "0" ];
          this.setState( { displayInfo: this.value2 } );
        }
        else{
          debugger;
          this.value2[0] === "0" && this.value2[1] !== "." ?
          ( !this.value2[1] && e._dispatchInstances.memoizedProps.children === "." ?
           this.value2.push( e._dispatchInstances.memoizedProps.children ) :
           this.value2 = [ e._dispatchInstances.memoizedProps.children ] ) : 
          this.value2.push( e._dispatchInstances.memoizedProps.children );

          this.setState( { displayInfo: this.value2 } );
        }
      }
      else{
        this.setState( { displayInfo: this.value2 } );
      }
    }
    else{
      if( this.value1.length < 9 || !Array.isArray( this.value1 ) ){
        if( e._dispatchInstances.memoizedProps.children === "0" && this.value1[0] === "0" )
        {
          this.setState( { displayInfo: this.value1 } );
        }
        else if( this.value1[0] === "-" && this.value1[1] === "0" && e._dispatchInstances.memoizedProps.children === "0" ){
          this.value1 = [ "-", "0" ];
          this.setState( { displayInfo: this.value1 } );
        }
        else{
          this.value1[0] === "0" && this.value1[1] !== "." || !Array.isArray( this.value1 ) ? ( !this.value1[1] && e._dispatchInstances.memoizedProps.children === "." ?
           this.value1.push( e._dispatchInstances.memoizedProps.children ) :
            this.value1 = [ e._dispatchInstances.memoizedProps.children ] ) :
          this.value1.push( e._dispatchInstances.memoizedProps.children );
          this.setState( { displayInfo: this.value1 } );
        }
      }
      else{
        this.setState( { displayInfo: this.value1 } );
      }
    }
  }

  getOperation( e, symbol ){
    if ( this.value2.length ){
      this.resolve( e )
      this.operation = symbol;
    }
    else{
      this.operation = symbol;
    }
  }

  ac( e ){
    e.stopPropagation();
    this.value1 = ["0"];
    this.value2 = []
    this.operation = "";
    this.setState( { displayInfo: this.value1 } )
  }

  toOpposite(e){
    e.stopPropagation();

    if( this.operation !== ""  ){
      if( this.value2[0] === "-" && !this.value2[1] ){
        this.value2 = [ "0" ];
        this.setState( { displayInfo: this.value2 } )
      }
      else if( this.value2[0] === "0" && this.value2[1] !== "." || !this.value2.length ){
        this.value2 = [ "-" , "0" ];
        this.setState( { displayInfo: this.value2 } );
      }
      else{
        !this.value2.length ? this.value2 = [ '-' ] :
        this.value2 = [ this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) * -1 :
        parseInt( this.value2.join("") ) * -1 ];
        this.setState( { displayInfo: this.value2 } );
      }
    }
    else{
      if( this.value1[0] === "0" && this.value1[1] !== "." ){
        this.value1 = [ "-", "0" ];
        this.setState( { displayInfo: this.value1 } );
      }
      else if( this.value1[0] === "-" && this.value1[1] === "0" && this.value1[2] !== "." ){
        this.value1 = [ "0" ];
        this.setState( { displayInfo: this.value1 } );
      }
      else if( Array.isArray( this.value1 ) ){
        this.value1 = [ this.value2.indexOf('.') ? parseFloat( this.value1.join("") ) * -1 : parseInt( this.value1.join("") ) * -1 ];
        this.setState( { displayInfo: this.value1 } );
      }
      else{
        console.log("adsd");
        this.value1 = this.value1 * -1;
        this.operation = "";
        this.setState( { displayInfo: this.value1 } )
      }
    }
  }

  getPersentage( e ){
    e.stopPropagation();
    if( this.operation === "" ){
      Array.isArray( this.value1 ) ? this.value1 = parseInt( this.value1.join("") ) / 100 : this.value1 = this.value1 / 100;
      this.setState( { displayInfo: this.value1 } )
    }
    else{
      if( this.value2.length && this.value2[0] !== "-" ){
        Array.isArray( this.value2 ) ? this.value2 = [ parseInt( this.value2.join("") ) / 100 ] : this.value2 = [ this.value2 / 100 ];
        this.setState( { displayInfo: this.value2 } )
      }
      else{
        this.value2 = ["0"];
        this.setState( { displayInfo: this.value2 } )
      }
    }
  }

  resolve( e ){ 
    if(this.value2[0] === "-" && !this.value2[1] ) {
      this.setState( { displayInfo: this.value1 } );
      this.value2 = [];
    }  
    else if( this.value2.length ){
      switch( this.operation ){
        case '+':
            Array.isArray( this.value1 ) ? ( this.value1 = ( this.value1.indexOf('.') ? parseFloat( this.value1.join("") ) :
            parseInt( this.value1.join("") ) ) + ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
            parseInt( this.value2.join("") ) ) ) :
            ( this.value1 = this.value1 + ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
            parseInt( this.value2.join("") ) ) );

            this.setState( { displayInfo: this.value1 } );

            this.operation = "";
            this.value2 = [];
        break;

        case '-': 
          Array.isArray( this.value1 ) ? ( this.value1 = ( this.value1.indexOf('.') ? parseFloat( this.value1.join("") ) :
          parseInt( this.value1.join("") ) ) - ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
          parseInt( this.value2.join("") ) ) ) :
          ( this.value1 = this.value1 - ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
          parseInt( this.value2.join("") ) ) );

          this.setState( { displayInfo: this.value1 } );

          this.operation = "";
          this.value2 = [];
        break;

        case '/': 
          Array.isArray( this.value1 ) ? ( this.value1 = ( this.value1.indexOf('.') ? parseFloat( this.value1.join("") ) :
          parseInt( this.value1.join("") ) ) / ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
          parseInt( this.value2.join("") ) ) ) :
          ( this.value1 = this.value1 / ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
          parseInt( this.value2.join("") ) ) );

          this.setState( { displayInfo: this.value1} );

          this.operation = "";
          this.value2 = [];
        break;

        case '*': 
          Array.isArray( this.value1 ) ? ( this.value1 = ( this.value1.indexOf('.') ? parseFloat( this.value1.join("") ) :
          parseInt( this.value1.join("") ) ) * ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
          parseInt( this.value2.join("") ) ) ) :
          ( this.value1 = this.value1 * ( this.value2.indexOf('.') ? parseFloat( this.value2.join("") ) : 
          parseInt( this.value2.join("") ) ) );

          this.setState( { displayInfo: this.value1 } );
          
          this.operation = "";
          this.value2 = [];
        break;

        default: this.value1 = this.value1;
      } 
    }
    else{
      this.operation = "";
      this.setState( { displayInfo: this.value1 } );
    }
  }

  render(){
    return <View style = { styles.container }>
        <View style = { styles.display }>
            <Text style = { { fontSize: 50, fontWeight: '200', color: 'white' } }>{ this.state.displayInfo }</Text>
        </View>
        <View style = { styles.buttons }>
          <View style = { styles.greyButtons }>
            <TouchableOpacity onPress = { e => this.ac( e ) } style = { styles.greyButton }>
              <Text style = { [ styles.text, { color: 'black', fontSize: 30, paddingTop: 20 } ] }>{ this.value1[0] === "0" ? "AC" : "C" }</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = { e => this.toOpposite(e) } style = { styles.greyButton }>
              <Text style = { [ styles.text, { color: 'black' } ] }>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = { e => this.getPersentage( e ) } style = { styles.greyButton }>
              <Text style = { [ styles.text, { color: 'black' } ] }>%</Text>
            </TouchableOpacity>
        </View>
        <View nativeID = "numbers" style = { styles.numbers }>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>7</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>8</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>9</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>4</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>5</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>6</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>2</Text>
          </TouchableOpacity>
          <TouchableOpacity  style = { styles.button }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style = { [ styles.button, { width: 156 } ] }>
            <Text onPress = { e => this.getValues( e ) } style = { styles.text }>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style = { styles.button }>
            <Text onPress = { e => this.getValues( e )} style = { styles.text }>.</Text>
          </TouchableOpacity>
        </View>
        <View style = { styles.orangeButtons }>
          <TouchableOpacity onPress = { e => this.getOperation( e, '/' ) } style = { styles.orangeButton }>
          <Text style = { styles.text }>&#247;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = { e => this.getOperation( e, '*' ) } style = { styles.orangeButton }>
          <Text style = { styles.text }>&#215;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = { e => this.getOperation( e, '+' ) } style = { styles.orangeButton } >
          <Text style = { styles.text }>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = { e => this.getOperation( e, '-' ) } style = { styles.orangeButton }>
          <Text style = { styles.text }>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = { e => this.resolve( e ) } style = { styles.orangeButton }>
          <Text style = { styles.text }>=</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>   
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    display: 'flex',
    fontSize: 35,
    fontWeight: '400',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: 15
  },

  display: {
    height: 180,
    backgroundColor: 'black',
    color: 'white',
    marginTop: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  buttons: {
    height: '100%',
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  greyButtons: {
    height: 85,
    width: '70%',
    flexDirection: 'row'
  },
  numbers: {
    height: 350,
    width: '74%',
    flexDirection: 'row',
    flexWrap: "wrap",
    marginTop: 5
  },
  orangeButtons: {
    width: 100,
    height: 440,
    position: 'absolute',
    right: 0,
    top: 0, 
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: '#3d3d3d',
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orangeButton: {
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: '#e8882e',
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greyButton: {
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: '#ababab',
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }
})