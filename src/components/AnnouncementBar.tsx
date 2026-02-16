 import { Truck, QrCode } from "lucide-react";
 
 const AnnouncementBar = () => {
   return (
     <div className="bg-primary py-2 px-4">
       <div className="container mx-auto flex items-center justify-center gap-2 text-primary-foreground text-xs sm:text-sm">
         <Truck className="h-4 w-4 flex-shrink-0" />
         <span className="text-center">
           Free shipping on order above Rs 1000/- | Packaging now features QR codes instead of barcodes
         </span>
         <QrCode className="h-4 w-4 flex-shrink-0 hidden sm:block" />
       </div>
     </div>
   );
 };
 
 export default AnnouncementBar;