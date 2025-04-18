import { TrendingUp, ShieldCheck, Award } from "lucide-react"

const HeroStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
      <div className="flex items-center">
        <div className="bg-gold-DEFAULT/10 p-2 rounded-full mr-3">
          <TrendingUp className="h-5 w-5 text-gold-light" />
        </div>
        <div>
          <p className="text-gold-light font-semibold">15% Annual Growth</p>
          <p className="text-white/60 text-sm">Average ROI</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-gold-DEFAULT/10 p-2 rounded-full mr-3">
          <ShieldCheck className="h-5 w-5 text-gold-light" />
        </div>
        <div>
          <p className="text-gold-light font-semibold">100% Authentic</p>
          <p className="text-white/60 text-sm">Certified Gold</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-gold-DEFAULT/10 p-2 rounded-full mr-3">
          <Award className="h-5 w-5 text-gold-light" />
        </div>
        <div>
          <p className="text-gold-light font-semibold">999.9 Purity</p>
          <p className="text-white/60 text-sm">Premium Quality</p>
        </div>
      </div>
    </div>
  )
}

export default HeroStats
