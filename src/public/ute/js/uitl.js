var util ={
  
    
  isTheProperty:function(object,nameProperty){
    return (object.hasOwnProperty(nameProperty));
  },
    createVueFrom:function(object){
      /* return new Vue({
        el: object.element,
        data:object.model,
        methods: util.isTheProperty(object, 'methods') ? object.methods :null,
      }) */
      return new Vue(object);
    }

};

var utilGrid ={

  propsDefault:{
    heroes: Array,
    columns: Array,
    filterKey:String
  },

  dataDefault: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  component:{
    setOrder:function(){
      var sortOrders = {}
              this.columns.forEach(function (key) {
                if(key !==""){
                  sortOrders[key] = 1
                }
              })
              return {
                sortKey: '',
                sortOrders: sortOrders
       }
    }
  },

  computed:{
    filteredHeroes: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes
    }
  },

  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  },

  createGrid:function(object){
      Vue.component('demo-grid',object.component)
      var demo = new Vue({
          el: object.element,
          data: {
            searchQuery: '',
            gridColumns: object.columns,
            gridData: object.data
          }
        });

        return demo;
  }
}