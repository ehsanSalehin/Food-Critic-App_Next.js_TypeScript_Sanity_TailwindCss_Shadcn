"use client"


const Searchformreset = () => {

    const reset =()=>{
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if(form) form.reset();
    }

  return (
    <button 
    type="reset" 
    onClick={reset}
    className="size-[40px] rounded-full bg-[#10dc54] flex justify-center items-center !important text-white"
>
    X
</button>
  )
}

export default Searchformreset