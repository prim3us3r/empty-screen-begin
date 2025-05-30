import Image from "next/image"

const PaymentLogos = () => {
  return (
    <div className="mt-6">
      <p className="text-xs text-center text-muted-foreground mb-3">Trusted Payment Methods</p>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <div className="relative h-8 w-12">
          <Image src="/images/payment/visa.png" alt="Visa" fill className="object-contain" />
        </div>
        <div className="relative h-8 w-12">
          <Image src="/images/payment/mastercard.png" alt="Mastercard" fill className="object-contain" />
        </div>
        <div className="relative h-8 w-12">
          <Image src="/images/payment/fpx.png" alt="FPX" fill className="object-contain" />
        </div>
        <div className="relative h-8 w-12">
          <Image src="/images/payment/tng.png" alt="Touch 'n Go" fill className="object-contain" />
        </div>
        <div className="relative h-8 w-12">
          <Image src="/images/payment/maybank.png" alt="Maybank" fill className="object-contain" />
        </div>
        <div className="relative h-8 w-12">
          <Image src="/images/payment/cimb.png" alt="CIMB" fill className="object-contain" />
        </div>
      </div>
    </div>
  )
}

export default PaymentLogos
