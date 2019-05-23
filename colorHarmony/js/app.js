//Name: Mujtaba Murtaza
//Class: NEWM-N320
//Date: 12-07-2017

//========================================= COLOR COMPONENT =======================================================
// Color component. This is where the selection of the color is made.

Vue.component("color", {
    template: "#color-template",
    data: function() {
        return {
            //a variable created to store the color data. for now there's nothing in it until clicked
            //on the particular color: red, orange, yellow, green, blue, and purple.
            colorChosen: "none"
        }
    },

    methods: {

        //choose is something that is there through the v-on:click on the html.
        //as we click on the component that's where this function (choose) will respond
        choose:function(clicked) {

            //when we click on THIS specific color, THIS will emit the color chosen depending on the name we
            //have chosen to give it. (such as red or orange)
            this.clicked = clicked;

            //this.clicked retrieves the information and stores it into the variable colorChosen.
            colorChosen = this.clicked;

            //this is where it emits out the data so that it's actually there but we won't be able to see it unless console-d out.
            this.$emit(colorChosen);

            //this will console out the color clicked on the particular part of the component.
            //for example if red is clicked then it will console out "red".
            console.log(colorChosen);

            //since we want to make sure the user has actually clicked onto something, we also need to make sure
            //that we have a highlight added to it so that people know this actually works.
            //this is where we add/remove the class depending on which id has been clicked.
            $("#red").removeClass("highlight");
            $("#orange").removeClass("highlight");
            $("#yellow").removeClass("highlight");
            $("#green").removeClass("highlight");
            $("#blue").removeClass("highlight");
            $("#purple").removeClass("highlight");
            $("#" + colorChosen).addClass("highlight");
        }
    }
});

//================================================================================================================





//========================================= HARMONY COMPONENT ====================================================
//Harmony component. This is where the selection of the harmony would be made after the user has decided the color.

Vue.component('harmony', {
   template: "#harmony-template",
   data: function() {
       return {
           //a variable created to store the harmony data. for now there's nothing in it until clicked
           //on the particular type of harmony: direct, split, analogous.
           harmonyChosen: "none"
       }
   },

   methods: {

       //choose is something that is there through the v-on:click on the html.
       //as we click on the component that's where this function (choose) will respond
       choose:function (clicked) {

           //when we click on THIS specific harmony, THIS will emit the harmony chosen depending on the name we
           //have chosen to give it. (such as direct, split or analogous)
           this.clicked = clicked;

           //this.clicked retrieves the information and stores it into the variable harmonyChosen.
           harmonyChosen = this.clicked;

           //this is where it emits out the data so that it's actually there but we won't be able to see it unless console-d out.
           this.$emit(harmonyChosen);

           //this will console out the harmony clicked on the particular part of the component.
           //for example if direct is clicked then it will console out "direct".
           console.log(harmonyChosen);

           //since we want to make sure the user has actually clicked onto something, we also need to make sure
           //that we have a harmonyHighlight added to it so that people know this actually works.
           //this is where we add/remove the class depending on which id has been clicked
           $("#direct").removeClass("harmonyHighlight");
           $("#split").removeClass("harmonyHighlight");
           $("#analogous").removeClass("harmonyHighlight");
           $("#" + harmonyChosen).addClass("harmonyHighlight");

       }
   }
});

//================================================================================================================





//========================================= RESULTS COMPONENT ====================================================
//Results component. Nothing needs to displayed on it actually since all the work is being done on the app
//component. But either way this component is needed because it still needs to display the 5 div's

Vue.component('results', {
   template: "#results-template",
});

//================================================================================================================





//========================================= APP COMPONENT =======================================================
//vue code for the app component. this is where everything will displayed.
//this is the component which receives the color through "where" using underscore and displays it
//by changing the background-color of the result id's using arrays

//this is the variable which stores the location of the json file so that the variable can be called using ajax
let jsonFile = ("data/data.json");

new Vue({
    el: "#app",
    data: function() {
        return {
            //this is where the data from the data.json file will be stored. the arrays will be in the "items"
            items: null,
            colorChosen: [],
            harmonyChosen: [],
        }
    },

    //this is created in order to call the function and have the arrays work
    created: function () {
        this.fetchData();
    },

    methods: {

        //in order to display the arrays from the json file we have to create a function and call get the data using
        //AJAX.
        fetchData: function () {
            $.get(jsonFile, function (data) {
                items = data;
                //Just to make sure it actually shows the arrays we have to make sure that it's actually there first
                // so we use console.log to see the objects
                console.log(data);
            })
        },

        //this is a simplified function to display the color results by pulling out the data from the array.
        fetchColors: function (hexCodes) {
            document.getElementById("resultColor1").style.backgroundColor = hexCodes[0];
            document.getElementById("resultColor2").style.backgroundColor = hexCodes[1];
            document.getElementById("resultColor3").style.backgroundColor = hexCodes[2];
            document.getElementById("resultColor4").style.backgroundColor = hexCodes[3];
            document.getElementById("resultColor5").style.backgroundColor = hexCodes[4];
        },

        //this is where we give it the direct function as we assigned the v-on:direct = "direct" to the html component.
        //if this function isn't here then the components will not be displayed.
        direct: function () {
            console.log(colorChosen + " in app");
            //using underscore, we find out the results depending on the color and harmony chosen.
            //for example if "red" and "direct" is selected then it will call out the function with the help of the variable created.
            //and then display the results in the results component and have the arrays display on to the console.
            let hexCodes = _.where(items[colorChosen][harmonyChosen]);
            this.fetchColors(hexCodes);
            console.log(hexCodes);
        },

        //this is where we give it the split function as we assigned the v-on:split = "split" to the html component.
        //if this function isn't here then the components will not be displayed.
        split: function () {
            console.log(colorChosen + " in app");
            let hexCodes = _.where(items[colorChosen][harmonyChosen]);
            this.fetchColors(hexCodes);
            console.log(hexCodes);
        },

        //this is where we give it the analogous function as we assigned the v-on:analogous = "analogous" to the html component.
        //if this function isn't here then the components will not be displayed.
        analogous: function () {
            console.log(colorChosen + " in app");
            let hexCodes = _.where(items[colorChosen][harmonyChosen]);
            this.fetchColors(hexCodes);
            console.log(hexCodes);
        }
    }
});

//================================================================================================================