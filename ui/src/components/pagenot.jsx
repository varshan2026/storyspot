import pageNot from '../assets/404.svg';

function PageNot(){
    return(
      <>
      <section className="flex justify-center items-center h-[90vh]">
        <img src={pageNot} className="h-full"/>
      </section>
      </>
    )
}

export default PageNot;