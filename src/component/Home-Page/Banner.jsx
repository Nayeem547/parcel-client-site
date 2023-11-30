
import bannerImg from '../../assets/banner.jpg'


const Banner = () => {
    return (
        <div className="hero   min-h-screen" style={{backgroundImage: `url(${bannerImg})` }}>
  <div className="hero-overlay bg-black bg-opacity-30"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-2xl mt-32  lg:text-5xl text-white font-bold">Efficient Parcel Delivery for a Seamless Experience</h1>
      <p className="mb-5 text-[10px] text-white">Experience swift and reliable parcel delivery services tailored to meet your needs. Our dedicated team ensures secure handling and on-time delivery, making us your trusted partner for hassle-free shipping. Explore a seamless delivery experience with us.</p>
      <div>
      <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
      <button className="btn btn-primary">Get Started</button>
      </div>
      
    </div>
  </div>
</div>
        
    );
};

export default Banner;