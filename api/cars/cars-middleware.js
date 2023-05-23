const CarModel = require('./cars-model');


const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await carsModel.getById(id);
    if (!car) {
      return res.status(404).json({ message: 'Araba kimliği ${id} bulunamadı.'});
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Araç kimliği kontrol edilirken bir hata oluştu.'});
  }
};

const checkCarPayload = (req, res, next) => {
  const { make, model, year, mileage, price, vin } = req.body;
  if (!make || !model || !year || !mileage || !price || !vin) {
    return res.status(400).json({ message: 'Eksik alan(lar) mevcut.'});
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body; 
  if (vin.length !== 17) {
    return res.status(400).json({ message: `Vin ${vin} geçersizdir.`  });
  }
  next ();
};

const checkVinNumberUnique = async (req, res, next) => {
    const { vin } = req.body;
    try {
      const car = await carsModel.getByVinNumber(vin);
      if (car) {
        return res.status(400).json({ message: 'Vin numarası kontrol edilirken bir hata oluştu.' });

      }
    }

    module.exports =  {
      checkCarId,
      checkCarPayload,
      checkVinNumberUnique, 
      checkVinNumberValid
    };
};
