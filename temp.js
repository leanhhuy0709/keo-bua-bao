const SearchBox = () => {
  const [val, setVal] = useState(null);
  function HandleSearch() {
      // var input = document.getElementById("search-input").value;
      Get("/lessons/?lesson_type=G").then((res)=>{
          setVal(res);
          console.log(val)
          //var list = val.lessons;        
          //localStorage.setItem('lesson-list', list);
        })
        .catch((err)=>{
          console.log(err.response);
        });
      console.log(val);
  }
  return <>
      <div className="learn-search">
          <div class="input-group">
              <input type="search" id="search-input" class="form-control" placeholder="Search a course" />
              <button type="button" class="btn btn-primary" onClick={HandleSearch}>
                  <i class="fas fa-search"></i>
              </button>
          </div>
      </div>
  </>
}