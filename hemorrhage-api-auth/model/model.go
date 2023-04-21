package model

type DBDriver struct {
	Driver    string
	DBConnect string
}

type Secret struct {
	Hmac []byte
}

type Auth struct {
	Id       int    `db:"id" json:"id"`
	Fname    string `db:"fname" json:"fname"`
	Lname    string `db:"lname" json:"lname"`
	Email    string `db:"email" json:"email"`
	AuthType string `db:"type" json:"type"`
}

type Person struct {
	Person_Id string `db:"person_id" json:"id"`
	Gender    string `db:"gender" json:"gender"`
	Fname     string `db:"fname" json:"fname"`
	Lname     string `db:"lname" json:"lname"`
	Bdate     string `db:"bdate" json:"bdate"`
}

type PhaseOne struct {
	Person_Id string `db:"person_id" json:"id"`
	PI        int    `db:"phInp" json:"phInp"`
	PI1       int    `db:"phInp1" json:"phInp1"`
	Gestation int    `db:"gestation" json:"gestation"`
	Parity    int    `db:"parity" json:"parity"`
	GA        int    `db:"GA" json:"GA"`
	PI3       string `db:"phInp3" json:"phInp3"`
	Hhage     string `db:"hemorrhage" json:"hemorrhage"`
	Hhage1    string `db:"hemorrhage1" json:"hemorrhage1"`
	Hhage1Y   string `db:"hemorrhage1Yes" json:"hemorrhage1Yes"`
	PI4       int    `db:"phInp4" json:"phInp4"`
	Weight    int    `db:"weight" json:"weight"`
	Height    int    `db:"height" json:"height"`
	Hct       int    `db:"Hct" json:"Hct"`
	HxPPH     string `db:"HxPPH" json:"HxPPH"`
	DM        string `db:"DM" json:"DM"`
	PIH       string `db:"PIH" json:"PIH"`
	Hhage3    string `db:"hemorrhage3" json:"hemorrhage3"`
	Hhage4    string `db:"hemorrhage4" json:"hemorrhage4"`
	Hhage4Y   string `db:"hemorrhage4Yes" json:"hemorrhage4Yes"`
	Hhage5    string `db:"hemorrhage5" json:"hemorrhage5"`
	PI6       int    `db:"phInp6" json:"phInp6"`
	Hhage6    string `db:"hemorrhage6" json:"hemorrhage6"`
	Hhage7    string `db:"hemorrhage7" json:"hemorrhage7"`
	Hhage8    string `db:"hemorrhage8" json:"hemorrhage8"`
	PI7       int    `db:"phInp7" json:"phInp7"`
}

type PhaseTwo struct {
	Person_Id string `db:"person_id" json:"id"`
	Hhage     string `db:"hemorrhage" json:"hemorrhage"`
	P2I       int    `db:"ph2inp" json:"ph2inp"`
	Hhage1    string `db:"hemorrhage1" json:"hemorrhage1"`
	Hhage2    string `db:"hemorrhage2" json:"hemorrhage2"`
	Hhage3    string `db:"hemorrhage3" json:"hemorrhage3"`
	Hhage4    string `db:"hemorrhage4" json:"hemorrhage4"`
}

type Result struct {
	Person_Id string `db:"person_id" json:"id"`
	Predict   string `db:"predict" json:"predict"`
	Product   string `db:"product" json:"product"`
}
