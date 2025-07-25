import { BookingForm } from '@/components/booking/BookingForm';
import Header from '@/components/layout/Header';

const Booking = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Header/>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Agendar Serviço
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o melhor horário e profissional para cuidar do seu veículo
          </p>
        </div>
        
        <BookingForm />
      </div>
    </div>
  );
};

export default Booking;